export const getContrastColor = (color) => {
  const invertedColor = {
    white: "regalBlue",
    disasterPacificBlue: "white",
    regalBlue: "white",
    lightgrey: "regalBlue",
  }[color];

  return invertedColor;
};

export const getPublicationType = (machineName) => {
  const publicationsMachineName = {
    node__expert_opinion: "Expert Opinion",
  }[machineName];

  if (publicationsMachineName) {
    return publicationsMachineName;
  } else return "";
};

export const getReactSelectFormattedOptions = (rawArray) => {
  return rawArray?.edges?.map((array) => {
    return { label: array.node?.name, value: array?.node?.id };
  });
};

export const getIntersectionOf = (array1, array2) =>
  array1.filter((value) => array2.includes(value));

export const getConcatOf = (allArrays) => {
  return allArrays?.flat() || [];
};

export const getArrayOfIDs = (completeArray) => {
  let array = [];
  completeArray?.map((a) => array.push(a?.id));
  return array;
};
