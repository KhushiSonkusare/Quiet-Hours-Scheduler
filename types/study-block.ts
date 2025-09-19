export interface StudyBlock {
  id: string
  title: string
  startTime: string
  endTime: string
  date: string
  description?: string
  category?: string
  completed?: boolean
  createdAt: string
  updatedAt: string
}

export interface StudyBlockFormData {
  title: string
  startTime: string
  endTime: string
  date: string
  description?: string
  category?: string
}
