const calculateTileShift = (tile, place) => {
  if (tile === "N0") {
    return {
      top: -39.5 + 191 * Math.floor(place / 3) + "px",
      left: -39.5 + 191 * (place % 3) + "px",
    };
  } else if (tile === "N1" || tile === "O0" || tile === "O2") {
    return {
      top: -39.5 + 191 * Math.floor(place / 3) + "px",
      left: 191 * (place % 3) + "px",
    };
  } else if (tile === "N2") {
    return {
      top: 191 * Math.floor(place / 3) + "px",
      left: 191 * (place % 3) + "px",
    };
  } else if (tile === "N3" || tile === "O1" || tile === "O3") {
    // console.log("tile", tile, "place", place);
    return {
      top: 191 * Math.floor(place / 3) + "px",
      left: -39.5 + 191 * (place % 3) + "px",
    };
  } else {
    return { top: "0px", left: "0px" };
  }
};

const calculateBoatShift = (boat) => {
  const boatSetting = {
    top: "0px",
    left: "0px",
    rotate: "0",
    visibility: "visible",
  };
  const charCodes = {};
  "abchijopqvwx".split("").forEach((char, index) => {
    charCodes[char] = index;
  });
  "defgklmnrstu".split("").forEach((char, index) => {
    charCodes[char] = index;
  });
  if (boat === "") {
    boatSetting.visibility = "hidden";
  } else {
    const boatPosition = boat[1];
    // "defgklmnrstu"
    if ("defgklmnrstu".includes(boatPosition)) {
      const delta = charCodes[boatPosition] - charCodes["d"];
      boatSetting.top = Math.floor(delta / 4) * 191 + "px";
      boatSetting.left = -39.5 + (delta % 4) * 191 + "px";
    } else {
      // "abchijopqvwx"
      const delta = charCodes[boatPosition] - charCodes["a"];
      boatSetting.top = -95.5 + Math.floor(delta / 3) * 191 + "px";
      boatSetting.left = 56 + 191 * (delta % 3) + "px";
      boatSetting.rotate = "90deg";
    }
  }
  return boatSetting;
};

const calculateArrowShift = (arrow) => {
  const arrowSetting = {
    top: "0px",
    left: "0px",
    rotate: "0",
    visibility: "visible",
  };

  const charCodes = {};
  "abcgnuvwxdkr".split("").forEach((char, index) => {
    charCodes[char] = index;
  });

  if (arrow === "") {
    arrowSetting.visibility = "hidden";
  } else {
    const arrowPosition = arrow[1];
    if ("abc".includes(arrowPosition)) {
      const delta = charCodes[arrowPosition] - charCodes["a"];
      arrowSetting.top = -50 - 39.5 + "px";
      arrowSetting.left = -30 + 191 * ((delta % 3) + 0.5) + "px";
    } else if ("dkr".includes(arrowPosition)) {
      const delta = charCodes[arrowPosition] - charCodes["d"];
      arrowSetting.top = -15 + 191 * ((delta % 3) + 0.5) + "px";
      arrowSetting.left = -55 - 39.5 + "px";
      arrowSetting.rotate = "-90deg";
    } else if ("vwx".includes(arrowPosition)) {
      const delta = charCodes[arrowPosition] - charCodes["v"];
      arrowSetting.top = 10 + 191 * 3 + 39.5 + "px";
      arrowSetting.left = -35 + 191 * ((delta % 3) + 0.5) + "px";
      arrowSetting.rotate = "180deg";
    } else {
      const delta = charCodes[arrowPosition] - charCodes["g"];
      arrowSetting.top = -20 + 191 * ((delta % 3) + 0.5) + "px";
      arrowSetting.left = 191 * 3 + 39.5 + "px";
      arrowSetting.rotate = "90deg";
    }
  }
  return arrowSetting;
};

const calculateBoatsState = (boats) => {
  const boatsState = {
    BB: "",
    BG: "",
    BR: "",
    BY: "",
  };
  const boatsIndex = {
    BB: boats.indexOf("B"),
    BG: boats.indexOf("G"),
    BR: boats.indexOf("R"),
    BY: boats.indexOf("Y"),
  };
  if (boatsIndex.BB !== -1) {
    boatsState.BB = boats.substring(boatsIndex.BB, boatsIndex.BB + 2);
  }
  if (boatsIndex.BG !== -1) {
    boatsState.BG = boats.substring(boatsIndex.BG, boatsIndex.BG + 2);
  }
  if (boatsIndex.BR !== -1) {
    boatsState.BR = boats.substring(boatsIndex.BR, boatsIndex.BR + 2);
  }
  if (boatsIndex.BY !== -1) {
    boatsState.BY = boats.substring(boatsIndex.BY, boatsIndex.BY + 2);
  }
  return boatsState;
};

const calculateArrowsState = (arrows) => {
  const arrowsState = {
    AB: "",
    AG: "",
    AR: "",
    AY: "",
  };
  const arrowsIndex = {
    AB: arrows.indexOf("B"),
    AG: arrows.indexOf("G"),
    AR: arrows.indexOf("R"),
    AY: arrows.indexOf("Y"),
  };
  if (arrowsIndex.AB !== -1) {
    arrowsState.AB = arrows.substring(arrowsIndex.AB, arrowsIndex.AB + 2);
  }
  if (arrowsIndex.AG !== -1) {
    arrowsState.AG = arrows.substring(arrowsIndex.AG, arrowsIndex.AG + 2);
  }
  if (arrowsIndex.AR !== -1) {
    arrowsState.AR = arrows.substring(arrowsIndex.AR, arrowsIndex.AR + 2);
  }
  if (arrowsIndex.AY !== -1) {
    arrowsState.AY = arrows.substring(arrowsIndex.AY, arrowsIndex.AY + 2);
  }
  return arrowsState;
};

export {
  calculateTileShift,
  calculateBoatShift,
  calculateArrowShift,
  calculateBoatsState,
  calculateArrowsState,
};
