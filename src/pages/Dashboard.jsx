import React, { useEffect, useState } from 'react'
import { getReports, getPhotos } from '../api'
import PhotoBoard from '../components/PhotoBoard'

export default function Dashboard() {
  const [reports, setReports] = useState([])
  const [photos, setPhotos] = useState([])

  useEffect(() => {
    getReports().then(setReports).catch(console.error)
    getPhotos().then(setPhotos).catch(console.error)
  }, [])

  const totalPlanned = reports.reduce((sum, r) => sum + Number(r.planned_work || 0), 0)
  const totalActual = reports.reduce((sum, r) => sum + Number(r.actual_work || 0), 0)
  const totalCount = reports.length

  return (
    <div className="page dashboard-page">
      <div className="page-heading">
        <h1>대시보드</h1>
        <p>로그인 없이 현장에서 바로 사용할 수 있는 실무형 작업일보 시스템입니다.</p>
      </div>
      <section className="summary-cards">
        <div className="card">
          <div className="card-label">등록된 작업일보</div>
          <div className="card-value">{totalCount} 건</div>
        </div>
        <div className="card">
          <div className="card-label">계획대비 실적</div>
          <div className="card-value">{totalPlanned} / {totalActual}</div>
        </div>
        <div className="card">
          <div className="card-label">누계실적</div>
          <div className="card-value">{reports.reduce((sum, r) => sum + Number(r.cumulative_performance || 0), 0)}</div>
        </div>
      </section>
      <section className="section-card recent-section">
        <div className="section-title">최근 작업일보</div>
        <ul className="reports-list">
          {reports.slice(0, 5).map((r) => (
            <li key={r.id} className="report-row">
              <div>
                <div className="report-date">{r.date}</div>
                <div className="report-title">{r.title || r.summary || '제목 없음'}</div>
              </div>
              <div className="report-meta-text">{r.tomorrow_plan || '익일 계획이 등록되지 않았습니다.'}</div>
            </li>
          ))}
        </ul>
      </section>
      <PhotoBoard photos={photos} />
    </div>
  )
}
