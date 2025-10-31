import { photoCollections } from "@/data/mockData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UploadCloud, Share2, Download } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

export function PhotosPage() {
  return (
    <div className="container space-y-8 py-10">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl text-foreground">Álbum de fotos</h1>
          <p className="text-sm text-foreground/60">
            Organiza colecciones, comparte galerías y ofrece descargas listas para tus parejas.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="glass">
            <UploadCloud className="mr-2 h-4 w-4" />
            Subir colección
          </Button>
          <Button variant="hero">Nueva galería</Button>
        </div>
      </header>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {photoCollections.map((collection) => (
          <Card
            key={collection.id}
            className="flex h-full flex-col overflow-hidden border border-border/60 bg-white/70"
          >
            <div className="relative h-48 w-full">
              <img
                src={collection.image}
                alt={collection.title}
                className="h-full w-full object-cover"
              />
              <Badge
                variant="outline"
                className="absolute left-4 top-4 bg-white/70 text-foreground shadow-inner"
              >
                {collection.photoCount} fotos
              </Badge>
            </div>
            <CardHeader>
              <CardTitle>{collection.title}</CardTitle>
              <CardDescription>
                Actualizado{" "}
                {formatDistanceToNow(new Date(collection.updatedAt), {
                  addSuffix: true,
                  locale: es,
                })}
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button variant="glass" size="sm" className="flex-1">
                  <UploadCloud className="mr-2 h-4 w-4" />
                  Añadir fotos
                </Button>
                <Button variant="glass" size="sm" className="flex-1">
                  <Share2 className="mr-2 h-4 w-4" />
                  Compartir
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  Descargar
                </Button>
              </div>
              <p className="text-xs text-foreground/60">
                Comparte enlaces protegidos con contraseña, personaliza la portada y permite descargas individuales o en lote.
              </p>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
