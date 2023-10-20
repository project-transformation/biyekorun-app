export const heightCalculator = (height) => {
    const inches = parseInt(height);
    const feet = Math.floor(inches / 12);
    const remainingInches = inches % 12;
    const feetString = feet > 0 ? `${feet} ft` : "";
    const inchesString = remainingInches > 0 ? ` ${remainingInches} in` : "";
  
    return `${feetString}${inchesString}`.trim();
  };
  