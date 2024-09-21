import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Blog from "./components/Blog";
import Services from "./components/Services";
import About from "./components/About";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Portfolio from "./components/Portfolio";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Service from "./components/Service";
import Predict from "./components/Predict";
import DisasterResourceApp from "./components/ResourceRequest";
import Plans from "./components/Plans";
import DisasterPage from "./components/DisasterPage";
import Layout from "./components/layout";
import FloodsReady from "./components/FloodsReady";
import Chatbot from "./components/Chatbot";

const App = () => {
  return (
    <Router>
      <div className="vh-100 vw-100 overflow-auto scrollbar-hide">
        <Navbar />
        <div className="mt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/social_media" element={<Service />} />
            <Route path="/services" element={<DisasterResourceApp />} />
            <Route
              path="/resources_requests"
              element={<DisasterResourceApp />}
            />
            <Route path="/plan/:name" element={<DisasterResourceApp />} />
            <Route path="/disaster" element={<DisasterPage />} />
            <Route path="/services/:serviceName" element={<Service />} />
            <Route path="/about" element={<About />} />
            <Route path="/plan" element={<Plans />} />
            <Route path="/predict" element={<Predict />} />
            <Route path="/safety-tips" element={<Layout />} />
            <Route path="/floods-ready" element={<FloodsReady />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
