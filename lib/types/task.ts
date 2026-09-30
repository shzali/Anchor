export default interface Task {
  id: string
  description: string
  status: "PENDING" | "COMPLETE" | "PARTIALLY_COMPLETE" | "INCOMPLETE"
}
