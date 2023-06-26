const generateRgbaColors = (length, alpha) => {
  const colors = [];

  for (let i = 0; i < length; i++) {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    // const alpha = 0.4;

    const rgbaColor = `rgba(${r}, ${g}, ${b}, ${alpha})`;
    colors.push(rgbaColor);
  }

  return colors;
};

export default generateRgbaColors;
