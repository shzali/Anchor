export default interface Task {
  id: string
  description: string
  status: "PENDING" | "COMPLETE" | "PARTIALLY COMPLETE" | "INCOMPLETE"
}
