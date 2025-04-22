"use client"

import * as React from "react"
import { MapPinIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const locations = [
  {
    value: "new-york",
    label: "New York, USA",
  },
  {
    value: "london",
    label: "London, UK",
  },
  {
    value: "paris",
    label: "Paris, France",
  },
  {
    value: "tokyo",
    label: "Tokyo, Japan",
  },
  {
    value: "sydney",
    label: "Sydney, Australia",
  },
  {
    value: "rome",
    label: "Rome, Italy",
  },
]

export function LocationSearch() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [selectedLocation, setSelectedLocation] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-start">
          <MapPinIcon className="w-4 h-4 mr-2" />
          {selectedLocation ? selectedLocation : "Where are you going?"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search location..." />
          <CommandList>
            <CommandEmpty>No location found.</CommandEmpty>
            <CommandGroup>
              {locations.map((location) => (
                <CommandItem
                  key={location.value}
                  value={location.value}
                  onSelect={(currentValue) => {
                    setSelectedLocation(location.label)
                    setValue(currentValue)
                    setOpen(false)
                  }}
                >
                  {location.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

