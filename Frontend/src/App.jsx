import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LeadsPage from "./pages/LeadsPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LeadsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
