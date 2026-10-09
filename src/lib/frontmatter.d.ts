export function parseFrontmatter(
  source: string,
  file?: string
): {
  data: Record<string, unknown>;
  content: string;
};

export const frontmatterYamlOptions: Readonly<{ merge: boolean; prettyErrors: boolean }>;

export function locateFrontmatter(
  source: string,
  file?: string
):
  | { hasFrontmatter: false; bom: string; source: string }
  | {
      hasFrontmatter: true;
      bom: string;
      source: string;
      eol: "\n" | "\r\n";
      start: number;
      end: number;
      closingEnd: number;
    };
