const deviceNameInput = document.getElementById("deviceName");
const levelButtons = document.querySelectorAll(".level-btn");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const resultCard = document.getElementById("resultCard");
const message = document.getElementById("message");

const deviceResult = document.getElementById("deviceResult");
const selectedLevelText = document.getElementById("selectedLevelText");

const generalValue = document.getElementById("generalValue");
const redDotValue = document.getElementById("redDotValue");
const scope2xValue = document.getElementById("scope2xValue");
const scope4xValue = document.getElementById("scope4xValue");
const awMValue = document.getElementById("awMValue");
const freeLookValue = document.getElementById("freeLookValue");
const fireButtonValue = document.getElementById("fireButtonValue");

let selectedLevel = null;
let lastGeneratedText = "";

const sensitivityRanges = {
  low: {
    label: "Sensi baja",
    general: [100, 130],
    redDot: [100, 160],
    scope2x: [100, 160],
    scope4x: [100, 160],
    awm: [20, 45],
    freeLook: [50, 75],
    fireButton: [38, 50],
  },
  medium: {
    label: "Sensi media",
    general: [130, 150],
    redDot: [115, 170],
    scope2x: [100, 170],
    scope4x: [90, 170],
    awm: [35, 55],
    freeLook: [80, 110],
    fireButton: [45, 55],
  },
  high: {
    label: "Sensi alta",
    general: [150, 198],
    redDot: [145, 195],
    scope2x: [130, 180],
    scope4x: [115, 180],
    awm: [45, 75],
    freeLook: [120, 180],
    fireButton: [50, 58],
  },
};

levelButtons.forEach((button) => {
  button.addEventListener("click", () => {
    levelButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    selectedLevel = button.dataset.level;
    message.textContent = "";
  });
});

generateBtn.addEventListener("click", () => {
  const deviceName = deviceNameInput.value.trim();

  if (deviceName === "") {
    message.textContent = "Escribe el nombre del dispositivo.";
    resultCard.classList.add("hidden");
    return;
  }

  if (!selectedLevel) {
    message.textContent = "Selecciona una sensi: baja, media o alta.";
    resultCard.classList.add("hidden");
    return;
  }

  const generatedSensitivity = generateSensitivity(selectedLevel);

  deviceResult.textContent = deviceName;
  selectedLevelText.textContent = sensitivityRanges[selectedLevel].label;

  generalValue.textContent = generatedSensitivity.general;
  redDotValue.textContent = generatedSensitivity.redDot;
  scope2xValue.textContent = generatedSensitivity.scope2x;
  scope4xValue.textContent = generatedSensitivity.scope4x;
  awMValue.textContent = generatedSensitivity.awm;
  freeLookValue.textContent = generatedSensitivity.freeLook;
  fireButtonValue.textContent = generatedSensitivity.fireButton;

  lastGeneratedText =
    `Dispositivo: ${deviceName}\n` +
    `Nivel: ${sensitivityRanges[selectedLevel].label}\n` +
    `General: ${generatedSensitivity.general}\n` +
    `Punto rojo: ${generatedSensitivity.redDot}\n` +
    `Mira 2x: ${generatedSensitivity.scope2x}\n` +
    `Mira 4x: ${generatedSensitivity.scope4x}\n` +
    `AWM: ${generatedSensitivity.awm}\n` +
    `Mirada libre: ${generatedSensitivity.freeLook}\n` +
    `Botón de disparo: ${generatedSensitivity.fireButton}`;

  message.textContent = "Sensibilidad creada correctamente.";
  resultCard.classList.remove("hidden");
});

copyBtn.addEventListener("click", async () => {
  if (!lastGeneratedText) {
    message.textContent = "Primero genera una sensibilidad.";
    return;
  }

  try {
    await navigator.clipboard.writeText(lastGeneratedText);
    message.textContent = "Sensibilidad copiada al portapapeles.";
  } catch (error) {
    message.textContent = "No se pudo copiar automáticamente.";
  }
});

function generateSensitivity(level) {
  const ranges = sensitivityRanges[level];

  return {
    general: randomNumber(ranges.general[0], ranges.general[1]),
    redDot: randomNumber(ranges.redDot[0], ranges.redDot[1]),
    scope2x: randomNumber(ranges.scope2x[0], ranges.scope2x[1]),
    scope4x: randomNumber(ranges.scope4x[0], ranges.scope4x[1]),
    awm: randomNumber(ranges.awm[0], ranges.awm[1]),
    freeLook: randomNumber(ranges.freeLook[0], ranges.freeLook[1]),
    fireButton: randomNumber(ranges.fireButton[0], ranges.fireButton[1]),
  };
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}