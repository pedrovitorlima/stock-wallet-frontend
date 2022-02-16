export interface ApiError {
  errors: ValidationError[],
  message: string | null
}

export interface ValidationError {
  field: string,
  description: string
}