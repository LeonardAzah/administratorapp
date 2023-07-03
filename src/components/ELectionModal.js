import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Buttons from "./Buttons";
import InputText from "./InputText";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography } from "@mui/material";
import DateInput from "./DateInput";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import DateTimeInput from "./DateTimeInput";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import useAxios from "../hooks/useAxios";
import axiosInstance from "../api/AxiosInstance";

const userInfo = window.localStorage.getItem("user");
const user = JSON.parse(userInfo);
const Id = user.faculty;

const initialValues = {
  title: "",
  startDate: dayjs(),
  endDate: dayjs(),
};

const validationSchema = yup.object().shape({
  titles: yup.string().required(),
  startDate: yup.date().required(),
  endDate: yup.date().required(),
});

function ElectionModal(props) {
  const [response, errorMessage, loading, axiosFetch] = useAxios();
  const { open, handleClose } = props;
  const today = dayjs();
  const tomorrow = dayjs().add(1, "day");
  const navigate = useNavigate();

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
      navigate("/home/poll");
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
              <Field
                as={InputText}
                label="Title"
                name="title"
                onChange={props.handleChange}
                value={props.values.title}
                type="string"
                fullWidth
                required
              />
              <Field
                as={DateTimeInput}
                label="Strat Date"
                type="date"
                defaultValue={today}
                disablePast
                views={["year", "month", "day", "hours", "minutes"]}
                onChange={props.handleChange}
                value={props.values.startDate}
              />
              <Field
                as={DateTimeInput}
                label="End Date"
                type="date"
                defaultValue={tomorrow}
                disablePast
                views={["year", "month", "day", "hours", "minutes"]}
                onChange={props.handleChange}
                value={props.values.endDate}
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
