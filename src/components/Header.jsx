import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="brand">대전성남재개발 커튼월 공사</div>

        <nav className="header-nav">
          <NavLink to="/" end>대시보드</NavLink>
          <NavLink to="/create">작업일보 작성</NavLink>
          <NavLink to="/reports">작업일보 조회</NavLink>
          <NavLink to="/pdf">PDF 출력</NavLink>
          <NavLink to="/settings">설정</NavLink>
        </nav>
      </div>
    </header>
  )
}