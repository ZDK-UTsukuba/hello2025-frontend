import { getImage } from "astro:assets";

export async function downloadAndSave(url: string): Promise<string> {
  console.log(url);

  const img = await getImage({
    src: url,
    inferSize: true,
    format: "webp",
  });

  return img.src;
}
