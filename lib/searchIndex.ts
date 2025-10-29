// Central search index for the app. Add or remove entries here to expand search.
export type SearchItem = { title: string; href: string; keywords?: string[] };

const SEARCH_INDEX: SearchItem[] = [
  { title: 'Memory Training', href: '/features/memory-training', keywords: ['memory', 'recall', 'sequence'] },
  { title: 'Memory - Numbers', href: '/features/memory-training/numbers', keywords: ['numbers', 'digits'] },
  { title: 'Memory - Words', href: '/features/memory-training/words', keywords: ['words', 'vocab'] },
  { title: 'Sentence Builder', href: '/features/sentence-builder', keywords: ['sentence', 'grammar'] },
  { title: 'Sentence - Beginner', href: '/features/sentence-builder/beginner', keywords: ['beginner', 'easy'] },
  { title: 'Sentence - Advanced', href: '/features/sentence-builder/advanced', keywords: ['advanced', 'hard'] },
  { title: 'Visual Memory', href: '/features/visual-memory', keywords: ['visual', 'image', 'pattern'] },
  { title: 'Visual - Spot the Difference', href: '/features/visual-memory/spot-diff', keywords: ['difference', 'spot'] },
  { title: 'Story Time', href: '/features/story-time', keywords: ['story', 'comprehension'] },
  { title: 'Story - Short Tales', href: '/features/story-time/short-tales', keywords: ['short', 'tales'] },
];

export default SEARCH_INDEX;
