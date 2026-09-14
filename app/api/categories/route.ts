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

export const POST = async (req: Request) => {
  try {
    const body = await req.json()
    // body is of the format: {id: string, name: string}
    await prisma.category.create({
      data: body,
    })
  } catch (err) {
    console.error(err)
  }
}
