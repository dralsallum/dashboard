// File: src/App.jsx
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import GlobalStyle from "./globalStyles";
import Home from "./pages/Home";
import Test from "./pages/Test";
import { Practice, Recommendation } from "./components";
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

const App = () => {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <>
      <GlobalStyle />
      <div style={{ width: "100%", overflow: "hidden" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rate" element={<Rate />} />
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
          <Route path="/preference" element={<Preference />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/outcome" element={<Outcome />} />

          <Route path="/recommendation" element={<Recommendation />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/pay" element={<Pay />} />

          <Route path="/:slug" element={<Appointment />} />
          <Route path="/quota/:id" element={<Quota />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/practice" element={<Practice />} />
          <Route
            path="/control"
            element={user ? <Control /> : <Navigate to="/signup" replace />}
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
