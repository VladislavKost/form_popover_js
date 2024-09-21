import { Tooltip } from "./tooltip";

export class TooltipButton {
  constructor(parentEl) {
    this.parentEl = parentEl;
    this.buttons = [];
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  createButton(buttonText, tooltipTitle, tooltipDescription) {
    const button = document.createElement("button");

    button.classList.add("btn-tooltip");
    button.textContent = buttonText;
    this.parentEl.append(button);
    const tooltip = new Tooltip();
    tooltip.createTooltip(tooltipTitle, tooltipDescription, button);
    tooltip.tooltip.classList.add("hide-tooltip");
    this.buttons.push({
      button,
      tooltip: tooltip.tooltip,
    });

    button.addEventListener("click", this.onButtonClick);
  }

  onButtonClick(e) {
    const targetButton = this.buttons.find(
      (button) => button.button === e.target,
    );
    debugger;
    targetButton.tooltip.classList.toggle("hide-tooltip");
  }
}
