import { ChevronLeft } from "lucide-react";
import { Button } from "./ui/button";

export default function PrevButton() {
  return (
    <Button className="border-none rounded-full box-border bg-white size-10">
      <ChevronLeft className="absolute" size={24} color="#565554" />
    </Button>
  );
}
