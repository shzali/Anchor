import { prisma } from "@/lib/prisma"
import { Status } from "@/generated/prisma/enums"

export const PUT = async (req: Request) => {
  try {
    // const date = (await params).date
    const body = await req.json()
    // console.log("------BODY")
    // console.log(body)

    const a = await prisma.task.create({
      data: {
        id: body.id,
        description: body.description,
        status: Status.PENDING,
        day: {
          connect: { date: new Date(body.dayDate) },
        },
        category: {
          connect: { id: body.categoryId },
        },
      },
    })
    console.log("DONE")
    console.log(a)
    return Response.json({}, { status: 200 })
  } catch (err) {
    console.log("FAIL")
    console.error(err)
  }
}
