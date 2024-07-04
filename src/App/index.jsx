import { BrowserRouter as Router , Routes,Route } from "react-router-dom"
import AdminLayout from "../Pages/AdminLayout"


function App() {
 

  return (
    <Router>
      <Routes>
        <Route path="*" element={<AdminLayout />} />
        <Route path="/register" element={<h2>HOLA MUNDO</h2>} />
      </Routes>
    </Router>
  )
}

export default App
