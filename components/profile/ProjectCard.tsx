import { CirclePlus, FolderCode, SquarePen } from "lucide-react";
import { TypographyH4, TypographyMuted } from "../ui/typography";
import { Button } from "../ui/button";

export default function ProjectCard() {
    return (
        <section className="w-4/5 border flex justify-between px-12 py-6 rounded-xl shadow">

            <div className="space-y-4">
                <TypographyH4 className="flex items-center gap-2">
                    <FolderCode />
                    Project
                </TypographyH4>

                <div className="w-4/5">
                    <div className="flex items-center mb-1">
                        <h5 className="font-semibold">ARTORA, Art Auction Platform</h5>
                        <Button variant="ghost">
                            <SquarePen />
                        </Button>
                    </div>
                    <TypographyMuted className="mb-0.5">Mar 2025 to Aug 2025</TypographyMuted>
                    <TypographyMuted>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi sint, natus, similique doloribus, modi ea perspiciatis reprehenderit accusamus illo dicta nesciunt et sit libero debitis. Consequatur ratione esse quidem itaque.</TypographyMuted>
                </div>
            </div>

            <Button variant="outline">
                <CirclePlus/>
                Add Project
            </Button>

        </section>
    )
}