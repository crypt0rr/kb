import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import c from "highlight.js/lib/languages/c";
import cpp from "highlight.js/lib/languages/cpp";
import diff from "highlight.js/lib/languages/diff";
import dos from "highlight.js/lib/languages/dos";
import ini from "highlight.js/lib/languages/ini";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import powershell from "highlight.js/lib/languages/powershell";
import python from "highlight.js/lib/languages/python";
import shell from "highlight.js/lib/languages/shell";
import sql from "highlight.js/lib/languages/sql";
import xml from "highlight.js/lib/languages/xml";
import yaml from "highlight.js/lib/languages/yaml";

/**
 * Build-time syntax highlighting for fenced code blocks.
 *
 * Only explicitly labelled fences are highlighted; the language is never
 * auto-detected, so `plain` and unknown labels render exactly as before. The
 * output is class-based (`hljs-*` spans styled by global.css) because inline
 * style attributes are blocked by the site's `style-src 'self'` policy.
 */

// highlight.js ships the aliases the content relies on (cmd -> dos, html ->
// xml, sh -> bash, ps1 -> powershell, yml -> yaml, ...).
const languages = {
  bash,
  c,
  cpp,
  diff,
  dos,
  ini,
  javascript,
  json,
  powershell,
  python,
  shell,
  sql,
  xml,
  yaml
};

for (const [name, language] of Object.entries(languages)) {
  hljs.registerLanguage(name, language);
}
hljs.registerAliases(["batch"], { languageName: "dos" });

/**
 * Resolve a fence label to a registered language or alias, case-insensitively.
 * Returns null for unlabelled, `plain` and unknown fences.
 */
export function highlightLanguage(label) {
  const key = String(label ?? "").trim().toLowerCase();
  return key && hljs.getLanguage(key) ? key : null;
}

/**
 * markdown-it `highlight` callback: highlighted, escaped HTML for a known
 * language, or "" so markdown-it falls back to its default escaping.
 */
export function highlightCode(code, label) {
  const language = highlightLanguage(label);
  if (!language) return "";
  return hljs.highlight(code, { language, ignoreIllegals: true }).value;
}
