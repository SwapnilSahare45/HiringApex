"use client";

import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  Briefcase,
  CheckCircle2,
  CirclePlus,
  Eye,
  FileText,
  MapPin,
  Save,
  Sparkles,
  Tag,
  X,
} from "lucide-react";
import { TypographyH3, TypographyH4, TypographyList } from "../ui/typography";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import React, {
  startTransition,
  useActionState,
  useEffect,
  useState,
} from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { RadioGroupItem } from "@radix-ui/react-radio-group";
import { RadioGroup } from "@/components/ui/radio-group";
import { postJobSchema, postJobSchemaType } from "@/lib/zodSchema/jobSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { postJob } from "@/app/actions/recruiter.actions";
import { toast } from "sonner";

export default function PostJobForm() {
  const [currentStep, setCurrentStep] = useState(1);

  const [responsibilities, setResponsibilities] = useState<string[]>([]);
  const [qualifications, setQualifications] = useState<string[]>([]);
  const [niceToHave, setNiceToHave] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [benefits, setBenefits] = useState<string[]>([]);

  const [responsibilitiesInput, setResponsibilitiesInput] = useState("");
  const [qualificationsInput, setQualificationsInput] = useState("");
  const [niceToHaveInput, setNiceToHaveInput] = useState("");
  const [skillsInput, setSkillsInput] = useState("");
  const [benefitsInput, setBenefitsInput] = useState("");

  const steps = [
    { number: 1, title: "Basic Info", icon: <Briefcase className="w-5 h-5" /> },
    { number: 2, title: "Job Details", icon: <FileText className="w-5 h-5" /> },
    {
      number: 3,
      title: "Requirements",
      icon: <CheckCircle2 className="w-5 h-5" />,
    },
    { number: 4, title: "Benefits", icon: <Sparkles className="w-5 h-5" /> },
    { number: 5, title: "Review", icon: <Eye className="w-5 h-5" /> },
  ];

  const [state, formAction, isPending] = useActionState(postJob, {
    success: false,
    error: "",
  });

  const form = useForm<postJobSchemaType>({
    resolver: zodResolver(postJobSchema),
    defaultValues: {
      title: "",
      industry: "",
      experienceLevel: "Entry Level",
      employmentType: "Full-time",
      positions: undefined,
      deadline: undefined,
      location: "",
      locationType: "On-site",
      salaryMin: undefined,
      salaryMax: undefined,
      salaryCurrency: undefined,
      description: "",
      responsibilities: [],
      requiredQualifications: [],
      niceToHave: [],
      skills: [],
      companyBenefits: [],
      applicationEmail: "",
      externalApplicationLink: "",
    },
  });

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      setResponsibilities([]);
      setQualifications([]);
      setSkills([]);
      setNiceToHave([]);
      setBenefits([]);
      form.reset();
    } else if (state.error) {
      toast.error(state.error);
    }
  }, [state, form]);

  const getFieldsForStep = (step: number) => {
    switch (step) {
      case 1:
        return [
          "title",
          "industry",
          "experienceLevel",
          "employmentType",
          "positions",
          "deadline",
        ];
      case 2:
        return [
          "location",
          "locationType",
          "salaryMin",
          "salaryMax",
          "salaryCurrency",
          "description",
          "responsibilities",
        ];
      case 3:
        return ["requiredQualifications", "niceToHave", "skills"];
      case 4:
        return [
          "companyBenefits",
          "applicationEmail",
          "externalApplicationLink",
        ];
      default:
        return [];
    }
  };

  const handleNext = async () => {
    const fieldToValidate = getFieldsForStep(currentStep);
    const isValid = await form.trigger(fieldToValidate as any);
    if (isValid) {
      setCurrentStep(currentStep + 1);
      window.scroll(0, 0);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  function onClick(values: postJobSchemaType) {
    startTransition(() => {
      formAction(values);
    });
  }
  return (
    <div>
      <div className="w-full dark:bg-gray-600/10 bg-gray-400/10 py-4">
        <div className="max-w-6xl mx-auto flex items-cente justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/jobs"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </Link>

            <Separator orientation="vertical" />

            <TypographyH3 className="pb-0 font-extrabold">
              Post a New Job
            </TypographyH3>
          </div>

          <div className="space-x-2">
            <Button variant="outline">
              <Eye />
              <span>Preview</span>
            </Button>
            <Button variant="outline">
              <Save />
              <span>Save Draft</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="mb-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all ${
                    currentStep >= step.number
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {currentStep > step.number ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : (
                    step.icon
                  )}
                </div>
                <span
                  className={`text-xs sm:text-sm font-medium text-center ${
                    currentStep >= step.number
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 transition-all ${
                    currentStep > step.number ? "bg-primary" : "bg-border"
                  }`}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onClick)}>
          <Card className="max-w-6xl mx-auto mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">
                {currentStep === 1 && "Basic Information"}
                {currentStep === 2 && "Job Details"}
                {currentStep === 3 && "Requirements & Skills"}
                {currentStep === 4 && "Benefits & Perks"}
                {currentStep === 5 && "Review Your Job Posting"}
              </CardTitle>
              <CardDescription>
                {currentStep === 1 &&
                  `Let's start with the essential details about this position`}
                {currentStep === 2 &&
                  "Provide comprehensive information about the role"}
                {currentStep === 3 &&
                  `Define what you're looking for in candidates`}
                {currentStep === 4 &&
                  "Highlight what makes your company a great place to work"}
                {currentStep === 5 &&
                  "Make sure everything looks good before publishing"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {currentStep === 1 && (
                <>
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Senior Full Stack Developer"
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
                      name="industry"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Industry</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., IT & Services"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="experienceLevel"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Experience Level</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select level" />
                              </SelectTrigger>
                              <SelectContent>
                                {[
                                  "Internship",
                                  "Entry Level",
                                  "Mid-Level",
                                  "Senior",
                                  "Lead",
                                  "Manager",
                                  "Director",
                                  "Executive",
                                ].map((level) => (
                                  <SelectItem value={level} key={level}>
                                    {level}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="employmentType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employment Type</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5"
                          >
                            {[
                              "Full-time",
                              "Part-time",
                              "Contract",
                              "Temporary",
                              "Internship",
                            ].map((type) => (
                              <FormItem key={type} className="space-y-0">
                                <FormControl>
                                  <RadioGroupItem
                                    value={type}
                                    className="h-auto w-full aspect-square md:aspect-auto p-4 flex flex-col items-center justify-center text-center rounded-md border-2 border-muted bg-popover text-foreground hover:bg-accent hover:text-accent-foreground data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-50 dark:data-[state=checked]:bg-blue-900/20 [&_span]:hidden [&_svg]:hidden"
                                  >
                                    <p className="text-sm font-medium">
                                      {type}
                                    </p>
                                  </RadioGroupItem>
                                </FormControl>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="positions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Positions</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="e.g., 1"
                              // {...field}
                              onChange={(e) => {
                                const position = e.target.value;
                                field.onChange(
                                  position ? parseInt(position) : undefined
                                );
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="deadline"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Application Deadline</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              {...field}
                              value={
                                field.value instanceof Date
                                  ? field.value.toISOString().split("T")[0]
                                  : field.value || ""
                              }
                              onChange={(e) => {
                                const dateString = e.target.value;
                                field.onChange(
                                  dateString ? new Date(dateString) : undefined
                                );
                              }}
                              onClick={(e) => {
                                const target = e.target as HTMLInputElement;
                                if (target.showPicker) {
                                  target.showPicker();
                                }
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Pune, India" {...field} />
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
                            <RadioGroup
                              value={field.value}
                              onValueChange={field.onChange}
                              className="grid grid-cols-1 gap-4 md:grid-cols-3"
                            >
                              {["On-site", "Remote", "Hybrid"].map((type) => (
                                <FormItem key={type} className="space-y-0">
                                  <FormControl>
                                    <RadioGroupItem
                                      value={type}
                                      className="h-auto w-full aspect-square md:aspect-auto p-4 flex flex-col items-center justify-center text-center rounded-md border-2 border-muted bg-popover text-foreground hover:bg-accent hover:text-accent-foreground data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-50 dark:data-[state=checked]:bg-blue-900/20 [&_span]:hidden [&_svg]:hidden"
                                    >
                                      <p className="text-sm font-medium">
                                        {type}
                                      </p>
                                    </RadioGroupItem>
                                  </FormControl>
                                </FormItem>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <FormField
                      control={form.control}
                      name="salaryMin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Minimum salary</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Minimum salary"
                              {...field}
                              onChange={(e) => {
                                const salaryMin = e.target.value;
                                field.onChange(
                                  salaryMin ? parseInt(salaryMin) : undefined
                                );
                              }}
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
                          <FormLabel>Maximum salary</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Maximum salary"
                              {...field}
                              onChange={(e) => {
                                const salaryMax = e.target.value;
                                field.onChange(
                                  salaryMax ? parseInt(salaryMax) : undefined
                                );
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="salaryCurrency"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Currency</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select currency" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="INR">INR (₹)</SelectItem>
                              <SelectItem value="USD">USD ($)</SelectItem>
                              <SelectItem value="EUR">EUR (€)</SelectItem>
                              <SelectItem value="GBP">GBP (£)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Description</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={8}
                            placeholder="Describe the role, what the candidate will do, and what makes this opportunity exciting..."
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          {field.value?.length || 0} / 100 minimum characters
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="responsibilities"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Key Responsibilities</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Add a new responsibility"
                            value={responsibilitiesInput}
                            onChange={(e) =>
                              setResponsibilitiesInput(e.target.value)
                            }
                            onKeyDown={(e) => {
                              if (
                                e.key === "Enter" &&
                                responsibilitiesInput.trim()
                              ) {
                                e.preventDefault();
                                const newList = [
                                  ...responsibilities,
                                  responsibilitiesInput.trim(),
                                ];
                                setResponsibilities(newList);
                                form.setValue(
                                  "responsibilities",
                                  newList as any
                                );
                                setResponsibilitiesInput("");
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                        <Button
                          type="button"
                          onClick={() => {
                            if (responsibilitiesInput.trim().length > 0) {
                              const newList = [
                                ...responsibilities,
                                responsibilitiesInput.trim(),
                              ];
                              setResponsibilities(newList);
                              form.setValue("responsibilities", newList as any);
                              setResponsibilitiesInput("");
                            }
                          }}
                        >
                          <CirclePlus className="w-5 h-5" /> Responsibility
                        </Button>
                        <div className="space-y-1">
                          {responsibilities.map((responsibility, idx) => (
                            <div key={idx} className="flex gap-2">
                              <p className="border py-2 px-4 grow rounded bg-purple-500/10 border-purple-500/20 font-semibold text-black dark:text-white">
                                {responsibility}
                              </p>
                              <Button
                                type="button"
                                variant="destructive"
                                size="lg"
                                onClick={() => {
                                  const newList = responsibilities.filter(
                                    (_, index) => index !== idx
                                  );
                                  setResponsibilities(newList);
                                  form.setValue(
                                    "responsibilities",
                                    newList as any
                                  );
                                }}
                              >
                                <X className="w-5 h-5" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </FormItem>
                    )}
                  />
                </>
              )}

              {currentStep === 3 && (
                <>
                  <FormField
                    control={form.control}
                    name="requiredQualifications"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Required Qualification</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Requirement"
                            value={qualificationsInput}
                            onChange={(e) =>
                              setQualificationsInput(e.target.value)
                            }
                            onKeyDown={(e) => {
                              if (
                                e.key === "Enter" &&
                                qualificationsInput.trim()
                              ) {
                                e.preventDefault();
                                const newList = [
                                  ...qualifications,
                                  qualificationsInput.trim(),
                                ];
                                setQualifications(newList);
                                form.setValue(
                                  "requiredQualifications",
                                  newList as any
                                );
                                setQualificationsInput("");
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                        <Button
                          type="button"
                          onClick={() => {
                            if (qualificationsInput.trim().length > 0) {
                              const newList = [
                                ...qualifications,
                                qualificationsInput.trim(),
                              ];
                              setQualifications(newList);
                              form.setValue(
                                "requiredQualifications",
                                newList as any
                              );
                              setQualificationsInput("");
                            }
                          }}
                        >
                          <CirclePlus className="w-5 h-5" /> Required
                          Qualification
                        </Button>
                        <div className="space-y-1">
                          {qualifications.map((qualification, idx) => (
                            <div key={idx} className="flex gap-2">
                              <p className="border py-2 px-4 grow rounded bg-purple-500/10 border-purple-500/20 font-semibold text-black dark:text-white">
                                {qualification}
                              </p>
                              <Button
                                type="button"
                                variant="destructive"
                                size="lg"
                                onClick={() => {
                                  const newList = qualifications.filter(
                                    (_, index) => index !== idx
                                  );
                                  setQualifications(newList);
                                  form.setValue(
                                    "requiredQualifications",
                                    newList as any
                                  );
                                }}
                              >
                                <X className="w-5 h-5" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="niceToHave"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nice to Have</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nice to have"
                            value={niceToHaveInput}
                            onChange={(e) => setNiceToHaveInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && niceToHaveInput.trim()) {
                                e.preventDefault();
                                const newList = [
                                  ...niceToHave,
                                  niceToHaveInput.trim(),
                                ];
                                setNiceToHave(newList);
                                form.setValue("niceToHave", newList);
                                setNiceToHaveInput("");
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                        <Button
                          type="button"
                          onClick={() => {
                            if (niceToHaveInput.trim().length > 0) {
                              const newList = [
                                ...niceToHave,
                                niceToHaveInput.trim(),
                              ];
                              setNiceToHave(newList);
                              form.setValue("niceToHave", newList);
                              setNiceToHaveInput("");
                            }
                          }}
                        >
                          <CirclePlus className="w-5 h-5" /> Nice to have
                        </Button>
                        <div className="space-y-1">
                          {niceToHave.map((nth, idx) => (
                            <div key={idx} className="flex gap-2">
                              <p className="border py-2 px-4 grow rounded bg-purple-500/10 border-purple-500/20 font-semibold text-black dark:text-white">
                                {nth}
                              </p>
                              <Button
                                type="button"
                                variant="destructive"
                                size="lg"
                                onClick={() => {
                                  const newList = niceToHave.filter(
                                    (_, index) => index !== idx
                                  );
                                  setNiceToHave(newList);
                                  form.setValue("niceToHave", newList as any);
                                }}
                              >
                                <X className="w-5 h-5" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="skills"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Required Skills</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Skills"
                            value={skillsInput}
                            onChange={(e) => setSkillsInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && skillsInput.trim()) {
                                e.preventDefault();
                                const newList = [...skills, skillsInput.trim()];
                                setSkills(newList);
                                form.setValue("skills", newList as any);
                                setSkillsInput("");
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                        <Button
                          type="button"
                          onClick={() => {
                            if (skillsInput.trim().length > 0) {
                              const newList = [...skills, skillsInput.trim()];
                              setSkills(newList);
                              form.setValue("skills", newList as any);
                              setSkillsInput("");
                            }
                          }}
                        >
                          <CirclePlus className="w-5 h-5" />
                          Skill
                        </Button>
                        <div className="flex flex-wrap gap-2">
                          {skills.map((skill, idx) => (
                            <p
                              key={idx}
                              className="border py-2 pl-4 rounded bg-purple-500/10 border-purple-500/20 font-semibold text-black dark:text-white flex items-center"
                            >
                              {skill}
                              <Button
                                type="button"
                                variant="link"
                                size="sm"
                                onClick={() => {
                                  const newList = skills.filter(
                                    (_, index) => index !== idx
                                  );
                                  setSkills(newList);
                                  form.setValue("skills", newList as any);
                                }}
                              >
                                <X />
                              </Button>
                            </p>
                          ))}
                        </div>
                      </FormItem>
                    )}
                  />
                </>
              )}

              {currentStep === 4 && (
                <>
                  <FormField
                    control={form.control}
                    name="companyBenefits"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Benefits</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Bemefit"
                            value={benefitsInput}
                            onChange={(e) => setBenefitsInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && benefitsInput.trim()) {
                                e.preventDefault();
                                const newList = [...benefits, benefitsInput];
                                setBenefits(newList);
                                form.setValue(
                                  "companyBenefits",
                                  newList as any
                                );
                                setBenefitsInput("");
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                        <Button
                          type="button"
                          onClick={() => {
                            if (benefitsInput.trim().length > 0) {
                              const newList = [...benefits, benefitsInput];
                              setBenefits(newList);
                              form.setValue("companyBenefits", newList as any);
                              setBenefitsInput("");
                            }
                          }}
                        >
                          <CirclePlus className="w-5 h-5" />
                          Benefit
                        </Button>
                        <div className="space-y-1">
                          {benefits.map((benefit, idx) => (
                            <div key={idx} className="flex gap-2">
                              <p className="border py-2 px-4 grow rounded bg-purple-500/10 border-purple-500/20 font-semibold text-black dark:text-white">
                                {benefit}
                              </p>
                              <Button
                                type="button"
                                variant="destructive"
                                size="lg"
                                onClick={() => {
                                  const newList = benefits.filter(
                                    (_, index) => index !== idx
                                  );
                                  setBenefits(newList);
                                  form.setValue(
                                    "companyBenefits",
                                    newList as any
                                  );
                                }}
                              >
                                <X className="w-5 h-5" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="applicationEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Application Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="hr@company.com"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Where application will be sent
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="externalApplicationLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          External Application Link (Optional)
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://company.com/careers/apply"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Redirect applicants to your career page
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {currentStep === 5 && (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-1">
                        <Briefcase className="w-5 h-5" />
                        Basic Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                          <p className="text-sm text-gray-400 dark:text-gray-600">
                            Job Title
                          </p>
                          <p className="font-semibold capitalize">
                            {form.getValues("title") || "Not specified"}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-400 dark:text-gray-600">
                            Industry
                          </p>
                          <p className="font-semibold capitalize">
                            {form.getValues("industry") || "Not specified"}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-400 dark:text-gray-600">
                            Experience Level
                          </p>
                          <p className="font-semibold">
                            {form.getValues("experienceLevel") ||
                              "Not specified"}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-400 dark:text-gray-600">
                            Employment Type
                          </p>
                          <p className="font-semibold">
                            {form.getValues("employmentType") ||
                              "Not specified"}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-1">
                        <MapPin className="w-5 h-5" />
                        Location & Compensation
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                          <p className="text-sm text-gray-400 dark:text-gray-600">
                            Location
                          </p>
                          <p className="font-semibold capitalize">
                            {form.getValues("location") || "Not specified"}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-400 dark:text-gray-600">
                            Location Type
                          </p>
                          <p className="font-semibold">
                            {form.getValues("locationType") || "Not specified"}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-400 dark:text-gray-600">
                            Salary Range
                          </p>
                          <p className="font-semibold">
                            {form.getValues("salaryMin") &&
                            form.getValues("salaryMax")
                              ? `${form.getValues(
                                  "salaryCurrency"
                                )} ${form.getValues(
                                  "salaryMin"
                                )} - ${form.getValues("salaryMax")}`
                              : "Not specified"}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-1">
                        <FileText className="w-5 h-5" />
                        Job Description
                      </CardTitle>
                      <CardContent>
                        <p>{form.getValues("description")}</p>
                      </CardContent>
                    </CardHeader>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-1">
                        <Tag className="w-5 h-5" />
                        Required Skills
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {form.getValues("skills") &&
                      form.getValues("skills")?.length > 0 ? (
                        <TypographyList className="mt-2">
                          {(form.getValues("skills") || []).map(
                            (skill, idx) => (
                              <li key={idx} className="ml-8">
                                {skill}
                              </li>
                            )
                          )}
                        </TypographyList>
                      ) : (
                        <p>No skills added</p>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-1">
                        <CheckCircle2 className="w-5 h-5" />
                        Requirements
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {form.getValues("responsibilities") ||
                      form.getValues("requiredQualifications") ||
                      form.getValues("niceToHave") ? (
                        <>
                          {form.getValues("responsibilities").length > 0 ? (
                            <>
                              <p className="font-semibold underline underline-offset-4 mt-4">
                                Responsibilities
                              </p>
                              <TypographyList className="mt-2">
                                {form
                                  .getValues("responsibilities")
                                  .map((res, idx) => (
                                    <li key={idx} className="ml-8">
                                      {res}
                                    </li>
                                  ))}
                              </TypographyList>
                            </>
                          ) : (
                            <p>No responsibilities added</p>
                          )}

                          {form.getValues("requiredQualifications").length >
                          0 ? (
                            <>
                              <p className="font-semibold underline underline-offset-4 mt-4">
                                Required Qualifications
                              </p>
                              <TypographyList className="mt-2">
                                {form
                                  .getValues("requiredQualifications")
                                  .map((reqQul, idx) => (
                                    <li key={idx} className="ml-8">
                                      {reqQul}
                                    </li>
                                  ))}
                              </TypographyList>
                            </>
                          ) : (
                            <p>No qualifications added</p>
                          )}

                          {form.getValues("niceToHave")?.length > 0 ? (
                            <>
                              <p className="font-semibold underline underline-offset-4 mt-4">
                                Nice to Have
                              </p>
                              <TypographyList className="mt-2">
                                {form
                                  .getValues("niceToHave")
                                  .map((nth, idx) => (
                                    <li key={idx} className="ml-8">
                                      {nth}
                                    </li>
                                  ))}
                              </TypographyList>
                            </>
                          ) : (
                            <p>No Nice to have added</p>
                          )}
                        </>
                      ) : (
                        <p>No requirements added</p>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="py-4 bg-blue-500/10 border-blue-500/20">
                    <CardContent className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-blue-400 dark:text-blue-600" />
                      Once published, your job posting will be visible to all
                      job seekers on the platform. You can edit or pause it
                      anytime from your dashboard.
                    </CardContent>
                  </Card>
                </>
              )}
              <Separator />
            </CardContent>
            <CardFooter className="gap-2 justify-end">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  disabled={isPending}
                >
                  Previous
                </Button>
              )}

              {currentStep < 5 && (
                <Button type="button" onClick={handleNext}>
                  Next step
                </Button>
              )}

              {currentStep === 5 && (
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Posting..." : "Post Job"}
                </Button>
              )}
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
