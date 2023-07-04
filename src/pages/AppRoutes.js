import React from "react";
import Signin from "./Signin";
import Dashboard from "./Dashboard";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "../hooks/RequireAuth";
import Election from "./Election";
import Result from "./Result";
import Poll from "./Poll";
import AddCandidate from "./AddCandidate";

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
            <Result />
          </RequireAuth>
        }
      />
      <Route
        path="/home/results/votes/:id"
        element={
          <RequireAuth>
            <Poll />
          </RequireAuth>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
