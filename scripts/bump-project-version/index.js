// @ts-check

import { exit } from "node:process";
import {
  getProjectManifest,
  getProjectVersionType,
  writeProjectManifest,
} from "../shared/projectManifestConfig";
import { ghOut } from "../shared/githubOutput";

// pull-request type
const PR_TYPE = process.env.PR_TYPE;
if (!PR_TYPE) throw new Error("PR_TYPE is not defined.");

const manifest = getProjectManifest();
const versionType = getProjectVersionType(PR_TYPE);

if (PR_TYPE && versionType) {
  // @ts-ignore
  const version = ++manifest.projectVersion[versionType];
  writeProjectManifest(manifest);
  console.log(`Bumped project '${versionType}' version to ${version}.`);
  ghOut("version", version);
  exit(0);
} else {
  console.error(
    `Either invalid PR_TYPE: '${PR_TYPE}', or Version type: '${versionType}'.`,
  );
  exit(1);
}
