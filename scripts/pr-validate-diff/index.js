// @ts-check

import { assertNullableEnv } from "../shared/assertion/env.js";
import getFiles from "./getFiles.js";
import validate from "./validate.js";

/** @type {string} */ // @ts-ignore
const PR_TYPE = process.env.PR_TYPE;
/** @type {string} */ // @ts-ignore
const FILE_DIFFS_PATH = process.env.FILE_DIFFS_PATH;
assertNullableEnv({ PR_TYPE, FILE_DIFFS_PATH });

const entries = getFiles(FILE_DIFFS_PATH);
validate(PR_TYPE, entries);
