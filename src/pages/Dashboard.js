import React, { useContext, useState } from "react";

import Appbar from "../components/Appbar";
import { Box, Button, Typography } from "@mui/material";
import AuthContext from "../hooks/AuthContext";
import axiosInstance from "../api/AxiosInstance";

const Dashboard = () => {
  const { userInfo } = useContext(AuthContext);
  const { open, setOpen } = useState(true);

  // const refreshToken = async (error) => {
  //   return Promise.reject(error.response.data);

  //   // return await axiosInstance.get("/refresh");
  // };

  // console.log(refreshToken());

  return (
    <div>
      <Box sx={{ paddingBottom: "8rem" }}>
        <Appbar />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography
          variant="h4"
          sx={{
            color: "#01579B",
            fontWeight: "700",
            position: "absolute",
            textAlign: "center",
          }}
        >
          2023 CAMPUS ELECTION
        </Typography>
      </Box>

      {/* <Box>
        <Button onClick={refreshToken()}>Refresh</Button>
      </Box> */}
    </div>
  );
};

export default Dashboard;
