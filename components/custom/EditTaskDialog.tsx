"use client"

import TaskInput from "@/lib/types/taskInput"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Field, FieldGroup } from "../ui/field"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

interface Props {
  isEditDialogOpen: boolean
  setIsEditDialogOpen: (arg0: boolean) => void
  taskInput: TaskInput
  setTaskInput: (arg0: TaskInput) => void
  updateTask: () => void
}

const EditTaskDialog = ({
  isEditDialogOpen,
  setIsEditDialogOpen,
  taskInput,
  setTaskInput,
  updateTask,
}: Props) => {
  return (
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
  )
}

export default EditTaskDialog
