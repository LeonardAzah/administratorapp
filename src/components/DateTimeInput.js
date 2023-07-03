import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function DateInput({ label, value, onChange, ...props }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        sx={{
          "& .MuiStack-root": {
            marginLeft: "auto",
          },
        }}
        components={["DateTimePicker"]}
      >
        <DateTimePicker
          {...props}
          label={label}
          value={value}
          onChange={onChange}
          sx={{
            "& .MuiInputBase-root": {
              height: 50,
              marginBottom: "1.1em",
              padding: "6px 8px",
              fontSize: "0.9375rem",
              borderRadius: "10px",
            },
            ".css-bovbj0-MuiDialogActions-root>:not(:first-of-type)": {
              marginLeft: "auto",
            },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
