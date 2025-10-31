The Planners — Plataforma para bodas destino
================================================

Stack: Next.js 16 (App Router), TypeScript, Tailwind v4, Prisma ORM (SQLite dev), NextAuth (credenciales + middleware), API Routes, OpenAI/Twilio opcional.

Características incluidas (MVP):
- Dashboard y secciones: Invitados, Vuelos, Hoteles, Contratos, Asientos, Álbum, Redes, Templates, Precios, Sitio (preview).
- API para: generar códigos de invitación, buscar hoteles (mock), asistente IA (OpenAI), WhatsApp (Twilio).
- Autenticación con NextAuth (credenciales) y protección de rutas (`/dashboard`, `/guests`, etc.).
- Esquema de base de datos con Prisma para usuarios, empresas, bodas, invitados, hoteles, reservas, vuelos, contratos, pagos y más.

Requisitos
---------
- Node.js 18+
- Opcional: cuenta OpenAI (para IA) y Twilio (para WhatsApp).

Configuración rápida
-------------------
1) Copia variables de entorno y edítalas:

```
cp .env.example .env
```

   - Genera un secreto para NextAuth (ejemplo: `openssl rand -base64 32`).

2) Genera el cliente Prisma (ORM):

```
npm run db:generate
```

3) Crea la base de datos (si falla, puedes saltarlo y usar la app sin persistencia por ahora):

```
npm run db:push
```

4) Levanta el entorno de desarrollo:

```
npm run dev
```

5) Abre http://localhost:3000

Semillas (demo)
--------------
- Una vez creada la BD, puedes sembrar datos demo:

```
npm run db:seed
```

- Usuario demo (credenciales): `planner@demo.test / demo1234`

Rutas API útiles
---------------
- POST `api/codes` → genera códigos para invitados. Body: `{ weddingId?, email? }`
- GET `api/hotels/search?q=cancun` → hoteles ejemplo (mock).
- POST `api/assistant` → asistente IA. Body: `{ prompt }` (requiere `OPENAI_API_KEY`).
- POST `api/whatsapp` → envía mensajes por WhatsApp vía Twilio (requiere credenciales).

Siguientes pasos sugeridos
-------------------------
- Mejorar onboarding de invitados (self-service) y roles (planner, asistente, pareja, invitado).
- Conectar pagos reales (Stripe) y emisión de vuelos/hotel con proveedores.
- Editor de contratos y firma electrónica (firmas, totales automáticos IA).
- Generador de sitio para invitados con CMS ligero y botón de preview en vivo.
- Integrar almacenamiento de imágenes (S3, Cloudinary) para el álbum.

Notas Prisma
-----------
- `npx prisma validate` confirma el esquema, pero si `npm run db:push` muestra “Schema engine error” vuelve a intentar tras reinstalar dependencias (`rm -rf node_modules && npm i`), o modifica `prisma.config.ts` para quitar la clave `engine`.

Publicación en GitHub & preview
-------------------------------
1) Inicializa Git y enlaza el repositorio remoto (reemplaza `<tu-usuario>` si corresponde):

```
git init
git add .
git commit -m "feat: base de The Planners"
git branch -M main
git remote add origin https://github.com/<tu-usuario>/The-Planners-Software.git
git push -u origin main
```

2) En GitHub, habilita GitHub Pages o conecta con Vercel para previsualizar la app:
   - **Vercel**: Importa el repo “The Planners Software”, agrega variables de entorno (`NEXTAUTH_SECRET`, `OPENAI_API_KEY`, etc.) y haz deploy; la URL generada servirá como vista previa.
   - **GitHub Pages**: Ejecuta `npm run build` y publica `/out` (usa `next export` si planeas un sitio estático; para pleno soporte SSR se recomienda Vercel).

3) Añade un README en GitHub con capturas (`npm run dev` para generar screenshots) y, opcionalmente, configura un workflow de CI con GitHub Actions para ejecutar `npm run build` en cada push.
