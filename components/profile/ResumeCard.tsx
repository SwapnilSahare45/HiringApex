import { FileText } from "lucide-react";
import { Button } from "../ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "../ui/empty";

export default function ResumeCard() {
    return (
        <Empty className="w-4/5 border border-dashed shadow">
            <EmptyHeader>
                <EmptyMedia variant='icon'>
                    <FileText />
                </EmptyMedia>
                <EmptyTitle>Resume</EmptyTitle>
                <EmptyDescription>Resume not uploaded yet</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <Button variant="outline">Upload Resume</Button>
            </EmptyContent>
        </Empty>
    )
}