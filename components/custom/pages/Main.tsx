"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { v4 as uuidv4 } from "uuid"
import Task from "@/components/custom/Task"
import Category from "@/lib/types/category"
import ITask from "@/lib/types/task"
import DateNavigation from "@/components/custom/DateNavigation"
import NewTaskDialog from "@/components/custom/NewTaskDialog"
import EditTaskDialog from "@/components/custom/EditTaskDialog"
import axios from "axios"
import { prisma } from "@/lib/prisma"
import AddCategoryDialog from "../AddCategoryDialog"
import CategoryDB from "@/lib/types/categoryDB"

interface TaskDB {
  id: string
  description: string
  status: string
  dayDate: Date
  categoryId: string
}

const Main = () => {
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
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false)

  // REDUNDANT
  const [planner, setPlanner] = useState<Category[]>([
    {
      id: "fc6756b8-21d3-4185-a5d7-93fc062a4ad1",
      name: "Project",
      tasks: [
        {
          id: "e747c3c0-643a-4816-8da0-7a5a3650f57a",
          description: "30 mins oihuiguighj iu ihuihuiohub oiuhoihukbhioh",
          status: "pending",
        },
        {
          id: "87216cb1-125d-4b73-a29d-fa7e39270d4c",
          description: "30 mins",
          status: "pending",
        },
      ],
    },
    {
      id: "c145df6e-856d-4f1c-a350-7a4ac653dbfc",
      name: "Jobs",
      tasks: [
        {
          id: "16cd27de-d372-43c6-bedd-2a44623db52f",
          description: "30 mins",
          status: "pending",
        },
        {
          id: "48179bca-186b-4004-b99f-d1be1dfe46c2",
          description: "30 mins",
          status: "complete",
        },
      ],
    },
    {
      id: "bc321e4e-d240-4293-8d0f-cd48736a00c5",
      name: "Personal Learning",
      tasks: [
        {
          id: "090e0431-6469-404b-adbc-1ce8144b3b71",
          description: "30 mins",
          status: "incomplete",
        },
      ],
    },
    {
      id: "5d5996f3-b171-450d-b00a-60a26390d9b2",
      name: "Gym/Exercises",
      tasks: [
        {
          id: "44b22a66-7582-4eec-bd5d-3c60b53457de",
          description: "30 mins",
          status: "partially complete",
        },
        {
          id: "7f2b381f-e54d-442f-b1d9-cccb5f6b5e8e",
          description: "30 mins",
          status: "pending",
        },
      ],
    },
  ])

  // ---

  const [categories, setCategories] = useState<CategoryDB[]>([])
  const [tasks, setTasks] = useState<TaskDB[]>([])

  // Holds all categories, even ones not added to the day
  const [allCategories, setAllCategories] = useState<CategoryDB[]>([])

  useEffect(() => {
    const getDayData = async () => {
      try {
        const res = await axios.get(`/api/days/${date}`)
        if (res.status === 200) {
          const data = res.data
          const cats: CategoryDB[] = data.categories
          setCategories(data.categories)
          setTasks(data.tasks)

          try {
            const res = await axios.get(`/api/categories`)
            if (res.status === 200) {
              const modifiedCategories = res.data.map(
                (category: CategoryDB) => {
                  return {
                    id: category.id,
                    name: category.name,
                    isAdded: cats.some((cat) => cat.id === category.id)
                      ? true
                      : false,
                  }
                }
              )
              setAllCategories(modifiedCategories)
            }
          } catch (err) {
            console.error(err)
          }
        }
      } catch (err) {
        console.error(err)
      }
    }

    const getCategories = async () => {}

    getDayData()
    getCategories()
  }, [])

  const saveData = async () => {
    try {
      const res = await axios.put(`/api/days/${date}`, {
        tasks,
        categories,
        allCategories,
      })
    } catch (err) {
      console.error(err)
    }
  }

  const changeTaskStatus = (categoryId: string, taskId: string) => {
    // const newPlanner = [...planner].map((category) => {
    //   if (category.id === categoryId) {
    //     category.tasks.map((task) => {
    //       if (task.id === taskId) {
    //         if (task.status === "PENDING") {
    //           task.status = "COMPLETE"
    //         } else if (task.status === "COMPLETE") {
    //           task.status = "PARTIALLY COMPLETE"
    //         } else if (task.status === "PARTIALLY COMPLETE") {
    //           task.status = "INCOMPLETE"
    //         } else {
    //           task.status = "PENDING"
    //         }
    //       }
    //       return task
    //     })
    //   }
    //   return category
    // })

    const newTasks = [...tasks].map((task) => {
      if (task.id === taskId) {
        if (task.status === "PENDING") {
          task.status = "COMPLETE"
        } else if (task.status === "COMPLETE") {
          task.status = "PARTIALLY COMPLETE"
        } else if (task.status === "PARTIALLY COMPLETE") {
          task.status = "INCOMPLETE"
        } else {
          task.status = "PENDING"
        }
      }
      return task
    })

    // setPlanner(newPlanner)
    setTasks(newTasks)
  }

  const addTask = async () => {
    if (taskInput.categoryId !== "" && taskInput.description !== "") {
      // const newTask: ITask = {
      //   id: uuidv4(),
      //   description: taskInput.description,
      //   status: "pending",
      // }

      const newTask: TaskDB = {
        id: uuidv4(),
        description: taskInput.description,
        status: "pending",
        dayDate: date,
        categoryId: taskInput.categoryId,
      }

      // const newPlanner = [...planner].map((category) => {
      //   if (category.id === taskInput.categoryId) {
      //     return {
      //       ...category,
      //       tasks: [...category.tasks, newTask],
      //     }
      //   }
      //   return category
      // })
      // setPlanner(newPlanner)
      setTasks([...tasks, newTask])
      setIsNewDialogOpen(false)

      try {
        const res = await axios.put(`/api/tasks`, newTask)
      } catch (err) {
        console.error(err)
      }
    }
  }

  const updateTask = () => {
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
      setPlanner(newPlanner)
      setIsEditDialogOpen(false)
    }
  }

  const createCategory = async (newCategoryName: string) => {
    try {
      const newCategory: CategoryDB = { id: uuidv4(), name: newCategoryName }
      const res = await axios.post(`/api/categories`, newCategory)
      if (res.status === 200) {
        console.log("CREATED!")
        setCategories([...allCategories, newCategory])
        setAllCategories([...allCategories, { ...newCategory, isAdded: false }])
      }
    } catch (err) {
      console.error(err)
    }
  }

  const addCategory = async (categoryId: string, categoryName: string) => {
    try {
      const res = await axios.put(`/api/days/${date}`, { categoryId })
      if (res.status === 200) {
        const newCategories = [...allCategories].map((category) => {
          if (category.id === categoryId) {
            return { ...category, isAdded: true }
          }
          return category
        })
        setAllCategories(newCategories)
        setCategories([
          ...categories,
          { id: categoryId, name: categoryName, isAdded: true },
        ])
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col gap-5 p-6">
      <Button variant="outline" onClick={saveData}>
        Save
      </Button>
      <DateNavigation date={date} setDate={setDate} />
      <NewTaskDialog
        addTask={addTask}
        isNewDialogOpen={isNewDialogOpen}
        setIsNewDialogOpen={setIsEditDialogOpen}
        setTaskInput={setTaskInput}
        taskInput={taskInput}
        allCategories={allCategories}
      />
      <EditTaskDialog
        isEditDialogOpen={isEditDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
        setTaskInput={setTaskInput}
        taskInput={taskInput}
        updateTask={updateTask}
      />
      <AddCategoryDialog
        isAddCategoryOpen={isAddCategoryOpen}
        setIsAddCategoryOpen={setIsAddCategoryOpen}
        categories={allCategories}
        createCategory={createCategory}
        addCategory={null}
      />
      <Button onClick={() => setIsAddCategoryOpen(true)}>Add Category</Button>
      <div className="flex flex-col gap-17">
        {categories.map((category) => (
          <div key={category.id}>
            <p>{category.name}</p>
            {tasks.map((task) => {
              if (task.categoryId === category.id) {
                // return <p key={task.id}>{task.description}</p>
                return (
                  <Task
                    key={task.id}
                    task={{
                      id: task.id,
                      description: task.description,
                      status: task.status,
                    }}
                    category={category.id}
                    changeTaskStatus={changeTaskStatus}
                    setIsEditDialogOpen={setIsEditDialogOpen}
                    setTaskInput={setTaskInput}
                  />
                )
              }
            })}
            <Button variant="outline" onClick={() => setIsNewDialogOpen(true)}>
              New Task
            </Button>
          </div>
        ))}
        {/* {planner.map((category) => (
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
        ))} */}
      </div>
    </div>
  )
}

export default Main
