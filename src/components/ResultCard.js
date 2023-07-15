import React from "react";
import { Card, Typography, Avatar, Box } from "@mui/material";
import me from "../assets/me.jpg";
import styled from "@emotion/styled";

const StyledCard = styled((props) => <Card {...props} />)(({ theme }) => ({
  padding: "0.5rem",
  borderRadius: "0.5rem",
  backgroundColor: "#fafafa",
  boxShadow: 5,
  width: "333px",
  height: "170px",
}));

const styledAvatar = {
  height: "10rem",
  width: "8rem",
};

const ResultCard = ({ name, voteCount, image }) => {
  return (
    <StyledCard elevation={1}>
      <Box sx={{ display: "flex" }}>
        <Avatar
          variant="rounded"
          sx={styledAvatar}
          alt="photo"
          src={`http://localhost:3500/uploads/` + image}
        />

        <Box
          sx={{
            padding: "0.1rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: "#233862", textAlign: "center" }}
          >
            {name}
          </Typography>

          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              color: "#F50312",
              fontWeight: 700,
              fontSize: "5rerm",
            }}
          >
            {voteCount} votes
          </Typography>
        </Box>
      </Box>
    </StyledCard>
  );
};

export default ResultCard;
