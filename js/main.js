/* CaptionCraft UI wiring — vanilla ES module, no dependencies.
   Runs entirely in the browser: generation, hashtags, favourites and
   history all live in localStorage on this device only. */
import {
  CATEGORIES,
  TONES,
  PLATFORMS,
  HASHTAG_COUNTS,
  DEFAULT_CAPTION_COUNT,
  SAMPLE_KEYWORDS,
  generateCaptions,
  selectHashtags,
  buildCopySet,
  buildCopyAllSets,
  charInfo,
  searchCaptions,
  platformDefaultHashtags,
  loadFavourites,
  saveFavourites,
  toggleFavouriteList,
  isFavourite,
  loadSettings,
  saveSettings,
  loadHistory,
  saveHistory,
  addHistoryEntry,
  FAVOURITES_KEY,
  HISTORY_KEY,
  SETTINGS_KEY,
} from "./engine.js";

const $ = (id) => document.getElementById(id);

const storage = typeof localStorage !== "undefined" ? localStorage : null;

const state = {
  keyword: "",
  category: "travel",
  tone: "witty",
  platform: "instagram",
  hashtagCount: 20,
  search: "",
  seed: 1,
  captions: [], // [{ id, text, hashtags }]
  favourites: [],
  history: [],
};

function persistSettings() {
  if (!storage) return;
  saveSettings(storage, {
    category: state.category,
    tone: state.tone,
    platform: state.platform,
    hashtagCount: state.hashtagCount,
  });
}

function persistFavourites() {
  if (!storage) return;
  saveFavourites(storage, state.favourites);
}

function persistHistory() {
  if (!storage) return;
  saveHistory(storage, state.history);
}

async function copyText(text) {
  try {
    if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    return false;
  }
  return false;
}

function setStatus(message) {
  const el = $("copy-status");
  if (el) el.textContent = message;
}

function setActivePill(containerId, attr, value) {
  const container = $(containerId);
  if (!container) return;
  container.querySelectorAll(".pill").forEach((pill) => {
    pill.classList.toggle("active", pill.dataset[attr] === value);
    pill.setAttribute("aria-pressed", pill.dataset[attr] === value ? "true" : "false");
  });
}

function buildPills(containerId, items, attr, onPick) {
  const container = $(containerId);
  if (!container) return;
  container.innerHTML = "";
  for (const item of items) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "pill";
    btn.dataset[attr] = item.id;
    btn.textContent = item.label;
    btn.setAttribute("aria-pressed", "false");
    btn.addEventListener("click", () => onPick(item.id));
    container.appendChild(btn);
  }
}

function buildSampleChips() {
  const container = $("sample-chips");
  if (!container) return;
  container.innerHTML = "";
  for (const word of SAMPLE_KEYWORDS) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "sample-chip";
    btn.dataset.keyword = word;
    btn.textContent = word;
    btn.addEventListener("click", () => {
      setKeyword(word);
      generate();
    });
    container.appendChild(btn);
  }
}

function captionCard(entry, inFavourites) {
  const card = document.createElement("article");
  card.className = "caption-card";
  card.dataset.captionId = entry.id;

  const textEl = document.createElement("p");
  textEl.className = "caption-text";
  textEl.textContent = entry.text;
  card.appendChild(textEl);

  const info = charInfo(entry.text);
  const meta = document.createElement("p");
  meta.className = "caption-meta";
  meta.textContent = `${info.chars} characters · ${info.words} words`;
  if (info.overX) {
    const hint = document.createElement("span");
    hint.className = "length-hint";
    hint.textContent = " — over the 280-character X limit";
    meta.appendChild(hint);
  }
  if (info.overIG) {
    const hint = document.createElement("span");
    hint.className = "length-hint";
    hint.textContent = " — over the 2,200-character Instagram limit";
    meta.appendChild(hint);
  }
  card.appendChild(meta);

  const tags = document.createElement("p");
  tags.className = "caption-tags";
  tags.textContent = entry.hashtags.join(" ");
  card.appendChild(tags);

  const actions = document.createElement("div");
  actions.className = "card-actions";

  const copyCaptionBtn = document.createElement("button");
  copyCaptionBtn.type = "button";
  copyCaptionBtn.className = "copy-caption-btn";
  copyCaptionBtn.textContent = "Copy caption";
  copyCaptionBtn.addEventListener("click", () => copyCaption(entry.id));
  actions.appendChild(copyCaptionBtn);

  const copyTagsBtn = document.createElement("button");
  copyTagsBtn.type = "button";
  copyTagsBtn.className = "copy-hashtags-btn";
  copyTagsBtn.textContent = "Copy hashtags";
  copyTagsBtn.addEventListener("click", () => copyHashtags(entry.id));
  actions.appendChild(copyTagsBtn);

  const copySetBtn = document.createElement("button");
  copySetBtn.type = "button";
  copySetBtn.className = "copy-set-btn";
  copySetBtn.textContent = "Copy set";
  copySetBtn.addEventListener("click", () => copySet(entry.id));
  actions.appendChild(copySetBtn);

  const favBtn = document.createElement("button");
  favBtn.type = "button";
  favBtn.className = "fav-btn";
  const saved = isFavourite(state.favourites, entry.id);
  favBtn.classList.toggle("active", saved);
  favBtn.setAttribute("aria-pressed", saved ? "true" : "false");
  favBtn.textContent = saved ? "Saved" : "Save";
  favBtn.addEventListener("click", () => toggleFavourite(entry.id));
  actions.appendChild(favBtn);

  card.appendChild(actions);
  return card;
}

function visibleCaptions() {
  return searchCaptions(state.captions, state.search);
}

function render() {
  const list = $("captions-list");
  const countEl = $("captions-count");
  const noteEl = $("results-note");
  const visible = visibleCaptions();

  if (list) {
    list.innerHTML = "";
    for (const entry of visible) list.appendChild(captionCard(entry, false));
  }
  if (countEl) {
    countEl.textContent = state.search.trim()
      ? `${visible.length} of ${state.captions.length} captions`
      : `${state.captions.length} captions`;
  }
  if (noteEl) {
    noteEl.textContent = state.search.trim() && visible.length === 0
      ? `No captions match "${state.search.trim()}". Try another word.`
      : state.captions.length === 0
        ? "Pick a category and a tone, then press Generate."
        : "";
  }

  // Favourites.
  const favSection = $("favourites-section");
  const favList = $("favourites-list");
  const clearFavBtn = $("clear-favourites-btn");
  if (favSection && favList) {
    favList.innerHTML = "";
    for (const entry of state.favourites) favList.appendChild(captionCard(entry, true));
    favSection.hidden = state.favourites.length === 0;
  }
  if (clearFavBtn) clearFavBtn.hidden = state.favourites.length === 0;

  // History.
  const histSection = $("history-section");
  const histList = $("history-list");
  const clearHistBtn = $("clear-history-btn");
  if (histSection && histList) {
    histList.innerHTML = "";
    for (const entry of state.history) {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "history-item";
      btn.textContent = entry.text;
      btn.title = "Click to copy this caption";
      btn.addEventListener("click", async () => {
        if (await copyText(entry.text)) setStatus("Copied that caption to the clipboard.");
        else setStatus("Copy did not work in this browser — select the text manually.");
      });
      li.appendChild(btn);
      const meta = document.createElement("span");
      meta.className = "history-meta";
      const when = entry.at ? new Date(entry.at).toLocaleTimeString() : "";
      meta.textContent = [entry.category, entry.tone, when].filter(Boolean).join(" · ");
      li.appendChild(meta);
      histList.appendChild(li);
    }
    histSection.hidden = state.history.length === 0;
  }
  if (clearHistBtn) clearHistBtn.hidden = state.history.length === 0;

  setActivePill("category-pills", "category", state.category);
  setActivePill("tone-pills", "tone", state.tone);
  const platformSelect = $("platform-select");
  if (platformSelect) platformSelect.value = state.platform;
  const countSelect = $("hashtag-count");
  if (countSelect) countSelect.value = String(state.hashtagCount);
}

function runGeneration() {
  const captions = generateCaptions({
    category: state.category,
    tone: state.tone,
    keyword: state.keyword,
    count: DEFAULT_CAPTION_COUNT,
    seed: state.seed,
  });
  state.captions = captions.map((caption, i) => ({
    ...caption,
    hashtags: selectHashtags(state.category, state.hashtagCount, state.seed + i),
  }));
  if (state.captions.length > 0) {
    state.history = addHistoryEntry(state.history, {
      text: state.captions[0].text,
      category: state.category,
      tone: state.tone,
      at: Date.now(),
    });
    persistHistory();
  }
  render();
  return state.captions;
}

export function generate() {
  state.seed = (Date.now() % 2147483647) || 1;
  const captions = runGeneration();
  setStatus(`Generated ${captions.length} captions.`);
  return captions;
}

export function regenerate() {
  state.seed = (state.seed + 1) % 2147483647 || 1;
  const captions = runGeneration();
  setStatus(`Shuffled — ${captions.length} fresh captions.`);
  return captions;
}

export function setCategory(id) {
  const valid = CATEGORIES.some((c) => c.id === id);
  if (!valid) return state.category;
  state.category = id;
  persistSettings();
  runGeneration();
  return state.category;
}

export function setTone(id) {
  const valid = TONES.some((t) => t.id === id);
  if (!valid) return state.tone;
  state.tone = id;
  persistSettings();
  runGeneration();
  return state.tone;
}

export function setPlatform(id) {
  const valid = PLATFORMS.some((p) => p.id === id);
  if (!valid) return state.platform;
  state.platform = id;
  state.hashtagCount = platformDefaultHashtags(id);
  persistSettings();
  runGeneration();
  return state.platform;
}

export function setHashtagCount(count) {
  const n = Number(count);
  if (!HASHTAG_COUNTS.includes(n)) return state.hashtagCount;
  state.hashtagCount = n;
  persistSettings();
  runGeneration();
  return state.hashtagCount;
}

export function setKeyword(value) {
  state.keyword = typeof value === "string" ? value.trim() : "";
  const input = $("keyword-input");
  if (input) input.value = state.keyword;
  return state.keyword;
}

export function setSearch(value) {
  state.search = typeof value === "string" ? value : "";
  const input = $("search-input");
  if (input) input.value = state.search;
  render();
  return state.search;
}

function findCaption(id) {
  return state.captions.find((c) => c.id === id)
    || state.favourites.find((c) => c.id === id)
    || null;
}

export function toggleFavourite(id) {
  const entry = findCaption(id);
  if (!entry) return [...state.favourites];
  state.favourites = toggleFavouriteList(state.favourites, entry);
  persistFavourites();
  render();
  return [...state.favourites];
}

export async function copyCaption(id) {
  const entry = findCaption(id);
  if (!entry) return false;
  if (await copyText(entry.text)) {
    setStatus("Caption copied to the clipboard.");
    return true;
  }
  setStatus("Copy did not work in this browser — select the text manually.");
  return false;
}

export async function copyHashtags(id) {
  const entry = findCaption(id);
  if (!entry) return false;
  if (await copyText(entry.hashtags.join(" "))) {
    setStatus(`Copied ${entry.hashtags.length} hashtags to the clipboard.`);
    return true;
  }
  setStatus("Copy did not work in this browser — select the text manually.");
  return false;
}

export async function copySet(id) {
  const entry = findCaption(id);
  if (!entry) return false;
  if (await copyText(buildCopySet(entry.text, entry.hashtags))) {
    setStatus("Caption and hashtags copied together.");
    return true;
  }
  setStatus("Copy did not work in this browser — select the text manually.");
  return false;
}

export async function copyAllSets() {
  if (state.captions.length === 0) {
    setStatus("Nothing to copy yet — generate some captions first.");
    return false;
  }
  if (await copyText(buildCopyAllSets(state.captions))) {
    setStatus(`Copied all ${state.captions.length} caption sets to the clipboard.`);
    return true;
  }
  setStatus("Copy did not work in this browser — select the text manually.");
  return false;
}

export function clearFavourites() {
  state.favourites = [];
  persistFavourites();
  render();
  setStatus("Favourites cleared.");
  return [];
}

export function clearHistory() {
  state.history = [];
  persistHistory();
  render();
  setStatus("History cleared.");
  return [];
}

export function getState() {
  return {
    keyword: state.keyword,
    category: state.category,
    tone: state.tone,
    platform: state.platform,
    hashtagCount: state.hashtagCount,
    search: state.search,
    seed: state.seed,
    captions: state.captions.map((c) => ({ ...c, hashtags: [...c.hashtags] })),
    visibleCount: visibleCaptions().length,
    totalCount: state.captions.length,
    favourites: state.favourites.map((f) => ({ ...f, hashtags: [...f.hashtags] })),
    history: state.history.map((h) => ({ ...h })),
  };
}

function init() {
  const saved = storage ? loadSettings(storage) : null;
  if (saved) {
    state.category = saved.category;
    state.tone = saved.tone;
    state.platform = saved.platform;
    state.hashtagCount = saved.hashtagCount;
  }
  state.favourites = storage ? loadFavourites(storage) : [];
  state.history = storage ? loadHistory(storage) : [];

  buildPills("category-pills", CATEGORIES, "category", setCategory);
  buildPills("tone-pills", TONES, "tone", setTone);
  buildSampleChips();

  const platformSelect = $("platform-select");
  if (platformSelect) {
    platformSelect.innerHTML = "";
    for (const platform of PLATFORMS) {
      const option = document.createElement("option");
      option.value = platform.id;
      option.textContent = `${platform.label} (${platform.defaultHashtags} hashtags)`;
      platformSelect.appendChild(option);
    }
    platformSelect.value = state.platform;
    platformSelect.addEventListener("change", () => setPlatform(platformSelect.value));
  }

  const countSelect = $("hashtag-count");
  if (countSelect) {
    countSelect.innerHTML = "";
    for (const n of HASHTAG_COUNTS) {
      const option = document.createElement("option");
      option.value = String(n);
      option.textContent = `${n} hashtags`;
      countSelect.appendChild(option);
    }
    countSelect.value = String(state.hashtagCount);
    countSelect.addEventListener("change", () => setHashtagCount(countSelect.value));
  }

  const keywordInput = $("keyword-input");
  if (keywordInput) {
    keywordInput.addEventListener("input", () => { state.keyword = keywordInput.value; });
  }

  const searchInput = $("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", () => setSearch(searchInput.value));
  }

  const generateBtn = $("generate-btn");
  if (generateBtn) generateBtn.addEventListener("click", generate);

  const shuffleBtn = $("shuffle-btn");
  if (shuffleBtn) shuffleBtn.addEventListener("click", regenerate);

  const copyAllBtn = $("copy-all-btn");
  if (copyAllBtn) copyAllBtn.addEventListener("click", copyAllSets);

  const clearFavBtn = $("clear-favourites-btn");
  if (clearFavBtn) clearFavBtn.addEventListener("click", clearFavourites);

  const clearHistBtn = $("clear-history-btn");
  if (clearHistBtn) clearHistBtn.addEventListener("click", clearHistory);

  state.seed = 7;
  runGeneration();
}

if (typeof document !== "undefined") init();

export { FAVOURITES_KEY, HISTORY_KEY, SETTINGS_KEY };
