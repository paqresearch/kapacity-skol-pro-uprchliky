import React from "react";
import Script from "next/script";

const Analytics = () => {
  return window.location.host === "paqresearch.github.io" ? (
    <Script
      data-domain="paqresearch.github.io"
      src="https://plausible.io/js/plausible.js"
    />
  ) : null;
};

export default Analytics;
