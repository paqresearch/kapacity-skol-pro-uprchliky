import React from "react";
import ReactDOM from "react-dom";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import { debounce } from "lodash";
import { createPopper } from "@popperjs/core";

import styles from "../styles/EmbedOrpMap.module.scss";

export default function EmbedOrpMap({
  fillByOrpId,
  krajeData,
  orpData,
  renderTooltipContent,
  selectedOrpId,
  setSelectedOrpId,
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
    if (!orpData || !krajeData) {
      return;
    }

    renderD3Svg({
      svgDomEl: svgRef.current,
      containerDomEl: containerRef.current,
      width,
      height,
      orpData,
      krajeData,
      fillByOrpId,
      selectedOrpId,
      setSelectedOrpId,
      renderTooltipContent,
    });
  }, [
    width,
    height,
    orpData,
    krajeData,
    fillByOrpId,
    selectedOrpId,
    setSelectedOrpId,
    renderTooltipContent,
  ]);

  const handleContainerClick = React.useCallback(
    (e) => {
      if (svgRef.current && svgRef.current === e.target) {
        setSelectedOrpId(null);
      }
    },
    [setSelectedOrpId, svgRef]
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
  orpData,
  krajeData,
  fillByOrpId,
  selectedOrpId,
  setSelectedOrpId,
  renderTooltipContent,
}) => {
  const orpGeoJson = topojson.feature(orpData, orpData.objects.tracts);
  const krajeGeoJson = topojson.feature(krajeData, krajeData.objects.tracts);

  const svgEl = d3.select(svgDomEl);

  // Clear svg contents & tooltips so are not adding new paths when rerendering
  svgEl.selectAll("*").remove();
  d3.select(containerDomEl).selectAll(".map-tooltip").remove();

  const projection = d3
    .geoMercator()
    // Sets the .scale and .translate to fit Czech republic exactly to the available svg area
    .fitSize([width, height], orpGeoJson);

  const pathGenerator = d3.geoPath().projection(projection);

  svgEl
    .selectAll(".orp")
    .data(orpGeoJson.features)
    .enter()
    .append("path")
    .attr("d", pathGenerator)
    .attr("class", (feature) => `orp orp-${feature.id}`)
    .attr("fill", (feature) => fillByOrpId[feature.id])
    .attr("opacity", (feature) =>
      !selectedOrpId || feature.id === selectedOrpId ? 1 : 0.3
    )
    .attr("stroke", "#000000")
    .attr("stroke-width", (feature) => (feature.id === selectedOrpId ? 2 : 0.5))
    .on("click", function (e, feature) {
      if (selectedOrpId !== feature.id) {
        setSelectedOrpId(feature.id);
      } else {
        setSelectedOrpId(null);
      }
    })
    .on("mouseover", function (e, feature) {
      if (selectedOrpId !== null && feature.id !== selectedOrpId) {
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
      if (selectedOrpId !== null && feature.id !== selectedOrpId) {
        e.currentTarget.setAttribute("opacity", 0.3);
      }

      hideAllTooltips({ containerDomEl });
      if (selectedOrpId) {
        showTooltip({
          referenceDomEl: svgEl.select(`.orp.orp-${selectedOrpId}`).node(),
          containerDomEl,
          feature: orpGeoJson.features.find((f) => f.id === selectedOrpId),
          renderTooltipContent,
        });
      }
    });

  svgEl
    .selectAll(".kraj")
    .data(krajeGeoJson.features)
    .enter()
    .append("path")
    .attr("d", pathGenerator)
    .attr("class", (feature) => `kraj kraj-${feature.id}`)
    .attr("fill", "transparent")
    .attr("opacity", () => (!selectedOrpId ? 1 : 0.15))
    .attr("stroke", "#000000")
    .attr("stroke-width", width > 600 ? 1.5 : 1.3)
    .attr("pointer-events", "none");

  if (selectedOrpId) {
    svgEl.select(`.orp.orp-${selectedOrpId}`).raise();

    showTooltip({
      referenceDomEl: svgEl.select(`.orp.orp-${selectedOrpId}`).node(),
      containerDomEl,
      feature: orpGeoJson.features.find((f) => f.id === selectedOrpId),
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
  tooltipEl.classList.add(`map-tooltip-orp-${feature.id}`);
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
