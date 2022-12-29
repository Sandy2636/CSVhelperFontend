import { Route, Routes } from "react-router-dom";
import "./App.css";
import First from "./Screens/First";
import Second from "./Screens/Second";
import Selection from "./Screens/Selection";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Selection />} />
        <Route path="/first" element={<First />} />
        <Route path="/second" element={<Second />} />
      </Routes>
    </div>
  );
}

export default App;
