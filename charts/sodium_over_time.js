import { loadWasteData } from "./data";
import Chart from "chart.js/auto";

export function setupSodiumOverTime(element) {
  const data = loadWasteData();

  const onVisible = () => {
    new Chart(element, {
      type: "line",
      data: {
        labels: data.map((d) => d.date.toLocaleDateString()),
        datasets: [
          {
            label: "Waste",
            data: data.map((d) => d.sodiumTotal),
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgb(255, 99, 132)",
          },
        ],
      },
      options: {
        interaction: {
          mode: "index",
          intersect: false,
        },
        scales: {
          x: {
            ticks: {
              color: "white",
            },
          },
          y: {
            ticks: {
              color: "white",
            },
          },
        },
      },
    });
  };

  return Object.assign(element, { onVisible });
}
