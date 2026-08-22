export default interface Task {
  id: string
  description: string
  status: "pending" | "complete" | "partially complete" | "incomplete"
}
