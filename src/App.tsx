import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { PartnersPage } from './pages/PartnersPage'
import { FloatingActions } from './components/FloatingActions'
import './styles/landing.css'
import './styles/partners.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PartnersPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <FloatingActions />
    </BrowserRouter>
  )
}
