import {
  differenceInDays,
  normalizeDate,
  subtractMonths
} from "./date.mjs";

export const DEFAULT_STALE_MONTHS = 12;

export const HEALTH_STATES = Object.freeze([
  "repair-needed",
  "review-due",
  "context-light",
  "verified"
]);

export const HEALTH_LABELS = Object.freeze({
  "repair-needed": "Repair needed",
  "review-due": "Review due",
  "context-light": "Context light",
  verified: "Verified"
});

export const HEALTH_DESCRIPTIONS = Object.freeze({
  "repair-needed": "Metadata, link, anchor, or asset findings need repair.",
  "review-due": "The page is missing a review date or its review date is outside the policy.",
  "context-light": "The page has no explicit page references; hierarchy and shared tags remain available.",
  verified: "The page is reviewed within policy and has no integrity findings."
});

const HEALTH_PRIORITY = Object.freeze({
  "repair-needed": 0,
  "review-due": 1,
  "context-light": 2,
  verified: 3
});

const collator = new Intl.Collator("en", { sensitivity: "base", numeric: true });

export function classifyReviewSignal(
  page,
  { asOf = currentUtcDate(), staleBefore, staleMonths = DEFAULT_STALE_MONTHS } = {}
) {
  const normalizedAsOf = normalizeDate(asOf);
  if (!normalizedAsOf) {
    throw new Error("Review dates must use valid YYYY-MM-DD values");
  }
  if (!Number.isInteger(staleMonths) || staleMonths < 1) {
    throw new Error("stale months must be a positive integer");
  }
  const normalizedStaleBefore = normalizeDate(
    staleBefore ?? subtractMonths(normalizedAsOf, staleMonths)
  );
  if (!normalizedStaleBefore) {
    throw new Error("Review dates must use valid YYYY-MM-DD values");
  }

  const date = normalizeDate(page.date);
  const lastReviewed = normalizeDate(page.lastReviewed);
  const effectiveDate = lastReviewed ?? date ?? null;
  const missingReview = !lastReviewed;
  const stale = Boolean(effectiveDate && effectiveDate < normalizedStaleBefore);
  const futureDate = Boolean(effectiveDate && effectiveDate > normalizedAsOf);

  return {
    asOf: normalizedAsOf,
    staleBefore: normalizedStaleBefore,
    date,
    lastReviewed,
    effectiveDate,
    ageDays: effectiveDate ? differenceInDays(normalizedAsOf, effectiveDate) : null,
    missingReview,
    stale,
    futureDate,
    needsReview: missingReview || stale,
    reasons: [
      missingReview ? "missing-lastReviewed" : null,
      stale ? "stale" : null,
      futureDate ? "future-date" : null
    ].filter(Boolean)
  };
}

export function assessPageHealth(
  page,
  {
    review = classifyReviewSignal(page),
    graph = {},
    linkFindings = {}
  } = {}
) {
  const metadataErrors = Array.isArray(page.metadataErrors) ? page.metadataErrors : [];
  const incoming = numberOrZero(graph.incoming);
  const outgoing = numberOrZero(graph.outgoing);
  const findings = normalizeLinkFindings(linkFindings);
  const reasons = [...review.reasons];

  if (metadataErrors.length) reasons.push("metadata-error");
  if (findings.brokenLinks) reasons.push("missing-link-target");
  if (findings.missingAnchors) reasons.push("missing-anchor");
  if (findings.brokenAssets) reasons.push("missing-asset-target");
  if (review.futureDate) reasons.push("future-date");

  let state;
  if (
    metadataErrors.length ||
    findings.brokenLinks ||
    findings.missingAnchors ||
    findings.brokenAssets ||
    review.futureDate
  ) {
    state = "repair-needed";
  } else if (review.missingReview || review.stale) {
    state = "review-due";
  } else if (!incoming && !outgoing) {
    state = "context-light";
    reasons.push("context-light");
  } else {
    state = "verified";
  }

  return {
    state,
    label: HEALTH_LABELS[state],
    description: HEALTH_DESCRIPTIONS[state],
    reasons: [...new Set(reasons)],
    metadataErrors,
    review,
    graph: { incoming, outgoing, explicitlyIsolated: !incoming && !outgoing },
    links: findings,
    priorityScore: Number(page.priorityScore ?? 0),
    priorityTier: page.priorityTier ?? state
  };
}

export function normalizeLinkFindings(findings = {}) {
  return {
    brokenLinks: numberOrZero(findings.brokenLinks),
    missingAnchors: numberOrZero(findings.missingAnchors),
    brokenAssets: numberOrZero(findings.brokenAssets),
    externalLinks: numberOrZero(findings.externalLinks),
    protocolLinks: numberOrZero(findings.protocolLinks)
  };
}

export function createHealthSummary(pages) {
  const summary = {
    totalPages: pages.length,
    verified: 0,
    reviewDue: 0,
    repairNeeded: 0,
    contextLight: 0,
    brokenLinks: 0,
    missingAnchors: 0,
    brokenAssets: 0,
    externalLinks: 0,
    protocolLinks: 0,
    metadataErrors: 0,
    futureDates: 0,
    missingLastReviewed: 0,
    stale: 0,
    reviewed: 0
  };

  for (const page of pages) {
    if (page.state === "verified") summary.verified += 1;
    if (page.state === "review-due") summary.reviewDue += 1;
    if (page.state === "repair-needed") summary.repairNeeded += 1;
    if (page.state === "context-light") summary.contextLight += 1;
    summary.brokenLinks += page.links.brokenLinks;
    summary.missingAnchors += page.links.missingAnchors;
    summary.brokenAssets += page.links.brokenAssets;
    summary.externalLinks += page.links.externalLinks;
    summary.protocolLinks += page.links.protocolLinks;
    summary.metadataErrors += page.metadataErrors.length;
    if (page.review.futureDate) summary.futureDates += 1;
    if (page.review.missingReview) summary.missingLastReviewed += 1;
    if (page.review.stale) summary.stale += 1;
    if (page.review.lastReviewed) summary.reviewed += 1;
  }

  return summary;
}

export function compareHealthPages(a, b) {
  return (
    (HEALTH_PRIORITY[a.state] ?? 99) - (HEALTH_PRIORITY[b.state] ?? 99) ||
    (b.priorityScore ?? 0) - (a.priorityScore ?? 0) ||
    (a.review.effectiveDate ?? "9999-12-31").localeCompare(
      b.review.effectiveDate ?? "9999-12-31"
    ) ||
    collator.compare(a.title, b.title) ||
    collator.compare(a.url, b.url)
  );
}

function numberOrZero(value) {
  const number = Number(value);
  return Number.isFinite(number) ? Math.max(0, number) : 0;
}

function currentUtcDate() {
  return new Date().toISOString().slice(0, 10);
}
