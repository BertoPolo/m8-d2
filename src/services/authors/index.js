import express from "express"
import fs from "fs"
import uniqid from "uniqid"
import path, { dirname } from "path"
import { fileURLToPath } from "url"
import Authors from "./schema.js"
import { basicAuthMiddleware } from "../../auth/basic.js"

const __filename = fileURLToPath(import.meta.url)

const __dirname = dirname(__filename)

const authorsFilePath = path.join(__dirname, "authors.json")

const authorsRouter = express.Router()

// get all authors
authorsRouter.get("/", basicAuthMiddleware, async (req, res, next) => {
  try {
    const authors = await Authors.find({})
    res.send(authors)
  } catch (error) {
    res.send(500).send({ message: error.message })
  }
})

// create  author
authorsRouter.post("/", async (req, res, next) => {
  try {
    const author = await new Authors(req.body).save()
    res.send(author)
  } catch (error) {
    console.log({ error })
    res.send(500).send({ message: error.message })
  }
})

// get single authors
authorsRouter.get("/:id", async (req, res, next) => {
  try {
    const author = await Authors.findById(req.params.id)
    if (!author) {
      res.status(404).send({ message: `Author with ${req.params.id} is not found!` })
    } else res.send(author)
  } catch (error) {
    res.send(500).send({ message: error.message })
  }
})

// delete  author
authorsRouter.delete("/:id", async (req, res, next) => {
  try {
    const author = Authors.findById(req.params.id)
    if (!author) {
      res.status(404).send({ message: `Author with ${req.params.id} is not found!` })
    }
    await Authors.findByIdAndDelete(req.params.id)
    res.status(204).send()
  } catch (error) {
    res.send(500).send({ message: error.message })
  }
})

//  update author
authorsRouter.put("/:id", async (req, res, next) => {
  try {
    const changedAuthor = await Authors.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.send(changedAuthor)
  } catch (error) {
    res.send(500).send({ message: error.message })
  }
})

export default authorsRouter
