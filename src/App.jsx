import Home from "./component/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./cutsom.scss";

function App() {
  return (
    <>
      <BrowserRouter basename={window.location.pathname || ""}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
