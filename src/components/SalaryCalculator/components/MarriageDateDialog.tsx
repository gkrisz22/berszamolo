import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { Calendar } from "@/components/shadcn/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/shadcn/ui/button";

const MarriageDateDialog = ({date, setDate} : { date:Date | undefined, setDate: (d:any) => void}) => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            type="button"
            variant={"outline"}
            size={"sm"}
            className="rounded-full px-3 py-0.5 inline-flex space-x-2"
          >
            <CalendarIcon size={16} />
            <span className="text-xs">Dátum megadása</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[28rem]">
          <DialogHeader>
            <DialogDescription className="pt-3 text-justify">
              A kedvezmény először a házasságkötést követő hónapra vehető
              igénybe és a házassági életközösség alatt legfeljebb 24 hónapon
              keresztül jár.
            </DialogDescription>
          </DialogHeader>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant={"outline"}>
                {date ? (
                  format(date, "yyyy. MMMM d.")
                ) : (
                  <span>Válaszd ki a házasság dátumát!</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <DialogFooter>
            <DialogClose asChild>
              <Button>Mentés</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MarriageDateDialog;
