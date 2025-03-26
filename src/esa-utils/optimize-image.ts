import { getImage } from "astro:assets";

export async function optimizeImage(
  url: string,
  low: boolean = false,
): Promise<string> {
  console.log(url);

  const img = await getImage({
    src: url,
    inferSize: true,
    format: "webp",
    quality: low ? "low" : "mid",
  });

  return img.src;
}
