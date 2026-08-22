import Task from "./task"

export default interface Category {
  id: string
  name: string
  tasks: Task[]
}
