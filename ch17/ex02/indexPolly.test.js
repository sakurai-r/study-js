const path = require('path');
const { Polly } = require('@pollyjs/core');
const NodeHttpAdapter = require('@pollyjs/adapter-node-http');
const FSPersister = require('@pollyjs/persister-fs');
const { Octokit } = require('@octokit/rest');
require('dotenv').config();

const { createIssueOperations } = require('./index.cjs');

Polly.register(NodeHttpAdapter);
Polly.register(FSPersister);

describe('issueOperations with PollyJS (CommonJS)', () => {
  let polly;
  let pollyContext;
  let issueOps;

  const TOKEN = process.env.TOKEN || 'dummy-token';
  const OWNER = process.env.OWNER;
  const REPO = process.env.REPO;

  // 作成した Issue の番号を保存するための変数
  let createdIssueNumber;

  beforeAll(() => {
    // Polly のインスタンス生成
    polly = new Polly('issueOperations-tests', {
      adapters: ['node-http'],
      persister: 'fs',
      recordIfMissing: true, // 録画がない場合のみ実際に通信し録画、あればリプレイ
      persisterOptions: {
        fs: {
          recordingsDir: path.resolve(__dirname, '__recordings__'),
        },
      },
    });
    pollyContext = polly.server;

    const octokit = new Octokit({ auth: TOKEN });

    issueOps = createIssueOperations({
      octokit,
      owner: OWNER,
      repo: REPO,
    });
  });

  afterAll(async () => {
    await polly.stop();
  });

  test('createIssue', async () => {
    // 新規 Issue を作成
    const createdIssue = await issueOps.createIssue({
      title: 'Test Issue',
      body: 'This is a test issue.',
    });

    // 作成された Issue の番号を保存しておき、後続のテストで closeIssue に使う
    createdIssueNumber = createdIssue.number;
    console.log('Created Issue:', createdIssue);

    // アサーション: Issue が正常に作成されたことを確認
    expect(createdIssue).toHaveProperty('number');
    expect(createdIssue).toHaveProperty('title');
    expect(createdIssue.title).toMatch(/Test Issue/);
  });

  test('listIssue', async () => {
    const issues = await issueOps.listIssue({ state: 'open' });
    console.log('Open Issues', issues);

    expect(Array.isArray(issues)).toBe(true);
    if (issues.length > 0) {
      expect(issues[0]).toHaveProperty('number');
      expect(issues[0]).toHaveProperty('title');
    }
  });

  test('closeIssue', async () => {
    if (!createdIssueNumber) {
      throw new Error('No created issue to close.');
    }

    const closedIssue = await issueOps.closeIssue({
      issue_number: createdIssueNumber,
    });
    console.log('Closed Issue:', closedIssue);

    expect(closedIssue).toHaveProperty('number', createdIssueNumber);
    expect(closedIssue).toHaveProperty('state', 'closed');

    const openIssues = await issueOps.listIssue({ state: 'open' });
    const stillOpen = openIssues.find((i) => i.number === createdIssueNumber);
    expect(stillOpen).toBeUndefined();
  });
});
