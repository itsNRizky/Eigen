const INPUT = ['xc', 'dz', 'bbb', 'dz'];
const QUERY = ['bbb', 'ac', 'dz'];

const sumInputQuery = (input, query) => {
  let output = [];

  for (let i = 0; i < query.length; i++) {
    output[i] = 0;
    for (let j = 0; j < input.length; j++) {
      if (query[i] === input[j]) {
        output[i]++;
      }
    }
  }
  return output;
};

console.log(sumInputQuery(INPUT, QUERY));
