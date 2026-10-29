// @ts-check

import fs from "node:fs";

/**
 * @param {string} fileDiffsPath
 * @returns {string[]}
 */
export default function (fileDiffsPath) {
  return fs.readFileSync(fileDiffsPath, "utf-8").split("\n").filter(Boolean);
}
