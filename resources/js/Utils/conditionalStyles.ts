export function conditionalStyles(
  ...values: [boolean, () => React.CSSProperties][]
) {
  let resultValues = {};

  for (let v of values) {
    // console.log(v[1])
    if (v[0])
      resultValues = {
        ...resultValues,
        ...v[1](),
      };
  }
  return resultValues;
}
