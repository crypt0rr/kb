import { MAX_RESULTS, buildSearchRequest, renderSearchResults, resolveTagOption } from "./kb-search.js";

(() => {
  const body = document.body;
  const sidebar = document.querySelector("#site-sidebar");
  const sidebarToggle = document.querySelector("[data-sidebar-toggle]");
  const mobileSidebarQuery = window.matchMedia("(max-width: 940px)");
  const dialog = document.querySelector("[data-search-dialog]");
  const searchOpeners = document.querySelectorAll("[data-search-open]");
  const searchInput = document.querySelector("[data-search-input]");
  const searchResults = document.querySelector("[data-search-results]");
  const searchSection = document.querySelector("[data-search-section]");
  const searchTag = document.querySelector("[data-search-tag]");
  let pagefind = null;
  let searchController = null;
  let searchTimer = null;
  let activeResultIndex = -1;
  let lastFocusedElement = null;

  const syncSidebarAccessibility = (isOpen = body.classList.contains("sidebar-open")) => {
    if (!sidebar) return;

    if (!mobileSidebarQuery.matches) {
      sidebar.removeAttribute("aria-hidden");
      sidebar.removeAttribute("inert");
      return;
    }

    sidebar.setAttribute("aria-hidden", String(!isOpen));
    if (isOpen) sidebar.removeAttribute("inert");
    else sidebar.setAttribute("inert", "");
  };

  sidebarToggle?.addEventListener("click", () => {
    const isOpen = body.classList.toggle("sidebar-open");
    sidebarToggle.setAttribute("aria-expanded", String(isOpen));
    syncSidebarAccessibility(isOpen);
  });

  syncSidebarAccessibility();
  mobileSidebarQuery.addEventListener?.("change", () => {
    body.classList.remove("sidebar-open");
    sidebarToggle?.setAttribute("aria-expanded", "false");
    syncSidebarAccessibility(false);
  });

  document.addEventListener("click", (event) => {
    if (!body.classList.contains("sidebar-open")) return;
    if (event.target.closest("#site-sidebar") || event.target.closest("[data-sidebar-toggle]")) return;
    body.classList.remove("sidebar-open");
    sidebarToggle?.setAttribute("aria-expanded", "false");
    syncSidebarAccessibility(false);
  });

  document.querySelectorAll("pre").forEach((block) => {
    const code = block.querySelector("code");
    if (!code) return;

    const button = document.createElement("button");
    button.className = "copy-code";
    button.type = "button";
    button.setAttribute("aria-label", "Copy code to clipboard");
    button.textContent = "copy";
    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(code.innerText);
        button.textContent = "copied";
        button.setAttribute("aria-label", "Code copied to clipboard");
      } catch {
        button.textContent = "copy failed";
        button.setAttribute("aria-label", "Copy failed");
      }
      setTimeout(() => {
        button.textContent = "copy";
        button.setAttribute("aria-label", "Copy code to clipboard");
      }, 1200);
    });
    block.append(button);
  });

  const openSearch = async () => {
    if (!dialog || dialog.open) return;
    lastFocusedElement = document.activeElement;
    const params = new URLSearchParams(window.location.search);
    if (searchInput && params.has("q")) searchInput.value = params.get("q") ?? "";
    if (searchSection && params.has("section")) searchSection.value = params.get("section") ?? "";
    if (searchTag && params.has("tag")) {
      const options = [...searchTag.options].map((option) => ({ value: option.value, slug: option.dataset.slug }));
      searchTag.value = resolveTagOption(options, params.get("tag"));
    }
    // Rewrite the URL to the applied values, so a tag slug becomes its label and
    // an unknown filter value is dropped rather than left in the address.
    syncSearchUrl();
    dialog.showModal();
    searchInput?.focus();
    await loadPagefind();
    const request = currentSearchRequest();
    if (request) runSearch(request);
  };

  searchOpeners.forEach((button) => button.addEventListener("click", openSearch));

  dialog?.addEventListener("close", () => {
    lastFocusedElement?.focus?.();
    lastFocusedElement = null;
    activeResultIndex = -1;
  });

  const counters = document.querySelectorAll("[data-count]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const animateCounter = (counter, index = 0) => {
    const target = Number(counter.dataset.count ?? counter.textContent);
    if (!Number.isFinite(target)) return;
    if (counter.dataset.counted === "true") return;
    counter.dataset.counted = "true";

    if (reduceMotion) {
      counter.textContent = target.toLocaleString();
      return;
    }

    const duration = 900 + Math.min(target, 600) * 0.7;
    const delay = index * 90;
    const startTime = performance.now() + delay;
    counter.textContent = "0";
    counter.classList.add("is-counting");

    const tick = (now) => {
      const elapsed = Math.max(0, now - startTime);
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      counter.textContent = value.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(tick);
        return;
      }

      counter.classList.remove("is-counting");
      counter.classList.add("is-counted");
    };

    requestAnimationFrame(tick);
  };

  if (counters.length) {
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const index = [...counters].indexOf(entry.target);
            animateCounter(entry.target, index);
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.45 }
      );

      counters.forEach((counter) => observer.observe(counter));
    } else {
      counters.forEach(animateCounter);
    }
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "/" && !event.metaKey && !event.ctrlKey && !event.altKey) {
      const active = document.activeElement;
      if (active?.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(active?.tagName)) return;
      event.preventDefault();
      // Inside the open dialog, only move focus back to the query so the opener stays the focus return target.
      if (dialog?.open) searchInput?.focus();
      else openSearch();
    }
  });

  searchInput?.addEventListener("input", () => {
    if (!searchResults) return;
    const request = currentSearchRequest();
    syncSearchUrl();
    clearTimeout(searchTimer);
    activeResultIndex = -1;

    if (!request) {
      clearSearch();
      return;
    }

    searchTimer = setTimeout(() => runSearch(request), 180);
  });

  [searchSection, searchTag].forEach((filter) => {
    filter?.addEventListener("change", () => {
      if (!searchResults) return;
      syncSearchUrl();
      clearTimeout(searchTimer);
      const request = currentSearchRequest();
      if (request) runSearch(request);
      else clearSearch();
    });
  });

  const initialSearchParams = new URLSearchParams(window.location.search);
  if (initialSearchParams.has("q") || initialSearchParams.has("section") || initialSearchParams.has("tag")) {
    openSearch();
  }

  searchInput?.addEventListener("keydown", (event) => {
    const resultLinks = [...searchResults.querySelectorAll("a")];
    if (!resultLinks.length && event.key !== "Escape") return;

    if (event.key === "Escape") {
      dialog?.close();
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      activeResultIndex = Math.min(activeResultIndex + 1, resultLinks.length - 1);
      updateActiveResult(resultLinks);
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      activeResultIndex = Math.max(activeResultIndex - 1, 0);
      updateActiveResult(resultLinks);
    }

    if (event.key === "Enter" && activeResultIndex >= 0) {
      event.preventDefault();
      resultLinks[activeResultIndex].click();
    }
  });

  searchResults?.addEventListener("click", (event) => {
    if (!event.target.closest("a")) return;
    dialog?.close();
  });

  async function loadPagefind() {
    if (pagefind) return pagefind;
    if (searchResults) {
      searchResults.innerHTML = '<p class="search-status">loading index</p>';
    }
    pagefind = await import("/pagefind/pagefind.js");
    if (searchResults?.querySelector(".search-status")) {
      searchResults.innerHTML = "";
    }
    return pagefind;
  }

  function currentSearchRequest() {
    return buildSearchRequest({
      query: searchInput?.value,
      section: searchSection?.value,
      tag: searchTag?.value
    });
  }

  function clearSearch() {
    // Drop any search still in flight so it cannot repaint the cleared results.
    searchController?.abort();
    searchController = null;
    activeResultIndex = -1;
    searchResults.innerHTML = "";
    searchResults.setAttribute("aria-busy", "false");
  }

  async function runSearch({ term, options }) {
    const controller = new AbortController();
    searchController?.abort();
    searchController = controller;

    searchResults.innerHTML = '<p class="search-status" role="status">searching</p>';
    searchResults.setAttribute("aria-busy", "true");

    try {
      const index = await loadPagefind();
      // A null term with filters is a filter-only search that lists every matching page.
      const search = await index.search(term, options);
      if (controller.signal.aborted) return;

      const results = await Promise.all(search.results.slice(0, MAX_RESULTS).map((result) => result.data()));
      if (controller.signal.aborted) return;

      activeResultIndex = -1;
      searchResults.innerHTML = renderSearchResults(results, search.results.length);
    } catch {
      if (controller.signal.aborted) return;
      searchResults.innerHTML = '<p class="search-status" role="status">search unavailable</p>';
    } finally {
      if (!controller.signal.aborted) searchResults.setAttribute("aria-busy", "false");
    }
  }

  function syncSearchUrl() {
    const url = new URL(window.location.href);
    const values = {
      q: searchInput?.value.trim() ?? "",
      section: searchSection?.value ?? "",
      tag: searchTag?.value ?? ""
    };

    Object.entries(values).forEach(([key, value]) => {
      if (value) url.searchParams.set(key, value);
      else url.searchParams.delete(key);
    });
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
  }

  function updateActiveResult(resultLinks) {
    resultLinks.forEach((link, index) => {
      const active = index === activeResultIndex;
      link.classList.toggle("is-active", active);
      if (active) link.scrollIntoView({ block: "nearest" });
    });
  }
})();
