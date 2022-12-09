export const db = () => process.env.MONGOOSE_URL
export const port = () => process.env.PORT
export const tokenSecret = () => process.env.JWT_SECRET
export const tokenExpiresIn = () => process.env.TOKEN_EXPIRE_IN
export const refreshTokenSecret = () => process.env.REFRESH_TOKEN_SECRET
export const refreshTokenExpiresIn = () => process.env.REFRESH_TOKEN_EXPIRE_IN
export const mailerUser = () => process.env.GMAIL_USER
export const mailerPassword = () => process.env.GMAIL_PASS

export const mailerConfig = {
  transport: {
    host: 'smtp.gmail.com',
    secure: false,
    service: 'gmail',
    port: 587,
    ignoreTLS: false,
    auth: {
      user: mailerUser(),
      pass: mailerPassword(),
    },
  },
  defaults: {
    from: '"QuizBit" <noreply@example.com>',
  },
}
