import React, { useState } from 'react'
import { createReport, uploadPhoto } from '../api'

export default function ReportForm({ initial = {}, onSaved }) {
  const [title, setTitle] = useState(initial.title || '')
  const [date, setDate] = useState(initial.date || new Date().toISOString().slice(0, 10))
  const [summary, setSummary] = useState(initial.summary || '')
  const [plannedWork, setPlannedWork] = useState(initial.planned_work || '')
  const [actualWork, setActualWork] = useState(initial.actual_work || '')
  const [cumulativePerformance, setCumulativePerformance] = useState(initial.cumulative_performance || '')

  const [constructionWorkers, setConstructionWorkers] = useState(initial.construction_workers || '')
  const [safetyWorkers, setSafetyWorkers] = useState(initial.safety_workers || '')
  const [equipmentWorkers, setEquipmentWorkers] = useState(initial.equipment_workers || '')
  const [electricWorkers, setElectricWorkers] = useState(initial.electric_workers || '')
  const [otherWorkers, setOtherWorkers] = useState(initial.other_workers || '')

  const [materialName, setMaterialName] = useState(initial.material_name || '')
  const [materialSpec, setMaterialSpec] = useState(initial.material_spec || '')
  const [materialQty, setMaterialQty] = useState(initial.material_qty || '')
  const [materialDate, setMaterialDate] = useState(initial.material_date || '')
  const [materialNote, setMaterialNote] = useState(initial.material_note || '')

  const [qualityChecks, setQualityChecks] = useState([])
  const [safetyChecks, setSafetyChecks] = useState([])
  const [windManagement, setWindManagement] = useState(initial.wind_management || '')
  const [tomorrowPlan, setTomorrowPlan] = useState(initial.tomorrow_plan || '')
  const [issues, setIssues] = useState(initial.issues || '')
  const [photo, setPhoto] = useState(null)
  const [saving, setSaving] = useState(false)

  const totalWorkers =
    Number(constructionWorkers || 0) +
    Number(safetyWorkers || 0) +
    Number(equipmentWorkers || 0) +
    Number(electricWorkers || 0) +
    Number(otherWorkers || 0)

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)

    try {
      let photoRecord = null

      if (photo) {
        photoRecord = await uploadPhoto(photo)
      }

      const rec = {
        title,
        date,
        summary,
        planned_work: plannedWork,
        actual_work: actualWork,
        cumulative_performance: cumulativePerformance,
        manpower: {
          construction_workers: constructionWorkers,
          safety_workers: safetyWorkers,
          equipment_workers: equipmentWorkers,
          electric_workers: electricWorkers,
          other_workers: otherWorkers,
          total_workers: totalWorkers,
        },
        material_plan: {
          material_name: materialName,
          material_spec: materialSpec,
          material_qty: materialQty,
          material_date: materialDate,
          material_note: materialNote,
        },
        quality_checks: qualityChecks.join(', '),
        safety_checks: safetyChecks.join(', '),
        wind_management: windManagement,
        tomorrow_plan: tomorrowPlan,
        issues,
        photo_id: photoRecord?.id,
      }

      const saved = await createReport(rec)

      setTitle('')
      setSummary('')
      setPlannedWork('')
      setActualWork('')
      setCumulativePerformance('')
      setConstructionWorkers('')
      setSafetyWorkers('')
      setEquipmentWorkers('')
      setElectricWorkers('')
      setOtherWorkers('')
      setMaterialName('')
      setMaterialSpec('')
      setMaterialQty('')
      setMaterialDate('')
      setMaterialNote('')
      setQualityChecks([])
      setSafetyChecks([])
      setWindManagement('')
      setTomorrowPlan('')
      setIssues('')
      setPhoto(null)

      if (onSaved) {
        onSaved(saved)
      }

      alert('저장되었습니다.')
    } catch (err) {
      console.error(err)
      alert('저장 중 오류가 발생했습니다.')
    } finally {
      setSaving(false)
    }
  }

  function toggleCheck(list, setList, value) {
    if (list.includes(value)) {
      setList(list.filter((item) => item !== value))
    } else {
      setList([...list, value])
    }
  }

  return (
    <form className="report-form card" onSubmit={handleSubmit}>
      <div className="section-card">
        <div className="section-title">기본 정보</div>
        <div className="form-grid form-grid-1">
          <label>
            날짜
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </label>

          <label>
            제목
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>

          <label className="full-width">
            요약
            <textarea value={summary} onChange={(e) => setSummary(e.target.value)} />
          </label>
        </div>
      </div>

      <div className="section-card">
        <div className="section-title">계획 및 실적</div>
        <div className="form-grid">
          <label>
            계획대비 실적
            <input value={plannedWork} onChange={(e) => setPlannedWork(e.target.value)} placeholder="계획" />
          </label>

          <label>
            실적
            <input value={actualWork} onChange={(e) => setActualWork(e.target.value)} placeholder="실적" />
          </label>

          <label>
            누계실적
            <input value={cumulativePerformance} onChange={(e) => setCumulativePerformance(e.target.value)} placeholder="누계" />
          </label>
        </div>
      </div>

      <div className="section-card">
        <div className="section-title">투입인원</div>
        <div className="form-grid">
          <label>
            공사팀
            <input type="number" min="0" value={constructionWorkers} onChange={(e) => setConstructionWorkers(e.target.value)} placeholder="명" />
          </label>

          <label>
            안전팀
            <input type="number" min="0" value={safetyWorkers} onChange={(e) => setSafetyWorkers(e.target.value)} placeholder="명" />
          </label>

          <label>
            설비팀
            <input type="number" min="0" value={equipmentWorkers} onChange={(e) => setEquipmentWorkers(e.target.value)} placeholder="명" />
          </label>

          <label>
            전기팀
            <input type="number" min="0" value={electricWorkers} onChange={(e) => setElectricWorkers(e.target.value)} placeholder="명" />
          </label>

          <label>
            기타
            <input type="number" min="0" value={otherWorkers} onChange={(e) => setOtherWorkers(e.target.value)} placeholder="명" />
          </label>

          <label>
            총 투입인원
            <input value={totalWorkers + '명'} readOnly />
          </label>
        </div>
      </div>

      <div className="section-card">
        <div className="section-title">자재반입 계획</div>
        <div className="form-grid">
          <label>
            자재명
            <input value={materialName} onChange={(e) => setMaterialName(e.target.value)} placeholder="예: 커튼월 유리" />
          </label>

          <label>
            규격
            <input value={materialSpec} onChange={(e) => setMaterialSpec(e.target.value)} placeholder="예: 24T 로이복층유리" />
          </label>

          <label>
            수량
            <input value={materialQty} onChange={(e) => setMaterialQty(e.target.value)} placeholder="예: 120EA" />
          </label>

          <label>
            반입예정일
            <input type="date" value={materialDate} onChange={(e) => setMaterialDate(e.target.value)} />
          </label>

          <label className="full-width">
            비고
            <textarea value={materialNote} onChange={(e) => setMaterialNote(e.target.value)} placeholder="반입 위치, 양중 계획, 특이사항 등" />
          </label>
        </div>
      </div>

      <div className="section-card checklist-section">
        <div className="section-title">체크리스트</div>
        <div className="checklist-columns">
          <div>
            <h3>품질관리</h3>
            {['재료 확인', '공정 확인', '시공상태 확인'].map((item) => (
              <label key={item} className="checklist-item">
                <input
                  type="checkbox"
                  checked={qualityChecks.includes(item)}
                  onChange={() => toggleCheck(qualityChecks, setQualityChecks, item)}
                />
                {item}
              </label>
            ))}
          </div>

          <div>
            <h3>안전관리</h3>
            {['안전장비 착용', '현장 정리', '위험요소 제거'].map((item) => (
              <label key={item} className="checklist-item">
                <input
                  type="checkbox"
                  checked={safetyChecks.includes(item)}
                  onChange={() => toggleCheck(safetyChecks, setSafetyChecks, item)}
                />
                {item}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="section-card">
        <div className="section-title">현장 관리</div>

        <label>
          강풍관리
          <textarea value={windManagement} onChange={(e) => setWindManagement(e.target.value)} placeholder="강풍 관련 특이사항" />
        </label>

        <label>
          익일 작업계획
          <textarea value={tomorrowPlan} onChange={(e) => setTomorrowPlan(e.target.value)} placeholder="익일 계획" />
        </label>

        <label>
          주요 이슈사항
          <textarea value={issues} onChange={(e) => setIssues(e.target.value)} placeholder="이슈 및 특이사항" />
        </label>
      </div>

      <div className="section-card">
        <div className="section-title">사진 업로드</div>
        <label className="file-upload">
          <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files?.[0] || null)} />
        </label>
      </div>

      <button type="submit" disabled={saving}>
        {saving ? '저장중...' : '저장'}
      </button>
    </form>
  )
}