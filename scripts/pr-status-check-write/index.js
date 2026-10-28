// @ts-check

import { EscapeMode, newLineEscape } from "../shared/stringHandler.js";
import {
  CommentPrefixType,
  getCommentMarker,
} from "../shared/workflowConfig/commentConfig.js";

/** @param {import('@actions/github-script').AsyncFunctionArguments} args */
export default async function ({ github, context }) {
  const { owner, repo } = context.repo;
  const pull_request = context.payload.pull_request;
  if (!pull_request)
    throw new Error("This workflow requires a pull request event.");

  const { startMarker, endMarker } = getCommentMarker(
    CommentPrefixType.STATUS_CHECK,
  );

  const JOB_NAME = process.env.JOB_NAME;
  if (!JOB_NAME) throw new Error("JOB_NAME is not defined.");
  const ERROR_MESSAGES = process.env.ERROR_MESSAGES || null;

  const body = [
    startMarker,
    "[AUTOMATED_STATUS_CHECK_REPORT]",
    `[JOB_NAME] \`${JOB_NAME}\``,
    "\n---\n",
    ERROR_MESSAGES
      ? newLineEscape(ERROR_MESSAGES, EscapeMode.DECODE)
      : "Undefined Error.",
    endMarker,
  ].join("\n");

  await github.rest.issues.createComment({
    owner,
    repo,
    issue_number: pull_request.number,
    body,
  });
}
