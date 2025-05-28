const mojoAndMutkiExchange = (initialMojos) => {
  if (!Number.isInteger(initialMojos) || initialMojos < 0) {
    throw new Error("Input must be a non-negative integer");
  }

  let mojos = initialMojos;
  let mutkis = initialMojos;

  while (mutkis >= 3) {
    const exchangeMojos = Math.floor(mutkis / 3);
    mojos += exchangeMojos;
    mutkis = (mutkis % 3) + exchangeMojos;
  }

  return mojos;
};

console.log(mojoAndMutkiExchange(10));
