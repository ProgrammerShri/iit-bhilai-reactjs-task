import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { HomeRoute } from "./routes/routes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeRoute />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
