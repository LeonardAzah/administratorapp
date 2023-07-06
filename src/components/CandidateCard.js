import React from "react";
import {
  Card,
  Typography,
  CardMedia,
  Avatar,
  CardHeader,
  CardContent,
  Button,
  Box,
  CardActions,
} from "@mui/material";
import me from "../assets/me.jpg";
import styled from "@emotion/styled";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";

const StyledCard = styled((props) => <Card {...props} />)(({ theme }) => ({
  padding: "0.5rem",
  paddingBottom: "initial",
  borderRadius: "0.5rem",
  backgroundColor: "#fafafa",
  boxShadow: 5,
  width: "333px",
  height: "220px",
}));

const styledAvatar = {
  height: "10rem",
  width: "8rem",
};

const CandidateCard = ({ name, bio, handleDeletClick, handleEditClick }) => {
  return (
    <StyledCard elevation={1}>
      <Box sx={{ display: "block" }}>
        <Box sx={{ display: "flex", height: "10rem" }}>
          <Avatar variant="rounded" sx={styledAvatar} alt="photo" src={me} />

          <Box sx={{ padding: "0.1rem", overflow: "auto" }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, color: "#233862", textAlign: "center" }}
            >
              {name}
            </Typography>

            <Typography variant="body2" sx={{ textAlign: "center" }}>
              {bio}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            justifyContent: "flex-end",
            paddingTop: "0.5rem",
          }}
        >
          <Fab
            size="small"
            color="info"
            aria-label="add"
            component={Button}
            onClick={handleEditClick}
          >
            <EditIcon />{" "}
          </Fab>
          <Fab
            size="small"
            color="error"
            aria-label="add"
            onClick={handleDeletClick}
          >
            <DeleteIcon />
          </Fab>
        </Box>
      </Box>
    </StyledCard>
  );
};

export default CandidateCard;
