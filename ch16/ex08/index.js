import { Octokit } from "octokit";

// Personal Access Token を設定
const TOKEN = "token";
const OWNER = "r-sakurai";
const REPO = "study-js";

// https://github.com/octokit/octokit.js/#usage
const octokit = new Octokit({ auth: TOKEN });

const args = process.argv.slice(2);
const command = args[0];
const options = args.slice(1); // 残りの引数はオプションとして取得する

// --verbose または -v オプションが指定されている場合、リクエストとレスポンスをログに表示する
const verbose = options.includes("--verbose") || options.includes("-v");
if (verbose) {
  octokit.hook.wrap("request", async (request, options) => {
    console.log("Request:", options);
    const response = await request(options);
    console.log("Response:", response);
    return response;
  });
}

// -hまたは--helpオプションで使い方を表示する
if (command === "-h" || command === "--help") {
  console.log(`Usage:
  create <title> [body]    Create a new issue with the specified title and optional body.
  close <issue_number>     Close the issue with the specified issue number.
  list                    List all open issues in the repository.
  --verbose, -v           Enable verbose HTTP logging.
  -h, --help              Show this help message.`);
  process.exit(0);
}

(async () => {
  try {
    if (command === "create") {
      const title = options[0];
      const body = options[1] || "";
      if (!title) {
        console.error("Error: Title is required to create an issue.");
        return;
      }
      await octokit.rest.issues.create({
        owner: OWNER,
        repo: REPO,
        title,
        body,
      });

      console.log("Issue created");
    } else if (command === "close") {
      const issue_number = parseInt(options[0]);
      if (isNaN(issue_number)) {
        console.error(
          "Error: Valid issue number is required to close an issue."
        );
        return;
      }
      await octokit.rest.issues.update({
        owner: OWNER,
        repo: REPO,
        issue_number,
        state: "closed",
      });
      console.log("Issue closed");
    } else if (command === "list") {
      await octokit.rest.issues.listForRepo({
        owner: OWNER,
        repo: REPO,
        state: "open", // オープンな Issue のみ指定
      });
      console.log("Open issues:");
      response.data.forEach((issue) => {
        console.log(`#${issue.number}: ${issue.title}`);
      });
    } else {
      console.log("Invalid command.");
    }
  } catch (error) {
    console.error(error);
  }
})();
