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

export default function MsEmbedPage({ baseUrl }) {
  const router = useRouter();

  const orpData = useOrpData(baseUrl);
  const krajeData = useKrajeData(baseUrl);
  const prahaObvodyData = usePrahaObvodyData(baseUrl);
  const capacitiesData = useCapacitiesData(baseUrl);
  const { containerRef, postHeightMessage } = usePostMessageWithHeight(
    "paqresearch_kapacity-skol-pro-uprchliky_ms"
  );

  const [activeTab, setActiveTab] = React.useState(
    router.query.tab ? router.query.tab : "ms_previs"
  );
  const [selectedOrpId, setSelectedOrpId] = React.useState(null);

  React.useEffect(() => {
    setActiveTab(router.query.tab ? router.query.tab : "ms_previs");
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
        <title>Kapacity MŠ pro ukrajinské uprchlíky</title>
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
    key: "ms_previs",
    title: <>Převis/podstav kapacit MŠ</>,
    thumbnail: "thumbnail-ms-previs.svg",
    map: (props) => <MsPrevisMap {...props} />,
  },
  {
    key: "ms_zapsani_z_nahlasenych",
    title: <>Podíl zapsaných na&nbsp;MŠ&nbsp;z&nbsp;nahlášených</>,
    thumbnail: "thumbnail-ms-zapsani-z-nahlasenych.svg",
    map: (props) => <MsZapsaniZNahlasenychMap {...props} />,
  },
  {
    key: "ms_zapsani",
    title: <>Aktuálně zapsaní&nbsp;na&nbsp;MŠ</>,
    thumbnail: "thumbnail-ms-zapsani.svg",
    map: (props) => <MsZapsaniMap {...props} />,
  },
];

const MsPrevisMap = ({
  orpData,
  krajeData,
  prahaObvodyData,
  capacitiesData,
  selectedOrpId,
  setSelectedOrpId,
}) => {
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

  return (
    <div className={styles.mapContainer}>
      <h1>Převis/podstav kapacit MŠ pro ukrajinské uprchlíky v září 2022</h1>

      <p className={styles.byline}>
        Počítáme s&nbsp;75&nbsp;%&nbsp;efektivitou využití aktuálně volných
        a&nbsp;možných nových míst. Data o&nbsp;kapacitách dětských skupin jako
        alternativě MŠ zahrnutá nejsou. Zápisy uvažujeme všech 3–5letých podle
        nahlášených pobytů MV&nbsp;ČR k&nbsp;12.4.2022 s&nbsp;výjimkou 374 dětí
        bez určeného pobytu.
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
                  {orpCapacityById[orpId].ms_previs > 0 ? "převis" : "podstav"}{" "}
                  {Math.abs(Math.round(orpCapacityById[orpId].ms_previs))} míst
                </strong>
              </div>
              <div className="value-line">
                {orpCapacityById[orpId].ms_zapsani.toLocaleString("cs-CZ")} již
                zapsaných ukrajinských žáků
              </div>
              <div className="value-line">
                {orpCapacityById[orpId].ms_kapacity_duben.toLocaleString(
                  "cs-CZ"
                )}{" "}
                volných míst k 7.&thinsp;4.&thinsp;2022
              </div>
              <div className="value-line">
                {orpCapacityById[orpId].ms_kapacity_zari.toLocaleString(
                  "cs-CZ"
                )}{" "}
                možných nových míst k září 2022
              </div>
              <div className="value-line">
                {orpCapacityById[orpId].ms_uprchliku.toLocaleString("cs-CZ")}{" "}
                nahlášených 3–5letých uprchlíků k 12.&thinsp;4.&thinsp;2022
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

const MsZapsaniZNahlasenychMap = ({
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
        [orpCapacity.id]: capacityColor(orpCapacity.ms_zapsani_z_nahlasenych),
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
        Podíl již zapsaných na MŠ z nahlášených 3–5letých ukrajinských uprchlíků
      </h1>

      <p className={styles.byline}>
        Uvažujeme 3–5leté podle nahlášených pobytů MV&nbsp;ČR
        k&nbsp;12.&thinsp;4.&thinsp;2022 s&nbsp;výjimkou 374 dětí bez určeného
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
                  {orpCapacityById[orpId].ms_zapsani_z_nahlasenych}
                  &nbsp;%&nbsp;zapsaných z&nbsp;nahlášených
                </strong>
              </div>
              <div className="value-line">
                {orpCapacityById[orpId].ms_zapsani.toLocaleString("cs-CZ")} již
                zapsaných ukrajinských dětí
              </div>
              <div className="value-line">
                {orpCapacityById[orpId].ms_uprchliku.toLocaleString("cs-CZ")}{" "}
                nahlášených 3–5letých uprchlíků k 12.&thinsp;4.&thinsp;2022
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

const MsZapsaniMap = ({
  orpData,
  krajeData,
  prahaObvodyData,
  capacitiesData,
  selectedOrpId,
  setSelectedOrpId,
}) => {
  const categories = [
    { label: "méně než 10", color: "#FEF0D9" },
    { label: "10–20", color: "#C4D3C9" },
    { label: "20–30", color: "#79ABB0" },
    { label: "30–50", color: "#288893" },
    { label: "50 a více", color: "#005B6E" },
  ];

  const fillByOrpId = React.useMemo(() => {
    if (!capacitiesData) {
      return {};
    }

    const capacityColor = d3
      .scaleThreshold()
      .domain([10, 20, 30, 50, 100000])
      .range(["#FEF0D9", "#C4D3C9", "#79ABB0", "#288893", "#005B6E"]);

    return capacitiesData.reduce((carry, orpCapacity) => {
      return {
        ...carry,
        [orpCapacity.id]: capacityColor(orpCapacity.ms_zapsani),
      };
    }, {});
  }, [capacitiesData]);

  const orpCapacityById = React.useMemo(
    () => keyBy(capacitiesData, "id"),
    [capacitiesData]
  );

  return (
    <div className={styles.mapContainer}>
      <h1>Ukrajinské děti aktuálně zapsané na&nbsp;MŠ</h1>

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
                  {orpCapacityById[orpId].ms_zapsani}
                  &nbsp;zapsaných ukrajinských dětí
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
