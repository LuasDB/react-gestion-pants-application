import { BrowserRouter as Router , Routes,Route } from "react-router-dom"
import AdminLayout from "../Pages/AdminLayout"


function App() {
 

  return (
    <Router>
      <Routes>
        <Route path="*" element={<AdminLayout />} />
      </Routes>
    </Router>
  )
}

export default App
