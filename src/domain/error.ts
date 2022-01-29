export interface ApiError {
  errors: ValidationError[]
}

export interface ValidationError {
  field: string,
  description: string
}