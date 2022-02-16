export interface ApiError {
  errors: ValidationError[],
  message: string  
}

export interface ValidationError {
  field: string,
  description: string
}