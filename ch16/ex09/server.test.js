const { serve } = require("./server");
const request = require("supertest");
const path = require("path");

describe("HTTP Server Tests", () => {
  const rootDirectory = path.resolve(__dirname, "test");
  const port = 3000;

  let server;

  // サーバー起動前にテスト用のサーバーを設定
  beforeAll(() => {
    server = serve(rootDirectory, port);
  });

  // サーバー終了
  afterAll(() => {
    if (server) {
      server.close();
    }
  });

  it("respond to /test/mirror with the correct echo", async () => {
    const response = await request(`http://localhost:${port}`)
      .post("/test/mirror")
      .set("X-Test-Header", "HeaderValue")
      .send("Test body");

    expect(response.status).toBe(200);
    expect(response.text).toContain("POST /test/mirror HTTP/1.1");
    expect(response.text).toContain("X-Test-Header: HeaderValue");
    expect(response.text).toContain("Test body");
  });

  it("serve static files with correct content type", async () => {
    const response = await request(`http://localhost:${port}`).get(
      "/example.txt"
    );

    expect(response.status).toBe(200);
    expect(response.header["content-type"]).toBe("text/plain");
    expect(response.text).toBe("Hello, world.\n");
  });

  it("serve HTML files with correct content type", async () => {
    const response = await request(`http://localhost:${port}`).get(
      "/index.html"
    );

    expect(response.status).toBe(200);
    expect(response.header["content-type"]).toBe("text/html");
  });

  it("serve CSS files with correct content type", async () => {
    const response = await request(`http://localhost:${port}`).get(
      "/style.css"
    );

    expect(response.status).toBe(200);
    expect(response.header["content-type"]).toBe("text/css");
  });

  it("return 404 for non-existing files", async () => {
    const response = await request(`http://localhost:${port}`).get(
      "/nonExistent.txt"
    );

    expect(response.status).toBe(404);
    expect(response.text).toContain("File not found");
  });
});
