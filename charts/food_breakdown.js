import { loadBreakdownData } from "./data";
import Chart from "chart.js/auto";

export function setupFoodBreakdown(container, wasteEl, sodiumEl) {
  const data = loadBreakdownData();

  const onVisible = () => {
    new Chart(wasteEl, {
      type: "doughnut",
      data: {
        labels: Object.keys(data),
        datasets: [
          {
            data: Object.values(data).map((d) => d.waste),
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });

    new Chart(sodiumEl, {
      type: "doughnut",
      data: {
        labels: Object.keys(data),
        datasets: [
          {
            data: Object.values(data).map((d) => d.sodium),
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  };

  return Object.assign(container, { onVisible });
}
