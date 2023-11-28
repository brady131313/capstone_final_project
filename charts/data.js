import * as d3 from "d3";
import wasteData from "../data/waste.csv?raw";

const dateFormat = d3.utcFormat("%Y-%m-%d");

const loadCsv = () => {
  return d3.csvParse(wasteData, (d) => ({
    date: new Date(d.Date),
    food: d["Food"],
    calories: +d["Calories"],
    protein: +d["Protein (g)"],
    carbs: +d["Carbs (g)"],
    fat: +d["Fats (g)"],
    sodium: +d["Sodium (mg)"],
    waste: +d["Waste (g)"],
  }));
};

const groupData = (data) => {
  const grouped = [];
  let currentGroup = null;

  data.forEach((d) => {
    const { date, ...rest } = d;
    if (!currentGroup || dateFormat(currentGroup.date) !== dateFormat(date)) {
      currentGroup = {
        date,
        values: [],
        calorieTotal: 0,
        wasteTotal: 0,
        sodiumTotal: 0,
      };
      grouped.push(currentGroup);
    }

    currentGroup.values.push(rest);
    currentGroup.calorieTotal += d.calories;
    currentGroup.wasteTotal += d.waste;
    currentGroup.sodiumTotal += d.sodium;
  });

  return grouped;
};

export const loadWasteData = () => {
  return groupData(loadCsv());
};

export const loadBreakdownData = () => {
  const data = loadCsv();
  const grouped = {};

  data.forEach((d) => {
    grouped[d.food] = {
      calories: d.calories,
      sodium: d.sodium,
      waste: d.waste,
    };
  });

  return grouped;
};
