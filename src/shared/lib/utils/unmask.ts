export const unmask = (str: string) => {
  if (str) {
    return str.split('').filter(char => /\d/.test(char)).join('');
  }
  return '';
}
