import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Dashboard } from "./Dashboard";

import { AuthProvider } from '../contexts/Auth'

function App() {
  return (
    <div className="App">
      <Router>
          <AuthProvider>
                <Routes>
                  <Route path='*' element={<Dashboard/>} />
                </Routes>
          </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
