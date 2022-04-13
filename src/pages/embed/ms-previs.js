import React from "react";
import Head from "next/head";
import * as d3 from "d3";
import { keyBy } from "lodash";

import EmbedOrpMap from "../../embed/components/EmbedOrpMap";
import { usePostMessageWithHeight } from "../../embed/hooks";
import { useCapacitiesData, useKrajeData, useOrpData } from "../../data/hooks";
import styles from "../../pages_styles/EmbedPage.module.scss";

export default function MsPrevisEmbedPage({ baseUrl }) {
  const orpData = useOrpData(baseUrl);
  const krajeData = useKrajeData(baseUrl);
  const capacitiesData = useCapacitiesData(baseUrl);
  const { containerRef } = usePostMessageWithHeight(
    "paqresearch_kapacity-skol-pro-uprchliky_ms-previs"
  );

  const [selectedOrpId, setSelectedOrpId] = React.useState(null);

  const categories = [
    { label: "podstav 50 a více míst", color: "#B64164" },
    { label: "podstav 0–50 míst", color: "#EAABAC" },
    { label: "převis 0–50 míst", color: "#FEF0D9" },
    { label: "převis 50–100 míst", color: "#A2C2BA" },
    { label: "převis 100 míst a více", color: "#288893" },
  ];

  const fillByOrpId = React.useMemo(() => {
    if (!capacitiesData) {
      return {};
    }

    const capacityColor = d3
      .scaleThreshold()
      .domain([-50, 0, 50, 100, 100000])
      .range(["#B64164", "#EAABAC", "#FEF0D9", "#A2C2BA", "#288893"]);

    return capacitiesData.reduce((carry, orpCapacity) => {
      return {
        ...carry,
        [orpCapacity.id]: capacityColor(orpCapacity.ms_previs),
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
        <title>Převis/podstav kapacit MŠ v září 2022</title>
      </Head>

      <main className={styles.container} ref={containerRef}>
        <h1>Převis/podstav kapacit MŠ pro ukrajinské uprchlíky v září 2022</h1>

        <p className={styles.byline}>
          Počítáme s&nbsp;75&nbsp;%&nbsp;efektivitou využití aktuálně volných
          a&nbsp;možných nových míst. Kapacity k&nbsp;září 2022 se&nbsp;mohou
          ještě měnit. Zápisy uvažujeme všech 3–5letých podle nahlášených pobytů
          MV&nbsp;ČR k&nbsp;12.4.2022.
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
                    {Math.abs(Math.round(orpCapacityById[orpId].ms_previs))}{" "}
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
          ? "https://vlki.github.io/paq-ukrajina-mapy"
          : "",
    },
  };
}
