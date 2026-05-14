(() => {
  const body = document.body;
  const sidebarToggle = document.querySelector("[data-sidebar-toggle]");
  const dialog = document.querySelector("[data-search-dialog]");
  const searchOpeners = document.querySelectorAll("[data-search-open]");
  const searchInput = document.querySelector("[data-search-input]");
  const searchResults = document.querySelector("[data-search-results]");
  let searchData = [];

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
    if (!searchData.length) {
      const response = await fetch("/search.json");
      searchData = await response.json();
    }
    dialog.showModal();
    searchInput?.focus();
  };

  searchOpeners.forEach((button) => button.addEventListener("click", openSearch));

  document.addEventListener("keydown", (event) => {
    if (event.key === "/" && !event.metaKey && !event.ctrlKey && !event.altKey) {
      const active = document.activeElement;
      if (active?.tagName === "INPUT" || active?.tagName === "TEXTAREA") return;
      event.preventDefault();
      openSearch();
    }
  });

  searchInput?.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) {
      searchResults.innerHTML = "";
      return;
    }

    const terms = query.split(/\s+/);
    const matches = searchData
      .map((page) => {
        const haystack = `${page.title} ${page.description} ${page.tags.join(" ")} ${page.section}`.toLowerCase();
        const score = terms.reduce((sum, term) => sum + (haystack.includes(term) ? 1 : 0), 0);
        return { page, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score || a.page.title.localeCompare(b.page.title))
      .slice(0, 12);

    searchResults.innerHTML = matches
      .map(
        ({ page }) => `<a href="${page.url}">
          <strong>${escapeHtml(page.title)}</strong>
          <p>${escapeHtml(page.description || page.section || page.url)}</p>
        </a>`
      )
      .join("");
  });

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
})();
