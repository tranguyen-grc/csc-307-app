import mut from "./module.js"; // MUT = Module Under Test

// Test for sum
test("Testing sum -- success", () => {
  const expected = 30;
  const got = mut.sum(12, 18);
  expect(got).toBe(expected);
});

// Tests for div
test("Testing div -- regular division", () => {
  expect(mut.div(10, 2)).toBe(5);
});

test("Testing div -- divide by 1", () => {
  expect(mut.div(9, 1)).toBe(9);
});

test("Testing div -- divide by zero", () => {
  expect(mut.div(5, 0)).toBe(Infinity); // JS returns Infinity
});

test("Testing div -- negative numbers", () => {
  expect(mut.div(-10, 2)).toBe(-5);
});

// Tests for containsNumbers
test("Testing containsNumbers -- contains digits", () => {
  expect(mut.containsNumbers("abc123")).toBe(true);
});

test("Testing containsNumbers -- only letters", () => {
  expect(mut.containsNumbers("hello")).toBe(false);
});

test("Testing containsNumbers -- only numbers", () => {
  expect(mut.containsNumbers("12345")).toBe(true);
});

test("Testing containsNumbers -- empty string", () => {
  expect(mut.containsNumbers("")).toBe(false);
});

test("Testing containsNumbers -- special characters and digits", () => {
  expect(mut.containsNumbers("!@#4$%")).toBe(true);
});

test("Testing containsNumbers -- whitespace and digits", () => {
  expect(mut.containsNumbers("   9 ")).toBe(true);
});

test("Testing containsNumbers -- decimal number string", () => {
  expect(mut.containsNumbers("3.14")).toBe(false); // Should fail if it's detecting decimal numbers incorrectly
});
