"use client"

import * as React from "react"
import { UsersIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function GuestSelector() {
  const [adults, setAdults] = React.useState(2)
  const [children, setChildren] = React.useState(0)
  const [rooms, setRooms] = React.useState(1)

  const incrementAdults = () => setAdults((prev) => prev + 1)
  const decrementAdults = () => setAdults((prev) => (prev > 1 ? prev - 1 : 1))

  const incrementChildren = () => setChildren((prev) => prev + 1)
  const decrementChildren = () => setChildren((prev) => (prev > 0 ? prev - 1 : 0))

  const incrementRooms = () => setRooms((prev) => prev + 1)
  const decrementRooms = () => setRooms((prev) => (prev > 1 ? prev - 1 : 1))

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          <UsersIcon className="w-4 h-4 mr-2" />
          <span>
            {adults} {adults === 1 ? "Adult" : "Adults"}, {children} {children === 1 ? "Child" : "Children"}, {rooms}{" "}
            {rooms === 1 ? "Room" : "Rooms"}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Guests</h4>
            <p className="text-sm text-muted-foreground">Select the number of guests and rooms</p>
          </div>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="adults">Adults</Label>
              <div className="flex items-center">
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-r-none" onClick={decrementAdults}>
                  -
                </Button>
                <Input
                  id="adults"
                  type="number"
                  className="h-8 w-12 rounded-none text-center"
                  value={adults}
                  onChange={(e) => setAdults(Number.parseInt(e.target.value) || 1)}
                  min={1}
                />
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-l-none" onClick={incrementAdults}>
                  +
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="children">Children</Label>
              <div className="flex items-center">
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-r-none" onClick={decrementChildren}>
                  -
                </Button>
                <Input
                  id="children"
                  type="number"
                  className="h-8 w-12 rounded-none text-center"
                  value={children}
                  onChange={(e) => setChildren(Number.parseInt(e.target.value) || 0)}
                  min={0}
                />
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-l-none" onClick={incrementChildren}>
                  +
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="rooms">Rooms</Label>
              <div className="flex items-center">
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-r-none" onClick={decrementRooms}>
                  -
                </Button>
                <Input
                  id="rooms"
                  type="number"
                  className="h-8 w-12 rounded-none text-center"
                  value={rooms}
                  onChange={(e) => setRooms(Number.parseInt(e.target.value) || 1)}
                  min={1}
                />
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-l-none" onClick={incrementRooms}>
                  +
                </Button>
              </div>
            </div>
          </div>
          <Button className="w-full">Apply</Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

