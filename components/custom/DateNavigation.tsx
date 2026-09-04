import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { Button } from "../ui/button"

interface Props {
  date: Date
  setDate: (arg0: Date) => void
}

const DateNavigation = ({ date, setDate }: Props) => {
  return (
    <div className="flex w-full items-center justify-center gap-5">
      <Button
        variant="outline"
        size="icon-xs"
        onClick={() => {
          date.setDate(date.getDate() - 1)
          setDate(new Date(date))
        }}
      >
        <ChevronLeftIcon />
      </Button>
      <h1>{date.toLocaleDateString()}</h1>
      <Button
        variant="outline"
        size="icon-xs"
        onClick={() => {
          date.setDate(date.getDate() + 1)
          setDate(new Date(date))
        }}
      >
        <ChevronRightIcon />
      </Button>
    </div>
  )
}

export default DateNavigation
