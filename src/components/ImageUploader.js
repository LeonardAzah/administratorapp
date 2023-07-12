import React, { useRef, useState } from "react";
import { Box, Avatar, Button, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const ImageUploader = ({ image, Ref, onChange, onClick, name }) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: "0.5rem",
      }}
    >
      <Box
        component={Button}
        disableFocusRipple
        disableRipple
        onClick={onClick}
        sx={{
          borderRaduis: "10px",
          border: "2px",
          background: "#000000E5",
          width: "300px",
          height: "140px",
          textTransform: "none",
          display: "block",
        }}
      >
        <CloudUploadIcon
          sx={{ color: "#ffffff", width: "60px", height: "60px" }}
        />
        <Typography sx={{ color: "#ffffff", fontSize: "16px" }}>
          Upload Image
        </Typography>
        <input
          type="file"
          name={name}
          ref={Ref}
          onChange={onChange}
          style={{ display: "none" }}
        />
      </Box>
      <Box>
        <Avatar
          sx={{
            width: "150px",
            height: "150px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              alt="profile"
            />
          ) : null}
        </Avatar>
      </Box>
    </Box>
  );
};

export default ImageUploader;
