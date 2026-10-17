"use client"

import TaskInput from "@/lib/types/taskInput"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Field, FieldGroup } from "../ui/field"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from "../ui/select"
import mockCategories from "@/lib/mockCategories"
import CategoryDB from "@/lib/types/categoryDB"
import TaskInputType from "@/lib/types/taskInput"
import { useState } from "react"

interface Props {
  isNewDialogOpen: boolean
  setIsNewDialogOpen: (arg0: boolean) => void
  // taskInput: TaskInput
  // setTaskInput: (arg0: TaskInput) => void
  // addTask: () => void
  createTask: (arg0: TaskInput) => void
  allCategories: CategoryDB[]
}

interface CategoriesSelect {
  label: string
  value: string
}

const NewTaskDialog = ({
  isNewDialogOpen,
  setIsNewDialogOpen,
  // taskInput,
  // setTaskInput,
  createTask,
  allCategories,
}: Props) => {
  const [input, setInput] = useState<TaskInputType>({
    description: "",
    categoryId: "",
    status: "PENDING",
  })

  const categoriesSelect: CategoriesSelect[] = []

  allCategories.forEach((category) => {
    if (category.isAdded) {
      categoriesSelect.push({ label: category.name, value: category.id })
    }
  })

  return (
    <Dialog open={isNewDialogOpen} onOpenChange={setIsNewDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Task</DialogTitle>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Select
              items={categoriesSelect}
              value={input.categoryId}
              onValueChange={(e) => setInput({ ...input, categoryId: e! })}
            >
              <SelectTrigger className="w-full max-w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  {categoriesSelect.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {/* <Select
              items={categoriesSelect}
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
                  {mockCategories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select> */}
          </Field>
          <Field>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              value={input.description}
              onChange={(e) =>
                setInput({
                  ...input,
                  description: e.target.value,
                })
              }
            />
          </Field>
          <Button
            onClick={() => {
              createTask(input)
            }}
          >
            Add
          </Button>
        </FieldGroup>
      </DialogContent>
    </Dialog>
  )
}

export default NewTaskDialog
