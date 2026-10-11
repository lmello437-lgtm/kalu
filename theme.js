(() => {
  "use strict";

  const storageKey = "kalu-theme";
  const root = document.documentElement;
  const lightPreference = typeof window.matchMedia === "function"
    ? window.matchMedia("(prefers-color-scheme: light)")
    : null;
  let selectedTheme = null;
  let toggle;

  try {
    const savedTheme = window.localStorage.getItem(storageKey);
    if (savedTheme === "light" || savedTheme === "dark") selectedTheme = savedTheme;
  } catch {
    // O tema também funciona quando o navegador bloqueia o armazenamento.
  }

  function applyTheme() {
    const theme = selectedTheme || (lightPreference?.matches ? "light" : "dark");
    root.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]').content = theme === "light" ? "#f5f7fb" : "#090d14";
    if (toggle) {
      const nextTheme = theme === "dark" ? "claro" : "escuro";
      toggle.setAttribute("aria-label", `Ativar modo ${nextTheme}`);
      document.getElementById("theme-label").textContent = `Modo ${nextTheme}`;
      document.getElementById("theme-icon").setAttribute("href", theme === "dark" ? "#icon-sun" : "#icon-moon");
    }
  }

  // Executa antes do CSS para abrir a página diretamente no tema correto.
  applyTheme();
  if (lightPreference?.addEventListener) lightPreference.addEventListener("change", applyTheme);
  else if (lightPreference?.addListener) lightPreference.addListener(applyTheme);

  document.addEventListener("DOMContentLoaded", () => {
    toggle = document.getElementById("theme-toggle");
    applyTheme();
    toggle.hidden = false;
    toggle.addEventListener("click", () => {
      selectedTheme = root.dataset.theme === "dark" ? "light" : "dark";
      try {
        window.localStorage.setItem(storageKey, selectedTheme);
      } catch {
        // Sem armazenamento, a escolha continua válida durante esta visita.
      }
      applyTheme();
    });
  });
})();
