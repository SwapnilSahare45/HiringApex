import { Search } from "lucide-react";
import { Input } from "../ui/input";

export default function SearchInput() {
  return (
    <div className="relative flex items-center md:w-1/2">
      <Search className="absolute ml-3 w-5 h-5 text-neutral-500" />
      <Input placeholder="Search for jobs..." className="pl-10 w-full" />
    </div>
  );
}
