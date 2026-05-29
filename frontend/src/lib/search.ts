import { tools } from './tools';
export const searchTools = (q: string) => {
  const n = q.toLowerCase().trim();
  if (!n) return tools;
  return tools.filter((t) => [t.slug, ...t.tags, ...t.searchTerms, t.fa.title, t.en.title].join(' ').toLowerCase().includes(n));
};
