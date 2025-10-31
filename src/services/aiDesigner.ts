type PalettePreset = {
  keywords: RegExp;
  overlay: string;
  label: string;
  accent: string;
};

const PRESETS: PalettePreset[] = [
  {
    keywords: /(oro|dora(do|da)|champagne|gold)/i,
    overlay: "rgba(212, 176, 95, 0.38)",
    label: "Oro champán",
    accent: "#d4b05f",
  },
  {
    keywords: /(verde|jard[ií]n|botanical|emerald)/i,
    overlay: "rgba(90, 146, 118, 0.32)",
    label: "Verde botánico",
    accent: "#5a9276",
  },
  {
    keywords: /(rosa|blush|terracota|peach)/i,
    overlay: "rgba(224, 151, 155, 0.34)",
    label: "Rosa blush",
    accent: "#e0979b",
  },
  {
    keywords: /(azul|ocean|celeste|navy)/i,
    overlay: "rgba(104, 145, 204, 0.34)",
    label: "Azul océano",
    accent: "#6891cc",
  },
];

const DEFAULT_PRESET: PalettePreset = {
  keywords: /.*/,
  overlay: "rgba(201, 189, 175, 0.24)",
  label: "Champán neutro",
  accent: "#c9bdaf",
};

function matchPreset(prompt: string): PalettePreset {
  const found = PRESETS.find((preset) => preset.keywords.test(prompt));
  return found ?? DEFAULT_PRESET;
}

async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function tintImage(baseSrc: string, overlay: string): Promise<string> {
  const image = await loadImage(baseSrc);
  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("No se pudo inicializar el canvas para la generación.");
  }

  ctx.drawImage(image, 0, 0);

  ctx.globalCompositeOperation = "soft-light";
  ctx.fillStyle = overlay;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.globalCompositeOperation = "color";
  ctx.fillStyle = overlay;
  ctx.globalAlpha = 0.35;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = 1;
  ctx.fillStyle = "rgba(255, 240, 220, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  return canvas.toDataURL("image/jpeg", 0.92);
}

export type GenerateDecorOptions = {
  prompt: string;
  baseImage: string;
};

export type GenerateDecorResponse = {
  imageUrl: string;
  palette: string;
  accent: string;
  model: string;
  promptUsed: string;
};

export async function generateDecorImage({
  prompt,
  baseImage,
}: GenerateDecorOptions): Promise<GenerateDecorResponse> {
  const trimmedPrompt = prompt.trim();
  if (!trimmedPrompt) {
    throw new Error("Ingresa un prompt con la transformación deseada.");
  }

  const preset = matchPreset(trimmedPrompt);
  const generated = await tintImage(baseImage, preset.overlay);

  return {
    imageUrl: generated,
    palette: preset.label,
    accent: preset.accent,
    model: "Gemini Nano Banana · modo demo",
    promptUsed: trimmedPrompt,
  };
}
