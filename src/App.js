import './App.css';
import * as React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import AuthContextWrapper from "../src/context/AuthContext"
import MainRouter from "./MainRouter"
require("dotenv").config()


function App() {
  return (
    <React.Suspense fallback={<div>Loading... </div>}>
    <Router>
        <AuthContextWrapper>
          <MainRouter />
        </AuthContextWrapper>
      </Router>
    </React.Suspense>
  );
}

export default App;
