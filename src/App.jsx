import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Detail from "./Detail";
import Login from "./Login";
import Signup from "./Signup";
import CreatePage from "./CreatePage";
import UserProvider from "./contexts/UserProvider";
import Layout from "./Layout";
import UpdatePage from "./UpdatePage";
import GlobalStyle from "./GlobalStyles";

function App() {
  return (
    <UserProvider>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/feeds/:id" element={<Detail />} />
            <Route path="/feeds/create" element={<CreatePage />} />
            <Route path="/feeds/update/:id" element={<UpdatePage />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
