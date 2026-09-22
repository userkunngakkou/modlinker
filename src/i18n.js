// ============================================================================
//  ModLinker - i18n (国際化) モジュール
// ============================================================================

const SUPPORTED_LOCALES = [
  { code: "ja",    name: "日本語",              flag: "🇯🇵" },
  { code: "en",    name: "English",             flag: "🇺🇸" },
  { code: "zh-CN", name: "简体中文",            flag: "🇨🇳" },
  { code: "zh-TW", name: "繁體中文",            flag: "🇹🇼" },
  { code: "ko",    name: "한국어",              flag: "🇰🇷" },
  { code: "es",    name: "Español",             flag: "🇪🇸" },
  { code: "fr",    name: "Français",            flag: "🇫🇷" },
  { code: "de",    name: "Deutsch",             flag: "🇩🇪" },
  { code: "it",    name: "Italiano",            flag: "🇮🇹" },
  { code: "pt-BR", name: "Português (Brasil)",  flag: "🇧🇷" },
  { code: "ru",    name: "Русский",             flag: "🇷🇺" },
  { code: "pl",    name: "Polski",              flag: "🇵🇱" },
  { code: "nl",    name: "Nederlands",          flag: "🇳🇱" },
  { code: "tr",    name: "Türkçe",              flag: "🇹🇷" },
  { code: "th",    name: "ภาษาไทย",             flag: "🇹🇭" },
  { code: "vi",    name: "Tiếng Việt",          flag: "🇻🇳" },
  { code: "uk",    name: "Українська",          flag: "🇺🇦" },
  { code: "cs",    name: "Čeština",             flag: "🇨🇿" },
  { code: "sv",    name: "Svenska",             flag: "🇸🇪" },
  { code: "id",    name: "Bahasa Indonesia",    flag: "🇮🇩" },
];

let currentLocale = "ja";
let dictionary = {};
let fallbackDict = {};

/**
 * 言語辞書を読み込む
 */
async function loadLocale(lang) {
  try {
    const resp = await fetch(`./i18n/${lang}.json`);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    return await resp.json();
  } catch (e) {
    console.warn(`[i18n] Failed to load locale '${lang}':`, e);
    return null;
  }
}

/**
 * 言語を切り替える
 */
async function setLocale(lang) {
  const dict = await loadLocale(lang);
  if (!dict) {
    console.warn(`[i18n] Locale '${lang}' not available, falling back to 'ja'`);
    lang = "ja";
    const fallback = await loadLocale("ja");
    if (fallback) dictionary = fallback;
  } else {
    dictionary = dict;
  }

  // フォールバック辞書（日本語）がなければ読み込む
  if (lang !== "ja" && Object.keys(fallbackDict).length === 0) {
    const fb = await loadLocale("ja");
    if (fb) fallbackDict = fb;
  }

  currentLocale = lang;
  localStorage.setItem("locale", lang);
  applyLocale();
}

/**
 * キーから翻訳テキストを取得
 */
function t(key, params) {
  let text = dictionary[key] || fallbackDict[key] || key;
  // パラメータ置換: {0}, {1}, ... or {name}
  if (params) {
    if (Array.isArray(params)) {
      params.forEach((val, i) => {
        text = text.replace(new RegExp(`\\{${i}\\}`, "g"), val);
      });
    } else {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(new RegExp(`\\{${k}\\}`, "g"), v);
      });
    }
  }
  return text;
}

/**
 * DOM上のdata-i18n属性を持つ要素のテキストを一括置換
 */
function applyLocale() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const translated = t(key);
    if (translated !== key) {
      // placeholder属性の場合
      if (el.hasAttribute("data-i18n-attr")) {
        const attr = el.getAttribute("data-i18n-attr");
        el.setAttribute(attr, translated);
      } else {
        el.innerHTML = translated;
      }
    }
  });
}

/**
 * ブラウザ言語から最適なロケールを検出
 */
function detectLocale() {
  const saved = localStorage.getItem("locale");
  if (saved && SUPPORTED_LOCALES.some(l => l.code === saved)) return saved;

  const browserLang = navigator.language || "ja";
  // 完全一致
  if (SUPPORTED_LOCALES.some(l => l.code === browserLang)) return browserLang;
  // プレフィックス一致 (e.g., "ja-JP" -> "ja")
  const prefix = browserLang.split("-")[0];
  const match = SUPPORTED_LOCALES.find(l => l.code === prefix || l.code.startsWith(prefix));
  if (match) return match.code;

  return "ja";
}

/**
 * 現在のロケールコードを返す
 */
function getCurrentLocale() {
  return currentLocale;
}

// ES Module としてエクスポートしない（グローバルに配置）
window.i18n = {
  SUPPORTED_LOCALES,
  setLocale,
  loadLocale,
  t,
  applyLocale,
  detectLocale,
  getCurrentLocale,
};
