export function parseFrontmatter(
  source: string,
  file?: string
): {
  data: Record<string, unknown>;
  content: string;
};
