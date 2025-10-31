import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Calendar, Copy, Eye, Loader2, RefreshCw, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { aiSystemPrompts } from "@/data/mockData";
import {
  generateWebsite,
  type GeneratedWebsite,
  type WebsiteGeneratorPayload,
} from "@/services/ai";

const themes: WebsiteGeneratorPayload["theme"][] = ["Pastel", "Elegante", "Tropical"];

const defaultPayload: WebsiteGeneratorPayload = {
  coupleNames: "María & Alejandro",
  date: "2025-05-18",
  location: "Isla Mujeres, México",
  story:
    "María y Alejandro se enamoraron durante un viaje al Caribe. Su boda destino celebra su espíritu aventurero, la magia del mar y el amor por compartir experiencias únicas con sus seres queridos.",
  theme: "Pastel",
};

export function WebsiteBuilderPage() {
  const [form, setForm] = useState<WebsiteGeneratorPayload>(defaultPayload);
  const [result, setResult] = useState<GeneratedWebsite | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState<string | null>(null);

  const livePreview = useMemo(() => {
    if (result?.previewHtml) {
      return result.previewHtml;
    }

    return buildLivePreview(form);
  }, [result, form]);

  const uniqueUrl = useMemo(() => {
    if (result?.urlSlug) {
      return `https://theplanners.app/sites/${result.urlSlug}`;
    }
    return `https://theplanners.app/sites/${slugify(form.coupleNames)}-${new Date(form.date).getTime()}`;
  }, [result, form]);

  const handleChange = <K extends keyof WebsiteGeneratorPayload>(
    key: K,
    value: WebsiteGeneratorPayload[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    toast.promise(
      generateWebsite(form)
        .then((response) => {
          setResult(response);
          setPublishedUrl(null);
          toast.success("Sitio generado con éxito", {
            description: "Configura y publica cuando estés lista.",
          });
        })
        .catch((error: Error) => {
          console.error(error);
          throw error;
        })
        .finally(() => setIsGenerating(false)),
      {
        loading: "Generando experiencia web con The Planners AI...",
        success: "Sitio listo para revisar",
        error: "No se pudo generar el sitio. Intenta nuevamente.",
      },
    );
  };

  const handlePublish = () => {
    setPublishedUrl(uniqueUrl);
    toast.success("Sitio publicado", {
      description: "Comparte la URL con tu pareja y personaliza detalles finales.",
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(uniqueUrl).then(() => {
      toast.success("URL copiada al portapapeles");
    });
  };

  const handlePreview = () => {
    const previewWindow = window.open("", "_blank");
    if (previewWindow) {
      previewWindow.document.write(livePreview);
      previewWindow.document.close();
    }
  };

  return (
    <div className="container space-y-8 py-10">
      <header className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-white/50 px-3 py-1 text-xs uppercase tracking-[0.35em] text-foreground/60">
            The Planners AI · Motor local
          </span>
          <h1 className="mt-3 font-display text-3xl text-foreground md:text-4xl">
            Creador de sitio web destino
          </h1>
          <p className="text-sm text-foreground/60 md:text-base">
            Personaliza los datos de la pareja y genera contenido elegante en cuestión de segundos.
          </p>
        </div>
        <Card className="max-w-sm border border-border/60 bg-white/70">
          <CardHeader>
            <CardTitle>Prompt del sistema</CardTitle>
            <CardDescription>{aiSystemPrompts.website}</CardDescription>
          </CardHeader>
        </Card>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.1fr,1fr]">
        <Card className="border border-border/60">
          <CardHeader>
            <CardTitle>Detalles de la pareja</CardTitle>
            <CardDescription>
              La vista previa se actualiza en tiempo real. Ajusta el tono y la historia según la pareja.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="coupleNames">Nombres de la pareja</Label>
              <Input
                id="coupleNames"
                value={form.coupleNames}
                onChange={(event) => handleChange("coupleNames", event.target.value)}
              />
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="date">Fecha del evento</Label>
                <div className="relative">
                  <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
                  <Input
                    id="date"
                    type="date"
                    value={form.date}
                    onChange={(event) => handleChange("date", event.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="location">Ubicación</Label>
                <Input
                  id="location"
                  value={form.location}
                  onChange={(event) => handleChange("location", event.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="story">Historia / concepto</Label>
              <Textarea
                id="story"
                value={form.story}
                onChange={(event) => handleChange("story", event.target.value)}
                rows={6}
              />
            </div>
            <div className="space-y-3">
              <Label>Tema visual</Label>
              <div className="flex flex-wrap gap-3">
                {themes.map((theme) => (
                  <button
                    key={theme}
                    type="button"
                    onClick={() => handleChange("theme", theme)}
                    className={`rounded-2xl border px-4 py-2 text-sm font-medium transition ${
                      form.theme === theme
                        ? "border-primary bg-primary/20 text-primary"
                        : "border-border/60 bg-white/50 text-foreground/70 hover:border-primary/40"
                    }`}
                  >
                    {theme}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="hero"
                onClick={handleGenerate}
                disabled={isGenerating}
                className="shadow-glow"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generando...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" /> Generar con IA
                  </>
                )}
              </Button>
              <Button variant="glass" onClick={() => setResult(null)} disabled={isGenerating}>
                Limpiar IA
              </Button>
              <Button variant="glass" onClick={handlePreview}>
                <Eye className="mr-2 h-4 w-4" /> Ver completo
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/60 bg-white/75">
          <CardHeader className="space-y-2">
            <CardTitle>Vista previa en tiempo real</CardTitle>
            <CardDescription>
              URL sugerida: <span className="font-medium text-foreground">{uniqueUrl}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="max-h-[520px] overflow-hidden rounded-[28px] border border-border/60 shadow-inner">
              <iframe
                title="Vista previa The Planners"
                className="h-[520px] w-full border-none"
                srcDoc={livePreview}
              />
            </div>
            {result?.suggestedSections && (
              <div className="rounded-2xl bg-white/60 p-4 text-sm leading-relaxed text-foreground/70 shadow-inner">
                <p className="font-semibold text-foreground">Sugerencias de secciones:</p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  {result.suggestedSections.map((section) => (
                    <li key={section}>{section}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-wrap gap-3">
              <Button variant="glass" onClick={handleGenerate} disabled={isGenerating}>
                <RefreshCw className="mr-2 h-4 w-4" /> Regenerar
              </Button>
              <Button variant="outline" onClick={handleCopy}>
                <Copy className="mr-2 h-4 w-4" /> Copiar URL
              </Button>
              <Button variant="hero" onClick={handlePublish}>
                <Send className="mr-2 h-4 w-4" /> Publicar
              </Button>
            </div>
            {publishedUrl && (
              <p className="text-xs text-foreground/60">
                Publicado en: <span className="font-semibold">{publishedUrl}</span>
              </p>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function buildLivePreview(payload: WebsiteGeneratorPayload) {
  return `
    <!doctype html>
    <html lang="es">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Work+Sans:wght@300;400;500&display=swap" rel="stylesheet">
        <style>
          body {
            margin: 0;
            font-family: 'Work Sans', sans-serif;
            background: linear-gradient(145deg, #fef5f8, #f3f0ff);
            color: #6a4b6f;
          }
          header {
            padding: 60px 40px;
            text-align: center;
            background: linear-gradient(120deg, rgba(233,189,206,0.9), rgba(201,192,238,0.9));
            color: #fff;
            position: relative;
            overflow: hidden;
          }
          header::after {
            content: "";
            position: absolute;
            inset: 0;
            background: radial-gradient(circle at top right, rgba(255,255,255,0.4), transparent 60%);
          }
          main {
            padding: 40px 24px 60px;
            max-width: 760px;
            margin: 0 auto;
          }
          h1, h2 {
            font-family: 'Playfair Display', serif;
          }
          .badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 8px 16px;
            border-radius: 9999px;
            background: rgba(255, 255, 255, 0.25);
            backdrop-filter: blur(8px);
            font-size: 12px;
            letter-spacing: 0.35em;
          }
          .card {
            border-radius: 28px;
            background: rgba(255,255,255,0.6);
            padding: 32px;
            box-shadow: 0 25px 45px rgba(170, 150, 190, 0.2);
            margin-bottom: 24px;
          }
          .cta {
            display: inline-block;
            margin-top: 24px;
            padding: 14px 28px;
            border-radius: 999px;
            background: linear-gradient(120deg, #f781b6, #f5a8d0);
            color: #fff;
            text-decoration: none;
            font-weight: 600;
            letter-spacing: 0.08em;
            box-shadow: 0 15px 35px rgba(248, 129, 182, 0.35);
          }
        </style>
      </head>
      <body>
        <header>
          <div class="badge">DREAMWEDDING</div>
          <h1 style="font-size:48px; margin:24px 0 12px;">${payload.coupleNames}</h1>
          <p style="font-size:18px; letter-spacing: 0.2em;">${new Date(payload.date).toLocaleDateString(
            "es-ES",
            {
              day: "numeric",
              month: "long",
              year: "numeric",
            },
          )} · ${payload.location}</p>
        </header>
        <main>
          <div class="card">
            <h2>Nuestra historia</h2>
            <p style="line-height:1.7; font-size:16px;">${payload.story}</p>
          </div>
          <div class="card">
            <h2>Experiencia ${payload.theme}</h2>
            <p style="line-height:1.7; font-size:15px;">
              Inspiración ${payload.theme.toLowerCase()} con detalles personalizados, itinerario cuidado y recomendaciones especiales para tus invitados.
            </p>
            <a href="#" class="cta">Confirmar asistencia</a>
          </div>
        </main>
      </body>
    </html>
  `;
}
