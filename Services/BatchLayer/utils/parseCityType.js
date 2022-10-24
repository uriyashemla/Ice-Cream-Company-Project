module.exports = (cityType) => {
  switch (cityType) {
    case "jewish":
      return "יהודים";
    case "arab":
      return "ערבים";
    case "mixed":
        return "מעורב"  
    default:
      break;
  }
};
