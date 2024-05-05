export const parseJSON = (json: string) => {
  try {
    return { success: true, data: JSON.parse(json) };
  } catch (e) {
    return { success: false, error: e };
  }
};

console.log(parseJSON('{"hoge": "fuga"}'));
console.log(parseJSON('{hoge: "fuga"}'));
