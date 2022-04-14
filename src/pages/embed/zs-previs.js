import React from "react";
import Head from "next/head";
import * as d3 from "d3";
import { keyBy } from "lodash";

import EmbedOrpMap from "../../embed/components/EmbedOrpMap";
import { usePostMessageWithHeight } from "../../embed/hooks";
import { useCapacitiesData, useKrajeData, useOrpData } from "../../data/hooks";
import styles from "../../pages_styles/SingleMapEmbedPage.module.scss";

export default function ZsPrevisEmbedPage({ baseUrl }) {
  const orpData = useOrpData(baseUrl);
  const krajeData = useKrajeData(baseUrl);
  const capacitiesData = useCapacitiesData(baseUrl);
  const { containerRef } = usePostMessageWithHeight(
    "paqresearch_kapacity-skol-pro-uprchliky_zs-previs"
  );

  const [selectedOrpId, setSelectedOrpId] = React.useState(null);

  const categories = [
    { label: "podstav 300 a více míst", color: "#B64164" },
    { label: "podstav 0–300 míst", color: "#EAABAC" },
    { label: "převis 0–300 míst", color: "#FEF0D9" },
    { label: "převis 300–600 míst", color: "#A2C2BA" },
    { label: "převis 600 míst a více", color: "#288893" },
  ];

  const fillByOrpId = React.useMemo(() => {
    if (!capacitiesData) {
      return {};
    }

    const capacityColor = d3
      .scaleThreshold()
      .domain([-300, 0, 300, 600, 100000])
      .range(["#B64164", "#EAABAC", "#FEF0D9", "#A2C2BA", "#288893"]);

    return capacitiesData.reduce((carry, orpCapacity) => {
      return {
        ...carry,
        [orpCapacity.id]: capacityColor(orpCapacity.zs_previs),
      };
    }, {});
  }, [capacitiesData]);

  const orpCapacityById = React.useMemo(
    () => keyBy(capacitiesData, "id"),
    [capacitiesData]
  );

  if (!orpData || !krajeData || !capacitiesData) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Převis/podstav kapacit ZŠ v září 2022</title>
      </Head>

      <main className={styles.container} ref={containerRef}>
        <h1>Převis/podstav kapacit ZŠ pro ukrajinské uprchlíky v září 2022</h1>

        <p className={styles.byline}>
          Počítáme s&nbsp;75&nbsp;%&nbsp;efektivitou využití aktuálně volných
          a&nbsp;možných nových míst, místa ve&nbsp;speciálních třídách
          s&nbsp;efektivitou využití 10&nbsp;%. Zápisy uvažujeme všech
          7–15letých podle nahlášených pobytů MV&nbsp;ČR k&nbsp;12.4.2022
          s&nbsp;výjimkou 1168 osob bez určeného pobytu.
        </p>

        <div className={styles.legend}>
          {categories.map((category) => (
            <div key={category.color} className="legend-item">
              <span
                className="dot"
                style={{ backgroundColor: category.color }}
              ></span>
              {category.label}
            </div>
          ))}
        </div>

        <div className={styles.mapWrapper}>
          <EmbedOrpMap
            orpData={orpData}
            krajeData={krajeData}
            selectedOrpId={selectedOrpId}
            setSelectedOrpId={setSelectedOrpId}
            fillByOrpId={fillByOrpId}
            renderTooltipContent={(orpId, feature) => (
              <div className={styles.tooltipContent}>
                <div className="tooltip-orp">
                  <div className="tooltip-orp-name">
                    {feature.properties.NAZEV}
                  </div>
                  <div className="tooltip-region">
                    {feature.properties.VUSC_NAZEV}
                  </div>
                </div>

                <div className="main-value-line">
                  <strong>
                    {orpCapacityById[orpId].zs_previs > 0
                      ? "převis"
                      : "podstav"}{" "}
                    {Math.abs(Math.round(orpCapacityById[orpId].zs_previs))}{" "}
                    míst
                  </strong>
                </div>
                {/* <div className="value-line">
                  {orpCapacityById[orpId].zs_kapacita.toLocaleString("cs-CZ")}{" "}
                  celkem míst v ZŠ
                </div>
                <div className="value-line">
                  {orpCapacityById[orpId].volna_mista_zs.toLocaleString(
                    "cs-CZ"
                  )}{" "}
                  volných míst
                </div>
                <div className="value-line">
                  {orpCapacityById[orpId].pocet_zs.toLocaleString("cs-CZ")}{" "}
                  základních škol
                </div> */}
              </div>
            )}
          />
        </div>

        <div className={styles.footer}>
          <div className="footer-item">
            Analýza a vizualizace:{" "}
            <a
              href="https://www.paqresearch.cz/"
              target="_blank"
              rel="noreferrer"
            >
              PAQ&nbsp;Research
            </a>
          </div>
          <div className="footer-separator"> &nbsp;·&nbsp; </div>
          <div className="footer-item">Zdroj dat: MŠMT, MV, ČÚZK (CC-BY)</div>
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      baseUrl:
        process.env.NODE_ENV === "production"
          ? "https://paqresearch.github.io/kapacity-skol-pro-uprchliky"
          : "",
    },
  };
}
