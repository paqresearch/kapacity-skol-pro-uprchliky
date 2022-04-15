import React from "react";

import styles from "../pages_styles/IndexPage.module.scss";

export default function IndexPage({ baseUrl }) {
  return (
    <main className={styles.container}>
      <h1>Kapacity ZŠ a MŠ pro ukrajinské uprchlíky</h1>

      <p>
        Interaktivní mapy k{" "}
        <a
          href="https://www.paqresearch.cz/post/vzdelavani-a-uprchlici-praha-bude-prehlcena-nejvice-zatizen-2-stupen-zs-a-materske-skoly"
          target="_blank"
          rel="noreferrer"
          className={styles.link}
        >
          analýze PAQ Research
        </a>
        .
      </p>

      <div
        dangerouslySetInnerHTML={{
          __html: createEmbedCode(zsMapConfig, baseUrl),
        }}
        style={{ margin: "40px 0" }}
      ></div>

      <div
        dangerouslySetInnerHTML={{
          __html: createEmbedCode(msMapConfig, baseUrl),
        }}
        style={{ margin: "40px 0" }}
      ></div>

      <h2>Kódy k vložení do vlastních stránek</h2>

      <h3>Mapy kapacit ZŠ</h3>

      <pre className={styles.pre}>
        <code>{createEmbedCode(zsMapConfig, baseUrl).trim()}</code>
      </pre>

      <h3>Mapy kapacit MŠ</h3>

      <pre className={styles.pre}>
        <code>{createEmbedCode(msMapConfig, baseUrl).trim()}</code>
      </pre>

      <h2>Ke stažení</h2>

      <ul className={styles.downloads}>
        <li>
          <a
            href={`${baseUrl}/Previs_podstav kapacit ZS pro ukrajinske uprchliky v zari 2022.png`}
            download
            className={styles.link}
          >
            Previs_podstav kapacit ZS pro ukrajinske uprchliky v zari 2022.png
          </a>
        </li>
        <li>
          <a
            href={`${baseUrl}/Previs_podstav kapacit na 1. stupni ZS pro ukrajinske uprchliky v zari 2022.png`}
            download
            className={styles.link}
          >
            Previs_podstav kapacit na 1. stupni ZS pro ukrajinske uprchliky v
            zari 2022.png
          </a>
        </li>
        <li>
          <a
            href={`${baseUrl}/Previs_podstav kapacit na 2. stupni ZS pro ukrajinske uprchliky v zari 2022.png`}
            download
            className={styles.link}
          >
            Previs_podstav kapacit na 2. stupni ZS pro ukrajinske uprchliky v
            zari 2022.png
          </a>
        </li>
        <li>
          <a
            href={`${baseUrl}/Podil jiz zapsanych na ZS z nahlasenych 6-14letych ukrajinskych uprchliku.png`}
            download
            className={styles.link}
          >
            Podil jiz zapsanych na ZS z nahlasenych 6-14letych ukrajinskych
            uprchliku.png
          </a>
        </li>
        <li>
          <a
            href={`${baseUrl}/Ukrajinsti zaci aktualne zapsani na ZS.png`}
            download
            className={styles.link}
          >
            Ukrajinsti zaci aktualne zapsani na ZS.png
          </a>
        </li>
        <li>
          <a
            href={`${baseUrl}/Previs_podstav kapacit MS pro ukrajinske uprchliky v zari 2022.png`}
            download
            className={styles.link}
          >
            Previs_podstav kapacit MS pro ukrajinske uprchliky v zari 2022.png
          </a>
        </li>
        <li>
          <a
            href={`${baseUrl}/Podil jiz zapsanych na MS z nahlasenych 3-5letych ukrajinskych uprchliku.png`}
            download
            className={styles.link}
          >
            Podil jiz zapsanych na MS z nahlasenych 3-5letych ukrajinskych
            uprchliku.png
          </a>
        </li>
        <li>
          <a
            href={`${baseUrl}/Ukrajinske deti aktualne zapsane na MS.png`}
            download
            className={styles.link}
          >
            Ukrajinske deti aktualne zapsane na MS.png
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
