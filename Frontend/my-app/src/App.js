import { Route, Routes} from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./store/auth-context";
import Layout from "./components/layout";
import "./App.css";
import Login from "./pages/login";
import ForgetPassword from "./pages/forgetPassword";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/resetPassword";
import Books from "./pages/books";
import AddBook from "./pages/addbook";
import AddAuthor from "./pages/addauthor";
import AddLibrary from "./pages/addlibrary";
import Authors from "./pages/authors"
import Libraries from "./pages/libraries";
import EditBook from "./pages/editbook";
import EditAuthor from "./pages/editauthor";
import EditLibrary from "./pages/editlibrary";
import Search from "./pages/search";
function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Routes>
        {!authCtx.isLoggedIn ? (
          <>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/resetpassword/:token" element={<ResetPassword />} />
          </>
        ) : (<>
          <Route path="/books" element={<Books />} />
          <Route path="/addbook" element={<AddBook />} />
          <Route path="/addauthor" element={<AddAuthor />} />
          <Route path="/addlibrary" element={<AddLibrary />} />
          <Route path="/author" element={<Authors />} />
          <Route path="/library" element={<Libraries />} />
          <Route path="/editbooks/:bookId" element={<EditBook />} />
          <Route path="editauthor/:authorId" element={<EditAuthor />} />
          <Route path="editlibrary/:libraryId" element={<EditLibrary/>} />
          <Route path="/search" element={<Search/>} />
          </>
        )}        
      </Routes>
      </Layout>
  );
}
export default App;