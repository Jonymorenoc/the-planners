import { useMemo, useRef, useState, type ChangeEvent } from "react";
import { toast } from "sonner";
import {
  ArrowUpRight,
  FileText,
  Loader2,
  MessageCircle,
  Paperclip,
  PlayCircle,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { aiSystemPrompts } from "@/data/mockData";
import { analyzeContract, type ContractAnalysis } from "@/services/ai";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
};

const contractTypes = ["Fotografía", "Hotel", "Legal", "Catering"] as const;

export function ContractsPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedType, setSelectedType] =
    useState<(typeof contractTypes)[number]>("Fotografía");
  const [file, setFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<ContractAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [prompt, setPrompt] = useState("");

  const costInsights = useMemo(() => {
    if (!analysis) return [];
    const insights = [];
    if (analysis.totalCost) {
      insights.push({
        label: "Costo total",
        value: analysis.totalCost,
      });
    }
    if (analysis.keyDates?.length) {
      insights.push({
        label: "Fechas clave",
        value: analysis.keyDates.join(" · "),
      });
    }
    return insights;
  }, [analysis]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newFile = event.target.files?.[0];
    if (!newFile) return;
    setFile(newFile);
    setAnalysis(null);
    toast.success("Contrato cargado", {
      description: newFile.name,
    });
  };

  const handleAnalyze = async () => {
    if (!file) {
      toast.error("Sube un contrato para iniciar el análisis.");
      return;
    }
    setIsAnalyzing(true);
    try {
      const response = await analyzeContract(file);
      setAnalysis(response);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: `He analizado el contrato **${response.vendor}**. ${response.summary}`,
          timestamp: new Date().toISOString(),
        },
      ]);
      toast.success("Análisis completado", {
        description: "Se extrajeron costos y cláusulas relevantes.",
      });
    } catch (error) {
      console.error(error);
      toast.error("No fue posible analizar el contrato.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSendPrompt = () => {
    if (!prompt.trim()) return;
    const question = prompt.trim();
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: "user",
        content: question,
        timestamp: new Date().toISOString(),
      },
    ]);
    setPrompt("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: buildAssistantResponse(question, analysis),
          timestamp: new Date().toISOString(),
        },
      ]);
    }, 800);
  };

  return (
    <div className="container space-y-8 py-10">
      <header className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-white/50 px-3 py-1 text-xs uppercase tracking-[0.35em] text-foreground/60">
            The Planners AI · Motor local
          </span>
          <h1 className="mt-3 font-display text-3xl text-foreground md:text-4xl">
            Gestión inteligente de contratos
          </h1>
          <p className="text-sm text-foreground/60">
            Sube contratos de tus proveedores destino, extrae costos y conversa con la IA para revisar condiciones clave.
          </p>
        </div>
        <Card className="max-w-sm border border-border/60 bg-white/75">
          <CardHeader className="space-y-2">
            <CardTitle>Prompt del sistema</CardTitle>
            <CardDescription>{aiSystemPrompts.contract}</CardDescription>
          </CardHeader>
        </Card>
      </header>

      <section className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
        <Card className="border border-border/60 bg-white/75">
          <CardHeader>
            <CardTitle>Sube contratos y ejecuta análisis</CardTitle>
            <CardDescription>
              Arrastra o selecciona PDF/Docx. Gemini detecta pagos, fechas clave y cláusulas de cancelación.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {contractTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                    selectedType === type
                      ? "bg-primary/30 text-primary"
                      : "bg-white/50 text-foreground/60 hover:bg-white/70"
                  }`}
                  type="button"
                >
                  {type}
                </button>
              ))}
            </div>
            <div
              className="flex flex-col items-center justify-center rounded-[30px] border border-dashed border-border/70 bg-white/60 p-8 text-center shadow-inner"
              onClick={handleUploadClick}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter") handleUploadClick();
              }}
            >
              <Paperclip className="mb-3 h-8 w-8 text-primary" />
              <p className="text-sm font-semibold text-foreground">
                {file ? file.name : "Arrastra aquí tu contrato o haz clic para buscar"}
              </p>
              <p className="text-xs text-foreground/50">
                Formatos admitidos: PDF, DOCX, máximo 10MB
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="hero" onClick={handleAnalyze} disabled={isAnalyzing || !file}>
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analizando...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Analizar contrato
                  </>
                )}
              </Button>
              <Button variant="glass" disabled={!analysis} onClick={() => window.print()}>
                <FileText className="mr-2 h-4 w-4" />
                Descargar reporte
              </Button>
            </div>
            {analysis && (
              <div className="rounded-[24px] bg-white/60 p-4 text-sm text-foreground/70 shadow-inner">
                <p className="text-xs uppercase tracking-wide text-foreground/50">
                  Resumen
                </p>
                <p className="mt-2 text-foreground">{analysis.summary}</p>
                <ul className="mt-4 list-disc space-y-2 pl-5">
                  {analysis.clauses.map((clause) => (
                    <li key={clause.title}>
                      <span className="font-semibold text-foreground">{clause.title}:</span>{" "}
                      {clause.insight}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border border-border/60 bg-white/75">
          <CardHeader>
            <CardTitle>Conversación con IA</CardTitle>
            <CardDescription>
              Haz preguntas sobre pagos, penalizaciones o cláusulas especiales. La IA responde con contexto del contrato.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex h-full flex-col gap-4">
            <ScrollArea className="flex-1 rounded-3xl border border-border/60 bg-white/60 p-4 shadow-inner">
              <div className="space-y-4">
                {messages.length === 0 && (
                  <div className="rounded-2xl border border-dashed border-border/60 bg-white/50 p-6 text-sm text-foreground/50">
                    Aún no hay mensajes. Analiza un contrato o envía tu primera pregunta.
                  </div>
                )}
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "rounded-2xl p-4 text-sm shadow-sm",
                      message.role === "assistant"
                        ? "bg-primary/10 text-foreground"
                        : "bg-white text-foreground/70",
                    )}
                  >
                    <p className="text-xs uppercase tracking-wide text-foreground/40">
                      {message.role === "assistant" ? "The Planners AI" : "Planner"}
                    </p>
                    <p className="mt-1 whitespace-pre-line leading-relaxed">
                      {message.content}
                    </p>
                    <p className="mt-3 text-[10px] uppercase tracking-wide text-foreground/30">
                      {new Date(message.timestamp).toLocaleTimeString("es-MX", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="rounded-3xl border border-border/60 bg-white/70 p-3 shadow-inner">
              <Textarea
                placeholder="¿Cuáles son las penalizaciones por cancelación tardía?"
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                rows={3}
              />
              <div className="mt-3 flex flex-wrap justify-between gap-3">
                <div className="flex gap-2 text-xs text-foreground/40">
                  <span className="flex items-center gap-1">
                    <MessageCircle className="h-3.5 w-3.5" />
                    Gemini Flash
                  </span>
                  <span className="flex items-center gap-1">
                    <PlayCircle className="h-3.5 w-3.5" />
                    Conversación contextual
                  </span>
                </div>
                <Button variant="hero" size="sm" onClick={handleSendPrompt}>
                  Enviar pregunta
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            {costInsights.length > 0 && (
              <div className="rounded-[24px] border border-border/60 bg-white/60 p-4 text-sm shadow-inner">
                <p className="text-xs uppercase tracking-wide text-foreground/40">
                  Costos detectados
                </p>
                <ul className="mt-3 space-y-2">
                  {costInsights.map((insight) => (
                    <li key={insight.label} className="flex justify-between">
                      <span className="font-semibold text-foreground">
                        {insight.label}
                      </span>
                      <span className="text-foreground/70">{insight.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function buildAssistantResponse(question: string, analysis: ContractAnalysis | null) {
  if (!analysis) {
    return "Primero analiza un contrato para obtener respuestas contextualizadas. También puedo darte recomendaciones generales sobre contratos de proveedores.";
  }
  const lower = question.toLowerCase();
  if (analysis.totalCost && lower.includes("costo")) {
    return `El costo total acordado es ${analysis.totalCost}. Verifica si incluye impuestos y gastos adicionales en las cláusulas del proveedor.`;
  }
  if (analysis.keyDates && analysis.keyDates.length > 0 && lower.includes("fecha")) {
    return `Fechas relevantes: ${analysis.keyDates.join(
      ", ",
    )}. Te sugiero automatizar recordatorios para cada hito.`;
  }
  const clause = analysis.clauses.find((item) =>
    lower.includes(item.title.toLowerCase()),
  );
  if (clause) {
    return `${clause.title}: ${clause.insight}`;
  }
  return `${analysis.summary}\n\nCláusulas destacadas:\n${analysis.clauses
    .map((item) => `• ${item.title}: ${item.insight}`)
    .join("\n")}`;
}
