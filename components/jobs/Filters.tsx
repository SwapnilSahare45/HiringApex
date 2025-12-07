import { Filter } from "lucide-react";
import { Button } from "../ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { TypographyH4, TypographyList, TypographyP } from "../ui/typography";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function Filters() {
  return (
    <Collapsible>
      <CollapsibleTrigger asChild>
        <Button>
          <Filter />
          <span>Filters</span>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2 w-96">
        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-16">
              <div>
                <TypographyP className="font-semibold">Job Type</TypographyP>
                <TypographyList className="list-none mt-2 flex flex-col gap-2 [&>li]:flex [&>li]:gap-2">
                  <li className="">
                    <Checkbox id="Full-time" />
                    <Label htmlFor="Full-time">Full-time</Label>
                  </li>
                  <li>
                    <Checkbox id="Part-time" />
                    <Label htmlFor="Part-time">Part-time</Label>
                  </li>
                  <li>
                    <Checkbox id="Contract" />
                    <Label htmlFor="Contract">Contract</Label>
                  </li>
                  <li>
                    <Checkbox id="Temporary" />
                    <Label htmlFor="Temporary">Temporary</Label>
                  </li>
                  <li>
                    <Checkbox id="Internship" />
                    <Label htmlFor="Internship">Internship</Label>
                  </li>
                </TypographyList>
              </div>

              <div>
                <TypographyP className="font-semibold">
                  Experience Level
                </TypographyP>
                <TypographyList className="list-none mt-2 flex flex-col gap-2 [&>li]:flex [&>li]:gap-2">
                  <li className="">
                    <Checkbox id="Fresher" />
                    <Label htmlFor="Fresher">Fresher</Label>
                  </li>
                  <li>
                    <Checkbox id="Associate" />
                    <Label htmlFor="Associate">Associate</Label>
                  </li>
                  <li>
                    <Checkbox id="Senior" />
                    <Label htmlFor="Senior">Senior</Label>
                  </li>
                  <li>
                    <Checkbox id="Lead" />
                    <Label htmlFor="Lead">Lead</Label>
                  </li>
                  <li>
                    <Checkbox id="Director" />
                    <Label htmlFor="Director">Director</Label>
                  </li>
                  <li>
                    <Checkbox id="Executive" />
                    <Label htmlFor="Executive">Executive</Label>
                  </li>
                </TypographyList>
              </div>
            </div>

            <div>
              <TypographyP className="font-semibold">Salary Range</TypographyP>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select salary range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="100000-300000">100000 - 300000</SelectItem>
                  <SelectItem value="300001-600000">300001 - 600000</SelectItem>
                  <SelectItem value="600001-1000000">
                    600001 - 1000000
                  </SelectItem>
                  <SelectItem value="1000001-1500000">
                    1000001 - 1500000
                  </SelectItem>
                  <SelectItem value="1500000">1500000+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  );
}
