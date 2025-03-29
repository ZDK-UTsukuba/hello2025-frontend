import { getImage } from "astro:assets";

/**
 * esa などから画像ファイルをダウンロードして最適化した画像に置き換えます。
 * @param url esa などのURL https://img.esa.io/~
 * @param low quality がlowで良い時はtrue
 * @returns 内部の絶対パス /_astro/~
 */
export async function optimizeImage(
  url: string,
  low: boolean = false,
  width?: number,
  height?: number,
): Promise<string> {
  console.log(url);

  const img = await getImage({
    src: url,
    inferSize: true,
    format: "webp",
    quality: low ? "low" : "mid",
    width: width,
    height: height,
  });
  console.log(img.options);

  return img.src;
}
