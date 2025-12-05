"use client";

import { useForm } from "react-hook-form";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Loader2, Save } from "lucide-react";
import {
  CreateCompanySchema,
  CreateCompanySchemaType,
} from "@/lib/zodSchema/companySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useEffect, useState } from "react";
import { addCompany } from "@/app/actions/recruiter.actions";
import { toast } from "sonner";

const INDUSTRY_OPTIONS = [
  // Technology & Digital Services
  "Software Development",
  "Information Technology (IT) Services",
  "Cybersecurity",
  "Data Science & Analytics",
  "Artificial Intelligence (AI) & Machine Learning",
  "Telecommunications",
  "E-commerce & Online Retail",
  "Gaming",

  // Finance, Insurance & Legal
  "Banking & Financial Services",
  "Investment Banking & Venture Capital",
  "Accounting & Auditing",
  "Insurance",
  "Legal Services",
  "Consulting (Management & Strategy)",
  "Real Estate",

  // Health, Life Sciences & Education
  "Healthcare (Hospitals & Clinics)",
  "Biotechnology & Life Sciences",
  "Pharmaceuticals",
  "Medical Devices",
  "Education (K-12, Higher Ed & E-learning)",
  "Research & Academia",
  "Veterinary Services",

  // Manufacturing, Engineering & Energy
  "Manufacturing",
  "Automotive",
  "Aerospace & Defense",
  "Construction",
  "Energy & Utilities",
  "Chemicals",
  "Agriculture",

  // Consumer, Media & Service
  "Retail (General & Speciality)",
  "Hospitality & Food Service",
  "Travel & Tourism",
  "Media & Publishing",
  "Marketing & Advertising",
  "Human Resources (HR) & Staffing",
  "Non-Profit / Social Services",
  "Fitness & Wellness",
  "Government & Public Administration",
];

const SIZE_OPTIONS = [
  "1-10",
  "11-50",
  "51-200",
  "201-500",
  "501-1000",
  "1000+",
];

export default function CreateCompanyForm() {
  const [open, setOpen] = useState(false);

  const [state, formAction, isPending] = useActionState(addCompany, {
    success: false,
    error: "",
  });

  const form = useForm<CreateCompanySchemaType>({
    resolver: zodResolver(CreateCompanySchema),
    defaultValues: {
      name: "",
      websiteUrl: "",
      linkedinUrl: "",
      description: "",
      headquarters: "",
      foundedYear: "",
      industry: "",
      size: "1-10",
      companyLogo: undefined,
    },
  });

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      setOpen(false);
      form.reset();
    } else if (state.error) {
      toast.error(state.error);
    }
  }, [state, form]);

  function onSubmit(values: CreateCompanySchemaType) {
    startTransition(() => {
      formAction(values);
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="w-full">
        <Button className="w-full">Start New Company Setup</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            Company Setup
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Hiring Apex" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Description</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder="Tell job seekers about your company..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="websiteUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Official Website URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://www.example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="linkedinUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn Page URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://www.linkedin.com/company/..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="headquarters"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Headquarters Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., New Delhi, India" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="foundedYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Founded Year</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g., 2015"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Industry</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {INDUSTRY_OPTIONS.map((i) => (
                          <SelectItem key={i} value={i}>
                            {i}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Company Size</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select size range" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {SIZE_OPTIONS.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="companyLogo"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Company Logo</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      {...fieldProps}
                      onChange={(e) => {
                        const file = e.target.files && e.target.files[0];
                        if (file) onChange(file);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <Loader2 className="animate-spin mr-2" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
