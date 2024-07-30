export function detectFileType(input) {
  const byteArray = new Uint8Array(input);

  const extension = {
    PDF: [0x25, 0x50, 0x44, 0x46, 0x2d],
    ZIP: [
      [0x50, 0x4b, 0x03, 0x04],
      [0x50, 0x4b, 0x05, 0x06],
      [0x50, 0x4b, 0x07, 0x08],
    ],
    GIF: [
      [0x47, 0x49, 0x46, 0x38, 0x37, 0x61],
      [0x47, 0x49, 0x46, 0x38, 0x39, 0x61],
    ],
    PNG: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],
  };

  for (const [key, values] of Object.entries(extension)) {
    if (Array.isArray(values[0])) {
      for (const value of values) {
        if (
          byteArray
            .slice(0, value.length)
            .every((byte, index) => byte === value[index])
        ) {
          return key;
        }
      }
    } else {
      if (
        byteArray
          .slice(0, values.length)
          .every((byte, index) => byte === values[index])
      ) {
        return key;
      }
    }
  }

  return "UNKNOWN";
}
