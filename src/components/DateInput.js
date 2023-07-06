import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function DateInput({ value, handleChange, ...props }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label="Date of birth"
          value={value}
          onChange={handleChange}
          {...props}
          sx={{
            "& .MuiInputBase-root": {
              height: 50,
              marginBottom: "1.1em",
              padding: "6px 8px",
              fontSize: "0.9375rem",
              borderRadius: "10px",
            },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
