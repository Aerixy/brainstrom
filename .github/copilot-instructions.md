# AI Agent Instructions for my-brainrot

This is a Next.js application using the App Router pattern with TypeScript and Tailwind CSS.

## Project Architecture

- **App Router Structure**: Uses Next.js 13+ App Router pattern in the `app` directory
  - `layout.tsx`: Root layout with font configuration (Geist Sans/Mono)
  - `page.tsx`: Main page component with responsive design patterns
  - `globals.css`: Global styles and Tailwind configurations

## Key Patterns and Conventions

### Styling
- Uses Tailwind CSS with dark mode support
- Common patterns:
  ```tsx
  className="dark:bg-black bg-white"  // Light/dark mode
  className="sm:items-start"          // Responsive design
  ```

### Components
- Image optimization using Next.js `Image` component with proper props:
  ```tsx
  <Image
    src="/image.svg"
    alt="Alt text"
    width={size}
    height={size}
    priority        // For above-the-fold images
  />
  ```

### TypeScript
- Strict type checking enabled
- Use `Readonly` for props to prevent mutations
- Example pattern:
  ```tsx
  type Props = Readonly<{
    children: React.ReactNode;
  }>;
  ```

## Development Workflow

### Available Commands
- `npm run dev`: Start development server
- `npm run build`: Production build
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

### Project Structure
```
app/
  ├── layout.tsx    # Root layout with fonts
  ├── page.tsx      # Main page component
  └── globals.css   # Global styles
public/            # Static assets
```

## Dependencies and Integration Points
- React 19.2.0
- Next.js 16.0.1
- Tailwind CSS 4.x
- TypeScript for type safety
- ESLint with Next.js config

## Application Overview

### About
A modern brain training application designed to:
- Enhance memory retention
- Improve concentration
- Strengthen cognitive abilities
- Target users experiencing memory decline

### Design Theme
- Modern and futuristic minimalist interface
- Interactive and user-friendly design
- Black color scheme with neon accents
- Clean and sophisticated appearance

### Core Features

#### Memory Training
- Text and audio-based memory challenges
- Context-based question system
- Voice system integration for responses

#### Sentence Construction
- Context-based word arrangement exercises
- Active memory training through sentence building
- Progressive difficulty levels

#### Visual Memory Training
- Timed image display challenges
- Detail-oriented visual questionnaires
- Image-based memory exercises

#### Interactive Stories
- Short story comprehension
- Audio and text-based narratives
- Story-related memory questions
- Attention and retention testing
