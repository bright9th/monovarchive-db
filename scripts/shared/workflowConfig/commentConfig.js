// @ts-check

import fs from "node:fs";
import path from "node:path";

const workspaceRoot = process.cwd();
const configPath = path.resolve(
  workspaceRoot,
  ".",
  "configs/comment.config.json",
);

/**
 * @typedef {Object} CommentConfig
 * @property {string} startMarker
 * @property {string} endMarker
 * @property {{ [key: string]: string }} prefixes
 */

/** @type {CommentConfig} */
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

export const CommentPrefixType = Object.freeze({
  STATUS_CHECK: 0,
});
/** @type {{ [key: number]: string }} */
const prefixFields = {
  0: "statusCheck",
};

/**
 * @param {string} template
 * @param {string[]} args
 */
function format(template, ...args) {
  return template.replace(/%s/g, () => String(args.shift()));
}

/**
 * @param {number} commentPrefixType
 * @returns {{ startMarker: string, endMarker: string }}
 */
export function getCommentMarker(commentPrefixType) {
  const prefix = config.prefixes[prefixFields[commentPrefixType]];
  return {
    startMarker: format(config.startMarker, prefix),
    endMarker: format(config.endMarker, prefix),
  };
}
