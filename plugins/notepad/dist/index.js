const storageKey = "voltex-notepad-content";
function index(context) {
  context.addSidebarEntry({
    title: "Notepad",
    iconHtml: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" title="Notepad">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
        </svg>`,
    renderContent() {
      const container = document.createElement("div");
      container.style.cssText = "display:flex;flex-direction:column;height:100%;gap:8px;";
      const textarea = document.createElement("textarea");
      textarea.placeholder = "Type your notes here...";
      textarea.value = localStorage.getItem(storageKey) ?? "";
      textarea.style.cssText = [
        "flex:1",
        "resize:none",
        "background:#2c313a",
        "border:1px solid #444",
        "border-radius:6px",
        "color:#e5e7eb",
        "font-size:13px",
        "font-family:inherit",
        "padding:10px",
        "outline:none",
        "line-height:1.5",
        "min-height:200px"
      ].join(";");
      textarea.addEventListener("focus", () => {
        textarea.style.borderColor = "#6366f1";
      });
      textarea.addEventListener("blur", () => {
        textarea.style.borderColor = "#444";
      });
      textarea.addEventListener("input", () => {
        localStorage.setItem(storageKey, textarea.value);
      });
      const clearBtn = document.createElement("button");
      clearBtn.textContent = "Clear";
      clearBtn.style.cssText = [
        "padding:7px 12px",
        "background:#374151",
        "color:#9ca3af",
        "border:1px solid #4b5563",
        "border-radius:6px",
        "cursor:pointer",
        "font-size:12px",
        "transition:all 0.2s"
      ].join(";");
      clearBtn.addEventListener("mouseover", () => {
        clearBtn.style.color = "#ef4444";
        clearBtn.style.borderColor = "#ef4444";
      });
      clearBtn.addEventListener("mouseout", () => {
        clearBtn.style.color = "#9ca3af";
        clearBtn.style.borderColor = "#4b5563";
      });
      clearBtn.addEventListener("click", () => {
        if (textarea.value && confirm("Clear all notes?")) {
          textarea.value = "";
          localStorage.removeItem(storageKey);
        }
      });
      container.appendChild(textarea);
      container.appendChild(clearBtn);
      return container;
    }
  });
}
export {
  index as default
};
