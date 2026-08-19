"use client" // TODO - this should be server component. Extract to individual client components

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRightIcon, ChevronLeftIcon } from "lucide-react"

interface Task {
  id: string
  description: string
  isComplete: boolean
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
  const [isAddingNewTask, setIsAddingNewTask] = useState(false)

  const [planner, setPlanner] = useState<Category[]>([
    {
      id: "1",
      name: "Project",
      tasks: [
        {
          id: "1",
          description: "30 mins oihuiguighj iu ihuihuiohub oiuhoihukbhioh",
          isComplete: false,
        },
        {
          id: "2",
          description: "30 mins",
          isComplete: false,
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
          isComplete: false,
        },
        {
          id: "2",
          description: "30 mins",
          isComplete: false,
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
          isComplete: false,
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
          isComplete: false,
        },
        {
          id: "2",
          description: "30 mins",
          isComplete: false,
        },
      ],
    },
  ])

  const categories = ["Project", "Jobs", "Exercises", "Learning"]

  return (
    <div className="flex min-h-screen flex-col items-center gap-5">
      <div className="flex items-center gap-5">
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
        <TabsList className="mx-auto w-fit">
          {planner.map((category) => (
            <TabsTrigger key={category.id} value={category.name}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
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
      </Tabs>
      {/*
      <div style={{ display: "flex", gap: "5rem" }}>
        {planner.map((category) => (
          <div key={category.id}>
            <p>{category.name}</p>
            <button
              disabled={isAddingNewTask}
              onClick={() => {
                setIsAddingNewTask(true)
                setNewTaskInput({ id: category.id, description: "" })
              }}
            >
              Add
            </button>
            {isAddingNewTask && newTaskInput.id === category.id && (
              <>
                <input
                  value={newTaskInput.description}
                  onChange={(e) =>
                    setNewTaskInput({
                      id: newTaskInput.id,
                      description: e.target.value,
                    })
                  }
                />
                <button
                  onClick={() => {
                    setIsAddingNewTask(false)
                    const newPlanner = [...planner].map((c) => {
                      if (c.id === category.id) {
                        console.log("YES")
                        c.tasks = [
                          ...c.tasks,
                          {
                            id: "10",
                            description: newTaskInput.description,
                            isComplete: false,
                          },
                        ]
                      }
                      return c
                    })
                    console.log(newPlanner)
                    // const cat = newPlanner.find((c) => c.id === category.id);
                    // cat.tasks = [
                    //   ...cat?.tasks,
                    //   {
                    //     id: "5",
                    //     description: newTaskInput.task,
                    //     isComplete: false,
                    //   },
                    // ];
                    setPlanner(newPlanner)
                  }}
                >
                  Add
                </button>
                <button onClick={() => setIsAddingNewTask(false)}>
                  Cancel
                </button>
              </>
            )}
            {category.tasks.map((task) => (
              <p key={task.id}>{task.description}</p>
            ))}
          </div>
        ))}
      </div> */}
    </div>
  )
}

export default Home
