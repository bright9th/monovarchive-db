// @ts-check

import throwErrorMessage from "../shared/throwErrorMessage.js";
import {
  getWorkflowConfig,
  WorkflowConfigType,
} from "../shared/workflowConfig/index.js";

/** @type {import("../shared/workflowConfig/prDIffConfig.js").PrDiffConfig} */
// @ts-ignore
const config = getWorkflowConfig(WorkflowConfigType.PR_DIFF);
const directories = config.validation.directories;

/**
 * @param {string} prType
 * @param {string[]} files
 */
export default function (prType, files) {
  if (!(prType in directories)) throw new Error(`Invalid PR_TYPE: '${prType}'`);

  const validPaths = directories[prType];
  /** @type {string[]} */
  const invalidFiles = [];

  files.forEach((file) => {
    const isValid = validPaths.some((path) => {
      if (path.endsWith("/*")) {
        const dir = path.slice(0, -2);
        return file.startsWith(dir + "/");
      }
      return file === path;
    });

    if (!isValid) invalidFiles.push(file);
  });

  if (invalidFiles.length > 0) {
    const joined = [
      `[ERROR] Files modified are outside scoped boundary by [TYPE] ${prType}.\n\`\`\``,
      ...invalidFiles,
      "\`\`\`\nValid directory and file paths where files can be modified in this scope are:\n\`\`\`",
      ...validPaths,
      "\`\`\`"
    ].join("\n");
    throwErrorMessage(joined);
    throw new Error(joined);
  }
}
