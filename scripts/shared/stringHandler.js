// @ts-check

export const EscapeMode = Object.freeze({
  ENCODE: 0,
  DECODE: 1,
});

/**
 * @param {string} content
 * @param {number} escapeMode
 * @returns {string}
 */
export function newLineEscape(content, escapeMode) {
  return escapeMode == 0
    ? content.replaceAll("\n", "\\n")
    : content.replaceAll("\\n", "\n");
}
