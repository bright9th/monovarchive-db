// @ts-check

import { ghOut } from "./githubOutput.js";

/** @param {string} message */
export default function (message) {
  ghOut("error_messages", message);
}
