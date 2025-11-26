import { Brain, CirclePlus } from "lucide-react";
import { TypographyH4, TypographyList } from "../ui/typography";
import { Button } from "../ui/button";

export default function SkillsCard() {
    const skills = ["JavaScript", "HTML", "CSS", "React.js", "Node.js", "MongoDB", "Tailwid CSS", "Restful APIs", "NoSQL"]
    return (
        <section className="w-4/5 border flex justify-between px-12 py-6 rounded-xl shadow">

            <div className="space-y-4">
                <TypographyH4 className="flex items-center gap-2">
                    <Brain />
                    Skills
                </TypographyH4>

                <TypographyList className="w-4/5 list-none m-0 flex flex-wrap items-center gap-3">
                    {skills.map((skill, idx) => (
                        <li key={idx} className="border py-2 px-5">{skill}</li>
                    ))}
                </TypographyList>
            </div>

            <Button variant="outline">
                <CirclePlus />
                Add Skills
            </Button>

        </section>
    )
}