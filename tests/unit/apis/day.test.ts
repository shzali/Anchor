import { GET } from "@/app/api/days/[date]/route"
import { prismaMock } from "@/singleton"

describe("creating a date", () => {
  const API = "/api/days"
})

describe("get data for specific date", () => {
  test("returns a 200 OK status code regardless of whether the date is found", async () => {
    // The program gets data for a date when the user changes the date. The reason I make it
    // return a 200 OK response if a date is not found is because there might not be any data for it.
    // A date will only be created if there is data created for it, otherwise I would just be pointlessly
    // storing a date object in the database without any data.

    let date = new Date()

    prismaMock.day.findFirst.mockResolvedValue(null)

    let request = new Request(`http://localhost/api/days/${date}`)

    let response = await GET(request, {
      params: Promise.resolve({
        date: `${date}`,
      }),
    })

    expect(response!.status).toBe(200)

    date = new Date()

    prismaMock.day.findFirst.mockResolvedValue({
      date,
      categories: [
        {
          categoryId: "5f5f6872-eb81-43cd-a5ba-e6b3eb1b850d",
          dayDate: date,
          category: {},
        },
      ],
      tasks: [],
    })

    request = new Request(`http://localhost/api/days/${date}`)

    response = await GET(request, {
      params: Promise.resolve({
        date: `${date}`,
      }),
    })

    expect(response!.status).toBe(200)
  })

  test("returns an empty object if no date is found", async () => {
    const date = new Date()

    prismaMock.day.findFirst.mockResolvedValue(null)

    const request = new Request(`http://localhost/api/days/${date}`)

    const response = await GET(request, {
      params: Promise.resolve({
        date: `${date}`,
      }),
    })
    expect(await response.json()).toEqual({})
    // expect(response!.json).toBe(200)
  })

  test("returns the appropriate data is the date is found", async () => {
    const date = new Date()
    prismaMock.day.findFirst.mockResolvedValue({
      date,
      categories: [
        {
          categoryId: "5f5f6872-eb81-43cd-a5ba-e6b3eb1b850d",
          dayDate: date,
          category: {
            id: "5f5f6872-eb81-43cd-a5ba-e6b3eb1b850d",
            name: "Project",
          },
        },
      ],
      tasks: [
        {
          id: "c7242205-f694-4171-b059-c38816eb081c",
          description: "task in october",
          status: "COMPLETE",
          dayDate: date,
          categoryId: "5f5f6872-eb81-43cd-a5ba-e6b3eb1b850d",
        },
      ],
    } as any)

    const request = new Request(`http://localhost/api/days/${date}`)

    const response = await GET(request, {
      params: Promise.resolve({
        date: `${date}`,
      }),
    })

    const res = await response.json()
    // console.log(" ---- RESPONSE")
    // console.log(date)
    // console.log(res)

    expect(res).toEqual({
      date: date.toISOString(),
      categories: [
        { id: "5f5f6872-eb81-43cd-a5ba-e6b3eb1b850d", name: "Project" },
      ],
      tasks: [
        {
          id: "c7242205-f694-4171-b059-c38816eb081c",
          description: "task in october",
          status: "COMPLETE",
          dayDate: date.toISOString(),
          categoryId: "5f5f6872-eb81-43cd-a5ba-e6b3eb1b850d",
        },
      ],
    })
  })

  test("returns a 500 Internal Server Error status code if an error occurs", async () => {
    const date = new Date()

    prismaMock.day.findFirst.mockRejectedValue(new Error("Database error"))

    const request = new Request(`http://localhost/api/days/${date}`)

    const response = await GET(request, {
      params: Promise.resolve({
        date: `${date}`,
      }),
    })

    expect(response.status).toBe(500)
    // expect(await response.json()).sta
  })
})

// describe("create and/or update data for specific date", () => {})
