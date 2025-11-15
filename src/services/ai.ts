type WebsiteTheme = "Pastel" | "Elegante" | "Tropical";

export type WebsiteGeneratorPayload = {
  coupleNames: string;
  date: string;
  location: string;
  story: string;
  theme: WebsiteTheme;
};

export type GeneratedWebsite = {
  previewHtml: string;
  urlSlug: string;
  suggestedSections: string[];
};

const apiBaseUrl =
  import.meta.env.VITE_DW_API_BASE_URL || "http://localhost:5174/api";

export async function generateWebsite(
  payload: WebsiteGeneratorPayload,
): Promise<GeneratedWebsite> {
  const body = {
    ...payload,
    systemPrompt:
      "Diseñador web experto en bodas destino, genera contenido HTML/CSS elegante",
  };

  if (!import.meta.env.VITE_ENABLE_REMOTE_AI) {
    return buildMockWebsite(payload);
  }

  const response = await fetch(`${apiBaseUrl}/generate-website`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Error al generar sitio (${response.status}): ${errorText}`,
    );
  }

  return (await response.json()) as GeneratedWebsite;
}

const buildMockWebsite = (
  payload: WebsiteGeneratorPayload,
): GeneratedWebsite => ({
  previewHtml: buildMockPreview(payload),
  urlSlug: `dream-${payload.coupleNames.toLowerCase().replace(/\s+/g, "-")}`,
  suggestedSections: [
    "Historia de la pareja",
    "Itinerario de la boda",
    "Recomendaciones de viaje",
    "Código de vestimenta",
  ],
});

const buildMockPreview = (payload: WebsiteGeneratorPayload) => `
  <section style="padding:3rem; font-family:'Work Sans', sans-serif; background:linear-gradient(130deg, hsla(340,70%,92%,0.9), hsla(270,45%,90%,0.9)); color:#5f4c6b;">
    <header style="text-align:center; margin-bottom:3rem;">
      <p style="letter-spacing:0.4em; text-transform:uppercase;">The Planners</p>
      <h1 style="font-family:'Playfair Display', serif; font-size:3rem; color:hsl(340,60%,45%)">
        ${payload.coupleNames}
      </h1>
      <p>${new Date(payload.date).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })} · ${payload.location}</p>
    </header>
    <article style="max-width:680px; margin:0 auto; line-height:1.7;">
      <h2 style="font-family:'Playfair Display', serif; color:hsl(25,75%,55%);">Nuestra historia</h2>
      <p>${payload.story}</p>
      <h2 style="font-family:'Playfair Display', serif; margin-top:2rem; color:hsl(150,30%,40%);">Tema ${payload.theme}</h2>
      <p>Paleta etérea inspirada en ${payload.theme.toLowerCase()} con detalles personalizados y experiencias memorables para tus invitados.</p>
    </article>
  </section>
`;
