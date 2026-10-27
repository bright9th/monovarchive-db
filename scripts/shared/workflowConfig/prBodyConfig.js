// @ts-check

/**
 * @typedef {Object} StringValidationStep
 * @property {number} id
 * @property {number} preId
 * @property {string} step
 * @property {import("../regex.js").RegexConfig} regex
 * @property {string} error
 */

/**
 * @typedef {Object} StringValidationStepConfig
 * @property {StringValidationStep[]} steps
 */

/**
 * @typedef {Object} PrBodyConfig
 * @property {StringValidationStepConfig} validation
 * @property {import("../regex.js").RegexConfig} getTypeRegex
 */
