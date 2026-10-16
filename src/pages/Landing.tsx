import { useLayoutEffect } from "react";
import { SplitDoor } from "@/motion/SplitDoor";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function Landing() {
  usePageTitle("Muhammad Ahmad — Academic & Freelance");

  useLayoutEffect(() => {
    delete document.body.dataset.tone;
  }, []);

  return <SplitDoor />;
}
