import React, { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import { Typography, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import axiosInstance from "../api/AxiosInstance";
import Spinner from "../components/Spinner";
import CandidateCard from "../components/CandidateCard";
import NotPresentAdd from "../components/NotPresentAdd";
import CandidateModal from "../components/candidateModal";

const AddCandidate = () => {
  const { id } = useParams();

  const [toSuccess, setToSuccess] = useState(false);
  const [openModal, setOpenModal] = React.useState(false);

  const navigate = useNavigate();

  const [response, errorMessage, loading, axiosFetch] = useAxios();

  const CANDIDATES_URL = `/poll/candidates/${id}`;

  const getData = async () => {
    await axiosFetch({
      axiosInstance: axiosInstance,
      method: "get",
      url: CANDIDATES_URL,
    });

    return axiosFetch;
  };

  useEffect(() => {
    getData();
  }, []);
  const candidates = response;
  console.log(candidates);
  const handleModalClose = () => {
    setOpenModal(false);
    getData();
  };
  const handleModalOpen = () => {
    setOpenModal(true);
  };

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
            Election Candidate
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              padding: "0.5rem",
              display: "flex",
              gap: 2.5,
              flexWrap: "wrap",
              justifyContent: "start",
            }}
          >
            <NotPresentAdd onClick={handleModalOpen} />
            <CandidateModal open={openModal} handleClose={handleModalClose} />

            {loading && loading ? (
              <Spinner text="Fetching elections..." />
            ) : (
              candidates.map((candidate) => (
                <>
                  <CandidateCard
                    key={candidate.id}
                    name={candidate.name}
                    bio={candidate.bio}
                  />
                </>
              ))
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AddCandidate;
