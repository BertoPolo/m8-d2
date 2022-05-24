import { createError } from "http-errors"
import atob from "atob"
import authorsModel from "../services/authors/index.js"

export const basicAuthMiddleware = async (req, res, next) => {
  if (req.headers.authorization) {
    const base64Credentials = req.headers.authorization.split(" ")[1]
    const { email, password } = atob(base64Credentials).split(":")
    console.log(`EMAIL: ${email}, PASSWORD: ${password}`)

    const user = await authorsModel.checkCretials(email, password)
    if (user) {
      req.user = user
      next()
    } else {
      next(createError(401, "Credentials are wrong!"))
    }
  } else {
    next(createError(401, "provide authorization header"))
  }
}
