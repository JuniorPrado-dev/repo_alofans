import { Provider } from "react-redux";
import Routers from "./routers/Routers";
import { store } from "./redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;
function App() {
  return (
    <GoogleOAuthProvider
      clientId={clientId}
    >
      <Provider store={store}>
        <Routers />
      </Provider>
    </GoogleOAuthProvider>
  );
}

export default App;
