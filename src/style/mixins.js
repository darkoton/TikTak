function fluid(property, max, min, minScreen = 320, maxScreen = 430) {
  const valueRange = min - max;
  const screenRange = maxScreen - minScreen;

  return `
    ${property}: ${max}px;

    @media (max-width: ${maxScreen}px) {
      ${property}: calc(${min}px - ${valueRange} * (100vw - ${minScreen}px) / ${screenRange});
    }

    @media (max-width: ${minScreen}px) {
      ${property}: ${min}px;
    }
  `;
}

export { fluid }