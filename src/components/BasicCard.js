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

const label = { inputProps: { "aria-label": "Switch demo" } };

const StyledCard = styled((props) => <Card {...props} />)(({ theme }) => ({
  padding: "1rem",
  borderRadius: "0.5rem",
  backgroundColor: "#fafafa",
  boxShadow: 5,
  width: "150px",
  height: "200px",
}));

export default function BasicCard({ title, id, link }) {
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
      {/* <Switch {...label} defaultChecked /> */}

      <Avatar
        sx={{
          height: "4rem",
          width: "4rem",
          margin: "10px auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <BallotIcon />
      </Avatar>
      <CardContent>
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
      </CardContent>
    </StyledCard>
  );
}
