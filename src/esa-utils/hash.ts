import * as crypto from "crypto";

/**
 * Generates a unique hash for each string in the input array.
 * @param strings - array of strings to hash
 * @returns array of unique hashes corresponding to the input strings
 */
export function getUniqueHashes(strings: string[]): string[] {
  const hashes = strings.map((str) =>
    crypto.createHash("md5").update(str).digest("hex"),
  );
  let hashLength = 7;
  while (
    new Set(hashes.map((h) => h.slice(0, hashLength))).size !== hashes.length
  ) {
    hashLength++;
  }
  console.log("assured unique id w/hashLength: ", hashLength);
  const ids = hashes.map((h) => h.slice(0, hashLength));

  return ids;
}
