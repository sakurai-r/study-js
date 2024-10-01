document.getElementById("loadModule").addEventListener("click", async () => {
  try {
    const module = await import("./module.js");
    module.log();
  } catch (error) {
    console.error("モジュールの読み込みに失敗しました:", error);
  }
});
