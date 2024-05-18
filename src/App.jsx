import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes";
import useAuthCheck from "./hooks/useAuthCheck";

function App() {
  const authChecked = useAuthCheck();
  return authChecked ? <RouterProvider router={router} /> : <div></div>;
}

export default App;
