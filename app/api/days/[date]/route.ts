import { Status } from "@/generated/prisma/enums"
import { prisma } from "@/lib/prisma"

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ date: string }> }
) => {
  try {
    const date = (await params).date

    let data = await prisma.day.findFirst({
      where: { date: new Date(date) },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
        tasks: true,
      },
    })
    console.log("DATA")
    console.log(data)
    // if (!data) {
    //   data = await prisma.day.create({
    //     data: { date: new Date(date) },
    //   })
    // }

    let reshapedData

    if (data) {
      reshapedData = {
        date: data.date,
        categories: data.categories.map((category) => ({
          id: category.categoryId,
          name: category.category.name,
        })),
        tasks: data.tasks,
      }
    }
    return Response.json(reshapedData, { status: 200 })
  } catch (err) {
    console.error(err)
  }
}

export const POST = async (
  req: Request,
  { params }: { params: Promise<{ date: string }> }
) => {
  try {
    const date = (await params).date
    const body = (await req.json()).planner
    // First it needs to find if the day already exists.
    // If it does then update it. Otherwise, create a new
    // day object in the database.
    console.log("BODY")
    console.log(body)
    let data = await prisma.day.findFirst({
      where: { date: new Date(date) },
    })
    console.log(data)

    // if (!data) {
    //   data = await prisma.day.create({
    //     data: {}
    //   })
    // }

    // if (!data) {
    //   data = await prisma.day.create({
    //     data: {
    //       date: new Date(date),
    //       categories: {
    //         create: body.map((category) => ({
    //           id: category.id,
    //           name: category.name,
    //           tasks: {
    //             create: category.tasks.map((task) => ({
    //               id: task.id,
    //               description: task.description,
    //               status: Status.COMPLETE,
    //             })),
    //           },
    //         })),
    //       },
    //     },
    //     include: {
    //       categories: {
    //         include: {
    //           tasks: true,
    //         },
    //       },
    //     },
    //   })
    //   // data = await prisma.day.create({
    //   //   data: { date: new Date(date) },
    //   // })
    // }
  } catch (err) {
    console.error(err)
  }
}
