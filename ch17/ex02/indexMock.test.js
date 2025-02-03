const { createIssueOperations } = require('./index.cjs');

const TEST_OWNER = 'test-owner';
const TEST_REPO = 'test-repo';

describe('createIssueOperations', () => {
  let mockOctokit;
  let issueOps;

  beforeEach(() => {
    mockOctokit = {
      rest: {
        issues: {
          create: jest.fn(),
          update: jest.fn(),
          listForRepo: jest.fn(),
        },
      },
    };

    issueOps = createIssueOperations({
      octokit: mockOctokit,
      owner: TEST_OWNER,
      repo: TEST_REPO,
    });
  });

  describe('createIssue', () => {
    it('create an issue with correct parameters', async () => {
      mockOctokit.rest.issues.create.mockResolvedValueOnce({
        data: { number: 123, title: 'issue', body: 'test body' },
      });

      // 実行
      const result = await issueOps.createIssue({
        title: 'issue',
        body: 'test body',
      });

      expect(mockOctokit.rest.issues.create).toHaveBeenCalledTimes(1);
      expect(mockOctokit.rest.issues.create).toHaveBeenCalledWith({
        owner: TEST_OWNER,
        repo: TEST_REPO,
        title: 'issue',
        body: 'test body',
      });
      expect(result).toEqual({
        number: 123,
        title: 'issue',
        body: 'test body',
      });
    });

    it('throw an error if title is missing', async () => {
      await expect(issueOps.createIssue({ title: '' })).rejects.toThrow(
        'Error: Title is required to create an issue.',
      );

      expect(mockOctokit.rest.issues.create).not.toHaveBeenCalled();
    });
  });

  describe('closeIssue', () => {
    it('close the issue with correct parameters', async () => {
      mockOctokit.rest.issues.update.mockResolvedValueOnce({
        data: { number: 456, state: 'closed' },
      });

      const result = await issueOps.closeIssue({
        issue_number: 456,
      });

      expect(mockOctokit.rest.issues.update).toHaveBeenCalledTimes(1);
      expect(mockOctokit.rest.issues.update).toHaveBeenCalledWith({
        owner: TEST_OWNER,
        repo: TEST_REPO,
        issue_number: 456,
        state: 'closed',
      });
      expect(result).toEqual({ number: 456, state: 'closed' });
    });

    it('throw an error if issue_number is invalid', async () => {
      await expect(issueOps.closeIssue({ issue_number: NaN })).rejects.toThrow(
        'Error: Valid issue number is required to close an issue.',
      );

      expect(mockOctokit.rest.issues.update).not.toHaveBeenCalled();
    });
  });

  describe('listIssue', () => {
    it('list open issues by default', async () => {
      mockOctokit.rest.issues.listForRepo.mockResolvedValueOnce({
        data: [
          { number: 1, title: 'Open Issue 1' },
          { number: 2, title: 'Open Issue 2' },
        ],
      });

      const issues = await issueOps.listIssue();

      expect(mockOctokit.rest.issues.listForRepo).toHaveBeenCalledTimes(1);
      expect(mockOctokit.rest.issues.listForRepo).toHaveBeenCalledWith({
        owner: TEST_OWNER,
        repo: TEST_REPO,
        state: 'open',
      });
      expect(issues).toHaveLength(2);
      expect(issues[0]).toEqual({ number: 1, title: 'Open Issue 1' });
    });

    it('list issues with provided state', async () => {
      mockOctokit.rest.issues.listForRepo.mockResolvedValueOnce({
        data: [{ number: 3, title: 'Closed Issue 3' }],
      });

      const issues = await issueOps.listIssue({ state: 'closed' });

      expect(mockOctokit.rest.issues.listForRepo).toHaveBeenCalledTimes(1);
      expect(mockOctokit.rest.issues.listForRepo).toHaveBeenCalledWith({
        owner: TEST_OWNER,
        repo: TEST_REPO,
        state: 'closed',
      });
      expect(issues).toEqual([{ number: 3, title: 'Closed Issue 3' }]);
    });
  });
});
