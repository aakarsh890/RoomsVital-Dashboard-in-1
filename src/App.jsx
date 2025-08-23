import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoomList from "./component/RoomList";
import RoomDetails from "./component/RoomDetails";
import Home from "./Home/Home";
import DetailsHome from "./Home/DetailsHome"


export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
              <Home />
          }
        />
        <Route path="/room/:roomNo" element={<DetailsHome />} />
      </Routes>
    </Router>
  );
}
