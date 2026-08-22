"use client" // TODO - this should be server component. Extract to individual client components

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronRightIcon, ChevronLeftIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
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
} from "@/components/ui/select"

import { v4 as uuidv4 } from "uuid"
import Task from "@/components/custom/Task"
import Category from "@/lib/types/category"
import ITask from "@/lib/types/task"

const Home = () => {
  const [date, setDate] = useState(new Date())
  // 'categoryId' holds the id of the category for which the task is being added.
  // 'taskId' is used only when editing a task. It is not needed when adding a new task.
  const [taskInput, setTaskInput] = useState({
    categoryId: "",
    taskId: "",
    description: "",
  })
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

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

  // These refs are used for managing the single-click and double-click functionalities.
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const doubleRef = useRef(false)

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
    if (taskInput.categoryId !== "" && taskInput.description !== "") {
      const newTask: ITask = {
        id: uuidv4(),
        description: taskInput.description,
        status: "pending",
      }
      const newPlanner = [...planner].map((category) => {
        if (category.id === taskInput.categoryId) {
          return {
            ...category,
            tasks: [...category.tasks, newTask],
          }
        }
        return category
      })
      setPlanner(newPlanner)
      setIsNewDialogOpen(false)
    }
  }

  const updateTask = () => {
    console.log(taskInput)
    if (taskInput.categoryId !== "" && taskInput.description !== "") {
      const newPlanner = [...planner].map((category) => {
        if (category.id === taskInput.categoryId) {
          return {
            ...category,
            tasks: category.tasks.map((task) => {
              if (task.id === taskInput.taskId) {
                return { ...task, description: taskInput.description }
              }
              return task
            }),
          }
        }
        return category
      })
      console.log(newPlanner)
      setPlanner(newPlanner)
      setIsEditDialogOpen(false)
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
      <Dialog open={isNewDialogOpen} onOpenChange={setIsNewDialogOpen}>
        <DialogTrigger>Add Task</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Task</DialogTitle>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Select
                items={categories}
                value={taskInput.categoryId}
                onValueChange={(e) =>
                  setTaskInput({ ...taskInput, categoryId: e! })
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
                value={taskInput.description}
                onChange={(e) =>
                  setTaskInput({
                    ...taskInput,
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
                <Task
                  key={task.id}
                  category={category}
                  task={task}
                  changeTaskStatus={changeTaskStatus}
                  setIsEditDialogOpen={setIsEditDialogOpen}
                  setTaskInput={setTaskInput}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                value={taskInput.description}
                onChange={(e) =>
                  setTaskInput({
                    ...taskInput,
                    description: e.target.value,
                  })
                }
              />
            </Field>
            <Button
              onClick={() => {
                updateTask()
              }}
            >
              Update
            </Button>
            <Button
              onClick={() => {
                setIsEditDialogOpen(false)
                setTaskInput({ categoryId: "", description: "", taskId: "" })
              }}
            >
              Cancel
            </Button>
          </FieldGroup>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Home
