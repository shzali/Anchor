export default interface TaskInput {
  categoryId: string
  description: string
  status: "PENDING" | "COMPLETE" | "PARTIALLY_COMPLETE" | "INCOMPLETE"
}
