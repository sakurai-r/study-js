import { startServer, stopServer } from "./server.js";
import { Socket } from "net";

const port = 3000;
const host = "127.0.0.1";

beforeAll((done) => {
  startServer(done);
});

afterAll((done) => {
  stopServer(done);
});

describe("Server tests", () => {
  test("GET / return the HTML form", (done) => {
    const client = new Socket();

    client.connect(port, host, () => {
      const request = ["GET / HTTP/1.1", "Host: localhost:3000", "", ""].join(
        "\r\n"
      );

      client.write(request);
    });

    client.on("data", (data) => {
      const response = data.toString();
      expect(response).toContain("<title>Greeting Form</title>");
      expect(response).toContain('<form action="/greeting" method="POST">');
      client.destroy();
      done();
    });
  });

  test("POST /greeting return personalized greeting", (done) => {
    const client = new Socket();

    client.connect(port, host, () => {
      const body = "name=Sakura&greeting=Hello";
      const request = [
        "POST /greeting HTTP/1.1",
        "Host: localhost:3000",
        "Content-Type: application/x-www-form-urlencoded",
        `Content-Length: ${body.length}`,
        "",
        body,
      ].join("\r\n");

      client.write(request);
    });

    client.on("data", (data) => {
      const response = data.toString();
      expect(response).toContain("<title>Greeting Result</title>");
      expect(response).toContain("<p>Hello, Sakura!</p>");
      client.destroy();
      done();
    });
  });

  test("Invalid path return 404", (done) => {
    const client = new Socket();

    client.connect(port, host, () => {
      const request = [
        "GET /invalid HTTP/1.1",
        "Host: localhost:3000",
        "",
        "",
      ].join("\r\n");

      client.write(request);
    });

    client.on("data", (data) => {
      const response = data.toString();
      expect(response).toContain("404 Not Found");
      client.destroy();
      done();
    });
  });

  test("Invalid method return 405", (done) => {
    const client = new Socket();

    client.connect(port, host, () => {
      const request = ["PUT / HTTP/1.1", "Host: localhost:3000", "", ""].join(
        "\r\n"
      );

      client.write(request);
    });

    client.on("data", (data) => {
      const response = data.toString();
      expect(response).toContain("405 Method Not Allowed");
      client.destroy();
      done();
    });
  });
});
