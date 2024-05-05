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
  let result = "";
  for (const char of str) {
    switch (char) {
      case "\0":
        result += "\\0";
        break;
      case "\b":
        result += "\\b";
        break;
      case "\t":
        result += "\\t";
        break;
      case "\n":
        result += "\\n";
        break;
      case "\v":
        result += "\\v";
        break;
      case "\f":
        result += "\\f";
        break;
      case "\r":
        result += "\\r";
        break;
      case '"':
        result += '\\"';
        break;
      case "'":
        result += "\\'";
        break;
      default:
        result += char;
    }
  }

  return result;
};
