import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Home from "./pages/Home"
import Success from "./pages/Success"
import Failed from "./pages/Failed"
import Refund  from "./pages/Refund"
import RefundQuery from "./pages/RefundQuery"

const App = () => {
  return (
    <BrowserRouter>
    <Toaster />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/success/:tranId" element={<Success />} />
      <Route path="/failed" element={<Failed />} />
      <Route path="/cancel" element={<Refund />} />
      <Route path="/refund-query" element={<RefundQuery />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App  