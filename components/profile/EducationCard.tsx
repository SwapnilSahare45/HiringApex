import { CirclePlus, GraduationCap, SquarePen } from "lucide-react";
import { TypographyH4, TypographyMuted } from "../ui/typography";
import { Button } from "../ui/button";

export default function EducationCard() {
    return (
        <section className="w-4/5 border flex justify-between px-12 py-6 rounded-xl shadow">

            <div className="space-y-4">
                <TypographyH4 className="flex items-center gap-2">
                    <GraduationCap />
                    Education
                </TypographyH4>

                <div>
                    <div className="flex items-center mb-1">
                        <h5 className="font-semibold">MCA</h5>
                        <Button variant="ghost">
                            <SquarePen />
                        </Button>
                    </div>

                    <div className="flex items-center gap-2 mb-0.5">
                        <TypographyMuted>DCPE, HVPM, Amravati</TypographyMuted>
                        <TypographyMuted>[2023 - 2025]</TypographyMuted>
                    </div>

                    <TypographyMuted>CGPA - 7.29</TypographyMuted>
                </div>
            </div>

            <Button variant="outline">
                <CirclePlus />
                Add Education
            </Button>

        </section>
    )
}