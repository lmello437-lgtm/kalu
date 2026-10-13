(() => {
  "use strict";

  const form = document.getElementById("lead-form");
  const requestView = document.getElementById("request-view");
  const successView = document.getElementById("success-view");
  const itemsFieldset = form.querySelector("fieldset");
  const itemInputs = Array.from(form.querySelectorAll('input[name="items"]'));
  const nameInput = document.getElementById("client-name");
  const locationInput = document.getElementById("client-location");
  const otherCheckbox = document.getElementById("other-item");
  const otherInput = document.getElementById("other-description");
  const submitButton = document.getElementById("submit-button");
  const whatsappLink = document.getElementById("whatsapp-link");
  const normalize = (value) => value.replace(/\s+/g, " ").trim();

  function setError(input, errorId, invalid) {
    document.getElementById(errorId).hidden = !invalid;
    if (invalid) input.setAttribute("aria-invalid", "true");
    else input.removeAttribute("aria-invalid");
  }

  for (const input of itemInputs) {
    input.addEventListener("change", () => {
      if (itemInputs.some((item) => item.checked)) {
        setError(itemsFieldset, "items-error", false);
        itemInputs.forEach((item) => item.removeAttribute("aria-invalid"));
      }
    });
  }

  otherCheckbox.addEventListener("change", () => {
    document.getElementById("other-field").hidden = !otherCheckbox.checked;
    otherInput.disabled = !otherCheckbox.checked;
    otherInput.required = otherCheckbox.checked;
    setError(otherInput, "other-error", false);
  });

  const textFields = [
    [nameInput, "name-error"],
    [locationInput, "location-error"],
    [otherInput, "other-error"]
  ];

  for (const [input, errorId] of textFields) {
    input.addEventListener("input", () => {
      if (normalize(input.value)) setError(input, errorId, false);
    });
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (submitButton.disabled) return;

    const selectedInputs = itemInputs.filter((input) => input.checked);
    let firstInvalid = null;
    setError(itemsFieldset, "items-error", selectedInputs.length === 0);
    itemInputs.forEach((input) => {
      if (!selectedInputs.length) input.setAttribute("aria-invalid", "true");
      else input.removeAttribute("aria-invalid");
    });
    if (!selectedInputs.length) firstInvalid = itemInputs[0];

    if (otherCheckbox.checked) {
      const invalid = !normalize(otherInput.value);
      setError(otherInput, "other-error", invalid);
      if (invalid && !firstInvalid) firstInvalid = otherInput;
    }
    for (const [input, errorId] of textFields.slice(0, 2)) {
      const invalid = !normalize(input.value);
      setError(input, errorId, invalid);
      if (invalid && !firstInvalid) firstInvalid = input;
    }
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    const config = window.KALU_CONFIG || {};
    const number = String(config.whatsappNumber || "");
    if (!/^[1-9]\d{7,14}$/.test(number)) {
      document.getElementById("configuration-error").hidden = false;
      return;
    }
    document.getElementById("configuration-error").hidden = true;

    const items = selectedInputs.map((input) => input.value === "Outro"
      ? `Outro: ${normalize(otherInput.value)}`
      : input.value);
    const message = [
      `Olá, ${config.companyName || "Kalu"}! Quero solicitar um orçamento.`,
      "",
      `*Nome:* ${normalize(nameInput.value)}`,
      `*Itens para higienização:* ${items.join(", ")}`,
      `*Bairro e cidade:* ${normalize(locationInput.value)}`
    ].join("\n");
    // wa.me abre o aplicativo no celular e permite continuar no WhatsApp Web no computador.
    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    whatsappLink.href = url;

    // Abre dentro do gesto de clique para evitar bloqueios de popup.
    // O link na conclusão permite tentar novamente se o navegador bloquear a abertura.
    window.open(url, "_blank", "noopener,noreferrer");
    submitButton.disabled = true;
    requestView.hidden = true;
    successView.hidden = false;
    document.title = "Tudo pronto! | Kalu Limpeza Técnica";
    window.scrollTo({ top: 0, behavior: "instant" });
    document.getElementById("success-title").focus({ preventScroll: true });
  });

  document.getElementById("edit-request").addEventListener("click", () => {
    successView.hidden = true;
    requestView.hidden = false;
    submitButton.disabled = false;
    document.title = "Solicite seu orçamento | Kalu Limpeza Técnica";
    nameInput.focus();
  });
})();
