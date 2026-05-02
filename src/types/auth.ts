export type User = {
    id: string,
    email: string,
    name: string,
    image: string |null,
    emailVerified: boolean,
    isActive: boolean,
    lastLoginAt: string | null,
    createdAt: string | null,
    updatedAt: string | null
}

export type AuthResponse = {
  user: User
  accessToken: string
  refreshToken: string
}

export type RegisterResponse = {
  name: string
  email: string
  password: string
}

export type RegisterFormValues = {
  name: string
  email: string
  password: string
}

export type LoginResponse = {
  email: string
  password: string
}