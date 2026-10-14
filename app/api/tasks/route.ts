import { prisma } from "@/client"
import { Status } from "@/generated/prisma/enums"

export const POST = async (req: Request) => {
  try {
    // TODO - check for bad input

    const body = await req.json()

    console.log("--BODY")
    console.log(body)

    if (
      !body.id ||
      !body.description ||
      !body.status ||
      !body.categoryId ||
      !body.dayDate
    ) {
      return Response.json(
        { error: "Missing required field(s)" },
        { status: 400 }
      )
    }

    const data = await prisma.task.create({
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

    return Response.json(data, { status: 201 })
  } catch (err) {
    console.error(err)
    return Response.json({ status: 500 })
  }
}

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
