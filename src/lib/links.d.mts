import type { MarkdownIt } from "markdown-it";

export type RefPage = {
  url: string;
  slug?: string;
  relativeFile?: string;
  sourceDir?: string;
  title?: string;
};

export type RefIndex<T extends RefPage> = {
  pagesByUrl: Map<string, T>;
  refMap: Map<string, T[]>;
};

export type RefResolution<T extends RefPage> = {
  page: T | null;
  ambiguous: boolean;
  candidates: T[];
};

export function slugify(value: unknown): string;
export function withSlashes(value: string): string;
export function slash(value: unknown): string;
export function createMarkdown(): MarkdownIt;
export function replaceRefShortcodes(source: string, replace: (target: string) => string): string;
export function stripShortcodes(source: string): string;
export function refHref(target: string, page: Pick<RefPage, "url">): string;
export function collectAnchors<T extends RefPage>(
  source: string,
  options?: { page?: Partial<RefPage> | null; refIndex?: RefIndex<T> }
): Set<string>;
export function buildRefMap<T extends RefPage>(pages: Iterable<T>): Map<string, T[]>;
export function createRefIndex<T extends RefPage>(pages: Iterable<T>): RefIndex<T>;
export function resolveRef<T extends RefPage>(
  target: string,
  page: Partial<RefPage> | null | undefined,
  index: RefIndex<T>
): RefResolution<T>;
export function comparePages(
  a: { title?: unknown; url?: unknown },
  b: { title?: unknown; url?: unknown }
): number;
