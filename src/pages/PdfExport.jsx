import React, { useState } from 'react'
import * as XLSX from 'xlsx'
import { getReports } from '../api'

export default function PdfExport() {
  const [loading, setLoading] = useState(false)

  function handlePrint() {
    window.print()
  }

  async function handleExcel() {
    setLoading(true)
    try {
      const reports = await getReports()
      const sheetData = reports.map(r => ({
        날짜: r.date,
        제목: r.title,
        요약: r.summary,
        계획: r.planned_work,
        실적: r.actual_work,
        누계: r.cumulative_performance,
        품질관리: r.quality_checks,
        안전관리: r.safety_checks,
        강풍관리: r.wind_management,
        익일계획: r.tomorrow_plan,
        이슈: r.issues
      }))
      const worksheet = XLSX.utils.json_to_sheet(sheetData)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'DailyReports')
      XLSX.writeFile(workbook, 'daily_reports.xlsx')
    } catch (err) {
      console.error(err)
      alert('Excel 내보내기 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <h1>PDF / Excel 출력</h1>
      <p>작업일보를 PDF로 인쇄하거나 Excel 파일로 저장할 수 있습니다.</p>
      <div className="export-buttons">
        <button onClick={handlePrint}>인쇄/저장(PDF)</button>
        <button onClick={handleExcel} disabled={loading}>{loading ? '내보내는 중...' : 'Excel 저장'}</button>
      </div>
    </div>
  )
}
