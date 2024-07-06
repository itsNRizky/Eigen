const text = 'NEGIE1';

function reverse(text) {
  const arrText = text.split('');
  const numOfText = arrText.pop();

  return arrText.reverse().join('') + numOfText;
}

// Try find better solution

console.log(reverse(text));
