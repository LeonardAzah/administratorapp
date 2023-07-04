import React, { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import { Typography, Box, Snackbar, Alert } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import axiosInstance from "../api/AxiosInstance";
import Spinner from "../components/Spinner";
import CandidateCard from "../components/CandidateCard";
import NotPresentAdd from "../components/NotPresentAdd";
import CandidateModal from "../components/candidateModal";
import Modal from "../components/Modal";

const AddCandidate = () => {
  const { id } = useParams();
  const [openModal, setOpenModal] = React.useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const [response, errorMessage, loading, axiosFetch] = useAxios();

  const CANDIDATES_URL = `/poll/candidates/${id}`;
  const DELETE_CANDIDATE_URL = `/candidate/${selectedStudent}`;

  useEffect(() => {
    getData();
  }, []);

  const handleDeletClick = (candidate) => {
    setSelectedStudent(candidate.id);
    setOpenDeleteModal(true);
  };

  const handleSubmit = async () => {
    const success = await axiosFetch({
      axiosInstance: axiosInstance,
      method: "delete",
      url: DELETE_CANDIDATE_URL,
    });
    if (success) {
      getData();
      setShowSuccessAlert(true);
      setSelectedStudent(null);
      setOpenDeleteModal(false);
    } else {
      setShowErrorAlert(true);
    }
  };
  const handleModalClose = () => {
    setOpenModal(false);
    getData();
  };
  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleDeletClickClose = () => {
    setSelectedStudent(null);
    setOpenDeleteModal(false);
  };

  const getData = async () => {
    await axiosFetch({
      axiosInstance: axiosInstance,
      method: "get",
      url: CANDIDATES_URL,
    });

    return axiosFetch;
  };

  const candidates = response;
  console.log(candidates.message);

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowSuccessAlert(false);
    setShowErrorAlert(false);
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
            <Snackbar
              open={showSuccessAlert}
              autoHideDuration={6000}
              onClose={handleAlertClose}
            >
              <Alert
                onClose={handleAlertClose}
                severity="success"
                variant="filled"
                sx={{ width: "100%" }}
              >
                Candidate deleted successfully
              </Alert>
            </Snackbar>

            <Snackbar
              open={showErrorAlert}
              autoHideDuration={3000}
              onClose={handleAlertClose}
            >
              <Alert
                severity="error"
                variant="filled"
                onClose={handleAlertClose}
              >
                Student not found
              </Alert>
            </Snackbar>

            {loading && loading ? (
              <Spinner text="Fetching elections..." />
            ) : (
              candidates.map((candidate) => (
                <>
                  <CandidateCard
                    key={candidate.id}
                    name={candidate.name}
                    bio={candidate.bio}
                    handleDeletClick={() => handleDeletClick(candidate)}
                    // handleEditCLick={}
                  />
                  <Modal
                    text={`This action will delete ${candidate.name} from list of candidates,  Are you sure you want to proceed?`}
                    open={openDeleteModal}
                    handleClose={handleDeletClickClose}
                    handleSubmit={handleSubmit}
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
