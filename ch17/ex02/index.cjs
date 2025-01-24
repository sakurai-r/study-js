function createIssueOperations({ octokit, owner, repo }) {
  if (!octokit) {
    throw new Error('octokit is required');
  }
  if (!owner) {
    throw new Error('owner is required');
  }
  if (!repo) {
    throw new Error('repo is required');
  }

  const createIssue = async ({ title, body = '' }) => {
    if (!title) {
      throw new Error('Error: Title is required to create an issue.');
    }
    const response = await octokit.rest.issues.create({
      owner,
      repo,
      title,
      body,
    });
    return response.data;
  };

  const closeIssue = async ({ issue_number }) => {
    if (!issue_number || isNaN(issue_number)) {
      throw new Error(
        'Error: Valid issue number is required to close an issue.',
      );
    }
    const response = await octokit.rest.issues.update({
      owner,
      repo,
      issue_number,
      state: 'closed',
    });
    return response.data;
  };

  const listIssue = async ({ state = 'open' } = {}) => {
    const response = await octokit.rest.issues.listForRepo({
      owner,
      repo,
      state,
    });
    return response.data;
  };

  return {
    createIssue,
    closeIssue,
    listIssue,
  };
}

module.exports = { createIssueOperations };
