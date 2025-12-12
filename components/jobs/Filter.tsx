import { FilterIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function Filter() {
  return (
    <div className="w-full md:w-auto grid grid-cols-2 gap-2">
      <Button variant="outline" className="w-full">
        <FilterIcon className="w-4 h-4" />
        <span>Filters</span>
      </Button>

      <Select defaultValue="most-recent">
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="most-recent">Most Recent</SelectItem>
          <SelectItem value="most-viewed">Most Viewed</SelectItem>
          <SelectItem value="most-applied">Most Applied</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
