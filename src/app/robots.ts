import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const domain = process.env.NEXT_PUBLIC_SITE_URL || "https://jatinkukreja.dev";
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${domain}/sitemap.xml`,
  };
}
