import express from "express"
import createError from "http-errors"
import BlogsModel from "./model.js"

const blogsRouter = express.Router()

blogsRouter.get("/", async (req, res, next) => {
  try {
    const blogs = await BlogsModel.find()
    res.status(200).send(blogs)
  } catch (error) {
    next(error)
  }
})

blogsRouter.get("/:blogId", async (req, res, next) => {
  try {
    const blog = await BlogsModel.findById(req.params.blogId)
    // here it happens the validation of req.body, if it is not ok Mongoose will throw an error (if it is ok it is NOT saved in db yet)

    if (blog) {
      res.status(200).send(blog)
    } else {
      next(createError(404, "user not found"))
    }
  } catch (error) {
    next(error)
  }
})

// GET /blogPosts/:id/comments => returns all the comments for the specified blog post
blogsRouter.get("/:blogId/comments", async (req, res, next) => {
  try {
    const blog = await BlogsModel.findById(req.params.blogId)
    // here it happens the validation of req.body, if it is not ok Mongoose will throw an error (if it is ok it is NOT saved in db yet)
    const comments = blog.comments

    if (blog) {
      res.status(200).send(comments)
    } else {
      next(createError(404, "user not found"))
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
})

// GET /blogPosts/:id/comments/:commentId=> returns a single comment for the specified blog post
// blogsRouter.get("/:blogId/comments", async (req, res, next) => {
//   try {
//     const blog = await BlogsModel.findById(req.params.blogId)
//     if (blog) {
//
//       res.status(200).send()
//     } else {
//       next(createError(404, "user not found"))
//     }
//   } catch (error) {
// console.log(error)
//     next(error)
//   }
// })

blogsRouter.post("/", async (req, res, next) => {
  try {
    const newBlog = new BlogsModel(req.body).save()
    res.status(201).send(newBlog.id)
  } catch (error) {
    next(error)
  }
})

// POST /blogPosts/:id => adds a new comment for the specified blog post
blogsRouter.post("/:blogId", async (req, res, next) => {
  try {
    const updatedBlog = await BlogsModel.findByIdAndUpdate(req.params.blogId, { $push: { comments: req.body } }, { new: true })

    res.status(201).send(updatedBlog)
  } catch (error) {
    next(error)
  }
})

// PUT /blogPosts /123 => edit the blogPost with the given id
// blogsRouter.put("/:blogId", async (req, res, next) => {
//   try {
//     const updatedBlog = await BlogsModel.findByIdAndUpdate(req.params.blogId, { ...req.body })
//   } catch (error) {
//     next(error)
//   }
// })

// PUT /blogPosts/:id/comment/:commentId => edit the comment belonging to the specified blog post
// blogsRouter.put("/:blogId", async (req, res, next) => {
//   try {
//     const updatedBlog = await BlogsModel.findByIdAndUpdate(req.params.blogId, { ...req.body })
//   } catch (error) {
//     next(error)
//   }
// })

//DELETE /blogPosts /123 => delete the blogPost with the given id
blogsRouter.delete("/:blogId", async (req, res, next) => {
  try {
    await BlogsModel.findByIdAndDelete(req.params.blogId)

    res.status(201).send("RIP")
  } catch (error) {
    next(error)
  }
})

// DELETE /blogPosts/:id/comment/:commentId=> delete the comment belonging to the specified blog post
blogsRouter.delete("/:blogId/comment/:commentId", async (req, res, next) => {
  try {
    const findedOne = BlogsModel.findByIdAndUpdate()

    res.status(200).send("RIP")
  } catch (error) {
    next(error)
  }
})

export default blogsRouter
