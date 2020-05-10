'use strict';

const getRandomInt = (min, max) => {
  const ADDITIONAL_NUM = 1;
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + ADDITIONAL_NUM)) + min;
};

const getPictureFileName = (num) => {
  let path;

  if (num > 10) {
    path = `item${num}.jpg`;
  } else {
    path = `item0${num}.jpg`;
  }

  return path;
};

const shuffle = (someArray) => {
  const someArrayEnd = someArray.length - 1;

  for (let i = someArrayEnd; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }

  return someArray;
};

module.exports = {
  getRandomInt,
  getPictureFileName,
  shuffle
};
