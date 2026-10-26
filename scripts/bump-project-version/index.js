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

if (PR_TYPE != null && PR_TYPE in manifest.projectVersion) {
  const version = ++manifest.projectVersion[PR_TYPE];
  console.log(`Bumped project '${PR_TYPE}' version to ${version}.`);

  if (!process.env.GITHUB_OUTPUT)
    throw new Error("GITHUB_OUTPUT is not defined");
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `version=${version}\n`);

  exit(0);
} else {
  console.error(
    `Project '${PR_TYPE}' version doesn't exist. Valid ones are: ${Object.keys(manifest.projectVersion).join(", ")}.`,
  );

  exit(1);
}
