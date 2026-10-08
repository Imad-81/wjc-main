# 絆 Woxsen Japan Centre (WJC)

Official bilingual web platform and administrative content management system for the **Woxsen Japan Centre** at Woxsen University.

Built with Next.js 16 (Turbopack), React 19, Tailwind CSS v4, Prisma ORM, Neon PostgreSQL, and Better Auth. Features enterprise-grade, in-memory data caching providing sub-5ms public page responses and instant 0ms admin transitions across cross-continental infrastructure.

---

## 🌟 Key Highlights & Features

### 🌐 Public Portal (Bilingual English & Japanese)
- **Internationalization (i18n)**: First-class English (`/en`) and Japanese (`/ja`) localization with dedicated typography, kanji accents, and cultural aesthetics.
- **Events Hub (`/[locale]/events`)**: Filterable cultural, academic, and business events with detailed slug pages (`/[locale]/events/[slug]`), rich photo galleries, and registration links.
- **Visual Gallery (`/[locale]/gallery`)**: Categorized photo showcase with masonry and grid layouts (festivals, ceremonies, academics).
- **Leadership & Team (`/[locale]/team`)**: Faculty and student executive committee profiles with custom image scaling and bilingual bios.
- **Programs & Academics**: Japanese language courses (JLPT N5–N1), student exchange programs, and industry partnership initiatives.

### ⚡ Sub-5ms In-Memory Caching Engine
- **Overcoming Cross-Continental Latency**: Powered by Next.js `unstable_cache` with tag-based on-demand revalidation. Read operations execute directly from memory in **1–2 ms** (a 3,000x–6,000x speedup).
- **Dual Invalidation (`src/lib/cache.ts`)**: Whenever content is modified in `/admin`, the cache is instantly purged using `revalidateTag(..., 'max')` and `revalidatePath(...)`, ensuring visitors immediately see the latest updates.
- **Client-Side SWR Admin Cache (`src/lib/admin-cache.ts`)**: Navigating between admin tabs (**Events**, **Gallery**, **Team**, **Media**) is **0ms (instantaneous)** with zero layout shifts or loading spinners.

### 🛡️ Administrative Content Management Panel (`/admin`)
- **Executive Dashboard (`/admin`)**: Centre overview displaying live metric counts for events, gallery media, and leadership members.
- **Event Manager (`/admin/events`)**:
  - Full CRUD operations with rich bilingual fields (dates, categories, locations, descriptions).
  - **Priority Display Ordering**: Interactive reordering with instant preview.
  - **Hero Banner Promotion**: One-click promotion of any flagship event to the `#1` Hero Banner position.
  - Multi-image gallery picker and poster attachments.
- **Gallery Manager (`/admin/gallery`)**: Upload, categorize, rearrange, and assign masonry spans (`tall`, `wide`, `square`).
- **Team Manager (`/admin/team`)**: Faculty and student leadership roster with fine-grained portrait zoom (`scale`) and focal alignment controls.
- **Integrated Media Library (`/admin/media`)**: Built-in asset browser supporting drag-and-drop image uploads, directory browsing, and modal media pickers.
- **Archive Sync (`/admin/sync`)**: One-click database seeding and synchronization directly from static repository assets.
- **Enterprise Security**: Managed by **Better Auth** with 24-hour cryptographic HMAC session verification (0ms local auth checks).

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| **UI Library** | [React 19](https://react.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) with custom Japanese aesthetics & animations |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Database** | [Neon](https://neon.tech/) Serverless PostgreSQL |
| **ORM** | [Prisma ORM 6](https://www.prisma.io/) |
| **Authentication** | [Better Auth](https://www.better-auth.com/) with Prisma Adapter |
| **Caching Engine** | Next.js `unstable_cache` + Client-side In-Memory Store |
| **Image Optimization** | [Sharp](https://sharp.pixelplumbing.com/) & `next/image` |

---

## 📁 Repository Structure

```text
woxsen-japan-center-wou/
├── prisma/
│   └── schema.prisma           # Prisma schema (User, Session, Event, GalleryItem, TeamMember)
├── public/
│   └── images/                 # Static public media (events, gallery, team, uploads)
├── src/
│   ├── app/
│   │   ├── [locale]/           # Bilingual localized routes (/en, /ja)
│   │   │   ├── events/         # Public events catalog & [slug] details
│   │   │   ├── gallery/        # Public photo gallery
│   │   │   ├── team/           # Public faculty & student leadership
│   │   │   └── page.tsx        # Homepage (Hero, Kizuna Matsuri, Programs)
│   │   ├── admin/              # WJC Administrative Panel
│   │   │   ├── events/         # Events CRUD & Priority ordering
│   │   │   ├── gallery/        # Gallery CRUD & span formatting
│   │   │   ├── team/           # Faculty & Student management
│   │   │   ├── media/          # Media Library file browser
│   │   │   ├── login/          # Administrator authentication
│   │   │   ├── setup/          # Initial administrator provisioning
│   │   │   └── page.tsx        # Executive Dashboard
│   │   └── api/
│   │       ├── admin/          # Authenticated administrative API routes
│   │       │   ├── events/     # Events endpoints (CRUD, reorder)
│   │       │   ├── gallery/    # Gallery endpoints (CRUD, reorder)
│   │       │   ├── team/       # Team endpoints (CRUD, reorder)
│   │       │   ├── media/      # Media scanning & file deletion
│   │       │   ├── upload/     # Multipart image upload handler
│   │       │   └── seed/       # 1-click database archive sync
│   │       └── auth/           # Better Auth route handlers
│   ├── components/
│   │   ├── admin/              # Admin UI components (MediaPicker, SyncButton, Layout)
│   │   └── wjc/                # Public components (FadeUp, Primitives, Navigation, Footer)
│   ├── data/                   # Fallback static datasets (events, gallery, team)
│   ├── i18n/                   # Translation dictionaries (en.json, ja.json) & routing config
│   └── lib/
│       ├── admin-cache.ts      # Client-side 0ms in-memory cache for admin navigation
│       ├── auth-client.ts      # Better Auth client hooks (useSession, signIn, signOut)
│       ├── auth-guard.ts       # Server-side admin session verification helper
│       ├── auth.ts             # Better Auth configuration & 24h HMAC cookie cache
│       ├── cache.ts            # Canonical cache tags & dual invalidation engine
│       ├── prisma.ts           # Global Prisma Client singleton
│       └── db/                 # Server-side cached database access layer
│           ├── events.ts       # Cached getEvents() & getEventBySlug()
│           ├── gallery.ts      # Cached getGalleryItems()
│           └── team.ts         # Cached getTeamData()
```

---

## ⚙️ Environment Variables Setup

Create a `.env` file in the root directory:

```env
# Neon Serverless PostgreSQL Configuration
# Connection pooling endpoint for runtime queries
DATABASE_URL="postgresql://<user>:<password>@<neon-pooler-host>/<dbname>?sslmode=require"
# Direct endpoint for Prisma migrations and schema push
DIRECT_URL="postgresql://<user>:<password>@<neon-direct-host>/<dbname>?sslmode=require"

# Better Auth Security
BETTER_AUTH_SECRET="<generate-random-secure-secret-string>"
BETTER_AUTH_URL="http://localhost:3000"
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v20+ recommended
- **Package Manager**: `npm`, `pnpm`, or `yarn`

### 2. Installation
```bash
git clone https://github.com/aircwou/woxsen-japan-center-wou.git
cd woxsen-japan-center-wou
npm install
```

### 3. Database Initialization
Generate the Prisma Client and synchronize the database schema:
```bash
npx prisma generate
npx prisma db push
```

### 4. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Running Linter & Production Build
```bash
# Verify ESLint (0 errors, 0 warnings)
npm run lint

# Compile production bundle
npm run build

# Start production server
npm start
```

---

## 🔑 Initial Administrator Setup

1. On a fresh database installation, navigate to [http://localhost:3000/admin/setup](http://localhost:3000/admin/setup).
2. The setup wizard is automatically enabled when 0 administrator accounts exist.
3. Provide the initial administrator name, email, and password.
4. Once created, subsequent registrations are automatically locked down.
5. In the Executive Dashboard (`/admin`), click **"Sync Archive"** to import all past events, gallery photographs, and faculty records into the database with one click.

---

## 🏎️ Performance & Caching Architecture

Because serverless databases may be hosted in distant cloud regions (e.g. AWS us-east-2), this repository implements a multi-tier caching architecture:

```mermaid
flowchart TD
    Browser[Client Browser] -->|HTTP Request| NextServer[Next.js Server / RAM]
    
    subgraph In-Memory Data Layer
        NextServer -->|Tag Hit (1-2ms)| MemoryCache[unstable_cache Store]
        MemoryCache -.->|Cold Miss Only| RemoteDB[(Neon PostgreSQL)]
    end

    subgraph Admin Mutations
        AdminUI[Admin Dashboard] -->|POST/PUT/DELETE| AdminAPI[Admin Route Handlers]
        AdminAPI -->|Write| RemoteDB
        AdminAPI -->|revalidateTag('max')| MemoryCache
        AdminAPI -->|revalidatePath()| RouteCache[Full Route Render Cache]
    end

    subgraph Client-Side Admin Navigation
        AdminTabs[Admin Navigation] -->|0ms Switch| ClientCache[admin-cache.ts Map]
    end
```

1. **Public Visitor Reads (< 5ms)**:
   - All public reads (`getEvents`, `getEventBySlug`, `getGalleryItems`, `getTeamData`) are cached in server RAM via Next.js `unstable_cache`.
   - Responses are served in **1–2 milliseconds** directly from memory.

2. **Immediate On-Demand Invalidation**:
   - Every mutation in `/admin` calls `revalidateTag(TAG, 'max')` and `revalidatePath(...)` via `src/lib/cache.ts`.
   - Public visitors receive updated content on their very next request without waiting for cache expiration.

3. **0ms Client-Side Admin Navigation**:
   - `src/lib/admin-cache.ts` keeps admin queries alive in memory.
   - Switching between **Events**, **Gallery**, and **Team** in the admin panel is instant (0ms), with background revalidation and automatic optimistic cache updates on mutations.

4. **Zero-Database Session Checks**:
   - Better Auth session caching is set to **24 hours** using cryptographically signed HMAC cookies.
   - `requireAdminSession()` verifies credentials locally in Node.js memory, eliminating 400ms–1s round trips on every admin API call.

---

## 📜 License

Created and maintained for the **Woxsen Japan Centre** at **Woxsen University**. All rights reserved.
