import { BrowserRouter } from "react-router-dom";
import _ from "lodash";

import { AppRouter } from "./routes/AppRouter";

function App() {
  return (
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
  );
}

export default App;
