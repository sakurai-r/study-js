export const escapeIf = (str: string) => {
  let result = str;

  if (str.includes("\0")) {
    result = result.replaceAll("\0", "\\0");
  }
  if (str.includes("\b")) {
    result = result.replaceAll("\b", "\\b");
  }
  if (str.includes("\t")) {
    result = result.replaceAll("\t", "\\t");
  }
  if (str.includes("\n")) {
    result = result.replaceAll("\n", "\\n");
  }
  if (str.includes("\v")) {
    result = result.replaceAll("\v", "\\v");
  }
  if (str.includes("\f")) {
    result = result.replaceAll("\f", "\\f");
  }
  if (str.includes("\r")) {
    result = result.replaceAll("\r", "\\r");
  }
  if (str.includes('"')) {
    result = result.replaceAll('"', '\\"');
  }
  if (str.includes("'")) {
    result = result.replaceAll("'", "\\'");
  }

  return result;
};

/* eslint-disable no-fallthrough */
export const escapeSwitch = (str: string) => {
  let result = str;

  switch (true) {
    case str.includes("\0"):
      result = result.replaceAll("\0", "\\0");
    case str.includes("\b"):
      result = result.replaceAll("\b", "\\b");
    case str.includes("\t"):
      result = result.replaceAll("\t", "\\t");
    case str.includes("\n"):
      result = result.replaceAll("\n", "\\n");
    case str.includes("\v"):
      result = result.replaceAll("\v", "\\v");
    case str.includes("\f"):
      result = result.replaceAll("\f", "\\f");
    case str.includes("\r"):
      result = result.replaceAll("\r", "\\r");
    case str.includes('"'):
      result = result.replaceAll('"', '\\"');
    case str.includes("'"):
      result = result.replaceAll("'", "\\'");
    default:
  }

  return result;
};
