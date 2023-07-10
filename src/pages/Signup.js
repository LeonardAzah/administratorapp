import React, { useState } from "react";
import { Box, Grid, Typography, Snackbar, Alert } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";

import RadioButton from "../components/RadioButton";
import DateInput from "../components/DateInput";
import InputText from "../components/InputText";
import { usePasswordToggle } from "../components/InputText";
import sideimage from "../assets/sideimage.PNG";
import Buttons from "../components/Buttons";
import Appbar from "../components/Appbar";
import useAxios from "../hooks/useAxios";
import axiosInstance from "../api/AxiosInstance";

const gridStyle = {
  padding: "1rem",
};

export const btnStyle = {
  fontSize: "0.9375rem",
};

const initialValues = {
  username: "",
  email: "",
  matricule: "",
  sex: "",
  dateOfBirth: "",
  password: "",
};

const validationSchema = yup.object().shape({
  username: yup.string(),
  email: yup.string().email(),
  matricule: yup.string(),
  sex: yup.string(),
  dateOfBirth: yup.date(),
  password: yup.string(),
});

const Signup = () => {
  const [response, errorMessage, loading, axiosFetch] = useAxios();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const userInfo = window.localStorage.getItem("user");
  const user = JSON.parse(userInfo);
  const facultyId = user.faculty;
  const departmentId = user.department;

  const [PasswordInputType, ToggleIcon] = usePasswordToggle();
  const CREATE_CANDIDATE_URL = `/signup/faculty/${facultyId}/department/${departmentId}`;

  const onSubmit = async (values, props) => {
    console.log(values);
    const success = await axiosFetch({
      axiosInstance: axiosInstance,
      method: "post",
      url: CREATE_CANDIDATE_URL,
      requestConfig: {
        ...values,
      },
    });
    if (success) {
      setShowSuccessAlert(true);
      props.resetForm();
    }

    return axiosFetch;
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowSuccessAlert(false);
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={gridStyle}
    >
      <Box sx={{ paddingBottom: "6rem" }}>
        <Appbar />
      </Box>
      <Grid
        item
        display="contents"
        alignContent="center"
        sx={{ paddingBottom: "1.5rem" }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#01579B",
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          Register Students
        </Typography>
      </Grid>
      <Grid sx={{ display: "flex", alignItems: "center" }} md={6} Spacing={2}>
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
            Student registered successfully
          </Alert>
        </Snackbar>
        <Box
          sx={{
            display: {
              xs: "none",
              sm: "flex",
            },
            paddingRight: "1rem",
          }}
        >
          <img
            src={sideimage}
            alt="vote"
            style={
              {
                // alignSelf: "stretch",
                // objectFit: "cover",
              }
            }
          />
        </Box>
        <Grid item>
          <Formik
            onSubmit={onSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            {(props) => (
              <Form>
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
                  label="User Name"
                  name="username"
                  type="string"
                  fullWidth
                  required
                  onChange={props.handleChange}
                  value={props.values.username}
                />

                <Field
                  as={InputText}
                  label="Email"
                  name="email"
                  type="email"
                  fullWidth
                  required
                  onChange={props.handleChange}
                  value={props.values.email}
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
                <Field
                  as={RadioButton}
                  name="sex"
                  type="radio"
                  required
                  onChange={props.handleChange}
                  value={props.values.sex}
                />
                <Field
                  as={DateInput}
                  onChange={(value) =>
                    props.setFieldValue("dateOfBirth", value)
                  }
                  value={props.values.dateOfBirth}
                  required
                  fullWidth
                />
                <Field
                  as={InputText}
                  label="Password"
                  name="password"
                  type={PasswordInputType}
                  fullWidth
                  required
                  iconEnd={ToggleIcon}
                  onChange={props.handleChange}
                  value={props.values.password}
                />
                <Field
                  as={Buttons}
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={props.isSubmitting}
                  sx={btnStyle}
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
                      "Register Student"
                    )
                  }
                  fullWidth
                />
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Signup;
