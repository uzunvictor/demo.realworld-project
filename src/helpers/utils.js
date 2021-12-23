export const range = (start, end) => {
  // let arr = [];

  // for (let i = a; i <= b; i++) {
  //   arr.push(i);
  // }

  return [...Array(end).keys()].map((elem) => elem + start);
};
