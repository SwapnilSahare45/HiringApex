import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { getCompanies } from "@/app/actions/recruiter.actions";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Send } from "lucide-react";

export default async function LinkToCompany() {
  const companies = await getCompanies();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Request Access</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Link to Existing Company</DialogTitle>
        </DialogHeader>
        <form className="space-y-4">
          <div>
            <Label className="mb-2 mt-4">Select Company</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a company" />
              </SelectTrigger>
              <SelectContent>
                {companies.map((company) => (
                  <SelectItem key={company._id} value={company._id}>
                    {company.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="mb-2">Reason for Access</Label>
            <Textarea
              rows={3}
              placeholder="I am the Head of HR and need to post job openings..."
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">
              <Send className="w-4 h-4" />
              Send Request
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
