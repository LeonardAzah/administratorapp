import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import CircularProgress from "@mui/material/CircularProgress";

import Buttons from "./Buttons";
import InputText from "./InputText";
import { Box, Typography, Snackbar, Alert } from "@mui/material";
import dayjs from "dayjs";
import DateTimeInput from "./DateTimeInput";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import useAxios from "../hooks/useAxios";
import axiosInstance from "../api/AxiosInstance";

const validationSchema = yup.object().shape({
  titles: yup.string(),
  startDate: yup.date(),
  endDate: yup.date(),
});

function UpdateModal(props) {
  const { id } = useParams();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const [response, errorMessage, loading, axiosFetch] = useAxios();
  const { open, handleClose } = props;
  const today = dayjs();
  const tomorrow = dayjs().add(1, "day");

  const UPDATE_ELECTION_URL = `/poll/${id}`;
  const GET_ELECTION = `/poll/${id}`;

  const getData = async () => {
    await axiosFetch({
      axiosInstance: axiosInstance,
      method: "get",
      url: GET_ELECTION,
    });

    return axiosFetch;
  };

  useEffect(() => {
    getData();
  }, []);
  const election = response;

  const onSubmit = async (values, props) => {
    const success = await axiosFetch({
      axiosInstance: axiosInstance,
      method: "patch",
      url: UPDATE_ELECTION_URL,
      requestConfig: {
        ...values,
      },
    });
    if (success) {
      //   props.resetForm();
      setShowSuccessAlert(true);

      //   handleClose();
    }
  };
  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowSuccessAlert(false);
  };

  const initialValues = {
    title: election && election.title,
    startDate: dayjs(),
    endDate: dayjs(),
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
            Update Election
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
          Election updated successfully
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
                label="Title"
                name="title"
                type="string"
                fullWidth
                required
                onChange={props.handleChange}
                value={props.values.title}
              />
              <Field
                as={DateTimeInput}
                label="Start Date"
                name="startDate"
                defaultValue={today}
                disablePast
                views={["year", "month", "day", "hours", "minutes"]}
                value={props.values.startDate}
                onChange={(value) => props.setFieldValue("startDate", value)}
                fullWidth
              />
              <Field
                as={DateTimeInput}
                label="End Date"
                name="endDate"
                defaultValue={tomorrow}
                disablePast
                views={["year", "month", "day", "hours", "minutes"]}
                value={props.values.endDate}
                onChange={(value) => props.setFieldValue("endDate", value)}
                fullWidth
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
                      style={{ width: "20px", height: "20px", size: "0.5rem" }}
                    />
                  ) : (
                    "Update"
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

export default UpdateModal;
