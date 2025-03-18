import { CircleCheck } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function AlertSuccess() {
  return (
    <Alert style= {{color: "#4CAF50"}}> 
      <CircleCheck className="h-4 w-4" />
      <AlertTitle>Success!</AlertTitle>
      <AlertDescription>
        Produk baru berhasil ditambahkan.
      </AlertDescription>
    </Alert>
  )
}
