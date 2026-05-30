import React from 'react'

export default function Settings(){
  return (
    <div className="page">
      <h1>설정</h1>
      <p>Supabase 연결 정보는 다음 환경 변수로 관리됩니다.</p>
      <ul>
        <li>VITE_SUPABASE_URL</li>
        <li>VITE_SUPABASE_ANON_KEY</li>
      </ul>
      <p>메인 기능: 작업일보 작성, 조회, PDF/Excel 출력, 사진대지, 체크리스트 관리.</p>
    </div>
  )
}
