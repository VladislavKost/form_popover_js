export class Tooltip {
  constructor() {}

  static tooltipHTML(tooltipTitle, tooltipDescription) {
    return `
      <div>
        <div class='tooltipTitle'>${tooltipTitle}</div>
        <div class='tooltipDescription'>${tooltipDescription}</div>
      </div>
    `;
  }

  createTooltip(tooltipTitle, tooltipDescription, element) {
    const tooltipElement = document.createElement("div");
    tooltipElement.innerHTML = Tooltip.tooltipHTML(
      tooltipTitle,
      tooltipDescription,
    );

    tooltipElement.classList.add("tooltip");

    const id = performance.now();

    this.tooltip = tooltipElement;

    document.body.appendChild(tooltipElement);

    const buttonPosition = element.getBoundingClientRect();
    tooltipElement.style.left =
      buttonPosition.left +
      element.offsetHeight / 2 -
      tooltipElement.offsetHeight / 2 -
      20 +
      "px";
    tooltipElement.style.top =
      buttonPosition.top - tooltipElement.offsetHeight - 10 + "px";

    return id;
  }
}
