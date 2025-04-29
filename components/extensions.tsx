"use client"

import { useState } from "react"
import { Puzzle, PlusCircle, Settings, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Extensions() {
  const [extensions] = useState([
    { id: 1, name: "Ad Blocker", icon: "🛡️" },
    { id: 2, name: "Dark Reader", icon: "🌙" },
    { id: 3, name: "Password Manager", icon: "🔑" },
  ])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
          <Puzzle className="h-5 w-5 mr-1" />
          Extensions
          <ChevronDown className="h-4 w-4 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-gray-900 border-gray-700 text-white">
        {extensions.map((ext) => (
          <DropdownMenuItem key={ext.id} className="hover:bg-gray-800 cursor-pointer">
            <span className="mr-2">{ext.icon}</span>
            <span>{ext.name}</span>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
          <PlusCircle className="mr-2 h-4 w-4" />
          <span>Add Extension</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          <span>Manage Extensions</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
