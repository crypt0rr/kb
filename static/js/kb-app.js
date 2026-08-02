(() => {
  const body = document.body;
  const sidebarToggle = document.querySelector("[data-sidebar-toggle]");
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

  sidebarToggle?.addEventListener("click", () => {
    const isOpen = body.classList.toggle("sidebar-open");
    sidebarToggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("click", (event) => {
    if (!body.classList.contains("sidebar-open")) return;
    if (event.target.closest("#site-sidebar") || event.target.closest("[data-sidebar-toggle]")) return;
    body.classList.remove("sidebar-open");
    sidebarToggle?.setAttribute("aria-expanded", "false");
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
    if (!dialog) return;
    lastFocusedElement = document.activeElement;
    const params = new URLSearchParams(window.location.search);
    if (searchInput && params.has("q")) searchInput.value = params.get("q") ?? "";
    if (searchSection && params.has("section")) searchSection.value = params.get("section") ?? "";
    if (searchTag && params.has("tag")) searchTag.value = params.get("tag") ?? "";
    dialog.showModal();
    searchInput?.focus();
    await loadPagefind();
    const query = searchInput?.value.trim().toLowerCase() ?? "";
    if (query) runSearch(query);
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
      if (active?.tagName === "INPUT" || active?.tagName === "TEXTAREA") return;
      event.preventDefault();
      openSearch();
    }
  });

  searchInput?.addEventListener("input", () => {
    if (!searchResults) return;
    const query = searchInput.value.trim().toLowerCase();
    syncSearchUrl();
    clearTimeout(searchTimer);
    activeResultIndex = -1;

    if (!query) {
      searchResults.innerHTML = "";
      searchResults.setAttribute("aria-busy", "false");
      return;
    }

    searchTimer = setTimeout(() => runSearch(query), 180);
  });

  [searchSection, searchTag].forEach((filter) => {
    filter?.addEventListener("change", () => {
      syncSearchUrl();
      const query = searchInput?.value.trim().toLowerCase() ?? "";
      if (query) runSearch(query);
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

  async function runSearch(query) {
    const controller = new AbortController();
    searchController?.abort();
    searchController = controller;

    searchResults.innerHTML = '<p class="search-status" role="status">searching</p>';
    searchResults.setAttribute("aria-busy", "true");

    try {
      const index = await loadPagefind();
      const filters = {};
      if (searchSection?.value) filters.section = searchSection.value;
      if (searchTag?.value) filters.tag = searchTag.value;
      const search = await index.search(query, Object.keys(filters).length ? { filters } : undefined);
      if (controller.signal.aborted) return;

      const results = await Promise.all(search.results.slice(0, 12).map((result) => result.data()));
      if (controller.signal.aborted) return;

      if (!results.length) {
        searchResults.innerHTML = '<p class="search-status" role="status">no results</p>';
        return;
      }

      activeResultIndex = -1;
      searchResults.innerHTML = `<p class="search-status" role="status">${results.length} result${
        results.length === 1 ? "" : "s"
      }</p>${results
        .map(
          (result) => `<a href="${escapeAttr(result.url)}">
            <strong>${escapeHtml(result.meta?.title || result.url)}</strong>
            ${result.meta?.section ? `<small>${escapeHtml(result.meta.section)}</small>` : ""}
            <p>${sanitizePagefindExcerpt(result.excerpt || result.url)}</p>
          </a>`
        )
        .join("")}`;
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

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function escapeAttr(value) {
    return escapeHtml(value).replace(/'/g, "&#39;");
  }

  function sanitizePagefindExcerpt(value) {
    return escapeHtml(value)
      .replaceAll("&lt;mark&gt;", "<mark>")
      .replaceAll("&lt;/mark&gt;", "</mark>");
  }

  function updateActiveResult(resultLinks) {
    resultLinks.forEach((link, index) => {
      const active = index === activeResultIndex;
      link.classList.toggle("is-active", active);
      if (active) link.scrollIntoView({ block: "nearest" });
    });
  }
})();
