/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "img.freepik.com",
      "tecmonterreymx.vtexassets.com",
      "instastudio.mx",
      "images.squarespace-cdn.com",
      "enclaveproductiva.es",
      "m.media-amazon.com",
      "via.placeholder.com",
      "lh3.googleusercontent.com"
    ],
  },
  serverRuntimeConfig: {
    // Indica que se está utilizando axios en el servidor
    axios: {
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    },
  },
};

module.exports = nextConfig;
