const path = require("path");
const packageJson = require("./package.json");

const isProduction = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  sassOptions: {
    includePaths: [
      path.join(__dirname, "src", "pages_styles"),
      // path.join(__dirname, "src", "embed", "styles"),
      // path.join(__dirname, "src", "layout", "styles"),
    ],
    prependData: `$baseUrl: '${
      process.env.NODE_ENV === "production"
        ? `https://paqresearch.github.io/${packageJson.name}`
        : ""
    }';`,
  },

  basePath: isProduction ? `/${packageJson.name}` : "",
  assetPrefix: isProduction ? `/${packageJson.name}/` : "",
};

module.exports = nextConfig;
