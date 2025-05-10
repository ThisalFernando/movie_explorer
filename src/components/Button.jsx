import React from "react";
import { Button as MuiButton } from "@mui/material";

const Button = ({ text, onClick, type = "button" }) => {
  return (
    <MuiButton
      type={type}
      onClick={onClick}
      variant="contained"
      fullWidth
      sx={{
        backgroundColor: "blue",
        color: "white",
        fontWeight: "bold",
        py: 2,
        px: 2,
        borderRadius: 2,
        mt: 3,
        transition: "0.3s",
        "&:hover": {
          backgroundColor: "black",
        },
      }}
    >
      {text}
    </MuiButton>
  );
};

export default Button;
