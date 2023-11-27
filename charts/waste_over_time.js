import * as d3 from "d3";
import { loadWasteData } from "./data";

export function setupWasteOverTime(element) {
  const data = loadWasteData();
  console.log(data);
  const margin = { top: 20, right: 20, bottom: 30, left: 50 };

  const onVisible = () => {
    const width = element.clientWidth;
    const height = element.clientHeight;

    const x = d3
      .scaleUtc()
      .domain(d3.extent(data, (d) => d.date))
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.wasteTotal)])
      .range([height - margin.bottom, margin.top]);

    const line = d3
      .line()
      .x((d) => x(d.date))
      .y((d) => y(d.wasteTotal));

    const svg = d3.create("svg").attr("width", width).attr("height", height);

    svg
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y));

    const path = svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line);

    const totalLength = path.node().getTotalLength();
    path
      .attr("stroke-dasharray", `${totalLength} ${totalLength}`)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(2000)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0);

    const tooltip = d3
      .select(element)
      .append("div")
      .style("position", "absolute")
      .style("visibility", "hidden");

    svg
      .on("mouseover", () => tooltip.style("visibility", "visible"))
      .on("mouseout", () => tooltip.style("visibility", "hidden"))
      .on("mousemove", function (event) {
        const bisect = d3.bisector((d) => d.date).center;
        const i = bisect(data, x.invert(d3.pointer(event)[0]));
        console.log(data[i]);
        // const d0 = data[i - 1];
        // const d1 = data[i];
        // const d = x0 - d0.date > d1.date - x0 ? d1 : d0;

        // tooltip
        //   .html(
        //     `<div class="tooltip-date">${d.date.toLocaleDateString()}</div>
        //     <div class="tooltip-waste">${d.wasteTotal.toFixed(2)}g</div>`
        //   )
        //   .style("left", `${event.pageX + 10}px`)
        //   .style("top", `${event.pageY - 10}px`);
      });

    element.appendChild(svg.node());
  };

  return Object.assign(element, { onVisible });
}
