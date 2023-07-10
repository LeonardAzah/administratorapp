import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import { Avatar } from "@mui/material";
import BallotIcon from "@mui/icons-material/Ballot";
import Switch from "@mui/material/Switch";
import { Link } from "react-router-dom";
import HowToVoteIcon from "@mui/icons-material/HowToVote";

const label = { inputProps: { "aria-label": "Switch demo" } };

const StyledCard = styled((props) => <Card {...props} />)(({ theme }) => ({
  borderRadius: "0.5rem",
  backgroundColor: "#fafafa",
  boxShadow: 5,
  width: "265px",
  height: "130px",

  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
}));

export default function BasicCard({ title, id, link, isActive }) {
  return (
    <StyledCard
      component={Link}
      to={link}
      state={id}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textDecoration: "none",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        {isActive ? <Switch {...label} defaultChecked /> : null}
      </Box>

      <Avatar
        sx={{
          height: "3rem",
          width: "3rem",
          margin: "10px auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <HowToVoteIcon fontSize="large" />
      </Avatar>
      <Box>
        {title && (
          <Typography
            sx={{
              fontSize: "14px",
              textAlign: "center",
              fontWeight: 400,
              lineHeight: "1.5rem",
            }}
            variant="h5"
          >
            {title}
          </Typography>
        )}
      </Box>
    </StyledCard>
  );
}
