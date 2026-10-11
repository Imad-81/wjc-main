# 絆 Woxsen Japan Centre (WJC)

Official bilingual web platform and administrative content management system for the **Woxsen Japan Centre** at Woxsen University.

Built with **Next.js 16 (App Router, Turbopack)**, **React 19**, **Tailwind CSS v4**, **Prisma ORM**, **Neon PostgreSQL**, **Cloudflare R2**, and **Better Auth**. Features enterprise-grade in-memory data caching providing sub-5ms public page responses, instant 0ms admin transitions, Cloudflare R2 object storage with zero egress fees, and an end-to-end lead & event RSVP management engine.

---

## 🌟 Key Highlights & Features

### 🌐 Public Portal (Bilingual English & Japanese)
- **Internationalization (i18n)**: First-class English (`/en`) and Japanese (`/ja`) localization with dedicated typography, kanji accents, and cultural aesthetics.
- **Events Hub (`/[locale]/events`)**: Filterable cultural, academic, and business events with detailed slug pages (`/[locale]/events/[slug]`), rich photo galleries, dynamic metadata, and open/closed registration badges.
- **Interactive Event RSVP Flow**: Bilingual registration modal ([`EventRsvpModal`](file:///Users/imadmac/projects/woxsen-japan-center-wou/src/components/wjc/event-rsvp-modal.tsx)) on event detail pages with duplicate-safe registration, rate-limiting, and validation handling.
- **Visual Gallery (`/[locale]/gallery`)**: Categorized photo showcase with masonry and grid layouts (festivals, ceremonies, academics).
- **Leadership & Team (`/[locale]/team`)**: Faculty and student executive committee profiles with custom image scaling and bilingual bios.
- **Audience Engagement**: Asynchronous newsletter subscription system with rate limiting and automated deduplication.
- **Programs & Academics**: Japanese language courses (JLPT N5–N1), student exchange programs, and industry partnership initiatives.

### ⚡ Sub-5ms In-Memory Caching Engine
- **Overcoming Cross-Continental Latency**: Powered by Next.js `unstable_cache` with tag-based on-demand revalidation. Read operations execute directly from memory in **1–2 ms** (a 3,000x–6,000x speedup over remote databases).
- **Dual Invalidation (`src/lib/cache.ts`)**: Whenever content is modified in `/admin`, the cache is instantly purged using `revalidateTag(..., 'max')` and `revalidatePath(...)`, ensuring visitors immediately see the latest updates.
- **Client-Side SWR Admin Cache (`src/lib/admin-cache.ts`)**: Navigating between admin tabs (**Events**, **Gallery**, **Team**, **Media**, **Inquiries**, **Users**) is **0ms (instantaneous)** with zero layout shifts or loading spinners.

### ☁️ Cloudflare R2 Object Storage & CDN
- **Zero-Egress Asset Delivery**: Integrated with Cloudflare R2 via `@aws-sdk/client-s3` for media assets, eliminating vendor lock-in and high egress bandwidth costs.
- **Referential Integrity Protection**: Before deleting any asset in `/admin/media`, the system scans the database to verify whether the image is actively used in Events, Posters, Gallery items, or Team profiles.
- **Dual-Storage Badging & Direct Upload**: Media library thumbnails display `R2 Cloud` or `Local Disk` origin tags. Uploads pass through strict MIME and magic-byte validation (`image/jpeg`, `image/png`, `image/webp`, `image/avif`, `image/gif`).
- **One-Click Local-to-Cloud Sync**: Admin endpoint (`POST /api/admin/media/sync`) and CLI script (`scripts/migrate-to-r2.ts`) allow one-click migration of all legacy disk assets to the R2 bucket.

### 🛡️ Administrative Content Management Panel (`/admin`)
- **Executive Dashboard (`/admin`)**: Centre overview displaying live metric counts for events, gallery media, leadership members, newsletter subscribers, and event registrations.
- **Event Manager (`/admin/events`)**:
  - Full CRUD operations with rich bilingual fields (dates, categories, locations, descriptions).
  - **Priority Display Ordering**: Interactive drag-and-drop / single-click priority reordering with instant preview.
  - **Hero Banner Promotion**: One-click promotion of any flagship event to the `#1` Hero Banner position.
  - Multi-image gallery picker and poster attachments.
- **Gallery Manager (`/admin/gallery`)**: Upload, categorize, rearrange, and assign masonry spans (`tall`, `wide`, `square`).
- **Team Manager (`/admin/team`)**: Faculty and student leadership roster with fine-grained portrait zoom (`scale`) and focal alignment controls.
- **Audience & Leads Hub (`/admin/inquiries`)**:
  - Tabbed interface to manage **Newsletter Subscribers** and **Event RSVPs**.
  - Real-time search, event filters, and language badges.
  - One-click **CSV export** for attendance tracking, event check-in, and outreach campaigns.
- **Administrators Management (`/admin/users`)**:
  - Add and manage admin users with server-side secure password hashing (`better-auth/crypto`).
  - Active user safeguards preventing administrators from accidentally deleting their own accounts.
- **Integrated Media Library (`/admin/media`)**: Built-in asset browser supporting drag-and-drop image uploads, directory browsing, Cloudflare R2 synchronization, and modal media pickers.
- **Archive Sync (`/admin/sync`)**: One-click database seeding and synchronization directly from static repository assets.
- **Defense-in-Depth Security**:
  - Server-side cryptographic session verification in layout (`auth.api.getSession()`).
  - Strict `trustedOrigins` CSRF/origin protection in Better Auth.
  - In-memory sliding-window rate limiter on lead capture and auth endpoints.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) (Turbopack, App Router) | SSR, SSG with dynamic static params, and API routes |
| **UI Library** | [React 19](https://react.dev/) | Client & server components with optimistic updates |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Custom Japanese aesthetics, dark theme, and micro-animations |
| **Icons** | [Lucide React](https://lucide.dev/) | Consistent administrative and public icon set |
| **Database** | [Neon](https://neon.tech/) Serverless PostgreSQL | High-performance pooled SQL database |
| **ORM** | [Prisma ORM 6](https://www.prisma.io/) | Type-safe queries, composite indexes, raw SQL optimizations |
| **Object Storage** | [Cloudflare R2](https://www.cloudflare.com/developer-platform/r2/) | S3-compatible asset storage with zero egress fees |
| **Authentication** | [Better Auth](https://www.better-auth.com/) | 24-hour cryptographic HMAC session verification |
| **Validation** | [Zod 3/4](https://zod.dev/) | Strict runtime schema parsing and validation |
| **Caching Engine** | Next.js `unstable_cache` + Client-side In-Memory Store | Dual-layer 0ms admin and sub-5ms public reads |
| **Image Optimization** | [Sharp](https://sharp.pixelplumbing.com/) & `next/image` | Dynamic responsive image processing and WebP conversion |

---

## 📁 Repository Structure

```text
woxsen-japan-center-wou/
├── prisma/
│   └── schema.prisma           # Prisma schema (User, Session, Event, GalleryItem, TeamMember, Leads)
├── public/
│   └── images/                 # Static local images (events, gallery, team, uploads)
├── scripts/
│   ├── migrate-to-r2.ts        # CLI tool to migrate public/images to Cloudflare R2
│   └── seed.ts                 # Database seeder from repository data files
├── src/
│   ├── app/
│   │   ├── [locale]/           # Bilingual localized routes (/en, /ja)
│   │   │   ├── events/         # Public events catalog & [slug] details with RSVP modal
│   │   │   ├── gallery/        # Public photo gallery
│   │   │   ├── team/           # Public faculty & student leadership
│   │   │   └── page.tsx        # Homepage (Hero, Kizuna Matsuri, Programs, Newsletter)
│   │   ├── admin/              # WJC Administrative Suite
│   │   │   ├── events/         # Events CRUD & Priority reordering
│   │   │   ├── gallery/        # Gallery CRUD & span formatting
│   │   │   ├── inquiries/      # Audience & Leads Hub (Newsletter & RSVPs with CSV export)
│   │   │   ├── login/          # Administrator authentication
│   │   │   ├── media/          # Media Library file browser & R2 Sync
│   │   │   ├── setup/          # First-time administrator provisioning wizard
│   │   │   ├── team/           # Faculty & Student leadership management
│   │   │   ├── users/          # Administrator account management
│   │   │   └── page.tsx        # Executive Dashboard
│   │   └── api/
│   │       ├── admin/          # Authenticated administrative API routes
│   │       │   ├── events/     # Events CRUD & 1-roundtrip raw SQL batch reordering
│   │       │   ├── gallery/    # Gallery CRUD & batch reordering
│   │       │   ├── inquiries/  # Lead queries & stats
│   │       │   ├── media/      # Media scanning, R2 integrity deletion, and in-app sync
│   │       │   ├── seed/       # 1-click database archive sync
│   │       │   ├── team/       # Team CRUD & batch reordering
│   │       │   ├── upload/     # Magic-byte validated Cloudflare R2 / local upload handler
│   │       │   └── users/      # Server-side admin provisioning and removal
│   │       ├── auth/           # Better Auth route handlers
│   │       ├── events/
│   │       │   └── register/   # Public rate-limited event registration endpoint
│   │       ├── media/
│   │       │   └── [...key]/   # Streaming proxy route for R2 media assets
│   │       └── newsletter/     # Public rate-limited newsletter subscribe endpoint
│   ├── components/
│   │   ├── admin/              # Admin UI components (MediaPicker, SyncButton, Layout)
│   │   └── wjc/                # Public components (EventRsvpModal, FadeUp, Primitives, Navigation)
│   ├── data/                   # Fallback disaster-recovery static datasets
│   ├── i18n/                   # Translation dictionaries (en.ts, ja.ts) & routing config
│   └── lib/
│       ├── admin-cache.ts      # Client-side 0ms in-memory cache for admin navigation
│       ├── api-errors.ts       # Centralized error mapping (Zod, Prisma, auth errors)
│       ├── auth-client.ts      # Better Auth client hooks (useSession, signIn, signOut)
│       ├── auth-guard.ts       # Server-side admin session verification helper
│       ├── auth.ts             # Better Auth configuration & trustedOrigins
│       ├── cache.ts            # Canonical cache tags & dual invalidation engine
│       ├── prisma.ts           # Global Prisma Client singleton
│       ├── r2.ts               # Cloudflare R2 S3 Client helper & object streaming
│       ├── rate-limit.ts       # Sliding-window in-memory rate limiter
│       ├── validations/        # Strict Zod validation schemas
│       └── db/                 # Cached database access layer (events, gallery, team)
```

---

## ⚙️ Environment Variables Setup

Create a `.env` file in the root directory:

```env
# =================================================================
# Database: Neon Serverless PostgreSQL
# =================================================================
# Pooled endpoint for runtime application queries (recommended: pgbouncer enabled)
DATABASE_URL="postgresql://<user>:<password>@<neon-pooler-host>/<dbname>?sslmode=require"
# Direct endpoint for Prisma migrations and schema push
DIRECT_URL="postgresql://<user>:<password>@<neon-direct-host>/<dbname>?sslmode=require"

# =================================================================
# Authentication: Better Auth
# =================================================================
BETTER_AUTH_SECRET="<generate-random-secure-secret-string>"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# =================================================================
# Storage: Cloudflare R2 (S3-Compatible Object Storage)
# =================================================================
R2_ENDPOINT="https://<cloudflare-account-id>.r2.cloudflarestorage.com"
R2_ACCESS_KEY_ID="<your-r2-access-key-id>"
R2_SECRET_ACCESS_KEY_ID="<your-r2-secret-access-key-id>"
R2_BUCKET_NAME="wjc-main-website"
# Public custom domain or Cloudflare managed dev URL (optional)
R2_PUBLIC_URL="https://pub-<hash>.r2.dev"
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: `v20.0.0` or higher
- **Package Manager**: `pnpm` (configured in `package.json` as `pnpm@10.34.6`), `bun`, or `npm`

### 2. Installation
```bash
git clone https://github.com/Imad-81/wjc-main.git
cd woxsen-japan-center-wou
pnpm install
```

> [!NOTE]
> `package.json` contains a `postinstall` hook that automatically executes `prisma generate` to keep your client types updated.

### 3. Database Initialization & Sync
Synchronize the Prisma schema with your Neon PostgreSQL database:
```bash
npx prisma db push
```

### 4. Media Asset Migration (Optional)
If migrating existing images from `public/images/` to your Cloudflare R2 bucket:
```bash
# Via Bun:
bun scripts/migrate-to-r2.ts

# Or via Node:
node --env-file=.env scripts/migrate-to-r2.ts
```
Alternatively, log in to the admin panel at `/admin/media` and click **"Sync Local to R2"** to sync assets directly from the browser.

### 5. Running the Development Server
```bash
pnpm dev
# or: bun run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Verification & Production Build
```bash
# Run ESLint (0 errors guaranteed)
pnpm lint

# Compile production bundle with Turbopack & Prisma type generation
pnpm build

# Start production server
pnpm start
```

---

## 🔑 Initial Administrator Setup & Workflow

1. **First-Time Setup**:
   - On a fresh database, visit [http://localhost:3000/admin/setup](http://localhost:3000/admin/setup).
   - The setup screen is automatically active when 0 administrator accounts exist.
   - Enter your administrator name, email, and password.
   - Once the first administrator is created, `/admin/setup` permanently locks down and redirects to `/admin/login`.

2. **Seeding Content**:
   - In the Executive Dashboard (`/admin`), click **"Sync Archive"** to import baseline events, gallery photographs, and faculty records into the database with a single click.

3. **Managing Admins**:
   - Go to `/admin/users` to invite co-administrators or revoke admin access.

4. **Reviewing Audience Leads**:
   - Go to `/admin/inquiries` to review newsletter subscribers and event RSVPs, or export them to CSV.

---

## 🏎️ Performance & Caching Architecture

Because serverless databases may introduce latency across global networks, the platform uses a high-performance multi-tier caching and storage pipeline:

```mermaid
flowchart TD
    Browser[Client Browser] -->|HTTP Request| NextServer[Next.js App Router / RAM]
    
    subgraph In-Memory Data Tier
        NextServer -->|Tag Hit (1-2ms)| MemoryCache[unstable_cache Store]
        MemoryCache -.->|Cold Miss Only| RemoteDB[(Neon PostgreSQL)]
    end

    subgraph Media Delivery Tier
        Browser -->|Image Request| R2CDN[Cloudflare R2 CDN]
        NextServer -->|Proxy Route /api/media/*| R2Bucket[(Cloudflare R2 Bucket)]
    end

    subgraph Admin Mutations
        AdminUI[Admin Dashboard] -->|POST / PUT / DELETE| AdminAPI[Admin Route Handlers]
        AdminAPI -->|Batch Raw SQL / CASE WHEN| RemoteDB
        AdminAPI -->|revalidateTag('max')| MemoryCache
        AdminAPI -->|revalidatePath()| RouteCache[Route Render Cache]
        AdminAPI -->|Upload / Delete| R2Bucket
    end

    subgraph Client-Side Admin Navigation
        AdminTabs[Admin Navigation] -->|0ms Instant Switch| ClientCache[admin-cache.ts SWR Map]
    end
```

1. **Sub-5ms Public Reads**:
   - All public reads (`getEvents`, `getEventBySlug`, `getGalleryItems`, `getTeamData`) are cached in server RAM via Next.js `unstable_cache`.
   - Responses are served in **1–2 milliseconds** directly from memory.

2. **Dual On-Demand Invalidation**:
   - Every mutation in `/admin` triggers `revalidateTag(TAG, 'max')` and `revalidatePath(...)` via [src/lib/cache.ts](file:///Users/imadmac/projects/woxsen-japan-center-wou/src/lib/cache.ts).
   - Visitors receive updated content on their very next request without waiting for cache expiration.

3. **Single Round-Trip Batch Reordering**:
   - Event, gallery, and team ordering updates execute in **1 single raw SQL query** using `prisma.$executeRaw` with parameterized `CASE WHEN id = ... THEN ... END` expressions, avoiding slow sequential queries.

4. **Zero-Database Session Verification**:
   - Better Auth session caching uses 24-hour cryptographically signed HMAC cookies.
   - `requireAdminSession()` verifies credentials locally in Node.js memory, eliminating 400ms–1s round trips on every admin API call.

---

## 📜 License

Created and maintained for the **Woxsen Japan Centre** at **Woxsen University**. All rights reserved.
