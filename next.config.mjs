/** @type {import('next').NextConfig} */
const appwriteEndpoint =
  process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ?? "https://sgp.cloud.appwrite.io/v1"

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: new URL(appwriteEndpoint).hostname,
        pathname: "/v1/storage/buckets/**",
      },
    ],
  },
}

export default nextConfig
