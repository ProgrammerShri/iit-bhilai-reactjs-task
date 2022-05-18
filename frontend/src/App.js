import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { BookAppointmentRoute, HomeRoute } from "./routes/routes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeRoute />} />
          <Route path="/book-appointment" element={<BookAppointmentRoute />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
