import React, { useState, useEffect } from "react";
import useAxios from "../hooks/useAxios";
import { Box, Typography } from "@mui/material";
import axiosInstance from "../api/AxiosInstance";
import BlockIcon from "@mui/icons-material/Block";
import Spinner from "./Spinner";

const CountdownTimer = ({ id }) => {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  //   const [response, errorMessage, loading, axiosFetch] = useAxios();

  const GET_ELECTION = `/poll/${id}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(GET_ELECTION);
        const data = response.data;
        setStartTime(new Date(data.startDate));
        setEndTime(new Date(data.endDate));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (startTime && endTime) {
      const currentTime = new Date().getTime();
      if (currentTime >= startTime && currentTime <= endTime) {
        setIsActive(true);
        const intervalId = setInterval(() => {
          const remainingTime = endTime - new Date().getTime();

          if (remainingTime <= 0) {
            clearInterval(intervalId);
            setCountdown("Countdown ended");
          } else {
            const hours = Math.floor(
              (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor(
              (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
            );
            const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

            setCountdown(
              `${hours.toString().padStart(2, "0")}:${minutes
                .toString()
                .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
            );
          }
        }, 1000);
        return () => clearInterval(intervalId);
      } else {
        setIsActive(false);
        setCountdown("Election not active");
      }
    }
  }, [startTime, endTime]);

  useEffect(() => {
    localStorage.setItem("isActive", JSON.stringify(isActive));
  }, [isActive]);

  useEffect(() => {
    const storedIsActive = JSON.parse(localStorage.getItem("isActive"));
    if (storedIsActive !== null) {
      setIsActive(storedIsActive);
    }
  }, []);

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", paddingBottom: "1rem" }}
    >
      {isActive !== null ? (
        isActive ? (
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#b71c1c" }}>
            Election closes in {countdown}
          </Typography>
        ) : (
          <Typography
            variant="h6"
            sx={{ display: "flex", gap: 1, color: "#b71c1c", fontWeight: 700 }}
          >
            <BlockIcon fontSize="medium" />
            Election not active
          </Typography>
        )
      ) : null}
    </Box>
  );
};

export default CountdownTimer;
