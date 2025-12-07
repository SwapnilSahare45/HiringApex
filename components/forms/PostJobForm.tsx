"use client";

import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import SelectDate from "../ui/DatePicker";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { postJobSchema, PostJobSchemaType } from "@/lib/zodSchema/jobSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useEffect } from "react";
import { postJob } from "@/app/actions/recruiter.actions";
import { toast } from "sonner";

export default function PostJobForm() {
  const [state, formAction, isPending] = useActionState(postJob, {
    success: false,
    error: "",
  });

  const form = useForm<PostJobSchemaType>({
    resolver: zodResolver(postJobSchema),
    defaultValues: {
      title: "",
      industry: "",
      employmentType: "Full-time",
      locationType: "On-site",
      city: "",
      salaryMin: undefined,
      salaryMax: undefined,
      experienceLevel: "Fresher",
      educationRequired: "None",
      vacancies: 1,
      applicationDeadline: undefined,
      requiredSkills: "",
      description: "",
    },
  });

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
    } else if (state.error) {
      toast.error(state.error);
    }
  }, [state]);

  const locationType = form.watch("locationType");

  function onSubmit(values: PostJobSchemaType) {
    startTransition(() => {
      formAction(values);
    });
  }
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-lg">
          Post a New Job: Complete Listing
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Frontend Developer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 mt-4 md:grid-cols-2 gap-x-2 gap-y-4">
              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Information Technology (IT) Services"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="employmentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employment Type</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a employment Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Full-time">Full-time</SelectItem>
                          <SelectItem value="Part-time">Part-time</SelectItem>
                          <SelectItem value="Contract">Contract</SelectItem>
                          <SelectItem value="Temporary">Temporary</SelectItem>
                          <SelectItem value="Internship">Internship</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="locationType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location Type</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a location Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="On-site">On-site</SelectItem>
                          <SelectItem value="Remote">Remote</SelectItem>
                          <SelectItem value="Hybrid">Hybrid</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Pune, India"
                        {...field}
                        disabled={locationType === "Remote"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="salaryMin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Salary</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g., 300000"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="salaryMax"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Salary</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 10000000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="experienceLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experience Level</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select an Experience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Fresher">Fresher</SelectItem>
                          <SelectItem value="Associate">Associate</SelectItem>
                          <SelectItem value="Senior">Senior</SelectItem>
                          <SelectItem value="Lead">Lead</SelectItem>
                          <SelectItem value="Director">Director</SelectItem>
                          <SelectItem value="Executive">Executive</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="educationRequired"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Education Required</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select qualification" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="High School">
                            High School
                          </SelectItem>
                          <SelectItem value="Associate's Degree">
                            {`Associate's Degree`}
                          </SelectItem>
                          <SelectItem value="Bachelor's Degree">
                            {`Bachelor's Degree`}
                          </SelectItem>
                          <SelectItem value="Master's Degree">
                            {`Master's Degree`}
                          </SelectItem>
                          <SelectItem value="PhD">PhD</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="vacancies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vacancies</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="applicationDeadline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deadline to Apply</FormLabel>
                    <FormControl>
                      <SelectDate
                        value={field.value}
                        onChange={field.onChange}
                        placeholderText="Select a deadline date"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="requiredSkills"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Required Skills</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={3}
                      placeholder="Enter required skills comma ( , ) separated e.g. HTML,CSS,JavaScript"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>
                    Job Description (Responsibilities & Details)
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      rows={6}
                      placeholder="Describe the role, responsibilities, and company culture."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full mt-4" disabled={isPending}>
              {isPending ? "Posting..." : "Post"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
