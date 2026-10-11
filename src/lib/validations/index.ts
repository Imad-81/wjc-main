import { z } from "zod"

// -----------------------------------------------------------------
// Events Schemas
// -----------------------------------------------------------------
export const eventTabEnum = z.enum(["culture", "delegations", "outreach", "next"])
export const eventFilterEnum = z.enum(["cultural", "academic", "festival"])

export const eventCreateSchema = z.object({
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  tab: eventTabEnum.default("culture"),
  filter: eventFilterEnum.default("cultural"),
  isoDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must follow YYYY-MM-DD format (e.g. 2026-04-15)"),
  displayDateEn: z.string().optional(),
  displayDateJa: z.string().optional(),
  categoryEn: z.string().default("Cultural"),
  categoryJa: z.string().default("文化"),
  titleEn: z.string().min(1, "English title is required"),
  titleJa: z.string().optional(),
  descriptionEn: z.string().default(""),
  descriptionJa: z.string().optional(),
  fullDescriptionEn: z.string().optional(),
  fullDescriptionJa: z.string().optional(),
  images: z.union([z.array(z.string()), z.string()]).transform((val) => {
    if (Array.isArray(val)) return val
    return val ? [val] : []
  }),
  locationEn: z.string().nullable().optional(),
  locationJa: z.string().nullable().optional(),
  timeEn: z.string().nullable().optional(),
  timeJa: z.string().nullable().optional(),
  isUpcoming: z.boolean().default(false),
  registrationOpen: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  statusEn: z.string().nullable().optional(),
  statusJa: z.string().nullable().optional(),
  posterSrc: z.string().nullable().optional(),
  displayOrder: z.coerce.number().default(0),
})

export const eventUpdateSchema = eventCreateSchema.partial()

// -----------------------------------------------------------------
// Gallery Schemas
// -----------------------------------------------------------------
export const galleryCategoryEnum = z.enum(["festivals", "cultural", "academic"])
export const gallerySpanEnum = z.enum(["tall", "wide", "square"])

export const galleryCreateSchema = z.object({
  src: z.string().min(1, "Image source URL is required"),
  category: galleryCategoryEnum.default("festivals"),
  titleEn: z.string().min(1, "English title is required"),
  titleJa: z.string().optional(),
  dateEn: z.string().default("2026"),
  dateJa: z.string().default("2026年"),
  altEn: z.string().optional(),
  altJa: z.string().optional(),
  span: gallerySpanEnum.default("square"),
  displayOrder: z.coerce.number().default(0),
})

export const galleryUpdateSchema = galleryCreateSchema.partial()

// -----------------------------------------------------------------
// Team Schemas
// -----------------------------------------------------------------
export const teamCategoryEnum = z.enum(["faculty", "student"])

export const teamCreateSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Full name is required"),
  roleEn: z.string().min(1, "English role is required"),
  roleJa: z.string().optional(),
  subtitleEn: z.string().default("Woxsen University"),
  subtitleJa: z.string().default("ウォクセン大学"),
  image: z.string().min(1, "Portrait image URL is required"),
  bioEn: z.string().nullable().optional(),
  bioJa: z.string().nullable().optional(),
  category: teamCategoryEnum.default("faculty"),
  scale: z.string().nullable().optional(),
  hoverScale: z.string().nullable().optional(),
  position: z.string().nullable().optional(),
  displayOrder: z.coerce.number().default(0),
})

export const teamUpdateSchema = teamCreateSchema.partial()

// -----------------------------------------------------------------
// Lead Capture Schemas
// -----------------------------------------------------------------
export const newsletterSubscribeSchema = z.object({
  email: z.string().email("Please provide a valid email address"),
  locale: z.enum(["en", "ja"]).default("en"),
})

export const eventRegistrationSchema = z.object({
  eventId: z.string().optional(),
  slug: z.string().min(1, "Event slug is required"),
  name: z.string().min(1, "Your full name is required"),
  email: z.string().email("Please provide a valid email address"),
  phone: z.string().optional(),
  locale: z.enum(["en", "ja"]).default("en"),
  notes: z.string().optional(),
})
