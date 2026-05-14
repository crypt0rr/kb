import type { APIRoute } from "astro";
import { getPages } from "@lib/content";

export const GET: APIRoute = () => {
  const pages = getPages().map((page) => ({
    title: page.title,
    description: page.description,
    url: page.url,
    tags: page.tags,
    section: page.section
  }));

  return new Response(JSON.stringify(pages), {
    headers: {
      "content-type": "application/json; charset=utf-8"
    }
  });
};
