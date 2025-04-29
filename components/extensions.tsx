import { PlusCircle, Settings, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Extensions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700">
          Extensions
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-gray-900 border-gray-700 text-white">
        <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
          <PlusCircle className="mr-2 h-4 w-4" />
          <span>Add Extension</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          <span>Manage Extensions</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
          <Shield className="mr-2 h-4 w-4" />
          <span>Privacy Extensions</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
