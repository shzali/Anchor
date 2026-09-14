import { useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Field, FieldGroup } from "../ui/field"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import CategoryDB from "@/lib/types/categoryDB"
import { v4 as uuidv4 } from "uuid"

interface Props {
  isAddCategoryOpen: boolean
  setIsAddCategoryOpen: (arg0: boolean) => void
  categories: CategoryDB[]
  createCategory: (arg0: string) => void
  addCategory: (arg0: string, arg1: string) => void
}

const AddCategoryDialog = ({
  isAddCategoryOpen,
  setIsAddCategoryOpen,
  categories,
  createCategory,
  addCategory,
}: Props) => {
  const [categoryInput, setCategoryInput] = useState<string>("")

  return (
    <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
        </DialogHeader>
        {categories.map((category) => (
          <Card
            onClick={() => addCategory(category.id, category.name)}
            className={`cursor-pointer bg-mist-${category.isAdded ? "800" : "900"}`}
            key={category.id}
          >
            <CardContent className="">{category.name}</CardContent>
          </Card>
        ))}
        <FieldGroup>
          <Field>
            <Label htmlFor="name">Name</Label>
            <div className="flex gap-3">
              <Input
                id="name"
                name="name"
                value={categoryInput}
                onChange={(e) => {
                  setCategoryInput(e.target.value)
                }}
              />
              <Button
                onClick={() => {
                  createCategory(categoryInput)
                  setCategoryInput("")
                }}
              >
                Create
              </Button>
            </div>
          </Field>
        </FieldGroup>
      </DialogContent>
    </Dialog>
  )
}

export default AddCategoryDialog
