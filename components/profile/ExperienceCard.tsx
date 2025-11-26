import { BriefcaseBusiness, CirclePlus, SquarePen } from "lucide-react";
import { TypographyH4, TypographyMuted } from "../ui/typography";
import { Button } from "../ui/button";

export default function ExperienceCard() {
    return (
        <section className="w-4/5 border flex justify-between px-12 py-6 rounded-xl shadow">

            <div className="space-y-4">
                <TypographyH4 className="flex items-center gap-2">
                    <BriefcaseBusiness />
                    Experience
                </TypographyH4>

                <div className="w-4/5">
                    <div className="flex items-center mb-1">
                        <h5 className="font-semibold">Web Development Intern</h5>
                        <Button variant="ghost">
                            <SquarePen />
                        </Button>
                    </div>
                    <div className="flex items-center gap-2 mb-0.5">
                        <TypographyMuted>YHills Edutech Pvt. Ltd.</TypographyMuted>
                        <TypographyMuted>[01/2025 - 06/2025]</TypographyMuted>
                    </div>

                    <TypographyMuted>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum maiores quam odio ipsum, excepturi cumque officia quas omnis voluptas, numquam qui atque. Asperiores quasi aut, quaerat accusantium adipisci laudantium alias?</TypographyMuted>
                </div>

            </div>

            <Button variant="outline">
                <CirclePlus />
                Add Experience
            </Button>
        </section>
    )
}