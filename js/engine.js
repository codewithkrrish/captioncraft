/* CaptionCraft engine — pure, dependency-free caption + hashtag logic.
   Everything here is a curated template library: no network calls, no
   accounts, nothing leaves the browser. Templates use {kw} as the slot
   where the user's keyword (or a sensible default per category) lands.
   Tones are applied as a post-step so every tone visibly changes the
   output: witty / inspirational / bold / romantic / funny append a
   tone-specific closer, minimal trims the caption to its first sentence.
   Generation is seeded, so the same seed reproduces a set and a new seed
   shuffles it into a different order. */

export const CATEGORIES = [
  { id: "travel", label: "Travel" },
  { id: "food", label: "Food" },
  { id: "selfie", label: "Selfie" },
  { id: "festival", label: "Festival" },
  { id: "mood", label: "Mood" },
  { id: "fitness", label: "Fitness" },
  { id: "birthday", label: "Birthday" },
  { id: "motivation", label: "Motivation" },
  { id: "work", label: "Work" },
];

export const CATEGORY_IDS = CATEGORIES.map((c) => c.id);

export const TONES = [
  { id: "witty", label: "Witty" },
  { id: "inspirational", label: "Inspirational" },
  { id: "minimal", label: "Minimal" },
  { id: "bold", label: "Bold" },
  { id: "romantic", label: "Romantic" },
  { id: "funny", label: "Funny" },
];

export const TONE_IDS = TONES.map((t) => t.id);

export const PLATFORMS = [
  { id: "instagram", label: "Instagram", defaultHashtags: 20 },
  { id: "x", label: "X", defaultHashtags: 3 },
  { id: "linkedin", label: "LinkedIn", defaultHashtags: 5 },
];

export const PLATFORM_IDS = PLATFORMS.map((p) => p.id);

export const HASHTAG_COUNTS = [3, 5, 10, 15, 20, 30];

export const DEFAULT_CAPTION_COUNT = 6;

export const DEFAULT_KEYWORDS = {
  travel: "this journey",
  food: "this plate",
  selfie: "this moment",
  festival: "this celebration",
  mood: "today",
  fitness: "this workout",
  birthday: "this day",
  motivation: "this goal",
  work: "this project",
};

/* Every template is two sentences and carries {kw} exactly once, so the
   minimal tone (first sentence only) always changes the text and the
   keyword always lands somewhere natural. */
export const CAPTION_TEMPLATES = {
  travel: [
    "Some roads are worth every mile. {kw} reminded me why I love getting lost on purpose.",
    "New places, same curious heart. {kw} turned an ordinary day into a story I will keep retelling.",
    "I came for the view and stayed for the feeling. {kw} is the kind of memory that ages well.",
    "Passport full, heart fuller. {kw} proved that the best plans are the ones you never make.",
    "Every mile taught me something new. {kw} was the chapter I did not know I needed.",
    "Wandering is my favourite way to think. {kw} gave my thoughts room to breathe.",
    "The map said one thing, my feet said another. {kw} rewarded the detour.",
    "Sunsets hit different somewhere new. {kw} made the whole trip feel like a gift.",
    "I collect places the way others collect things. {kw} just earned a permanent spot in my story.",
    "Leaving home is how I find myself. {kw} brought me a little closer to who I want to be.",
  ],
  food: [
    "Good food, better company. {kw} tasted like a small celebration on a plate.",
    "This is what happiness smells like. {kw} had me closing my eyes at the first bite.",
    "Calories do not count when joy is on the menu. {kw} was worth every single one.",
    "I came hungry and left grateful. {kw} reminded me that simple food can be the best food.",
    "Some meals are just a mood. {kw} turned an ordinary evening into a feast.",
    "Cooked with love, eaten with joy. {kw} is the recipe I will be thinking about all week.",
    "First bite, instant smile. {kw} deserves a round of applause from my taste buds.",
    "Food this good needs no filter. {kw} spoke for itself before I could say a word.",
    "My diet starts tomorrow, again. {kw} made today far too delicious to resist.",
    "A table full of food and people I love. {kw} is what weekends are made for.",
  ],
  selfie: [
    "Just me, being me. {kw} caught me on a good day and I am keeping it.",
    "Confidence looks good on everyone. {kw} is my reminder to wear mine more often.",
    "No filter needed when the mood is right. {kw} felt too good not to share.",
    "Smiling because I can. {kw} is proof that small wins deserve a photo too.",
    "Main character energy, all day. {kw} is my favourite scene so far.",
    "Less perfection, more personality. {kw} shows the real me, and I like what I see.",
    "This face, this light, this moment. {kw} came together better than I planned.",
    "Self-love looks like this. {kw} is a little reminder to be kind to myself.",
    "Not posing, just existing beautifully. {kw} happened between the laughs.",
    "Today I chose me. {kw} is the evidence, and I am not apologising for it.",
  ],
  festival: [
    "Lights, laughter, and a little chaos. {kw} turned the whole day into a celebration.",
    "Festivals remind us what together feels like. {kw} filled every corner with joy.",
    "Dressed up, spirits up. {kw} made the season feel brand new.",
    "Traditions taste better shared. {kw} brought everyone to the same table.",
    "Music in the air, colour everywhere. {kw} is the festival I will measure others by.",
    "Some days are made for celebrating loudly. {kw} gave us every reason to.",
    "The best part of a festival is the people. {kw} proved it all over again.",
    "Sweets, songs, and stories until late. {kw} wrapped the night in warmth.",
    "Every festival leaves a little sparkle behind. {kw} left a lot.",
    "Celebrating the old ways with new memories. {kw} kept the tradition alive and the mood high.",
  ],
  mood: [
    "Some days ask for softness. {kw} gave me exactly the quiet I needed.",
    "Not every day needs a reason to feel good. {kw} was enough all on its own.",
    "Letting the day be what it is. {kw} taught me to slow down and breathe.",
    "A little calm goes a long way. {kw} reset my head better than any plan could.",
    "Feeling everything, fixing nothing. {kw} was the pause I did not know I needed.",
    "Today is for gentle things. {kw} made the ordinary feel kind.",
    "My mood, my rules. {kw} matched the energy I wanted to keep.",
    "Some moments just sit right. {kw} felt easy in the best possible way.",
    "Taking it one slow hour at a time. {kw} made the day feel lighter.",
    "No big plans, no pressure. {kw} was all I needed to feel alright.",
  ],
  fitness: [
    "Stronger than yesterday, and that is enough. {kw} reminded me progress is a habit.",
    "Sweat now, shine later. {kw} was the hardest part of my day, and the best.",
    "The gym does not lie. {kw} showed me exactly where I stand, and where I am going.",
    "One more rep, one more reason. {kw} pushed me past the voice that said stop.",
    "Discipline beats motivation every single time. {kw} proved it again today.",
    "My body keeps the score, so I train it well. {kw} was an investment, not a chore.",
    "Tired muscles, clear mind. {kw} reset my whole day in under an hour.",
    "I do not chase perfect, I chase consistent. {kw} was another brick in the wall.",
    "The hardest lift is showing up. {kw} started the moment I walked in.",
    "Sore today, strong tomorrow. {kw} is the price of the person I am becoming.",
  ],
  birthday: [
    "Another year, another adventure. {kw} made turning older feel like levelling up.",
    "Cake, candles, and the people I love most. {kw} was the best kind of chaos.",
    "A year older, a little wiser, still not grown up. {kw} kept the fun exactly where it belongs.",
    "Blowing out candles and wishing big. {kw} gave me a whole year to look forward to.",
    "Birthdays are proof that growing up can wait. {kw} made the day feel like mine.",
    "More candles, more wishes, more cake. {kw} delivered on every single one.",
    "Celebrating the day the world got a little brighter. {kw} lived up to the occasion.",
    "A year of lessons, laughs, and late nights. {kw} wrapped them all into one perfect day.",
    "Today I am the main event. {kw} made sure of it from the first minute.",
    "Grateful for another trip around the sun. {kw} filled it with people worth keeping.",
  ],
  motivation: [
    "Start where you are, use what you have. {kw} reminded me that small steps still move mountains.",
    "Doubt is loud, but so is discipline. {kw} turned my excuses into a plan.",
    "Nobody is coming to save your dreams. {kw} was the push I needed to save them myself.",
    "The climb is hard because the view is worth it. {kw} kept my eyes on the top.",
    "You do not need permission to begin. {kw} was my green light.",
    "Every expert was once a beginner. {kw} proved that starting badly still counts.",
    "Comfort zones are just cages with nice curtains. {kw} helped me step outside mine.",
    "Your future self is watching this moment. {kw} made me want to make them proud.",
    "Done is better than perfect. {kw} taught me to ship it and fix it later.",
    "The only bad day is a day you quit. {kw} kept me going when quitting looked easy.",
  ],
  work: [
    "Building something that matters takes patience. {kw} reminded me why I started.",
    "Small wins compound into big results. {kw} was one more step in the right direction.",
    "Behind every launch is a hundred late nights. {kw} made them all worth it.",
    "Work smart, rest well, repeat. {kw} kept the balance honest today.",
    "Ideas are cheap, execution is everything. {kw} turned a plan into proof.",
    "My desk, my rules, my deadline. {kw} kept me focused when distractions called.",
    "Progress looks boring until it does not. {kw} was the quiet work nobody sees.",
    "Teamwork turns hard days into good stories. {kw} showed me what a good crew can do.",
    "Shipping beats talking about shipping. {kw} moved from my notes into the real world.",
    "Passion is a better fuel than pressure. {kw} ran on it all week.",
  ],
};

export const TONE_CLOSERS = {
  witty: [
    "Plot twist: I planned none of this.",
    "Yes, I am this charming on a weekday.",
    "Somewhere, my group chat is laughing at this.",
    "Warning: side effects include confidence.",
  ],
  inspirational: [
    "Keep going — your future self is cheering.",
    "Small steps, big story. Keep writing it.",
    "The best chapter is still unwritten.",
    "You are closer than you think. Keep moving.",
  ],
  bold: [
    "No apologies. No holding back.",
    "Say it louder for the back row.",
    "This is the energy. Nothing less.",
    "Own it. All of it.",
  ],
  romantic: [
    "Some moments are made to be felt twice.",
    "My heart kept this one.",
    "A little love goes a long way.",
    "This one stays with me.",
  ],
  funny: [
    "I would explain, but the laugh says it all.",
    "Somebody call my agent, this is gold.",
    "Zero regrets, one great story.",
    "My therapist will hear about this one.",
  ],
  minimal: [],
};

export const HASHTAG_BANKS = {
  travel: ["#travel", "#wanderlust", "#travelgram", "#adventure", "#explore", "#travelphotography", "#wanderer", "#travelblogger", "#vacation", "#journey", "#roam", "#globetrotter", "#traveldiary", "#exploremore", "#backpacking", "#travellife", "#seetheworld", "#traveladdict", "#passportready", "#mountains", "#beachlife", "#cityscape", "#roadtrip", "#naturelovers", "#sunsetlover", "#travelinspiration", "#bucketlist", "#discoverearth", "#traveldiaries", "#wanderoften"],
  food: ["#foodie", "#foodlover", "#foodstagram", "#instafood", "#foodblogger", "#delicious", "#yummy", "#foodphotography", "#foodporn", "#eatwell", "#homemade", "#tasty", "#foodgasm", "#cooking", "#recipe", "#dinner", "#lunch", "#breakfast", "#dessert", "#streetfood", "#foodpics", "#hungry", "#chefmode", "#eatlocal", "#foodaddict", "#flavour", "#savoury", "#sweettooth", "#mealtime", "#fooddiary"],
  selfie: ["#selfie", "#selfietime", "#me", "#portrait", "#selflove", "#confidence", "#photooftheday", "#instaselfie", "#goodvibes", "#smile", "#mood", "#myday", "#justme", "#face", "#nofilter", "#naturalbeauty", "#selfcare", "#happyme", "#pictureoftheday", "#poser", "#mirrorpic", "#candid", "#vibes", "#authentic", "#beyourself", "#glowup", "#feelinggood", "#meagain"],
  festival: ["#festival", "#celebration", "#festivevibes", "#festiveseason", "#party", "#lights", "#tradition", "#culture", "#festivalvibes", "#celebrate", "#joy", "#family", "#festivalfashion", "#diwali", "#holi", "#christmas", "#eid", "#navratri", "#musicfestival", "#dance", "#colourful", "#holidayseason", "#togetherness", "#festivaloutfit", "#memories", "#goodtimes", "#seasonofjoy", "#festive", "#rituals", "#sparkle"],
  mood: ["#mood", "#vibes", "#feels", "#goodvibes", "#chill", "#relax", "#calm", "#mindful", "#softlife", "#peaceful", "#moodboard", "#aesthetic", "#slowdown", "#selfcare", "#mentalhealth", "#breathe", "#positivity", "#energy", "#emotions", "#littlethings", "#quietmoments", "#balance", "#gratitude", "#serenity", "#dailymood", "#innerpeace", "#moodtoday", "#simplejoys", "#feelgood", "#rest"],
  fitness: ["#fitness", "#gym", "#workout", "#fitlife", "#gymlife", "#training", "#health", "#strong", "#motivation", "#fitspo", "#exercise", "#cardio", "#strength", "#muscle", "#fitnessmotivation", "#gymrat", "#healthylifestyle", "#workoutmotivation", "#fitnessjourney", "#weightlifting", "#running", "#yoga", "#fitfam", "#gymtime", "#trainhard", "#noexcuses", "#fitnessaddict", "#sweat", "#goals", "#active"],
  birthday: ["#birthday", "#birthdaygirl", "#birthdayboy", "#birthdayvibes", "#celebration", "#cake", "#party", "#happybirthday", "#birthdayparty", "#bday", "#birthdaycake", "#birthdayfun", "#anotheryear", "#birthdaycelebration", "#cheers", "#birthdaymood", "#birthdaybash", "#makeawish", "#candles", "#birthdayqueen", "#birthdayking", "#birthdaypost", "#birthdayweek", "#birthdaylove", "#birthdaygift", "#birthdaydinner", "#birthdayweekend", "#bdayvibes", "#birthdaywishes", "#birthdaymagic"],
  motivation: ["#motivation", "#inspiration", "#mindset", "#goals", "#success", "#hustle", "#dreambig", "#nevergiveup", "#believe", "#growth", "#positivity", "#selfimprovement", "#discipline", "#grind", "#ambition", "#focus", "#mindsetmatters", "#dailymotivation", "#stayfocused", "#hardwork", "#inspire", "#keepgoing", "#successmindset", "#motivationdaily", "#growthmindset", "#bebetter", "#riseandgrind", "#determination", "#selfbelief", "#purposedriven"],
  work: ["#work", "#career", "#entrepreneur", "#business", "#worklife", "#productivity", "#hustle", "#startup", "#office", "#professional", "#workfromhome", "#leadership", "#teamwork", "#creativity", "#innovation", "#success", "#marketing", "#freelance", "#design", "#developer", "#creator", "#workhard", "#businesstips", "#growth", "#networking", "#job", "#workspace", "#focus", "#goals", "#buildinpublic"],
};

export const SAMPLE_KEYWORDS = ["Goa", "Sunday brunch", "golden hour", "Diwali", "leg day", "new job"];

/* --- small deterministic helpers -------------------------------------- */

export function hashString(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function mulberry32(seed) {
  let a = seed >>> 0;
  return function next() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function shuffle(list, seed) {
  const out = [...list];
  const rand = mulberry32(seed);
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function isValidCategory(id) {
  return CATEGORY_IDS.includes(id);
}

export function isValidTone(id) {
  return TONE_IDS.includes(id);
}

export function isValidPlatform(id) {
  return PLATFORM_IDS.includes(id);
}

export function platformDefaultHashtags(platformId) {
  const platform = PLATFORMS.find((p) => p.id === platformId);
  return platform ? platform.defaultHashtags : 20;
}

/* --- caption generation ------------------------------------------------- */

export function fillKeyword(template, keyword, category) {
  const word = typeof keyword === "string" && keyword.trim().length > 0
    ? keyword.trim()
    : (DEFAULT_KEYWORDS[category] || "this moment");
  return template.split("{kw}").join(word);
}

export function applyTone(text, tone, index = 0, seed = 0) {
  if (!isValidTone(tone)) tone = "witty";
  if (tone === "minimal") {
    // First sentence only. Templates always have at least two sentences,
    // so this always shortens the caption.
    const match = text.match(/^[^.!?]+[.!?]/);
    return match ? match[0] : text;
  }
  const closers = TONE_CLOSERS[tone] || [];
  if (closers.length === 0) return text;
  const closer = closers[(seed + index) % closers.length];
  return `${text} ${closer}`;
}

export function captionId(text) {
  return `cap-${hashString(text).toString(36)}`;
}

export function generateCaptions(options = {}) {
  const category = isValidCategory(options.category) ? options.category : "travel";
  const tone = isValidTone(options.tone) ? options.tone : "witty";
  const keyword = typeof options.keyword === "string" ? options.keyword : "";
  const count = Number.isFinite(options.count) && options.count > 0
    ? Math.min(Math.floor(options.count), CAPTION_TEMPLATES[category].length)
    : DEFAULT_CAPTION_COUNT;
  const seed = Number.isFinite(options.seed) ? Math.floor(options.seed) : 0;

  const picked = shuffle(CAPTION_TEMPLATES[category], seed).slice(0, count);
  return picked.map((template, i) => {
    const text = applyTone(fillKeyword(template, keyword, category), tone, i, seed);
    return { id: captionId(text), text };
  });
}

export function searchCaptions(captions, query) {
  if (!Array.isArray(captions)) return [];
  if (typeof query !== "string" || query.trim() === "") return [...captions];
  const needle = query.trim().toLowerCase();
  return captions.filter((c) => c.text.toLowerCase().includes(needle));
}

/* --- hashtags ----------------------------------------------------------- */

export function selectHashtags(niche, count, seed = 0) {
  const bank = HASHTAG_BANKS[niche] || HASHTAG_BANKS.travel;
  const wanted = HASHTAG_COUNTS.includes(count) ? count : 10;
  const n = Math.min(wanted, bank.length);
  const rotated = [...bank.slice(seed % bank.length), ...bank.slice(0, seed % bank.length)];
  // De-dupe defensively, then take the first n.
  return [...new Set(rotated)].slice(0, n);
}

export function buildCopySet(captionText, hashtags) {
  const text = typeof captionText === "string" ? captionText : "";
  const tags = Array.isArray(hashtags) ? hashtags.filter(Boolean) : [];
  if (!text && tags.length === 0) return "";
  if (tags.length === 0) return text;
  if (!text) return tags.join(" ");
  return `${text}\n\n${tags.join(" ")}`;
}

export function buildCopyAllSets(captionSets) {
  if (!Array.isArray(captionSets) || captionSets.length === 0) return "";
  return captionSets
    .map((s) => buildCopySet(s.text, s.hashtags))
    .filter(Boolean)
    .join("\n\n---\n\n");
}

/* --- character counts ---------------------------------------------------- */

export function charInfo(text) {
  const str = typeof text === "string" ? text : "";
  const chars = [...str].length;
  const words = str.trim() === "" ? 0 : str.trim().split(/\s+/).length;
  return {
    chars,
    words,
    overX: chars > 280,
    overIG: chars > 2200,
  };
}

/* --- settings ------------------------------------------------------------ */

export const DEFAULT_SETTINGS = {
  category: "travel",
  tone: "witty",
  platform: "instagram",
  hashtagCount: 20,
};

export function normalizeSettings(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) return { ...DEFAULT_SETTINGS };
  return {
    category: isValidCategory(input.category) ? input.category : DEFAULT_SETTINGS.category,
    tone: isValidTone(input.tone) ? input.tone : DEFAULT_SETTINGS.tone,
    platform: isValidPlatform(input.platform) ? input.platform : DEFAULT_SETTINGS.platform,
    hashtagCount: HASHTAG_COUNTS.includes(input.hashtagCount)
      ? input.hashtagCount
      : DEFAULT_SETTINGS.hashtagCount,
  };
}

export function parseSettings(raw) {
  try {
    return normalizeSettings(JSON.parse(raw));
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

/* --- favourites + history (plain storage objects, try/catch safe) -------- */

export const FAVOURITES_KEY = "captioncraft:favourites:v1";
export const HISTORY_KEY = "captioncraft:history:v1";
export const SETTINGS_KEY = "captioncraft:settings:v1";
export const MAX_HISTORY = 8;

export function isValidFavourite(entry) {
  return !!entry && typeof entry === "object" && !Array.isArray(entry)
    && typeof entry.id === "string" && entry.id.length > 0
    && typeof entry.text === "string" && entry.text.length > 0
    && Array.isArray(entry.hashtags)
    && entry.hashtags.every((h) => typeof h === "string" && h.startsWith("#"));
}

export function parseFavourites(raw) {
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const seen = new Set();
    const out = [];
    for (const entry of parsed) {
      if (isValidFavourite(entry) && !seen.has(entry.id)) {
        seen.add(entry.id);
        out.push({ id: entry.id, text: entry.text, hashtags: [...entry.hashtags] });
      }
    }
    return out;
  } catch {
    return [];
  }
}

export function loadFavourites(storage) {
  try {
    return parseFavourites(storage.getItem(FAVOURITES_KEY));
  } catch {
    return [];
  }
}

export function saveFavourites(storage, list) {
  try {
    storage.setItem(FAVOURITES_KEY, JSON.stringify(list));
    return true;
  } catch {
    return false;
  }
}

export function toggleFavouriteList(list, entry) {
  const base = Array.isArray(list) ? [...list] : [];
  if (!isValidFavourite(entry)) return base;
  const at = base.findIndex((f) => f.id === entry.id);
  if (at >= 0) base.splice(at, 1);
  else base.push({ id: entry.id, text: entry.text, hashtags: [...entry.hashtags] });
  return base;
}

export function isFavourite(list, id) {
  return Array.isArray(list) && list.some((f) => f.id === id);
}

export function loadSettings(storage) {
  try {
    return parseSettings(storage.getItem(SETTINGS_KEY));
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export function saveSettings(storage, settings) {
  try {
    storage.setItem(SETTINGS_KEY, JSON.stringify(normalizeSettings(settings)));
    return true;
  } catch {
    return false;
  }
}

export function parseHistory(raw) {
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((e) => e && typeof e === "object"
      && typeof e.text === "string" && e.text.length > 0).slice(0, MAX_HISTORY);
  } catch {
    return [];
  }
}

export function loadHistory(storage) {
  try {
    return parseHistory(storage.getItem(HISTORY_KEY));
  } catch {
    return [];
  }
}

export function saveHistory(storage, list) {
  try {
    storage.setItem(HISTORY_KEY, JSON.stringify(list.slice(0, MAX_HISTORY)));
    return true;
  } catch {
    return false;
  }
}

export function addHistoryEntry(list, entry) {
  const base = Array.isArray(list) ? [...list] : [];
  if (!entry || typeof entry.text !== "string" || entry.text.length === 0) return base;
  base.unshift({
    text: entry.text,
    category: entry.category || "",
    tone: entry.tone || "",
    at: typeof entry.at === "number" ? entry.at : Date.now(),
  });
  return base.slice(0, MAX_HISTORY);
}
