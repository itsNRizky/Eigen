const sentence = 'Saya sangat senang mengerjakan soal algoritma';

const longest = (sentence) => {
  const mostLong = sentence.split(' ').sort((a, b) => b.length - a.length)[0];
  const lengthMostLong = mostLong.length;

  return `${mostLong} : ${lengthMostLong} chars`;
};

console.log(longest(sentence));
