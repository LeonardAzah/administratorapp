import React, { useEffect, useContext } from "react";

import { Typography, Box, Button, Menu, MenuItem } from "@mui/material";

import BasicCard from "../components/BasicCard";
import useAxios from "../hooks/useAxios";
import axiosInstance from "../api/AxiosInstance";
import AuthContext from "../hooks/AuthContext";
import Spinner from "../components/Spinner";
import Appbar from "../components/Appbar";
import NotPresent from "../components/NotPresent";
import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";
import { Link } from "react-router-dom";
import ElectionModal from "../components/ELectionModal";
import ElectionModalDepart from "../components/ELectionModalDepart";

const userInfo = window.localStorage.getItem("user");
const user = JSON.parse(userInfo);
const facultyId = user.faculty;
const departmentId = user.department;
const ELECTION_URL = `/poll/faculty/${facultyId}/department/${departmentId}`;

const Election = () => {
  const [response, errorMessage, loading, axiosFetch] = useAxios();
  const [openModal, setOpenModal] = React.useState(false);
  const [openModalDept, setOpenModalDept] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };
  const handleModalDeptOpen = () => {
    setOpenModalDept(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setOpenModalDept(false);
  };

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

  const elections = response.polls;
  const departmentalElections = response.departmentpolls;
  return (
    <Box>
      <Box sx={{ paddingBottom: "8rem" }}>
        <Appbar />
      </Box>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "1rem",
          }}
        >
          <Button
            id="basic-button"
            variant="contained"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            endIcon={<KeyboardArrowDownSharpIcon />}
            sx={{ borderRadius: "20px", textTransform: "none" }}
          >
            Create Election
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleModalOpen}>Faculty</MenuItem>
            <MenuItem onClick={handleModalDeptOpen}>Departmental</MenuItem>
          </Menu>
          <Box>
            <ElectionModal open={openModal} handleClose={handleModalClose} />
            <ElectionModalDepart
              open={openModalDept}
              handleClose={handleModalClose}
            />
          </Box>
        </Box>
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
            <Box sx={{ display: "flex", gap: 2.5 }}>
              {elections.map((election) => (
                <BasicCard
                  key={election.id}
                  id={election.id}
                  title={election.title}
                  link={`/home/poll/candidates/${election.id}`}
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
            <Box sx={{ display: "flex", gap: 2.5 }}>
              {departmentalElections.map((election) => (
                <BasicCard
                  key={election.id}
                  id={election.id}
                  title={election.title}
                  link={`/home/poll/candidates/${election.id}`}
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

export default Election;
