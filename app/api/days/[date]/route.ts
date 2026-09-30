import { Status } from "@/generated/prisma/enums"
import { prisma } from "@/lib/prisma"
import { connect } from "http2"

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
    } else {
      reshapedData = {}
    }
    // console.log("RESHAPED DATA")
    // console.log(reshapedData)
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
    let data = await prisma.day.findFirst({
      where: { date: new Date(date) },
    })

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

export const PUT = async (
  req: Request,
  { params }: { params: Promise<{ date: string }> }
) => {
  try {
    const date = (await params).date
    const body = await req.json()

    console.log(body)
    const tasks = body.tasks
    const categories = body.categories

    console.log("------")
    console.log(date)

    // If no date was initially created, then we want to create it
    const dateFound = await prisma.day.findFirst({
      where: {
        date: new Date(date),
      },
    })

    if (dateFound) {
      console.log("DATE FOUND")
      for (let task of tasks) {
        const foundTask = await prisma.task.findFirst({
          where: {
            id: task.id,
            // Having the date here may be redundant, but I still implemented it here to provide extra assurance
            dayDate: new Date(date),
          },
        })

        if (foundTask) {
          console.log("TASK FOUND")
          // Task was found, so update it
          console.log("UPDATING TASK")
          await prisma.task.update({
            where: {
              id: task.id,
              dayDate: new Date(date),
            },
            data: {
              description: task.description,
              status: task.status,
            },
          })
        } else {
          // Task was not found, so create it
          console.log("TASK FOUND")
          await prisma.task.create({
            data: {
              id: task.id,
              description: task.description,
              status: task.status,
              day: {
                connect: { date: new Date(date) },
              },
              category: {
                connect: { id: task.categoryId },
              },
            },
          })
        }
      }
    } else {
      console.log("DATE NOT FOUND")
      console.log("CREATING DATE")
      await prisma.day.create({
        data: {
          date: new Date(date),
        },
      })

      // await prisma.task.createMany({
      //   data:
      // })

      // TODO - create new categories

      console.log("CREATING CATEGORIES 1")
      await prisma.category.createMany({
        data: categories,
        skipDuplicates: true,
      })

      // Add categories

      console.log("CREATING CATEGORIES 2")
      for (let cat of categories) {
        await prisma.category.update({
          where: {
            id: cat.id,
          },
          data: {
            days: {
              create: {
                day: {
                  connect: { date: new Date(date) },
                },
              },
            },
          },
        })
      }

      console.log("CREATING TASKS")
      await prisma.task.createMany({
        data: tasks,
        skipDuplicates: true,
      })
    }

    // await prisma.day.update({
    //   where: {
    //     date: new Date(date)
    //   },
    //   data: {

    //   }
    // })
    // console.log("ATTEMPTING")
    // await prisma.categoryDay.create({
    //   data: {
    //     dayDate: new Date(date),
    //     categoryId,
    //   },
    // })
    console.log("SUCCESS")
    return Response.json({}, { status: 200 })
  } catch (err) {
    console.log("FAIL")
    console.error(err)
  }
}

/*

keep things simple for now

- create date
- create any new categories
- add categories to date
- add tasks

*/
