module.exports.getCellColor = (severity) => {
  // createData("Info", 305, 3.7, 67, "asdlkasdm1"),
  // createData("Critical", 452, 25.0, 51, "aslkdj1lknas"),
  // createData("Info", 262, 16.0, 24, "lkklnfllkn21"),
  // createData("Normal", 159, 6.0, 24, "lkjl1lk2lkn1kln"),
  // createData("Major", 356, 16.0, 49, "lkjas8lkj87"),
  // createData("Minor", 408, 3.2, 87, "iuhenk3lkj12"),

  switch (severity) {
    case "Info":
      return { bgcolor: "#35baf6" };
    case "Critical":
      return { bgcolor: "red", color: "white" };
    case "Normal":
      return { bgcolor: "#76ff03" };
    case "Major":
      return { bgcolor: "orange" };
    case "Minor":
      return { bgcolor: "yellow" };
    default:
      return { bgcolor: "primary", color: "white" };
  }
};
