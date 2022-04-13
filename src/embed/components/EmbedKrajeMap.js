import React from "react";
import ReactDOM from "react-dom";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import { debounce } from "lodash";
import { createPopper } from "@popperjs/core";

import styles from "../styles/EmbedKrajeMap.module.scss";

export default function EmbedKrajeMap({
  fillByKrajId,
  krajeData,
  renderTooltipContent,
  selectedKrajId,
  setSelectedKrajId,
}) {
  const containerRef = React.useRef(null);
  const svgRef = React.useRef(null);
  const [width, setWidth] = React.useState(null);
  const [height, setHeight] = React.useState(null);

  const onWindowResize = React.useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setWidth(rect.width);
      setHeight(rect.width * 0.583);
    }
  }, [setWidth, setHeight]);
  const onWindowResizeDebounced = React.useCallback(
    debounce(onWindowResize, 200),
    [onWindowResize]
  );

  React.useEffect(() => {
    window.addEventListener("resize", onWindowResizeDebounced);
    onWindowResize();
    return () => {
      window.removeEventListener("resize", onWindowResizeDebounced);
    };
  }, [onWindowResizeDebounced]);

  React.useEffect(() => {
    if (!krajeData) {
      return;
    }

    renderD3Svg({
      svgDomEl: svgRef.current,
      containerDomEl: containerRef.current,
      width,
      height,
      krajeData,
      fillByKrajId,
      selectedKrajId,
      setSelectedKrajId,
      renderTooltipContent,
    });
  }, [
    width,
    height,
    krajeData,
    fillByKrajId,
    selectedKrajId,
    setSelectedKrajId,
    renderTooltipContent,
  ]);

  const handleContainerClick = React.useCallback(
    (e) => {
      if (svgRef.current && svgRef.current === e.target) {
        setSelectedKrajId(null);
      }
    },
    [setSelectedKrajId, svgRef]
  );

  return (
    <div
      ref={containerRef}
      className={styles.container}
      onClick={handleContainerClick}
    >
      <svg ref={svgRef} width={width} height={height} />
    </div>
  );
}

const renderD3Svg = ({
  svgDomEl,
  containerDomEl,
  width,
  height,
  krajeData,
  fillByKrajId,
  selectedKrajId,
  setSelectedKrajId,
  renderTooltipContent,
}) => {
  const krajeGeoJson = topojson.feature(krajeData, krajeData.objects.tracts);

  const svgEl = d3.select(svgDomEl);

  // Clear svg contents & tooltips so are not adding new paths when rerendering
  svgEl.selectAll("*").remove();
  d3.select(containerDomEl).selectAll(".map-tooltip").remove();

  const projection = d3
    .geoMercator()
    // Sets the .scale and .translate to fit Czech republic exactly to the available svg area
    .fitSize([width, height], krajeGeoJson);

  const pathGenerator = d3.geoPath().projection(projection);

  for (const feature of krajeGeoJson.features) {
    feature.id = parseInt(feature.properties.KOD, 10);
  }

  svgEl
    .selectAll(".kraj")
    .data(krajeGeoJson.features)
    .enter()
    .append("path")
    .attr("d", pathGenerator)
    .attr("class", (feature) => `kraj kraj-${feature.id}`)
    .attr("fill", (feature) => fillByKrajId[feature.id])
    .attr("opacity", (feature) =>
      !selectedKrajId || feature.id === selectedKrajId ? 1 : 0.3
    )
    .attr("stroke", "#000000")
    .attr("stroke-width", (feature) =>
      feature.id === selectedKrajId ? 2 : 0.5
    )
    .on("click", function (e, feature) {
      if (selectedKrajId !== feature.id) {
        setSelectedKrajId(feature.id);
      } else {
        setSelectedKrajId(null);
      }
    })
    .on("mouseover", function (e, feature) {
      if (selectedKrajId !== null && feature.id !== selectedKrajId) {
        e.currentTarget.setAttribute("opacity", 1);
      }

      hideAllTooltips({ containerDomEl });
      showTooltip({
        referenceDomEl: e.currentTarget,
        containerDomEl,
        feature,
        renderTooltipContent,
      });
    })
    .on("mouseout", function (e, feature) {
      if (selectedKrajId !== null && feature.id !== selectedKrajId) {
        e.currentTarget.setAttribute("opacity", 0.3);
      }

      hideAllTooltips({ containerDomEl });
      if (selectedKrajId) {
        showTooltip({
          referenceDomEl: svgEl.select(`.kraj.kraj-${selectedKrajId}`).node(),
          containerDomEl,
          feature: krajeGeoJson.features.find((f) => f.id === selectedKrajId),
          renderTooltipContent,
        });
      }
    });

  if (selectedKrajId) {
    svgEl.select(`.kraj.kraj-${selectedKrajId}`).raise();

    showTooltip({
      referenceDomEl: svgEl.select(`.kraj.kraj-${selectedKrajId}`).node(),
      containerDomEl,
      feature: krajeGeoJson.features.find((f) => f.id === selectedKrajId),
      renderTooltipContent,
    });
  }
};

const showTooltip = ({
  referenceDomEl,
  containerDomEl,
  feature,
  renderTooltipContent,
}) => {
  const tooltipEl = document.createElement("div");
  tooltipEl.classList.add("map-tooltip");
  tooltipEl.classList.add(`map-tooltip-okres-${feature.id}`);
  tooltipEl.innerHTML = `
    <div class="tooltip-arrow" data-popper-arrow></div>
    <div class="tooltip-content"></div>
    `;
  containerDomEl.append(tooltipEl);

  ReactDOM.render(
    renderTooltipContent(feature.id, feature),
    tooltipEl.querySelector(".tooltip-content")
  );

  createPopper(referenceDomEl, tooltipEl, {
    placement: "right",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 10], // [y, x]
        },
      },
      {
        name: "flip",
        options: {
          fallbackPlacements: ["left"],
          boundary: containerDomEl,
        },
      },
    ],
  });
};

const hideAllTooltips = ({ containerDomEl }) => {
  d3.select(containerDomEl)
    .selectAll(".map-tooltip")
    .each(function () {
      this.remove();
    });
};
