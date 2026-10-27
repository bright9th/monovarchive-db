// @ts-check

import fs from "node:fs";
import path from "node:path";
import { exit } from "node:process";

const PR_TYPE = process.env.PR_TYPE;

const workspaceRoot = process.cwd();
/** @type {{ projectVersion: { [key: string]: number } }} */
const manifest = JSON.parse(
  fs.readFileSync(
    path.resolve(workspaceRoot, ".", "project.manifest.json"),
    "utf8",
  ),
);

/** @type {{ prType: string, projectVersionType: string }[]} */
const validTypeMap = [
  {
    prType: "mod-workflow",
    projectVersionType: "workflow",
  },
  {
    prType: "add-media",
    projectVersionType: "asset",
  },
  {
    prType: "mod-metadata",
    projectVersionType: "asset",
  },
  {
    prType: "mod-doc",
    projectVersionType: "doc",
  },
];

const versionType = validTypeMap.find(
  (m) => m.prType == PR_TYPE,
)?.projectVersionType;

if (PR_TYPE && versionType && versionType in manifest.projectVersion) {
  const version = ++manifest.projectVersion[versionType];
  console.log(`Bumped project '${versionType}' version to ${version}.`);

  if (!process.env.GITHUB_OUTPUT)
    throw new Error("GITHUB_OUTPUT is not defined.");
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `version=${version}\n`);

  exit(0);
} else {
  console.error(
    `Either invalid PR_TYPE: '${PR_TYPE}', or Version type: '${versionType}'.`,
  );

  exit(1);
}
