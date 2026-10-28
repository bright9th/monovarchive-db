// @ts-check

import fs from "node:fs";
import path from "node:path";

const workspaceRoot = process.cwd();
/**
 * @param {string} pathname
 */
function getWorkspacePath(pathname) {
  return path.resolve(workspaceRoot, ".", pathname);
}

/**
 * @typedef {import("./prCheckConfig.js").PrCheckConfig | import("./prBodyConfig.js").PrBodyConfig | import("./prDIffConfig.js").PrDiffConfig | import("./valImageConfig.js").ValImageConfig | import("./valVideoConfig.js").ValVideoConfig | import("./valMetadataConfig.js").ValMetadataConfig | import("./actionsConfig.js").ActionsConfig | import("./commentConfig.js").CommentConfig} WorkflowConfig
 */

export const WorkflowConfigType = Object.freeze({
  PR_CHECK: 0,
  PR_BODY: 1,
  PR_DIFF: 2,
  VAL_IMAGE: 3,
  VAL_VIDEO: 4,
  VAL_METADATA: 5,
  ACTIONS: 6,
  COMMENT: 7,
});
/** @type {{ [key: number]: string }} */
const configPaths = {
  0: "configs/pr_check.config.json",
  1: "configs/pr_body.config.json",
  2: "configs/pr_diff.config.json",
  3: "configs/image.validation.config.json",
  4: "configs/video.validation.config.json",
  5: "configs/metadata.validation.config.json",
  6: "configs/actions.config.json",
  7: "configs/comment.config.json",
};

/**
 * @param {number} workflowConfigType
 * @returns {WorkflowConfig}
 */
export function getWorkflowConfig(workflowConfigType) {
  return JSON.parse(
    fs.readFileSync(getWorkspacePath(configPaths[workflowConfigType]), "utf8"),
  );
}

/**
 * @param {number} workflowConfigType
 * @param {WorkflowConfig} config
 */
export function writeWorkflowConfig(workflowConfigType, config) {
  fs.writeFileSync(
    getWorkspacePath(configPaths[workflowConfigType]),
    JSON.stringify(config, null, 2),
  );
}
