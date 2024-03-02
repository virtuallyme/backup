import Profile from "./pages/Profile.js";
import { Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer.js";
import NotFound from "./pages/NotFound.js";
function App() {
  return (
    <div className="h-screen flex flex-col justify-between">
      <div className="flex-grow">
        <Routes>
          {/* profile with id*/}
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer className="" />
    </div>
  );
}

export default App;
