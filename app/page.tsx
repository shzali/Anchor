"use client" // TODO - this should be server component. Extract to individual client components

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRightIcon, ChevronLeftIcon } from "lucide-react"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from "@/components/ui/select"

interface Task {
  id: string
  description: string
  status: "pending" | "complete" | "partially complete" | "incomplete"
}

interface Category {
  id: string
  name: string
  tasks: Task[]
}

const Home = () => {
  const [date, setDate] = useState(new Date())
  // 'id' holds the id of the category for which the task is being added
  const [newTaskInput, setNewTaskInput] = useState({ id: "", description: "" })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const [planner, setPlanner] = useState<Category[]>([
    {
      id: "1",
      name: "Project",
      tasks: [
        {
          id: "1",
          description: "30 mins oihuiguighj iu ihuihuiohub oiuhoihukbhioh",
          status: "pending",
        },
        {
          id: "2",
          description: "30 mins",
          status: "pending",
        },
      ],
    },
    {
      id: "2",
      name: "Jobs",
      tasks: [
        {
          id: "1",
          description: "30 mins",
          status: "pending",
        },
        {
          id: "2",
          description: "30 mins",
          status: "complete",
        },
      ],
    },
    {
      id: "3",
      name: "Personal Learning",
      tasks: [
        {
          id: "1",
          description: "30 mins",
          status: "incomplete",
        },
      ],
    },
    {
      id: "4",
      name: "Gym/Exercises",
      tasks: [
        {
          id: "1",
          description: "30 mins",
          status: "partially complete",
        },
        {
          id: "2",
          description: "30 mins",
          status: "pending",
        },
      ],
    },
  ])

  const changeTaskStatus = (categoryId: string, taskId: string) => {
    const newPlanner = [...planner].map((category) => {
      if (category.id === categoryId) {
        category.tasks.map((task) => {
          if (task.id === taskId) {
            if (task.status === "pending") {
              task.status = "complete"
            } else if (task.status === "complete") {
              task.status = "partially complete"
            } else if (task.status === "partially complete") {
              task.status = "incomplete"
            } else {
              task.status = "pending"
            }
          }
          return task
        })
      }
      return category
    })
    setPlanner(newPlanner)
  }

  const categories = [
    { label: "Project", value: "1" },
    { label: "Jobs", value: "2" },
    { label: "Personal Learning", value: "3" },
    { label: "Gym/Exercises", value: "4" },
  ]

  const addTask = () => {
    if (newTaskInput.id !== "" && newTaskInput.description !== "") {
      const newPlanner = [...planner].map((category) => {
        if (category.id === newTaskInput.id) {
          return {
            ...category,
            tasks: [
              ...category.tasks,
              {
                id: "3",
                description: newTaskInput.description,
                status: "pending",
              },
            ],
          }
        }
        return category
      })
      setPlanner(newPlanner)
      setIsDialogOpen(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col gap-5 p-6">
      <div className="flex w-full items-center justify-center gap-5">
        <Button
          variant="outline"
          size="icon-xs"
          onClick={() => {
            date.setDate(date.getDate() - 1)
            setDate(new Date(date))
          }}
        >
          <ChevronLeftIcon />
        </Button>
        <h1>{date.toLocaleDateString()}</h1>
        <Button
          variant="outline"
          size="icon-xs"
          onClick={() => {
            date.setDate(date.getDate() + 1)
            setDate(new Date(date))
          }}
        >
          <ChevronRightIcon />
        </Button>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger>Add Task</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Task</DialogTitle>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Select
                items={categories}
                value={newTaskInput.id}
                onValueChange={(e) =>
                  setNewTaskInput({ ...newTaskInput, id: e })
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                value={newTaskInput.description}
                onChange={(e) =>
                  setNewTaskInput({
                    ...newTaskInput,
                    description: e.target.value,
                  })
                }
              />
            </Field>
            <Button onClick={addTask}>Add</Button>
          </FieldGroup>
        </DialogContent>
      </Dialog>
      <div className="flex flex-col gap-17">
        {planner.map((category) => (
          <div key={category.id}>
            <p className="mb-3 font-bold uppercase">{category.name}</p>
            <div className="flex flex-col gap-3">
              {category.tasks.map((task) => (
                // <div key={task.id} className="bg-green-400 p-2">
                //   <p>{task.description}</p>
                // </div>
                <Card
                  key={task.id}
                  className={
                    task.status === "complete"
                      ? "bg-green-900"
                      : task.status === "partially complete"
                        ? "bg-yellow-900"
                        : task.status === "incomplete"
                          ? "bg-red-900"
                          : ""
                  }
                  // onClick={() => changeTaskStatus(category.id, task.id)}
                  onDoubleClick={() => console.log("OKAY")}
                  onLon
                >
                  <CardContent>
                    <p>{task.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* <div className="flex w-full items-center justify-center gap-5">
        <Button
          variant="outline"
          size="icon-xs"
          onClick={() => {
            date.setDate(date.getDate() - 1)
            setDate(new Date(date))
          }}
        >
          <ChevronLeftIcon />
        </Button>
        <h1>{date.toLocaleDateString()}</h1>
        <Button
          variant="outline"
          size="icon-xs"
          onClick={() => {
            date.setDate(date.getDate() + 1)
            setDate(new Date(date))
          }}
        >
          <ChevronRightIcon />
        </Button>
      </div>
      <Tabs defaultValue="Project" className="w-full">
        <div className="flex w-full justify-center overflow-x-auto">
          <TabsList className="shrink-0">
            {planner.map((category) => (
              <TabsTrigger key={category.id} value={category.name}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        {planner.map((category) => (
          <TabsContent key={category.id} value={category.name}>
            <div className="flex flex-col items-stretch gap-3">
              {category.tasks.map((task) => (
                <div key={task.id}>
                  <p>{task.description}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs> */}
    </div>
  )
}

export default Home
