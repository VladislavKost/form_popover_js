import { TooltipButton } from "./TooltipButton";

const container = document.querySelector(".container");
const tooltipButton = new TooltipButton(container);
tooltipButton.createButton(
  "Popover title",
  "Click to toggle popover",
  "Add here's some amazing content. It's very engaging. Right?",
);
