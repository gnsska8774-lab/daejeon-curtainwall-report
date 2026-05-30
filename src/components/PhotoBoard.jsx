import React from 'react'

export default function PhotoBoard({ photos }) {
  return (
    <section className="photo-board">
      <h2>사진대지</h2>
      {photos.length === 0 ? (
        <p>업로드된 사진이 없습니다.</p>
      ) : (
        <div className="photo-grid">
          {photos.map(photo => (
            <div key={photo.id} className="photo-item">
              <img src={photo.data} alt={photo.filename || 'photo'} />
              <div>{photo.filename}</div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
