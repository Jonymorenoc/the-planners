import { type FormEvent, useMemo, useState } from "react";
import { Sparkles, Wand2, Download, Loader2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { generateDecorImage } from "@/services/aiDesigner";

const BASE_IMAGE = "/ai-decor-original.jpg";

export function AIDesignerPage() {
  const [prompt, setPrompt] = useState("Cambia la decoración a dorado champagne con velas colgantes y centros altos.");
  const [referenceHotel, setReferenceHotel] = useState("Salon Riviera Signature");
  const [sliderValue, setSliderValue] = useState(58);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [result, setResult] = useState<Awaited<ReturnType<typeof generateDecorImage>> | null>(null);

  const beforeSrc = BASE_IMAGE;
  const afterSrc = result?.imageUrl ?? BASE_IMAGE;

  const accentColor = useMemo(() => result?.accent ?? "#d4b05f", [result?.accent]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!prompt.trim()) {
      setErrorMessage("Describe el cambio que deseas ver en la decoración.");
      return;
    }

    setIsLoading(true);
    setStatusMessage(null);
    setErrorMessage(null);

    try {
      const output = await generateDecorImage({ prompt, baseImage: BASE_IMAGE });
      setResult(output);
      setSliderValue(68);
      setStatusMessage("Diseño generado (demo). Ajusta el slider para comparar el antes y después.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "No se pudo generar el diseño.";
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = afterSrc;
    link.download = `the-planners-decor-ai-${Date.now()}.jpg`;
    link.rel = "noopener";
    link.click();
  };

  return (
    <div className="space-y-16 pb-20 pt-12">
      <section className="container grid gap-10 lg:grid-cols-[1fr,0.9fr]">
        <div className="space-y-6">
          <Badge variant="outline" className="w-fit gap-2 border-primary/30 bg-primary/15 text-primary">
            <Sparkles className="h-4 w-4" />
            Gemini Nano Banana · Beta Creativa
          </Badge>
          <h1 className="font-display text-4xl leading-tight text-foreground md:text-5xl">
            Diseña propuestas visuales con IA para{" "}
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              vender tu boda destino
            </span>
          </h1>
          <p className="text-lg text-foreground/70 md:text-xl">
            Itera decoraciones, iluminación y estilo en segundos. Comparte el antes y después con
            tus parejas para cerrar propuestas con una narrativa irresistible.
          </p>

          <Card className="rounded-[2rem] bg-white/85">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Wand2 className="h-5 w-5 text-primary" /> Configura tu escena
              </CardTitle>
              <CardDescription>
                Indícanos la locación o salón y pide los ajustes que deseas. En integración real,
                Gemini Nano Banana aplicará el estilo sobre la fotografía base del hotel.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground/70" htmlFor="hotel">
                    Nombre del hotel o salón
                  </label>
                  <Input
                    id="hotel"
                    value={referenceHotel}
                    onChange={(event) => setReferenceHotel(event.target.value)}
                    placeholder="Ej. Grand Velas Los Cabos · Terraza Miramar"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground/70" htmlFor="prompt">
                    Prompt creativo
                  </label>
                  <Textarea
                    id="prompt"
                    value={prompt}
                    onChange={(event) => setPrompt(event.target.value)}
                    rows={4}
                    placeholder="Describe el estilo, colores y elementos que deseas generar."
                  />
                  <p className="text-xs text-foreground/50">
                    Ejemplos: “Transforma la decoración a oro y blanco con centros altos y velas
                    colgantes” / “Añade un lounge boho con textiles terracota y vegetación tropical”.
                  </p>
                </div>
                {errorMessage && (
                  <p className="text-sm font-semibold text-red-500">{errorMessage}</p>
                )}
                {statusMessage && (
                  <p className="text-sm text-foreground/60">{statusMessage}</p>
                )}
                <div className="flex flex-wrap gap-4">
                  <Button type="submit" size="lg" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generando
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generar propuesta
                      </>
                    )}
                  </Button>
                  <Button type="button" variant="glass" size="lg" onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" />
                    Descargar resultado
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <BeforeAfterSlider
            beforeSrc={beforeSrc}
            afterSrc={afterSrc}
            sliderValue={sliderValue}
            onSliderChange={setSliderValue}
            accentColor={accentColor}
          />
          <Card className="rounded-[2rem] bg-white/85">
            <CardHeader>
              <CardTitle className="text-foreground">Detalles del mockup</CardTitle>
              <CardDescription>
                Ajusta el prompt para refinar la paleta, mobiliario o iluminación. Esta demo genera
                una versión estilizada sobre la imagen base.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-3">
              <InfoBlock label="Locación" value={referenceHotel || "Hotel sin especificar"} />
              <InfoBlock label="Paleta sugerida" value={result?.palette ?? "Champán neutro"} />
              <InfoBlock label="Modelo" value={result?.model ?? "Gemini Nano Banana · demo local"} />
            </CardContent>
          </Card>
          <Card className="rounded-[2rem] border border-dashed border-primary/40 bg-primary/5">
            <CardContent className="flex items-start gap-4 p-6">
              <Info className="mt-1 h-5 w-5 text-primary" />
              <div className="space-y-2 text-sm text-foreground/70">
                <p className="font-semibold text-foreground">
                  ¿Cómo integrar Gemini Nano Banana real?
                </p>
                <p>
                  Conecta este flujo a tu endpoint de generación hospedado (Vertex AI u otra
                  orquestación). Envía el prompt, ID del hotel y la imagen base; guarda la respuesta
                  en tu CDN y reemplaza este mock con la URL regresada por la IA.
                </p>
                <p className="text-xs">
                  Tip: Guarda variantes por hotel/destino en tu CRM para reusarlas en propuestas,
                  brochures y tu micrositio RSVP.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

type BeforeAfterSliderProps = {
  beforeSrc: string;
  afterSrc: string;
  sliderValue: number;
  onSliderChange: (value: number) => void;
  accentColor: string;
};

function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  sliderValue,
  onSliderChange,
  accentColor,
}: BeforeAfterSliderProps) {
  return (
    <div className="relative overflow-hidden rounded-[2.8rem] border border-white/50 bg-white/60 shadow-glow">
      <div className="relative h-[420px] w-full">
        <img src={beforeSrc} alt="Decoración original" className="h-full w-full object-cover" />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderValue}% 0 0)` }}
        >
          <img src={afterSrc} alt="Decoración generada" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-y-0 flex flex-col justify-between p-6 text-xs font-semibold uppercase tracking-[0.35em] text-white drop-shadow">
          <span className="rounded-full bg-black/40 px-3 py-1 text-[0.55rem]">Antes</span>
          <span className="self-end rounded-full bg-black/40 px-3 py-1 text-[0.55rem]">
            Después
          </span>
        </div>
        <div
          className="pointer-events-none absolute inset-y-0"
          style={{ left: `${sliderValue}%` }}
        >
          <div className="relative h-full">
            <span className="absolute left-[-1px] top-0 h-full w-0.5 bg-white/80" />
            <span
              className="absolute top-1/2 -translate-y-1/2 rounded-full border border-white/70 bg-white/95 px-3 py-1 text-xs font-semibold text-foreground shadow-lg"
              style={{ transform: "translate(-50%, -50%)" }}
            >
              {sliderValue}%
            </span>
          </div>
        </div>
      </div>
      <div className="relative border-t border-white/60 bg-white/70 px-8 py-4">
        <input
          type="range"
          min={0}
          max={100}
          value={sliderValue}
          onChange={(event) => onSliderChange(Number(event.target.value))}
          className="h-1 w-full appearance-none rounded-full bg-gradient-to-r from-white via-white to-transparent accent-primary"
          style={{ accentColor }}
        />
      </div>
    </div>
  );
}

type InfoBlockProps = {
  label: string;
  value: string;
};

function InfoBlock({ label, value }: InfoBlockProps) {
  return (
    <div className="space-y-1 rounded-xl bg-white/80 p-4 text-sm text-foreground/70 shadow-inner">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-foreground/45">
        {label}
      </p>
      <p className="font-medium text-foreground">{value}</p>
    </div>
  );
}
