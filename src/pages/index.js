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

      <h1>Kapacity MŠ pro ukrajinské uprchlíky</h1>

      <div>TODO</div>
    </main>
  );
}

const zsMapConfig = {
  embedSrc: "/embed/zs",
  embedId: "paqresearch_kapacity-skol-pro-uprchliky_zs",
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
