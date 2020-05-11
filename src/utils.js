'use strict';

const getRandomInt = (min, max) => {
  const ADDITIONAL_NUM = 1;
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + ADDITIONAL_NUM)) + min;
};

const getPictureFileName = (num) => {
  if (num < 10) {
    const numStr = num + ``;
    num = numStr.padStart(2, `0`);
  }

  return `item${num}.jpg`;
};

const shuffle = (someArray) => {
  someArray.forEach((item, index) => {
    const randomPosition = Math.floor(Math.random() * index);

    [someArray[index], someArray[randomPosition]] = [someArray[randomPosition], someArray[index]];
  });

  return someArray;
};

module.exports = {
  getRandomInt,
  getPictureFileName,
  shuffle
};
