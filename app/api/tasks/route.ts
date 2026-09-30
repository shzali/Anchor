import { prisma } from "@/lib/prisma"
import { Status } from "@/generated/prisma/enums"

export const PUT = async (req: Request) => {
  try {
    // const date = (await params).date
    const body = await req.json()
    // console.log("------BODY")
    // console.log(body)
    console.log("----BODY")
    const a = await prisma.task.create({
      data: {
        id: body.id,
        description: body.description,
        status: body.status,
        day: {
          connect: { date: new Date(body.dayDate) },
        },
        category: {
          connect: { id: body.categoryId },
        },
      },
    })
    return Response.json({}, { status: 200 })
  } catch (err) {
    console.log("FAIL")
    console.error(err)
  }
}
