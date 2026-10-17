import { prisma } from "@/client"

// For updating multiple tasks at once.
export const PUT = async (req: Request) => {
  try {
    const tasks = await req.json()

    await prisma.$transaction(async (tx) => {
      for (const t of tasks) {
        await tx.task.update({
          where: {
            id: t.id,
          },
          data: t,
        })
      }
    })
  } catch (err) {
    console.error(err)
    return Response.json("", { status: 500 })
  }
}
