export const capitalize = word => {
  word = word.split('');
  word[0] = word[0].toUpperCase();
  word = word.join('');
  return word;
};
