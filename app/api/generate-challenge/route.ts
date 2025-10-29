import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyBpkyYcIcExmOzOIty5oH6095y0kYvTHJQ');

const DIFFICULTY_PROMPTS = {
  easy: "easy, short sentences",
  medium: "medium length sentences",
  hard: "challenging, longer sentences with complex vocabulary",
  extreme: "extreme, very long and complex sentences with intricate context and advanced vocabulary, often metaphorical or abstract",
};

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const difficulty = (searchParams.get('difficulty') as "easy" | "medium" | "hard" | "extreme") || "medium";
    const difficultyPrompt = DIFFICULTY_PROMPTS[difficulty];

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Add a random seed to the prompt to encourage more unique generations
    const uniqueSeed = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    const prompt = `Generate a unique memory challenge in Indonesian with a difficulty of "${difficultyPrompt}". Vary sentence structure, vocabulary, and themes. The response MUST be a JSON object ONLY, with no additional text or markdown formatting. The structure should be:
    {
      "sentence": "[A short, interesting sentence]",
      "question": "[A context-based question about the sentence]",
      "answer": "[The correct answer to the question, a single word or short phrase]",
      "options": ["[Correct answer]", "[Incorrect option 1]", "[Incorrect option 2]", "[Incorrect option 3]"]
    }
    Ensure the incorrect options are plausible but clearly wrong. The sentence should be suitable for memory training.
    Unique seed for generation: ${uniqueSeed}`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Clean up the text response: remove markdown code block wrappers if present
    const cleanedText = text.startsWith('```json') && text.endsWith('```')
      ? text.substring(7, text.length - 3).trim()
      : text.trim();

    // Attempt to parse the JSON response from Gemini
    let challengeData;
    try {
      challengeData = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error("Failed to parse Gemini response as JSON:", text, parseError);
      return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 });
    }

    // Basic validation to ensure the structure is as expected
    if (!challengeData.sentence || !challengeData.question || !challengeData.answer || !challengeData.options || !Array.isArray(challengeData.options) || challengeData.options.length !== 4) {
      console.error("AI response has unexpected structure:", challengeData);
      return NextResponse.json({ error: "AI response has unexpected structure" }, { status: 500 });
    }

    // Shuffle the options array
    for (let i = challengeData.options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [challengeData.options[i], challengeData.options[j]] = [challengeData.options[j], challengeData.options[i]];
    }

    return NextResponse.json(challengeData);
  } catch (error) {
    console.error("Error generating challenge with Gemini AI:", error);
    return NextResponse.json({ error: "Failed to generate challenge" }, { status: 500 });
  }
}
