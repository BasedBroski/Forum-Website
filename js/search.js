const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const clearFiltersButton = document.getElementById("clearFiltersButton");
const contentTypeFilter = document.getElementById("contentTypeFilter");
const categoryFilter = document.getElementById("categoryFilter");
const sortFilter = document.getElementById("sortFilter");
const searchMessage = document.getElementById("searchMessage");
const videoGrid = document.getElementById("videoGrid");
const videosSection = document.getElementById("videosSection");
const imagesSection = document.getElementById("imagesSection");
const soyjakMessage = document.getElementById("soyjakMessage");
const soyjakGrid = document.getElementById("soyjakGrid");
const imagePreviewModalEl = document.getElementById("imagePreviewModal");
const imagePreviewTitle = document.getElementById("imagePreviewTitle");
const imagePreviewImg = document.getElementById("imagePreviewImg");
let imagePreviewModal = null;

const fallbackVideos = typeof forumVideos !== "undefined" && Array.isArray(forumVideos) ? forumVideos : [];
let allVideos = Array.isArray(window.forumVideos) ? [...window.forumVideos] : [...fallbackVideos];

init();

function init() {
  populateFilterOptions(allVideos);
  updateAllResults();

  searchButton?.addEventListener("click", () => {
    updateAllResults();
  });

  clearFiltersButton?.addEventListener("click", resetFilters);

  searchInput?.addEventListener("input", () => {
    updateAllResults();
  });

  [contentTypeFilter, categoryFilter, sortFilter].forEach(filter => {
    filter?.addEventListener("change", () => {
      updateAllResults();
    });
  });

  searchInput?.addEventListener("keypress", event => {
    if (event.key === "Enter") {
      event.preventDefault();
      updateAllResults();
    }
  });

  soyjakGrid?.addEventListener("click", event => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    const img = target.closest("img.previewable-image");
    if (!(img instanceof HTMLImageElement)) return;

    const modal = getImagePreviewModal();
    if (!modal) return;

    const src = img.dataset.fullsrc || img.src;
    const title = img.dataset.title || img.alt || "Soyjak Preview";

    if (imagePreviewTitle) imagePreviewTitle.textContent = title;
    if (imagePreviewImg) {
      imagePreviewImg.src = src;
      imagePreviewImg.alt = title;
    }

    modal.show();
  });
}

function getImagePreviewModal() {
  if (!imagePreviewModalEl) return null;
  if (!window.bootstrap) return null;
  if (!imagePreviewModal) {
    imagePreviewModal = new window.bootstrap.Modal(imagePreviewModalEl);
  }
  return imagePreviewModal;
}

function updateAllResults() {
  const query = searchInput?.value.trim() || "";
  const mode = contentTypeFilter?.value || "all";

  renderResults(applyFilters(query), mode);
  renderSoyjakResults(query, mode);
  updateVisibility(mode);

  if (!query) {
    searchMessage.textContent = "Start typing to search videos and images.";
    return;
  }

  const videoCount = videoGrid ? videoGrid.childElementCount : 0;
  const imageCount = soyjakGrid ? soyjakGrid.childElementCount : 0;

  if (mode === "videos") {
    searchMessage.textContent = `Found ${videoCount} video${videoCount === 1 ? "" : "s"}.`;
  } else if (mode === "images") {
    searchMessage.textContent = `Found ${imageCount} image${imageCount === 1 ? "" : "s"}.`;
  } else {
    searchMessage.textContent = `Found ${videoCount} video${videoCount === 1 ? "" : "s"} and ${imageCount} image${imageCount === 1 ? "" : "s"}.`;
  }
}

function updateVisibility(mode) {
  if (videosSection) videosSection.classList.toggle("d-none", mode === "images");
  if (imagesSection) imagesSection.classList.toggle("d-none", mode === "videos");
}

function populateFilterOptions(videos) {
  const categories = uniqueValues(videos.map(video => video.category));

  appendSelectOptions(categoryFilter, categories, "All Categories");
}

function uniqueValues(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

function appendSelectOptions(select, options, allLabel) {
  if (!select) return;

  select.innerHTML = `<option value="all">${allLabel}</option>`;
  options.forEach(option => {
    const el = document.createElement("option");
    el.value = String(option).toLowerCase();
    el.textContent = option;
    select.appendChild(el);
  });
}

function applyFilters(queryText = "") {
  const query = String(queryText).trim().toLowerCase();

  if (!query) {
    return [];
  }

  const category = categoryFilter?.value || "all";
  const sortBy = sortFilter?.value || "newest";

  let results = allVideos.filter(video => {
    if (category !== "all" && String(video.category || "").toLowerCase() !== category) return false;

    const haystack = [
      video.title,
      video.description,
      video.board,
      video.category,
      ...(Array.isArray(video.tags) ? video.tags : [])
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
  });

  results = sortVideos(results, sortBy);
  return results;
}

function sortVideos(videos, sortBy) {
  const cloned = [...videos];

  switch (sortBy) {
    case "title-asc":
      return cloned.sort((a, b) => String(a.title).localeCompare(String(b.title)));
    case "title-desc":
      return cloned.sort((a, b) => String(b.title).localeCompare(String(a.title)));
    case "oldest":
      return cloned.sort((a, b) => new Date(a.date || 0) - new Date(b.date || 0));
    case "newest":
    default:
      return cloned.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  }
}

function renderResults(videos) {
  if (!videoGrid || !searchMessage) return;

  videoGrid.innerHTML = "";

  if (!videos.length) {
    return;
  }

  videos.forEach(video => {
    const col = document.createElement("div");
    col.className = "col-lg-4 col-md-6 col-sm-12";

    const thumb = buildThumbnailUrl(video);
    const thumbMarkup = thumb
      ? `<img src="${escapeHtml(thumb)}" class="card-img-top" alt="${escapeHtml(video.title || "Video thumbnail")}">`
      : `<div class="card-img-top d-flex align-items-center justify-content-center text-muted" style="height:180px;background:#f3f3f3;">Thumbnail unavailable</div>`;

    col.innerHTML = `
      <article class="card h-100 shadow-sm">
        <a href="${escapeHtml(video.url || "#")}" target="_blank" rel="noopener noreferrer">
          ${thumbMarkup}
        </a>
        <div class="card-body">
          <h5 class="card-title">${escapeHtml(video.title || "Untitled Video")}</h5>
          <p class="card-text text-muted">${escapeHtml(video.description || "No description yet.")}</p>
          <p class="mb-1"><strong>Board:</strong> ${escapeHtml(video.board || "General")}</p>
          <p class="mb-1"><strong>Category:</strong> ${escapeHtml(video.category || "General")}</p>
          <p class="mb-0"><strong>Tags:</strong> ${escapeHtml((video.tags || []).join(", ") || "none")}</p>
        </div>
        <div class="card-footer bg-white d-flex justify-content-between align-items-center">
          <small class="text-muted">${escapeHtml(video.duration || "N/A")}</small>
          <span class="badge bg-secondary">YOUTUBE</span>
        </div>
      </article>
    `;

    videoGrid.appendChild(col);
  });
}

function buildThumbnailUrl(video) {
  if (video.videoId) {
    return `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`;
  }
  return null;
}

function resetFilters() {
  if (searchInput) searchInput.value = "";
  if (contentTypeFilter) contentTypeFilter.value = "all";
  if (categoryFilter) categoryFilter.value = "all";
  if (sortFilter) sortFilter.value = "newest";

  updateAllResults();
}

function renderSoyjakResults(queryText, mode = "all") {
  if (!soyjakGrid || !soyjakMessage) return;

  const query = String(queryText || "").trim().toLowerCase();
  soyjakGrid.innerHTML = "";

  if (!query) {
    soyjakMessage.textContent = mode === "videos" ? "Image search hidden while Videos-only mode is active." : "Type in Search above to find soyjak names.";
    return;
  }

  const mappedSoyjaks = getSoyjakImageEntries();
  const matches = mappedSoyjaks.filter(item => item.name.toLowerCase().includes(query));

  if (!matches.length) {
    soyjakMessage.textContent = "No matching soyjak names found.";
    return;
  }

  soyjakMessage.textContent = `Found ${matches.length} soyjak ${matches.length === 1 ? "match" : "matches"}.`;
  matches.forEach(item => {
    const col = document.createElement("div");
    col.className = "col-lg-3 col-md-4 col-sm-6";
    col.innerHTML = `
      <article class="card h-100 shadow-sm">
        <img
          src="${escapeHtml(item.image)}"
          alt="${escapeHtml(item.name)}"
          data-fullsrc="${escapeHtml(item.image)}"
          data-title="${escapeHtml(item.name)}"
          class="card-img-top previewable-image"
          style="height:180px;object-fit:contain;background:#f8f8f8;"
          onerror="this.src='https://via.placeholder.com/320x180?text=Missing+Image'"
        >
        <div class="card-body py-2">
          <p class="mb-0 fw-semibold text-center">${escapeHtml(item.name)}</p>
        </div>
      </article>
    `;
    soyjakGrid.appendChild(col);
  });
}

function getSoyjakImageEntries() {
  if (Array.isArray(window.soyjakImageData)) {
    return window.soyjakImageData
      .map(item => ({
        name: String(item.name || ""),
        image: String(item.image || "")
      }))
      .filter(item => item.name);
  }

  return (Array.isArray(jsArrayData) ? jsArrayData : []).map(name => ({
    name: String(name),
    image: `../images/${String(name)}.png`
  }));
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
