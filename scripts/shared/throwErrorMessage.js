// @ts-check

import { ghOut } from "./githubOutput.js";
import { EscapeMode, newLineEscape } from "./stringHandler.js";

/** @param {string} message */
export default function (message) {
  ghOut("error_messages", newLineEscape(message, EscapeMode.ENCODE));
}
