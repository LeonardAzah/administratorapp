import React from "react";
import Signin from "./Signin";
import Dashboard from "./Dashboard";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "../hooks/RequireAuth";
import Election from "./Election";
import AddCandidate from "./AddCandidate";
import Result from "./Result";
import Poll from "./Poll";
import Signup from "./Signup";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Signin />} />

      <Route
        path="/home"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />
      <Route
        path="/home/poll"
        element={
          <RequireAuth>
            <Election />
          </RequireAuth>
        }
      />
      <Route
        path="/home/poll/candidates/:id"
        element={
          <RequireAuth>
            <AddCandidate />
          </RequireAuth>
        }
      />

      <Route
        path="/home/results"
        element={
          <RequireAuth>
            <Poll />
          </RequireAuth>
        }
      />
      <Route
        path="/home/results/votes/:id"
        element={
          <RequireAuth>
            <Result />
          </RequireAuth>
        }
      />
      <Route
        path="/home/register"
        element={
          <RequireAuth>
            <Signup />
          </RequireAuth>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
