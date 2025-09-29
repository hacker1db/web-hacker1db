import Fuse from 'fuse.js';
import { Post, SearchIndex, SearchResult } from '@/types/blog';

// Search configuration
const searchOptions: Fuse.IFuseOptions<SearchIndex> = {
  keys: [
    { name: 'title', weight: 0.3 },
    { name: 'content', weight: 0.2 },
    { name: 'excerpt', weight: 0.25 },
    { name: 'tags', weight: 0.15 },
    { name: 'category', weight: 0.1 },
  ],
  threshold: 0.4, // Lower threshold = more strict matching
  includeScore: true,
  includeMatches: true,
  minMatchCharLength: 2,
  findAllMatches: true,
};

let searchIndex: SearchIndex[] | null = null;
let fuseInstance: Fuse<SearchIndex> | null = null;

/**
 * Fetch search index from static JSON file
 */
async function fetchSearchIndex(): Promise<SearchIndex[]> {
  try {
    const response = await fetch('/search-index.json');
    if (!response.ok) {
      throw new Error('Failed to fetch search index');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching search index:', error);
    return [];
  }
}

/**
 * Initialize search index and Fuse instance
 */
export async function initializeSearch(): Promise<void> {
  if (searchIndex === null || fuseInstance === null) {
    searchIndex = await fetchSearchIndex();
    fuseInstance = new Fuse(searchIndex, searchOptions);
  }
}

/**
 * Perform search query
 */
export async function searchPosts(query: string): Promise<SearchResult[]> {
  if (!query.trim()) {
    return [];
  }
  
  await initializeSearch();
  
  if (!fuseInstance) {
    return [];
  }
  
  const results = fuseInstance.search(query);
  
  return results.map((result) => ({
    ...result.item,
    score: result.score,
  }));
}

/**
 * Get search suggestions based on popular terms
 */
export async function getSearchSuggestions(): Promise<string[]> {
  await initializeSearch();
  
  if (!searchIndex) {
    return [];
  }
  
  // Extract popular tags and categories
  const tags = new Set<string>();
  const categories = new Set<string>();
  
  searchIndex.forEach((item) => {
    item.tags.forEach((tag) => tags.add(tag));
    if (item.category) categories.add(item.category);
    if (item.series) categories.add(item.series);
  });
  
  // Return a mix of popular terms (deduplicated)
  const allTerms = [
    ...Array.from(categories).slice(0, 5),
    ...Array.from(tags).slice(0, 10),
  ];
  
  // Remove duplicates while preserving order
  return [...new Set(allTerms)];
}

/**
 * Highlight search terms in text
 */
export function highlightSearchTerms(text: string, query: string): string {
  if (!query.trim()) {
    return text;
  }
  
  const terms = query.split(' ').filter(term => term.length > 1);
  let highlightedText = text;
  
  terms.forEach((term) => {
    const regex = new RegExp(`(${term})`, 'gi');
    highlightedText = highlightedText.replace(
      regex,
      '<mark style="background-color: #6FC1FF; color: #1a1d21; padding: 0 2px; border-radius: 2px;">$1</mark>'
    );
  });
  
  return highlightedText;
}