"use client"

import { useRef } from "react"
import { Card, CardContent } from "../ui/card"
import ITask from "@/lib/types/task"
import Category from "@/lib/types/category"
import TaskInput from "@/lib/types/taskInput"
import { Badge } from "../ui/badge"

interface Props {
  task: ITask
  categoryId: string
  changeTaskStatus: (arg0: string) => void
  setIsEditDialogOpen: (arg0: boolean) => void
  setTaskInput: (arg0: TaskInput) => void
}

const badgeStyles = {
  PENDING: ["bg-cyan-950 text-cyan-500", "Pending"],
  COMPLETE: ["bg-green-950 text-green-500", "Complete"],
  PARTIALLY_COMPLETE: ["bg-yellow-950 text-yellow-500", "Partially Complete"],
  INCOMPLETE: ["bg-red-950 text-red-400", "Incomplete"],
}

const Task = ({
  task,
  categoryId,
  changeTaskStatus,
  setIsEditDialogOpen,
  setTaskInput,
}: Props) => {
  // These refs are used for managing the single-click and double-click functionalities.
  // const timerRef = useRef<null | NodeJS.Timeout>(null)
  // const doubleClickedRef = useRef(false)

  let timer = useRef(null)
  let isTimerOn = useRef(false)

  return (
    <Card
      className="px-0 py-3"
      key={task.id}
      onClick={() => {
        // The card can be single-clicked to change its status, or double-clicked to be edited.
        // To allow for double-clicking, a short timer is set when clicked once.
        // This timer is assigned to timerRef, to ensure that another timer cannot be activated when one is active.
        // Essentially, only one timer can be activated at a time.
        // The doubleClickedRef ref is used to keep track of if the card has been double-clicked. Essentially, when a card
        // is clicked when there is no timer active, then the timer starts. If it is then clicked while a timer is active,
        // that will count as a double-click, so doubleClickedRef is set to true. If the timer stops when doubleClickedRef is false (when
        // there is no second click), then a single-click is registered.
        // doubleClickedRef uses useRef instead of useState, since we must be able to change the state while the timer is active. useState
        // does not allow for this.
        // if (timerRef.current === null) {
        //   timerRef.current = setTimeout(() => {
        //     timerRef.current = null
        //     if (doubleClickedRef.current === false) {
        //       changeTaskStatus(categoryId, task.id)
        //     }
        //     doubleClickedRef.current = false
        //   }, 170)
        // } else {
        //   setIsEditDialogOpen(true)
        //   setTaskInput({
        //     categoryId: categoryId,
        //     taskId: task.id,
        //     description: task.description,
        //   })
        //   doubleClickedRef.current = true
        // }
      }}
    >
      <CardContent>
        <Badge
          className={`${badgeStyles[task.status.toLocaleUpperCase()][0]} mb-3 cursor-pointer select-none`}
          onClick={() => changeTaskStatus(task.id)}
        >
          {badgeStyles[task.status][1]}
        </Badge>
        <p>{task.description}</p>
      </CardContent>
    </Card>
  )
}

export default Task
