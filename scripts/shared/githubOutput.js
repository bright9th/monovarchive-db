// @ts-check

import fs from "node:fs";

/**
 * @param {string} key
 * @param {any} value
 */
export function ghOut(key, value) {
  if (!process.env.GITHUB_OUTPUT)
    throw new Error("GITHUB_OUTPUT is not defined.");
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `${key}=${value}\n`);
}
