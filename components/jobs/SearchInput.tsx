import { Search } from "lucide-react";
import { Input } from "../ui/input";

export default function SearchInput() {
  return (
    <div className="grow relative flex items-center">
      <Search className="w-4 h-4 absolute ml-4 text-gray-600 dark:text-gray-400" />
      <Input
        placeholder="Search by job title, company, or skills..."
        className="pl-12"
      />
    </div>
  );
}
