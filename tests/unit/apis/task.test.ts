import { POST } from "@/app/api/tasks/route"
import { prismaMock } from "@/singleton"

describe("creating a task", () => {
  test("returns a 400 Bad Request status code if one or more of the id, description, status, category id or date is missing", async () => {
    const date = new Date()

    prismaMock.day.findFirst.mockRejectedValue(
      new Error("Missing required fields")
    )

    // Missing id

    let request = new Request(`http://localhost/api/tasks`, {
      method: "POST",
      body: JSON.stringify({
        id: "",
        description: "hello",
        status: "PARTIALLY_COMPLETE",
        dayDate: date.toISOString(),
        categoryId: "41310d1f-dce9-453d-bda8-fe0ec600b58f",
      }),
    })

    let response = await POST(request)

    expect(response.status).toBe(400)

    // Missing description

    request = new Request(`http://localhost/api/tasks`, {
      method: "POST",
      body: JSON.stringify({
        id: "41310d1f-dce9-453d-bda8-fe0ec600b58f",
        description: "",
        status: "PARTIALLY_COMPLETE",
        dayDate: date.toISOString(),
        categoryId: "41310d1f-dce9-453d-bda8-fe0ec600b58f",
      }),
    })

    response = await POST(request)

    expect(response.status).toBe(400)

    // Missing status

    request = new Request(`http://localhost/api/tasks`, {
      method: "POST",
      body: JSON.stringify({
        id: "41310d1f-dce9-453d-bda8-fe0ec600b58f",
        description: "hello",
        status: "",
        dayDate: date.toISOString(),
        categoryId: "41310d1f-dce9-453d-bda8-fe0ec600b58f",
      }),
    })

    response = await POST(request)

    expect(response.status).toBe(400)

    // Missing dayDate

    request = new Request(`http://localhost/api/tasks`, {
      method: "POST",
      body: JSON.stringify({
        id: "41310d1f-dce9-453d-bda8-fe0ec600b58f",
        description: "hello",
        status: "PARTIALLY_COMPLETE",
        dayDate: null,
        categoryId: "41310d1f-dce9-453d-bda8-fe0ec600b58f",
      }),
    })

    response = await POST(request)

    expect(response.status).toBe(400)

    // Missing categoryId

    request = new Request(`http://localhost/api/tasks`, {
      method: "POST",
      body: JSON.stringify({
        id: "41310d1f-dce9-453d-bda8-fe0ec600b58f",
        description: "hello",
        status: "PARTIALLY_COMPLETE",
        dayDate: date.toISOString(),
        categoryId: "",
      }),
    })

    response = await POST(request)

    expect(response.status).toBe(400)
  })

  // test("returns a 400 Bad Request status code if categoryId holds an id for a category that is non-existent", async () => {

  // })

  test("returns a 201 Created status code if the task is created", async () => {
    const date = new Date()

    // prismaMock.day.create.mockResolvedValue({ date })
    // prismaMock.category.create.mockResolvedValue({
    //   id: "41310d1f-dce9-453d-bda8-fe0ec600b58f",
    //   name: "Project",
    // })
    prismaMock.task.create.mockResolvedValue({
      id: "41310d1f-dce9-453d-bda8-fe0ec600b58f",
      description: "",
      status: "PARTIALLY_COMPLETE",
      day: date,
      categoryId: "41310d1f-dce9-453d-bda8-fe0ec600b58f",
    })

    const request = new Request(`http://localhost/api/tasks`, {
      method: "POST",
      body: JSON.stringify({
        id: "41310d1f-dce9-453d-bda8-fe0ec600b58f",
        description: "hello",
        status: "PARTIALLY_COMPLETE",
        dayDate: date.toISOString(),
        categoryId: "41310d1f-dce9-453d-bda8-fe0ec600b58f",
      }),
    })

    const response = await POST(request)

    expect(response.status).toBe(201)
  })
})
