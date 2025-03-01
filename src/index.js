const kjua = require("kjua");

const generateButton = document.getElementById("generate-button");
const ssidInput = document.getElementById("ssid-input");
const securitySelect = document.getElementById("security-select");
const passwordInput = document.getElementById("password-input");
const hiddenInput = document.getElementById("hidden-input");
const qrCodeDiv = document.getElementById("qr-code");

const performValidationAndUpdate = () => {
  generateButton.disabled = !validateInput();
};

const validateInput = () => {
  if (ssidInput.value.trim().length === 0) {
    return false;
  }

  if (securitySelect.value !== 2 && passwordInput.value.trim().length === 0) {
    // If some security and no password
    return false;
  }

  return true;
};

const escape = (value) => value.replace(/[\\;,":]/g, "\\$&");

const constructConnectionString = () => {
  const ssid = ssidInput.value.trim();
  const security =
    securitySelect.value === "None" ? "nopass" : securitySelect.value;
  const password = passwordInput.value.trim();
  const hidden = hiddenInput.checked ? "true" : "false";

  return `WIFI:S:${escape(ssid)};T:${escape(security)};P:${escape(
    password
  )};H:${escape(hidden)};;`;
};

ssidInput.addEventListener("input", performValidationAndUpdate);
securitySelect.addEventListener("input", performValidationAndUpdate);
passwordInput.addEventListener("input", performValidationAndUpdate);
hiddenInput.addEventListener("input", performValidationAndUpdate);

generateButton.addEventListener("click", () => {
  qrCodeDiv.innerHTML = ""; // Clear previous QR code
  const qrCode = kjua({
    text: constructConnectionString(),
    size: 400,
    fill: "#000",
    back: "#fff",
  });
  qrCodeDiv.appendChild(qrCode);
});

performValidationAndUpdate();
