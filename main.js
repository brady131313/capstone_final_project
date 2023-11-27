import "./style.css";
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/moon.css";
import Reveal from "reveal.js";
import Markdown from "reveal.js/plugin/markdown/markdown";
import { setupWasteOverTime } from "./charts/waste_over_time";

let deck = new Reveal({ plugins: [Markdown] });
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
