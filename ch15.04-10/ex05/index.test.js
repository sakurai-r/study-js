import "./index.js";

describe("inline-circle", () => {
  test("border-color-test", () => {
    document.body.innerHTML =
      '<inline-circle border-color="red"></inline-circle>';
    const circle = document.querySelector("inline-circle");

    expect(circle.style.width).toBe("0.8em");
    expect(circle.style.height).toBe("0.8em");
    expect(circle.style.backgroundColor).toBe("");

    expect(circle.style.borderColor).toBe("red");
  });

  test("diameter-test", () => {
    document.body.innerHTML =
      '<inline-circle diameter="5.0em"></inline-circle>';
    const circle = document.querySelector("inline-circle");

    expect(circle.style.width).toBe("5.0em");
    expect(circle.style.height).toBe("5.0em");
    expect(circle.style.backgroundColor).toBe("");
    expect(circle.style.border).toBe("");
  });

  test("color-test", () => {
    document.body.innerHTML = '<inline-circle color="blue"></inline-circle>';
    const circle = document.querySelector("inline-circle");

    expect(circle.style.width).toBe("0.8em");
    expect(circle.style.height).toBe("0.8em");
    expect(circle.style.backgroundColor).toBe("blue");
    expect(circle.style.border).toBe("");
  });
});
