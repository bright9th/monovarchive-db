// @ts-check

import fs from "node:fs";
import path from "node:path";

/**
 * @typedef {Object} ProjectManifest
 * @property {Object} projectVersion
 * @property {number} projectVersion.workflow
 * @property {number} projectVersion.asset
 * @property {number} projectVersion.doc
 * @property {number} schemaVersion
 * @property {string | null} previousSchemaVersionCommitHash
 * @property {number} asset0Index
 */

/** @type {{ versionType: string, prTypes: string[] }[]} */
const PR_TYPE_MAP = [
  {
    versionType: "workflow",
    prTypes: ["mod-workflow"],
  },
  {
    versionType: "asset",
    prTypes: ["add-media", "mod-metadata"],
  },
  {
    versionType: "doc",
    prTypes: ["mod-doc"],
  },
];
/**
 * @param {string} prType
 * @returns {string | undefined}
 */
export function getProjectVersionType(prType) {
  return PR_TYPE_MAP.find((m) => m.prTypes.includes(prType))?.versionType;
}

const workspaceRoot = process.cwd();
const manifestPath = path.resolve(workspaceRoot, ".", "project.manifest.json");

/**
 * @returns {ProjectManifest}
 */
export function getProjectManifest() {
  return JSON.parse(fs.readFileSync(manifestPath, "utf8"));
}

/**
 * @param {ProjectManifest} manifest
 */
export function writeProjectManifest(manifest) {
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
}
