import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import * as d3 from "d3";
import { keyBy } from "lodash";

import EmbedOrpMap from "../../embed/components/EmbedOrpMap";
import { usePostMessageWithHeight } from "../../embed/hooks";
import {
  useCapacitiesData,
  useKrajeData,
  useOrpData,
  usePrahaObvodyData,
} from "../../data/hooks";
import styles from "../../pages_styles/MapsInTabsEmbedPage.module.scss";

export default function ZsEmbedPage({ baseUrl }) {
  const router = useRouter();

  const orpData = useOrpData(baseUrl);
  const krajeData = useKrajeData(baseUrl);
  const prahaObvodyData = usePrahaObvodyData(baseUrl);
  const capacitiesData = useCapacitiesData(baseUrl);
  const { containerRef, postHeightMessage } = usePostMessageWithHeight(
    "paqresearch_kapacity-skol-pro-uprchliky_zs"
  );

  const [activeTab, setActiveTab] = React.useState(
    router.query.tab ? router.query.tab : "zs_previs"
  );
  const [selectedOrpId, setSelectedOrpId] = React.useState(null);

  React.useEffect(() => {
    setActiveTab(router.query.tab ? router.query.tab : "zs_previs");
  }, [router.query.tab]);

  React.useEffect(() => {
    postHeightMessage();
  }, [activeTab]);

  if (!orpData || !krajeData || !capacitiesData) {
    return null;
  }

  const activeTabItem = tabs.find((tab) => tab.key === activeTab);

  return (
    <div className={styles.container}>
      <Head>
        <title>Kapacity ZŠ pro ukrajinské uprchlíky</title>
      </Head>

      <main className={styles.container} ref={containerRef}>
        <div
          style={{
            padding: router.query.padding ? router.query.padding : undefined,
          }}
        >
          {router.query.tab === undefined && (
            <nav className={styles.tabsContainer}>
              <ul>
                {tabs.map((tab) => (
                  <li
                    key={tab.key}
                    className={tab.key === activeTab ? "active" : undefined}
                  >
                    <button type="button" onClick={() => setActiveTab(tab.key)}>
                      {tab.thumbnail && (
                        <img src={`${baseUrl}/${tab.thumbnail}`} alt="" />
                      )}
                      {tab.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {activeTabItem && activeTabItem.map
            ? activeTabItem.map({
                orpData,
                krajeData,
                prahaObvodyData,
                capacitiesData,
                selectedOrpId,
                setSelectedOrpId,
              })
            : null}
        </div>
      </main>
    </div>
  );
}

const tabs = [
  {
    key: "zs_previs",
    title: <>Převis/podstav kapacit ZŠ</>,
    thumbnail: "thumbnail-zs-previs.svg",
    map: (props) => <ZsPrevisMap {...props} />,
  },
  {
    key: "zs_previs_1_stupen",
    title: <>Převis/podstav pouze&nbsp;1.&nbsp;stupně&nbsp;ZŠ</>,
    thumbnail: "thumbnail-zs-previs-1-stupen.svg",
    map: (props) => <ZsPrevis1StupenMap {...props} />,
  },
  {
    key: "zs_previs_2_stupen",
    title: <>Převis/podstav pouze&nbsp;2.&nbsp;stupně&nbsp;ZŠ</>,
    thumbnail: "thumbnail-zs-previs-2-stupen.svg",
    map: (props) => <ZsPrevis2StupenMap {...props} />,
  },
  {
    key: "zs_zapsani_z_nahlasenych",
    title: <>Podíl zapsaných na&nbsp;ZŠ&nbsp;z&nbsp;nahlášených</>,
    thumbnail: "thumbnail-zs-zapsani-z-nahlasenych.svg",
    map: (props) => <ZsZapsaniZNahlasenychMap {...props} />,
  },
  {
    key: "zs_zapsani",
    title: <>Aktuálně zapsaní&nbsp;na&nbsp;ZŠ</>,
    thumbnail: "thumbnail-zs-zapsani.svg",
    map: (props) => <ZsZapsaniMap {...props} />,
  },
];

const ZsPrevisMap = ({
  orpData,
  krajeData,
  prahaObvodyData,
  capacitiesData,
  selectedOrpId,
  setSelectedOrpId,
}) => {
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

  return (
    <div className={styles.mapContainer}>
      <h1>Převis/podstav kapacit ZŠ pro ukrajinské uprchlíky v září 2022</h1>

      <p className={styles.byline}>
        Počítáme s&nbsp;75&nbsp;%&nbsp;efektivitou využití aktuálně volných
        a&nbsp;možných nových míst, místa ve&nbsp;speciálních třídách
        s&nbsp;efektivitou využití 10&nbsp;%. Zápisy uvažujeme všech 6–14letých
        podle nahlášených pobytů MV&nbsp;ČR k&nbsp;12.&thinsp;4.&thinsp;2022
        s&nbsp;výjimkou 1168 dětí bez určeného pobytu.
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
          prahaObvodyData={prahaObvodyData}
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
                  {feature.properties.VUSC_NAZEV
                    ? feature.properties.VUSC_NAZEV
                    : "Hlavní město Praha"}
                </div>
              </div>

              <div className="main-value-line">
                <strong>
                  {orpCapacityById[orpId].zs_previs > 0 ? "převis" : "podstav"}{" "}
                  {Math.abs(Math.round(orpCapacityById[orpId].zs_previs))}
                  {parseInt(orpId, 10) === 9943 && <>*</>} míst
                </strong>
              </div>
              <div className="value-line">
                {orpCapacityById[orpId].zs_zapsani.toLocaleString("cs-CZ")} již
                zapsaných ukrajinských žáků
              </div>
              <div className="value-line">
                {orpCapacityById[orpId].zs_kapacity_duben.toLocaleString(
                  "cs-CZ"
                )}
                {parseInt(orpId, 10) === 9943 && <>*</>} volných míst k
                7.&thinsp;4.&thinsp;2022
              </div>
              <div className="value-line">
                {orpCapacityById[orpId].zs_kapacity_zari.toLocaleString(
                  "cs-CZ"
                )}
                {parseInt(orpId, 10) === 9943 && <>*</>} možných nových míst k
                září 2022
              </div>
              <div className="value-line">
                {orpCapacityById[orpId].zs_uprchliku.toLocaleString("cs-CZ")}{" "}
                nahlášených 6–14letých uprchlíků k 12.&thinsp;4.&thinsp;2022
              </div>

              {parseInt(orpId, 10) === 9943 && (
                <div className="note">
                  * Z důvodu chyby ve zdrojových datech byla kapacita k září u
                  Prahy 4 upravena na kvalifikovaný odhad. Kapacita k dubnu
                  nebyla upravena, jeví se ale být výrazně vyšší než v jiných
                  obvodech.
                </div>
              )}
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
    </div>
  );
};

const ZsPrevis1StupenMap = ({
  orpData,
  krajeData,
  prahaObvodyData,
  capacitiesData,
  selectedOrpId,
  setSelectedOrpId,
}) => {
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
        [orpCapacity.id]: capacityColor(orpCapacity.zs_previs_1_stupen),
      };
    }, {});
  }, [capacitiesData]);

  const orpCapacityById = React.useMemo(
    () => keyBy(capacitiesData, "id"),
    [capacitiesData]
  );

  return (
    <div className={styles.mapContainer}>
      <h1>
        Převis/podstav kapacit na 1.&nbsp;stupni ZŠ pro ukrajinské uprchlíky
        v&nbsp;září&nbsp;2022
      </h1>

      <p className={styles.byline}>
        Počítáme s&nbsp;75&nbsp;%&nbsp;efektivitou využití aktuálně volných
        a&nbsp;možných nových míst, místa ve&nbsp;speciálních třídách
        s&nbsp;efektivitou využití 10&nbsp;%. Zápisy uvažujeme všech 6–14letých
        podle nahlášených pobytů MV&nbsp;ČR k&nbsp;12.&thinsp;4.&thinsp;2022
        s&nbsp;výjimkou 1168 dětí bez určeného pobytu.
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
          prahaObvodyData={prahaObvodyData}
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
                  {feature.properties.VUSC_NAZEV
                    ? feature.properties.VUSC_NAZEV
                    : "Hlavní město Praha"}
                </div>
              </div>

              <div className="main-value-line">
                <strong>
                  {orpCapacityById[orpId].zs_previs_1_stupen > 0
                    ? "převis"
                    : "podstav"}{" "}
                  {Math.abs(
                    Math.round(orpCapacityById[orpId].zs_previs_1_stupen)
                  )}
                  {parseInt(orpId, 10) === 9943 && <>*</>} míst na 1. stupni
                </strong>
              </div>
              <div className="value-line">
                {orpCapacityById[orpId].zs_zapsani.toLocaleString("cs-CZ")} již
                zapsaných ukrajinských žáků
              </div>
              <div className="value-line">
                {orpCapacityById[orpId].zs_kapacity_duben.toLocaleString(
                  "cs-CZ"
                )}
                {parseInt(orpId, 10) === 9943 && <>*</>} volných míst k
                7.&thinsp;4.&thinsp;2022
              </div>
              <div className="value-line">
                {orpCapacityById[orpId].zs_kapacity_zari.toLocaleString(
                  "cs-CZ"
                )}
                {parseInt(orpId, 10) === 9943 && <>*</>} možných nových míst k
                září 2022
              </div>
              <div className="value-line">
                {orpCapacityById[orpId].zs_uprchliku.toLocaleString("cs-CZ")}{" "}
                nahlášených 6–14letých uprchlíků k 12.&thinsp;4.&thinsp;2022
              </div>

              {parseInt(orpId, 10) === 9943 && (
                <div className="note">
                  * Z důvodu chyby ve zdrojových datech byla kapacita k září u
                  Prahy 4 upravena na kvalifikovaný odhad. Kapacita k dubnu
                  nebyla upravena, jeví se ale být výrazně vyšší než v jiných
                  obvodech.
                </div>
              )}
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
    </div>
  );
};

const ZsPrevis2StupenMap = ({
  orpData,
  krajeData,
  prahaObvodyData,
  capacitiesData,
  selectedOrpId,
  setSelectedOrpId,
}) => {
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
        [orpCapacity.id]: capacityColor(orpCapacity.zs_previs_2_stupen),
      };
    }, {});
  }, [capacitiesData]);

  const orpCapacityById = React.useMemo(
    () => keyBy(capacitiesData, "id"),
    [capacitiesData]
  );

  return (
    <div className={styles.mapContainer}>
      <h1>
        Převis/podstav kapacit na 2.&nbsp;stupni ZŠ pro ukrajinské uprchlíky
        v&nbsp;září&nbsp;2022
      </h1>

      <p className={styles.byline}>
        Počítáme s&nbsp;75&nbsp;%&nbsp;efektivitou využití aktuálně volných
        a&nbsp;možných nových míst, místa ve&nbsp;speciálních třídách
        s&nbsp;efektivitou využití 10&nbsp;%. Zápisy uvažujeme všech 6–14letých
        podle nahlášených pobytů MV&nbsp;ČR k&nbsp;12.&thinsp;4.&thinsp;2022
        s&nbsp;výjimkou 1168 dětí bez určeného pobytu.
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
          prahaObvodyData={prahaObvodyData}
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
                  {feature.properties.VUSC_NAZEV
                    ? feature.properties.VUSC_NAZEV
                    : "Hlavní město Praha"}
                </div>
              </div>

              <div className="main-value-line">
                <strong>
                  {orpCapacityById[orpId].zs_previs_2_stupen > 0
                    ? "převis"
                    : "podstav"}{" "}
                  {Math.abs(
                    Math.round(orpCapacityById[orpId].zs_previs_2_stupen)
                  )}
                  {parseInt(orpId, 10) === 9943 && <>*</>} míst na 2. stupni
                </strong>
              </div>
              <div className="value-line">
                {orpCapacityById[orpId].zs_zapsani.toLocaleString("cs-CZ")} již
                zapsaných ukrajinských žáků
              </div>
              <div className="value-line">
                {orpCapacityById[orpId].zs_kapacity_duben.toLocaleString(
                  "cs-CZ"
                )}
                {parseInt(orpId, 10) === 9943 && <>*</>} volných míst k
                7.&thinsp;4.&thinsp;2022
              </div>
              <div className="value-line">
                {orpCapacityById[orpId].zs_kapacity_zari.toLocaleString(
                  "cs-CZ"
                )}
                {parseInt(orpId, 10) === 9943 && <>*</>} možných nových míst k
                září 2022
              </div>
              <div className="value-line">
                {orpCapacityById[orpId].zs_uprchliku.toLocaleString("cs-CZ")}{" "}
                nahlášených 6–14letých uprchlíků k 12.&thinsp;4.&thinsp;2022
              </div>

              {parseInt(orpId, 10) === 9943 && (
                <div className="note">
                  * Z důvodu chyby ve zdrojových datech byla kapacita k září u
                  Prahy 4 upravena na kvalifikovaný odhad. Kapacita k dubnu
                  nebyla upravena, jeví se ale být výrazně vyšší než v jiných
                  obvodech.
                </div>
              )}
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
    </div>
  );
};

const ZsZapsaniZNahlasenychMap = ({
  orpData,
  krajeData,
  prahaObvodyData,
  capacitiesData,
  selectedOrpId,
  setSelectedOrpId,
}) => {
  const categories = [
    { label: "méně než 20 %", color: "#FEF0D9" },
    { label: "20–40 %", color: "#C4D3C9" },
    { label: "40–60 %", color: "#79ABB0" },
    { label: "60–80 %", color: "#288893" },
    { label: "80-100 %", color: "#005B6E" },
  ];

  const fillByOrpId = React.useMemo(() => {
    if (!capacitiesData) {
      return {};
    }

    const capacityColor = d3
      .scaleThreshold()
      .domain([20, 40, 60, 80, 100])
      .range(["#FEF0D9", "#C4D3C9", "#79ABB0", "#288893", "#005B6E"]);

    return capacitiesData.reduce((carry, orpCapacity) => {
      return {
        ...carry,
        [orpCapacity.id]: capacityColor(orpCapacity.zs_zapsani_z_nahlasenych),
      };
    }, {});
  }, [capacitiesData]);

  const orpCapacityById = React.useMemo(
    () => keyBy(capacitiesData, "id"),
    [capacitiesData]
  );

  return (
    <div className={styles.mapContainer}>
      <h1>
        Podíl již zapsaných na ZŠ z nahlášených 6–14letých ukrajinských
        uprchlíků
      </h1>

      <p className={styles.byline}>
        Uvažujeme 6–14leté podle nahlášených pobytů MV&nbsp;ČR
        k&nbsp;12.&thinsp;4.&thinsp;2022 s&nbsp;výjimkou 1168 dětí bez určeného
        pobytu.
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
          prahaObvodyData={prahaObvodyData}
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
                  {feature.properties.VUSC_NAZEV
                    ? feature.properties.VUSC_NAZEV
                    : "Hlavní město Praha"}
                </div>
              </div>

              <div className="main-value-line">
                <strong>
                  {orpCapacityById[orpId].zs_zapsani_z_nahlasenych}
                  &nbsp;%&nbsp;zapsaných z&nbsp;nahlášených
                </strong>
              </div>
              <div className="value-line">
                {orpCapacityById[orpId].zs_zapsani.toLocaleString("cs-CZ")} již
                zapsaných ukrajinských žáků
              </div>
              <div className="value-line">
                {orpCapacityById[orpId].zs_uprchliku.toLocaleString("cs-CZ")}{" "}
                nahlášených 6–14letých uprchlíků k 12.&thinsp;4.&thinsp;2022
              </div>
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
    </div>
  );
};

const ZsZapsaniMap = ({
  orpData,
  krajeData,
  prahaObvodyData,
  capacitiesData,
  selectedOrpId,
  setSelectedOrpId,
}) => {
  const categories = [
    { label: "méně než 25", color: "#FEF0D9" },
    { label: "25–50", color: "#C4D3C9" },
    { label: "50–100", color: "#79ABB0" },
    { label: "100–200", color: "#288893" },
    { label: "200 a více", color: "#005B6E" },
  ];

  const fillByOrpId = React.useMemo(() => {
    if (!capacitiesData) {
      return {};
    }

    const capacityColor = d3
      .scaleThreshold()
      .domain([25, 50, 100, 200, 100000])
      .range(["#FEF0D9", "#C4D3C9", "#79ABB0", "#288893", "#005B6E"]);

    return capacitiesData.reduce((carry, orpCapacity) => {
      return {
        ...carry,
        [orpCapacity.id]: capacityColor(orpCapacity.zs_zapsani),
      };
    }, {});
  }, [capacitiesData]);

  const orpCapacityById = React.useMemo(
    () => keyBy(capacitiesData, "id"),
    [capacitiesData]
  );

  return (
    <div className={styles.mapContainer}>
      <h1>Ukrajinští žáci aktuálně zapsaní na&nbsp;ZŠ</h1>

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
          prahaObvodyData={prahaObvodyData}
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
                  {feature.properties.VUSC_NAZEV
                    ? feature.properties.VUSC_NAZEV
                    : "Hlavní město Praha"}
                </div>
              </div>

              <div className="main-value-line">
                <strong>
                  {orpCapacityById[orpId].zs_zapsani}
                  &nbsp;zapsaných ukrajinských žáků
                </strong>
              </div>
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
    </div>
  );
};

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
