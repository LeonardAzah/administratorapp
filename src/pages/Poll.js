import React, { useEffect, useContext } from "react";

import { Typography, Box } from "@mui/material";

import useAxios from "../hooks/useAxios";
import axiosInstance from "../api/AxiosInstance";
import Spinner from "../components/Spinner";
import Appbar from "../components/Appbar";
import NotPresent from "../components/NotPresent";
import BasicCard from "../components/BasicCard";

const Poll = () => {
  const [response, errorMessage, loading, axiosFetch] = useAxios();

  const userInfo = window.localStorage.getItem("user");
  const user = JSON.parse(userInfo);
  const facultyId = user.faculty;
  const departmentId = user.department;
  const ELECTION_URL = `/poll/faculty/${facultyId}/department/${departmentId}`;

  const getData = async () => {
    await axiosFetch({
      axiosInstance: axiosInstance,
      method: "get",
      url: ELECTION_URL,
    });

    return axiosFetch;
  };

  useEffect(() => {
    getData();
  }, []);

  const elections = response.facultyPolls;
  console.log(elections);

  const departmentalElections = response.departmentpolls;

  return (
    <Box>
      <Box sx={{ paddingBottom: "8rem" }}>
        <Appbar />
      </Box>
      <Box>
        <div
          style={{
            borderRadius: "25px",
            background: "rgba(5, 0, 255, 0.2)",
            padding: "0.5rem",
          }}
        >
          <Typography
            sx={{
              color: " #0500FF",
              textAlign: "center",
              fontWeight: "400",
              fontSize: "18px",
            }}
          >
            Faculty Elections
          </Typography>
        </div>
        <Box sx={{ padding: "0.5rem", display: "flex", gap: 2.5 }}>
          {loading && <Spinner text="Fetching elections..." />}

          {elections && elections.length > 0 ? (
            <Box
              sx={{
                display: "flex",
                gap: 2.5,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {elections.map((election) => (
                <BasicCard
                  key={election.id}
                  id={election.id}
                  title={election.title}
                  isActive={election.isActive}
                  link={`/home/results/votes/${election.id}`}
                />
              ))}
            </Box>
          ) : (
            <NotPresent text="No Available Elections" />
          )}
        </Box>
      </Box>

      <Box>
        <div
          style={{
            borderRadius: "25px",
            background: "rgba(5, 0, 255, 0.2)",
            padding: "0.5rem",
          }}
        >
          <Typography
            sx={{
              color: " #0500FF",
              textAlign: "center",
              fontWeight: "400",
              fontSize: "18px",
            }}
          >
            Departmental Elections
          </Typography>
        </div>
        <Box sx={{ padding: "0.5rem", display: "flex", gap: 2.5 }}>
          {loading && <Spinner text="Fetching elections..." />}

          {elections && elections.length > 0 ? (
            <Box
              sx={{
                display: "flex",
                gap: 2.5,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {departmentalElections.map((election) => (
                <BasicCard
                  key={election.id}
                  id={election.id}
                  title={election.title}
                  isActive={election.isActive}
                  link={`/home/results/votes/${election.id}`}
                />
              ))}
            </Box>
          ) : (
            <NotPresent text="No Available Elections" />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Poll;
