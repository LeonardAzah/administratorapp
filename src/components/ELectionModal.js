import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import CircularProgress from "@mui/material/CircularProgress";

import Buttons from "./Buttons";
import InputText from "./InputText";
import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import DateTimeInput from "./DateTimeInput";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import useAxios from "../hooks/useAxios";
import axiosInstance from "../api/AxiosInstance";

const initialValues = {
  title: "",
  startDate: dayjs(),
  endDate: dayjs(),
};

const validationSchema = yup.object().shape({
  titles: yup.string(),
  startDate: yup.date(),
  endDate: yup.date(),
});

function ElectionModal(props) {
  const [response, errorMessage, loading, axiosFetch] = useAxios();
  const { open, handleClose } = props;
  const today = dayjs();
  const tomorrow = dayjs().add(1, "day");
  const navigate = useNavigate();

  const userInfo = window.localStorage.getItem("user");
  const user = JSON.parse(userInfo);
  const Id = user.faculty;

  const CREATE_ELECTION_URL = `/poll/${Id}`;
  const onSubmit = async (values, props) => {
    const success = await axiosFetch({
      axiosInstance: axiosInstance,
      method: "post",
      url: CREATE_ELECTION_URL,
      requestConfig: {
        ...values,
      },
    });
    if (success) {
      handleClose();
      props.resetForm();
    }
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
            Create Election
          </Typography>
        </DialogContentText>
      </DialogContent>
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
                    "Create"
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

export default ElectionModal;
