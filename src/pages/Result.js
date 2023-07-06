import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { Typography, Box } from "@mui/material";

import Appbar from "../components/Appbar";
import ResultCard from "../components/ResultCard";
import Spinner from "../components/Spinner";
import useAxios from "../hooks/useAxios";
import axiosInstance from "../api/AxiosInstance";
import NotPresent from "../components/NotPresent";

const Result = () => {
  const { id } = useParams();

  const [response, errorMessage, loading, axiosFetch] = useAxios();
  const RESULT_URL = `/poll/votes/${id}`;

  const getData = async () => {
    await axiosFetch({
      axiosInstance: axiosInstance,
      method: "get",
      url: RESULT_URL,
    });

    return axiosFetch;
  };

  useEffect(() => {
    getData();
  }, []);

  const candidates = response;
  console.log(candidates);

  return (
    <Box>
      <Box sx={{ paddingBottom: "8rem" }}>
        <Appbar />
      </Box>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1rem",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "#01579B",
              fontWeight: "700",
              textAlign: "center",
            }}
          >
            Election Results
          </Typography>
        </Box>
        <Box sx={{ padding: "0.5rem", display: "flex", gap: 2.5 }}>
          {loading && <Spinner text="Fetching election results..." />}

          {candidates && candidates.length > 0 ? (
            <Box
              sx={{
                display: "flex",
                gap: 2.5,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {candidates.map((candidate) => (
                <>
                  <ResultCard
                    key={candidate.id}
                    name={candidate.name}
                    voteCount={candidate.voteCount}
                  />
                </>
              ))}
            </Box>
          ) : (
            <NotPresent text="No Available Candidates" />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Result;
