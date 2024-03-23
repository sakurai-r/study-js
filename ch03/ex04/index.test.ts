describe("ex04", () => {
  const Hundred_Points_Symbol = "💯";

  it("show Hundred Points Symbol of length", () => {
    console.log(
      `${Hundred_Points_Symbol} の length は ${Hundred_Points_Symbol.length} です。`
    );
  });

  test.each([
    [true, "\uD83D\uDCAF"],
    [true, "\u{0001F4AF}"],
  ])("return %p when comparing 💯 and %p ", (expected, value) => {
    expect(Hundred_Points_Symbol === value).toBe(expected);
  });
});
