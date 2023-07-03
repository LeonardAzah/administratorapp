import { React, useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { TextField } from "@mui/material";
import { Icon } from "@mui/material";

const TextFieldStyle = styled(TextField)(({ theme }) => ({
  width: "100%",

  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: 10,
    },

    "&.Mui-focused fieldset": {
      outline: "none",
    },
  },
  "& .MuiInputBase-root": {
    height: 50,
    marginBottom: "1.1em",
    padding: "6px 8px",
    fontSize: "0.9375rem",
  },
}));

export const usePasswordToggle = () => {
  const [visible, setVisible] = useState(false);
  const Icons = (
    <Icon onClick={() => setVisible((Visibility) => !Visibility)}>
      {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
    </Icon>
  );
  const Inputfield = visible ? "text" : "password";

  return [Inputfield, Icons];
};

const InputText = ({ iconStart, iconEnd, InputProps, ...props }) => {
  return (
    <TextFieldStyle
      {...props}
      InputProps={{
        ...InputProps,
        startAdornment: iconStart ? (
          <IconButton aria-label="visibility">
            <InputAdornment position="start">{iconStart}</InputAdornment>
          </IconButton>
        ) : null,
        endAdornment: iconEnd ? (
          <IconButton>
            <InputAdornment position="end">{iconEnd}</InputAdornment>
          </IconButton>
        ) : null,
      }}
    />
  );
};

export default InputText;
