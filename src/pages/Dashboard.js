import React, { useContext, useState } from "react";

import pagepic from "../assets/pagepic.jpg";

import Appbar from "../components/Appbar";
import { Box, Typography } from "@mui/material";
import AuthContext from "../hooks/AuthContext";

const Dashboard = () => {
  return (
    <div>
      <Box sx={{ paddingBottom: "6rem" }}>
        <Appbar />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: "2rem",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#01579B",
            fontWeight: "900",
            position: "absolute",
            textAlign: "center",
          }}
        >
          2023 CAMPUS ELECTION
        </Typography>
      </Box>
      <Box
        sx={{
          display: { xs: "block", sm: "flex" },
          justifyContent: "center",
          alignItems: "center",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              textAlign: "center",
              color: "#212121",
              paddingTop: "5rem",
            }}
          >
            Why do we Vote
          </Typography>
          <Typography
            variant="body2"
            sx={{
              pt: 2,
              pl: 2,
              lineHeight: 2,
            }}
          >
            Voting is essential in democratic societies for several reasons. It
            allows citizens to choose representatives, participate in
            decision-making, hold officials accountable, influence policies,
            drive social change, and fulfill their civic duty. It empowers
            individuals to have a voice in shaping their community and ensures
            that their interests are represented.
          </Typography>
        </Box>
        <img src={pagepic} alt="vote" style={{ width: "50%" }} />
      </Box>
    </div>
  );
};

export default Dashboard;
