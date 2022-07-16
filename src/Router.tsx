import { BrowserRouter, Route, Routes } from "react-router-dom";
import { History } from "./pages/History";
import { Home } from "./pages/Home";

export const Router: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/history" element={<History />} />
    </Routes>
  </BrowserRouter>
);
