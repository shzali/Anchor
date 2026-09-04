import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Field, FieldGroup } from "../ui/field"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import CategoryDB from "@/lib/types/categoryDB"

interface Props {
  isAddCategoryOpen: boolean
  setIsAddCategoryOpen: (arg0: boolean) => void
  categories: CategoryDB[]
}

const AddCategoryDialog = ({
  isAddCategoryOpen,
  setIsAddCategoryOpen,
  categories,
}: Props) => {
  console.log("CATEGORIES")
  console.log(categories)
  return (
    <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
        </DialogHeader>
        {categories.map((category) => (
          <Card className="cursor-pointer" key={category.id}>
            <CardContent className="">{category.name}</CardContent>
          </Card>
        ))}
        <FieldGroup>
          {/* <Field>
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
          </Button> */}
        </FieldGroup>
      </DialogContent>
    </Dialog>
  )
}

export default AddCategoryDialog
