// @ts-check

/** @type {PrBodyConfig} */
// @ts-ignore
const config = getWorkflowConfig(WorkflowConfigType.PR_BODY);

/**
 * Validate input content against configured steps.
 *
 * Rules:
 * - Step 0 is the initial, implicitly passed step.
 * - A step can run only if its preId has passed.
 * - All eligible steps sharing a preId are evaluated.
 * - If any eligible step fails, collect its error message.
 * - If a prerequisite group fails, stop before running dependent steps.
 * @param {string} content - Paragraph content to validate.
 * @returns {number[]} IDs of passed steps.
 * @throws {Error} If any validation step fails.
 */
export function validateContent(content) {
  if (typeof content !== "string")
    throw new TypeError("Input content must be a string.");

  const passedSteps = new Set([0]);
  const errorMessages = [];
  const pendingSteps = [...config.validation.steps];

  while (pendingSteps.length > 0) {
    // Find all steps whose prerequisites have passed.
    const eligibleSteps = pendingSteps.filter((step) =>
      passedSteps.has(step.preId),
    );

    if (eligibleSteps.length === 0) {
      const unresolved = pendingSteps.map(
        ({ id, preId }) => `Step ${id} requires step ${preId}.`,
      );

      throw new Error(
        ["Invalid pull-request body format:", ...unresolved].join("\n"),
      );
    }

    // Evaluate every step in the current prerequisite group.
    const failedSteps = [];

    for (const step of eligibleSteps) {
      pendingSteps.splice(pendingSteps.indexOf(step), 1);

      let matches;

      try {
        matches = new RegExp(step.regex.pattern, step.regex.flags).test(
          content,
        );
      } catch (/** @type {any} */ error) {
        throw new Error(
          `Invalid regex in step ${step.id} (${step.step}): ${error.message}`,
        );
      }

      if (!matches) {
        errorMessages.push(step.error);
        failedSteps.push(step);
      }
    }

    // Do not proceed to dependent steps if this group has failures.
    if (failedSteps.length > 0) {
      throw new Error(errorMessages.join("\n"));
    }

    // Mark the entire successful group as passed.
    for (const step of eligibleSteps) {
      passedSteps.add(step.id);
    }
  }

  return [...passedSteps];
}

/**
 * Gets project defined pull-request types
 *
 * @param {string} content
 * @returns {string} matched part of content.
 * @throws {Error} If no valid matches
 */
export function getPrType(content) {
  const result = content.match(config.getTypeRegex.pattern);
  if (!result) throw new Error("No matches. This should NEVER happen.");
  return result[0];
}
