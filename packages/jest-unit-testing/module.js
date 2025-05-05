function sum(a, b) {
  return a + b;
}

function div(a, b) {
  return a / b;
}

function containsNumbers(text) {
  // If the text contains a decimal, return false
  if (text.includes(".")) return false;

  // Otherwise, check for any digit in the string
  for (let i = 0; i < text.length; i++) {
    if (!isNaN(text.charAt(i)) && text.charAt(i) !== " ") return true;
  }

  return false;
}

export default { sum, div, containsNumbers };
