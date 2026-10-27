// @ts-check

import { ghOut } from "../shared/githubOutput.js";
import { validateContent, getPrType } from "./content.js";

const PR_BODY = process.env.PR_BODY;

if (!PR_BODY) throw new Error("PR_BODY is not defined.");
validateContent(PR_BODY);

ghOut("pr_type", getPrType(PR_BODY));
