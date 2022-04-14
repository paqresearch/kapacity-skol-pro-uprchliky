import React from "react";

import styles from "../pages_styles/IndexPage.module.scss";

export default function IndexPage({ baseUrl }) {
  return (
    <main className={styles.container}>
      <h1>Kapacity ZŠ pro ukrajinské uprchlíky</h1>

      <div
        dangerouslySetInnerHTML={{
          __html: createEmbedCode(zsMapConfig, baseUrl),
        }}
        style={{ border: "5px solid #aaa", padding: "20px" }}
      ></div>

      <h2>Kód k vložení do vlastních stránek</h2>

      <pre className={styles.pre}>
        <code>{createEmbedCode(zsMapConfig, baseUrl).trim()}</code>
      </pre>

      <h2>Ke stažení</h2>

      <ul>
        <li>
          <a
            href={`${baseUrl}/Převis_podstav kapacit ZŠ pro ukrajinské uprchlíky v září 2022.png`}
            download
            className={styles.downloadLink}
          >
            Převis/podstav kapacit ZŠ pro ukrajinské uprchlíky v září 2022.png
          </a>
        </li>
        <li>
          <a
            href={`${baseUrl}/Převis_podstav kapacit na 1. stupni ZŠ pro ukrajinské uprchlíky v září 2022.png`}
            download
            className={styles.downloadLink}
          >
            Převis/podstav kapacit na 1. stupni ZŠ pro ukrajinské uprchlíky v
            září 2022.png
          </a>
        </li>
        <li>
          <a
            href={`${baseUrl}/Převis_podstav kapacit na 2. stupni ZŠ pro ukrajinské uprchlíky v září 2022.png`}
            download
            className={styles.downloadLink}
          >
            Převis/podstav kapacit na 2. stupni ZŠ pro ukrajinské uprchlíky v
            září 2022.png
          </a>
        </li>
        <li>
          <a
            href={`${baseUrl}/Podíl již zapsaných na ZŠ z nahlášených 7–15letých ukrajinských uprchlíků.png`}
            download
            className={styles.downloadLink}
          >
            Podíl již zapsaných na ZŠ z nahlášených 7–15letých ukrajinských
            uprchlíků.png
          </a>
        </li>
        <li>
          <a
            href={`${baseUrl}/Ukrajinští žáci aktuálně zapsaní na ZŠ.png`}
            download
            className={styles.downloadLink}
          >
            Ukrajinští žáci aktuálně zapsaní na ZŠ.png
          </a>
        </li>
      </ul>

      <h1>Kapacity MŠ pro ukrajinské uprchlíky</h1>

      <div
        dangerouslySetInnerHTML={{
          __html: createEmbedCode(msMapConfig, baseUrl),
        }}
        style={{ border: "5px solid #aaa", padding: "20px" }}
      ></div>

      <h2>Kód k vložení do vlastních stránek</h2>

      <pre className={styles.pre}>
        <code>{createEmbedCode(msMapConfig, baseUrl).trim()}</code>
      </pre>

      <h2>Ke stažení</h2>

      <ul>
        <li>
          <a
            href={`${baseUrl}/Převis_podstav kapacit MŠ pro ukrajinské uprchlíky v září 2022.png`}
            download
            className={styles.downloadLink}
          >
            Převis/podstav kapacit MŠ pro ukrajinské uprchlíky v září 2022.png
          </a>
        </li>
        <li>
          <a
            href={`${baseUrl}/Podíl již zapsaných na MŠ z nahlášených 3–5letých ukrajinských uprchlíků.png`}
            download
            className={styles.downloadLink}
          >
            Podíl již zapsaných na MŠ z nahlášených 3–5letých ukrajinských
            uprchlíků.png
          </a>
        </li>
        <li>
          <a
            href={`${baseUrl}/Ukrajinské děti aktuálně zapsané na MŠ.png`}
            download
            className={styles.downloadLink}
          >
            Ukrajinské děti aktuálně zapsané na MŠ.png
          </a>
        </li>
      </ul>
    </main>
  );
}

const zsMapConfig = {
  embedSrc: "/embed/zs",
  embedId: "paqresearch_kapacity-skol-pro-uprchliky_zs",
};

const msMapConfig = {
  embedSrc: "/embed/ms",
  embedId: "paqresearch_kapacity-skol-pro-uprchliky_ms",
};

const createEmbedCode = (mapConfig, baseUrl) => {
  const iframeSrc = baseUrl + mapConfig.embedSrc;

  return `
<iframe src="${iframeSrc}" scrolling="no" frameborder="0" allowtransparency="true" style="width: 0; min-width: 100% !important;" height="730" id="${mapConfig.embedId}"></iframe>
<script type="text/javascript">window.addEventListener("message",function(a){if(void 0!==a.data["paq-embed-height"])for(var e in a.data["paq-embed-height"])if("${mapConfig.embedId}"==e){var d=document.querySelector("#${mapConfig.embedId}");d&&(d.style.height=a.data["paq-embed-height"][e]+"px")}});</script>
  `;
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
