import { CircleCheck } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function AlertSuccess(item: any) {

  return (
    <Alert style= {{color: "#4CAF50"}}> 
      <CircleCheck className="h-4 w-4" />
      <AlertTitle>Success!</AlertTitle>
      <AlertDescription>
        {item.name}
      </AlertDescription>
    </Alert>
  )
}
