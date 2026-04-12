let savePopup = null;

function removePopup() {
  if (savePopup && savePopup.parentNode) {
    savePopup.parentNode.removeChild(savePopup);
    savePopup = null;
  }
}

function showSavePopup(x, y, selectedText) {
  removePopup();

  savePopup = document.createElement("div");
  savePopup.className = "highlight-saver-popup";
  savePopup.textContent = "💾 Save Highlight";
  savePopup.style.left = `${x}px`;
  savePopup.style.top = `${y - 45}px`;

  savePopup.onclick = () => {
    const highlight = {
      id: Date.now().toString(),
      text: selectedText,
      url: window.location.href,
      pageTitle: document.title,
      timestamp: new Date().toISOString(),
    };

    chrome.storage.local.get(["highlights"], (result) => {
      const highlights = result.highlights || [];
      highlights.unshift(highlight);
      chrome.storage.local.set({ highlights }, () => {
        removePopup();
        window.getSelection().removeAllRanges();
      });
    });
  };

  document.body.appendChild(savePopup);
}

document.addEventListener("mouseup", () => {
  setTimeout(() => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();

    if (selectedText.length > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + window.scrollY;

      showSavePopup(x, y, selectedText);
    } else {
      removePopup();
    }
  }, 10);
});

document.addEventListener("mousedown", (e) => {
  if (savePopup && !savePopup.contains(e.target)) {
    removePopup();
  }
});
