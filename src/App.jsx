// File: src/App.jsx
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import GlobalStyle from "./globalStyles";
import Home from "./pages/Home";
import Test from "./pages/Test";
import { Practice, Recommendation, Rtc } from "./components";
import Onboarding from "./pages/Onboarding";
import Outcome from "./pages/Outcome";
import Product from "./pages/Product";
import Control from "./pages/Control";
import Item from "./pages/Item";
import Preference from "./pages/Preference";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { useSelector } from "react-redux";
import Pay from "./pages/pay";
import Quota from "./pages/Quota";
import Upload from "./pages/Upload";
import Appointment from "./pages/Appointment";
import PostHog from "./pages/Posthog";
import Reservation from "./pages/Reservation";
import Support from "./pages/Support";
import Rate from "./pages/pay";
import Newsletter from "./pages/Newsletter";
import Speciality from "./pages/Speciality";
import Knowledge from "./pages/Knowledge";
import PatientLogin from "./pages/PatinetLogin";
import PatientRegister from "./pages/PatientRegister";
import PatientResetPassword from "./pages/PatientResetPassword";
import PatientDeleteAccount from "./pages/PatientDelete";
import HowItWorks from "./pages/HowItWorks";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <>
      <GlobalStyle />
      <div style={{ width: "100%", overflow: "hidden" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rtc" element={<Rtc />} />
          <Route path="/rate/:slug/:quota" element={<Rate />} />
          <Route path="/desktop" element={<PostHog />} />
          <Route path="/reservation/:major" element={<Reservation />} />
          <Route path="/test" element={<Test />} />
          <Route path="/support" element={<Support />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/signup"
            element={user ? <Navigate to="/control" /> : <SignUp />}
          />
          <Route path="/item" element={<Item />} />
          <Route path="/newsletter" element={<Newsletter />} />
          <Route path="/speciality" element={<Speciality />} />
          <Route path="/preference" element={<Preference />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/outcome" element={<Outcome />} />

          <Route path="/recommendation" element={<Recommendation />} />
          <Route path="/work" element={<HowItWorks />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/pay" element={<Pay />} />

          <Route path="/:slug" element={<Appointment />} />
          <Route path="/quota/:id" element={<Quota />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/knowledge/:id" element={<Knowledge />} />
          <Route
            path="/control"
            element={user ? <Control /> : <Navigate to="/signup" replace />}
          />
          <Route path="/patientlogin" element={<PatientLogin />} />
          <Route path="/patientregister" element={<PatientRegister />} />
          <Route
            path="/patient/deleteaccount"
            element={<PatientDeleteAccount />}
          />
          <Route
            path="/patient/resetpassword"
            element={<PatientResetPassword />}
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
