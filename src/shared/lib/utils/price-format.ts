const priceFormat = (price: string) => {
  return Array.from(price)
    .toReversed()
    .reduce<string[]>((acc, elem, index) => {
      if (index % 3 === 0) {
        acc.push(' ');
      }

      acc.push(elem);
      return acc;
    }, [])
    .toReversed()
    .join('')
}

export default priceFormat;
