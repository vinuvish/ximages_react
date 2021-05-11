import Colors from "../../../styles/Colors"

const textFieldStyles = () => ({
  textFieldInnerCnt: {
    //Text Field Inner Container Styles, wrapping input and label
    marginBottom: "40px",
  },
  //for white input
  whiteTextField: {
    background: Colors.white,
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",

    flex: 1,
    height: "60px",
    width: "100%",
    marginTop: '0px !important',
    "& input": {
      textIndent: "10px",
      color: Colors.black,
      fontWeight: 600,
      fontSize: "20px",
      lineHeight: "24px"
    }
  },
  textField: {
    // Text Field Styles
    background: Colors.inputBg,
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",

    flex: 1,
    height: "60px",
    width: "100%",
    marginTop: '0px !important',
    "& input": {
      textIndent: "10px",
      color: Colors.inputColor,
      fontWeight: 600,
      fontSize: "20px",
      lineHeight: "24px"
    }
  },
  labelContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  textFieldLabel: {
    // Text field label styles

    marginBottom: "10px",
    transform: "none !important",
    padding: "0 !important",
    position: "static",
    color: "black !important",
    fontWeight: 600,
    fontSize: 16,
    lineHeight: "19px"
  },
  errorCenter: {
    textAlign: "center"
  },
  forgotPassword: {
    fontSize: "16px",
    fontWeight: 500,
    lineHeight: "19px",
    color: "#4635C3",
    cursor: "pointer",
    zIndex: 100
  }
});

export default textFieldStyles;
