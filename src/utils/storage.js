const isChromeAvailable = () =>
  typeof chrome !== "undefined" && chrome.storage?.local;

export const getHighlights = () => {
  return new Promise((resolve) => {
    if (!isChromeAvailable()) return resolve([]);
    chrome.storage.local.get(["highlights"], (result) => {
      resolve(result.highlights || []);
    });
  });
};

export const deleteHighlight = (id) => {
  return new Promise((resolve) => {
    if (!isChromeAvailable()) return resolve();
    chrome.storage.local.get(["highlights"], (result) => {
      const highlights = (result.highlights || []).filter((h) => h.id !== id);
      chrome.storage.local.set({ highlights }, () => resolve());
    });
  });
};

export const updateHighlight = (id, updates) => {
  return new Promise((resolve) => {
    if (!isChromeAvailable()) return resolve();
    chrome.storage.local.get(["highlights"], (result) => {
      const highlights = (result.highlights || []).map((h) =>
        h.id === id ? { ...h, ...updates } : h,
      );
      chrome.storage.local.set({ highlights }, () => resolve());
    });
  });
};
