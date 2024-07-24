import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

export default function NextButton() {
  return (
    <Button className="border-none rounded-full box-border bg-white size-10">
      <ChevronRight className="absolute" size={24} color="#565554"/>
    </Button>
  );
}
