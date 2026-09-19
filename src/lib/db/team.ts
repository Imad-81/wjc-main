import { prisma } from "@/lib/prisma"
import { faculty as staticFaculty, studentLeadership as staticStudents, type TeamMember } from "@/data/team"

export async function getTeamData(): Promise<{
  faculty: TeamMember[]
  studentLeadership: TeamMember[]
}> {
  try {
    const dbMembers = await prisma.teamMember.findMany({
      orderBy: [{ displayOrder: "asc" }, { createdAt: "asc" }],
    })

    if (dbMembers.length === 0) {
      return {
        faculty: staticFaculty,
        studentLeadership: staticStudents,
      }
    }

    const mapMember = (m: (typeof dbMembers)[0]): TeamMember => ({
      id: m.id,
      name: m.name,
      role: { en: m.roleEn, ja: m.roleJa },
      subtitle: { en: m.subtitleEn, ja: m.subtitleJa },
      image: m.image,
      bio: m.bioEn ? { en: m.bioEn, ja: m.bioJa || m.bioEn } : undefined,
      scale: m.scale || undefined,
      hoverScale: m.hoverScale || undefined,
      position: m.position || undefined,
    })

    const faculty = dbMembers.filter((m) => m.category === "faculty").map(mapMember)
    const studentLeadership = dbMembers.filter((m) => m.category === "student").map(mapMember)

    return {
      faculty: faculty.length > 0 ? faculty : staticFaculty,
      studentLeadership: studentLeadership.length > 0 ? studentLeadership : staticStudents,
    }
  } catch (err) {
    console.error("Error fetching team from DB, falling back to static data:", err)
    return {
      faculty: staticFaculty,
      studentLeadership: staticStudents,
    }
  }
}
