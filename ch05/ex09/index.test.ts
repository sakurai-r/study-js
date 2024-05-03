import { parseJSON } from "./index.ts";

describe("parseJSON", () => {
  describe("true", () => {
    test.each([
      [
        '{"result":true, "count":42}',
        { success: true, data: { result: true, count: 42 } },
      ],
      [
        '{"1": 1, "2": 2, "3": {"4": 4, "5": {"6": 6}}}',
        {
          success: true,
          data: { "1": 1, "2": 2, "3": { "4": 4, "5": { "6": 6 } } },
        },
      ],
      ["{}", { success: true, data: {} }],
      ["true", { success: true, data: true }],
      ['"foo"', { success: true, data: "foo" }],
      ['[1, 5, "false"]', { success: true, data: [1, 5, "false"] }],
      ["null", { success: true, data: null }],
    ])('parseJSON("%s")=>"%s"', (input, expected) => {
      expect(parseJSON(input)).toStrictEqual(expected);
    });
  });

  describe("false", () => {
    test.each([
      [
        " ",
        {
          success: false,
          error: SyntaxError("Unexpected end of JSON input"),
        },
      ],
      [
        "[1, 2, 3, 4, ]",
        {
          success: false,
          error: SyntaxError("Unexpected token ] in JSON at position 13"),
        },
      ],
      [
        '{"foo" : 1, }',
        {
          success: false,
          error: SyntaxError("Unexpected token } in JSON at position 12"),
        },
      ],
      [
        "{'foo': 1}",
        {
          success: false,
          error: SyntaxError("Unexpected token ' in JSON at position 1"),
        },
      ],
    ])('parseJSON("%s")=>"%s"', (input, expected) => {
      expect(parseJSON(input)).toStrictEqual(expected);
    });
  });
});
