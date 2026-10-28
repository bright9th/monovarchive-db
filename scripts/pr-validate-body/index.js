// @ts-check

import { ghOut } from "../shared/githubOutput.js";
import { validateContent, getPrType } from "./content.js";

const PR_BODY = process.env.PR_BODY ?? "";
validateContent(PR_BODY);
ghOut("pr_type", getPrType(PR_BODY));
