(() => {
  try {
    console.log("1");
    throw new Error("error");
  } catch (e) {
    console.log("2");
  } finally {
    console.log("3");
  }
})();
