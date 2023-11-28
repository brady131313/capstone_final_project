import "./style.css";
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/moon.css";
import Reveal from "reveal.js";
import Markdown from "reveal.js/plugin/markdown/markdown";
import { setupWasteOverTime } from "./charts/waste_over_time";
import { setupFoodBreakdown } from "./charts/food_breakdown";
import { setupSodiumOverTime } from "./charts/sodium_over_time";

let deck = new Reveal({ plugins: [Markdown], width: 1280, height: 720 });
deck.initialize();

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.target.onVisible) {
        entry.target.onVisible();
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const wasteOverTimeEl = document.getElementById("waste-over-time");
observer.observe(setupWasteOverTime(wasteOverTimeEl));

const sodiumOverTimeEl = document.getElementById("sodium-over-time");
observer.observe(setupSodiumOverTime(sodiumOverTimeEl));

const foodBreakdownEl = document.getElementById("food-breakdown");
const foodWasteEl = document.getElementById("food-waste");
const foodSodiumEl = document.getElementById("food-sodium");
observer.observe(
  setupFoodBreakdown(foodBreakdownEl, foodWasteEl, foodSodiumEl)
);
