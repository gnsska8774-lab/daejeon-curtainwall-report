const mockReports = []

const mockPhotos = []

export async function getReports() {
  return mockReports
}

export async function createReport(report) {
  const newReport = {
    id: Date.now(),
    created_at: new Date().toISOString(),
    ...report,
  }

  mockReports.unshift(newReport)
  return newReport
}

export async function updateReport(id, updates) {
  const index = mockReports.findIndex((report) => report.id === id)

  if (index === -1) {
    throw new Error('작업일보를 찾을 수 없습니다.')
  }

  mockReports[index] = {
    ...mockReports[index],
    ...updates,
  }

  return mockReports[index]
}

export async function deleteReport(id) {
  const index = mockReports.findIndex((report) => report.id === id)

  if (index === -1) {
    throw new Error('작업일보를 찾을 수 없습니다.')
  }

  mockReports.splice(index, 1)
  return true
}

export async function getPhotos() {
  return mockPhotos
}

export async function uploadPhoto(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      const photo = {
        id: Date.now(),
        filename: file.name,
        data: reader.result,
        created_at: new Date().toISOString(),
      }

      mockPhotos.unshift(photo)
      resolve(photo)
    }

    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}