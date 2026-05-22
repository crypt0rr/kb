(() => {
  const body = document.body;
  const sidebarToggle = document.querySelector("[data-sidebar-toggle]");
  const dialog = document.querySelector("[data-search-dialog]");
  const searchOpeners = document.querySelectorAll("[data-search-open]");
  const searchInput = document.querySelector("[data-search-input]");
  const searchResults = document.querySelector("[data-search-results]");
  let pagefind = null;
  let searchController = null;

  sidebarToggle?.addEventListener("click", () => {
    body.classList.toggle("sidebar-open");
  });

  document.addEventListener("click", (event) => {
    if (!body.classList.contains("sidebar-open")) return;
    if (event.target.closest("#site-sidebar") || event.target.closest("[data-sidebar-toggle]")) return;
    body.classList.remove("sidebar-open");
  });

  document.querySelectorAll("pre").forEach((block) => {
    const code = block.querySelector("code");
    if (!code) return;

    const button = document.createElement("button");
    button.className = "copy-code";
    button.type = "button";
    button.textContent = "copy";
    button.addEventListener("click", async () => {
      await navigator.clipboard.writeText(code.innerText);
      button.textContent = "copied";
      setTimeout(() => {
        button.textContent = "copy";
      }, 1200);
    });
    block.append(button);
  });

  const openSearch = async () => {
    if (!dialog) return;
    dialog.showModal();
    searchInput?.focus();
    await loadPagefind();
  };

  searchOpeners.forEach((button) => button.addEventListener("click", openSearch));

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
    if (!query) {
      searchResults.innerHTML = "";
      return;
    }

    runSearch(query);
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

    searchResults.innerHTML = '<p class="search-status">searching</p>';

    try {
      const index = await loadPagefind();
      const search = await index.search(query);
      if (controller.signal.aborted) return;

      const results = await Promise.all(search.results.slice(0, 12).map((result) => result.data()));
      if (controller.signal.aborted) return;

      if (!results.length) {
        searchResults.innerHTML = '<p class="search-status">no results</p>';
        return;
      }

      searchResults.innerHTML = results
        .map(
          (result) => `<a href="${escapeAttr(result.url)}">
            <strong>${escapeHtml(result.meta?.title || result.url)}</strong>
            <p>${sanitizePagefindExcerpt(result.excerpt || result.url)}</p>
          </a>`
        )
        .join("");
    } catch {
      if (controller.signal.aborted) return;
      searchResults.innerHTML = '<p class="search-status">search unavailable</p>';
    }
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
})();
