// @ts-nocheck

import {
  CommentPrefixType,
  getCommentMarker,
} from "../shared/workflowConfig/commentConfig.js";
import {
  getWorkflowConfig,
  WorkflowConfigType,
} from "../shared/workflowConfig/index.js";

/** @param {import('@actions/github-script').AsyncFunctionArguments} args */
export default async function ({ github, context }) {
  const { owner, repo } = context.repo;
  const pull_request = context.payload.pull_request;
  if (!pull_request)
    throw new Error("This workflow requires a pull request event.");
  const issue_number = pull_request.number;

  const comments = await github.paginate(github.rest.issues.listComments, {
    owner,
    repo,
    issue_number,
    per_page: 100,
  });

  /** @type {import("../shared/workflowConfig/actionsConfig.js").ActionsConfig} */
  // @ts-ignore
  const actionsConfig = getWorkflowConfig(WorkflowConfigType.ACTIONS);

  const { startMarker, endMarker } = getCommentMarker(
    CommentPrefixType.STATUS_CHECK,
  );

  const previousComments = comments.filter(
    (comment) =>
      comment.user?.login === actionsConfig.username &&
      comment.body?.includes(startMarker) &&
      comment.body?.includes(endMarker),
  );

  if (!previousComments.length) {
    console.log("No previous status check reports.");
    return;
  }
  console.log(
    `Found ${previousComments.length} previous status check reports. Clearing all...`,
  );

  for (const comment of previousComments) {
    await github.rest.issues.deleteComment({
      owner,
      repo,
      comment_id: comment.id,
    });
  }
}
