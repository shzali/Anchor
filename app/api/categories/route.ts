import { prisma } from "@/lib/prisma"

export const GET = async (req: Request) => {
  try {
    let data = await prisma.category.findMany()
    if (!data) {
      data = []
    }
    return Response.json(data, { status: 200 })
  } catch (err) {
    console.error(err)
  }
}
