import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";

import Buttons from "./Buttons";
import InputText from "./InputText";
import { Typography, Snackbar, Alert } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import useAxios from "../hooks/useAxios";
import axiosInstance from "../api/AxiosInstance";

const validationSchema = yup.object().shape({
  name: yup.string(),
  matricule: yup.string(),
  bio: yup.string(),
});

function CandidateUpdateModal({ open, handleClose, candidate }) {
  const [response, errorMessage, loading, axiosFetch] = useAxios();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const UPDATE_CANDIDATE_URL = `/candidate/${candidate && candidate.id}`;

  const onSubmit = async (values, props) => {
    console.log(values);
    const success = await axiosFetch({
      axiosInstance: axiosInstance,
      method: "patch",
      url: UPDATE_CANDIDATE_URL,
      requestConfig: {
        ...values,
      },
    });
    if (success) {
      setShowSuccessAlert(true);
      props.resetForm();
      handleClose();
    }

    return axiosFetch;
  };

  const initialValues = {
    name: candidate && candidate.name,
    matricule: candidate && candidate.matricule,
    bio: candidate && candidate.bio,
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowSuccessAlert(false);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography
            component="h4"
            variant="h5"
            sx={{ textAlign: "center", fontWeight: "400", color: "#1a1f36" }}
          >
            Update Candidate In Election
          </Typography>
        </DialogContentText>
      </DialogContent>
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
          Candidate updated successfully
        </Alert>
      </Snackbar>
      <DialogActions sx={{ display: "block", justifyContent: "space-between" }}>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(props) => (
            <Form onSubmit={props.handleSubmit}>
              <Typography
                className={
                  errorMessage && errorMessage ? "errorMessage" : "offscreen"
                }
                aria-live="assertive"
                sx={{
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  marginBottom: "1rem",
                  color: "#ba000d",
                }}
              >
                {errorMessage}
              </Typography>
              <Field
                as={InputText}
                label="Name"
                name="name"
                type="string"
                fullWidth
                required
                onChange={props.handleChange}
                value={props.values.name}
              />
              <Field
                as={InputText}
                label="Matricule"
                name="matricule"
                type="string"
                fullWidth
                required
                onChange={props.handleChange}
                value={props.values.matricule}
              />

              <TextField
                label="Bio"
                name="bio"
                placeholder="Enter candidate's bio"
                multiline
                rows={4}
                onChange={props.handleChange}
                value={props.values.bio}
                fullWidth
                required
                sx={{ marginBottom: "1.1em" }}
              />

              <Field
                as={Buttons}
                type="submit"
                variant="contained"
                color="primary"
                disabled={props.isSubmitting}
                sx={{ fontSize: "0.9375rem" }}
                btnText={
                  props.isSubmitting ? (
                    <CircularProgress
                      style={{
                        width: "20px",
                        height: "20px",
                        size: "0.5rem",
                      }}
                    />
                  ) : (
                    "Add Candidate"
                  )
                }
                fullWidth
              />
            </Form>
          )}
        </Formik>
      </DialogActions>
    </Dialog>
  );
}

export default CandidateUpdateModal;
