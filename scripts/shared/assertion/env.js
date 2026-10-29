// @ts-check

/**
 * @template {Record<string, any>} T
 * @param {T} args
 * @returns {asserts args is T & { [K in keyof T]: NonNullable<T[K]> }}
 */
export function assertNullableEnv(args) {
  const missing = [];
  for (const [label, value] of Object.entries(args))
    if (!value) missing.push(label);
  if (missing.length > 0)
    throw new Error("Missing envs: " + missing.join("\n"));
}
