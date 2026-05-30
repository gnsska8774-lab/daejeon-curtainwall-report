import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import CreateReport from './pages/CreateReport'
import Reports from './pages/Reports'
import PdfExport from './pages/PdfExport'
import Settings from './pages/Settings'

export default function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create" element={<CreateReport />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/pdf" element={<PdfExport />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}
