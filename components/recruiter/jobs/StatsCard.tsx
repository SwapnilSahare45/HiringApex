import { Card, CardContent } from "@/components/ui/card";
import { TypographyMuted, TypographyP } from "@/components/ui/typography";

export default function StatsCard({ icon, iconBG, stats, statHeading }: any) {
  return (
    <Card>
      <CardContent className="flex flex-col items-start">
        <div className={`p-4 rounded-xl ${iconBG}`}>{icon}</div>
        <TypographyP className="font-bold text-4xl my-2">{stats}</TypographyP>
        <TypographyMuted>{statHeading}</TypographyMuted>
      </CardContent>
    </Card>
  );
}
