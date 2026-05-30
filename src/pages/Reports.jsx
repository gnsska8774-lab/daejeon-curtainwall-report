import React, { useEffect, useState } from 'react'
import { getReports, deleteReport } from '../api'

export default function Reports() {
  const [reports, setReports] = useState([])

  useEffect(() => {
    load()
  }, [])

  async function load() {
    try {
      const data = await getReports()
      setReports(data)
    } catch (err) {
      console.error(err)
      alert('불러오는 중 오류')
    }
  }

  async function handleDelete(id) {
    if (!confirm('삭제하시겠습니까?')) return
    await deleteReport(id)
    load()
  }

  return (
    <div className="page">
      <h1>작업일보 조회</h1>
      <div className="report-grid">
        {reports.map(r => (
          <article key={r.id} className="report-card">
            <header>
              <strong>{r.date}</strong>
              <h2>{r.title || '제목 없음'}</h2>
            </header>
            <div className="report-meta">
              <div>계획: {r.planned_work || '-'}</div>
              <div>실적: {r.actual_work || '-'}</div>
              <div>누계: {r.cumulative_performance || '-'}</div>
            </div>
            <p>{r.summary}</p>
            <div className="report-checklist">
              <strong>품질관리:</strong> {r.quality_checks || '없음'}
            </div>
            <div className="report-checklist">
              <strong>안전관리:</strong> {r.safety_checks || '없음'}
            </div>
            <div className="report-plan">
              <strong>익일 계획:</strong> {r.tomorrow_plan || '없음'}
            </div>
            <div className="report-issues">
              <strong>주요 이슈:</strong> {r.issues || '없음'}
            </div>
            <footer>
              <button onClick={()=>navigator.clipboard.writeText(JSON.stringify(r))}>복사</button>
              <button onClick={()=>handleDelete(r.id)}>삭제</button>
            </footer>
          </article>
        ))}
      </div>
    </div>
  )
}
