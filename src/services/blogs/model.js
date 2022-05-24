import mongoose from "mongoose"

const { Schema, model } = mongoose

const blogsSchema = new Schema(
  {
    category: { type: String, required: true },
    title: { type: String, required: true },
    cover: { type: String, required: true },
    readTime: { value: { type: Number, required: true }, unit: { type: String, required: true } },
    author: { name: { type: String, required: true }, avatar: { type: String, required: true } },
    content: { type: String, required: true },
    // comments: [{ _id: String, comments: [String] }],
    comments: [{ text: String }],
  },
  { timestamps: true }
)
export default model("Blog", blogsSchema)
// this model is now automatically linked to the "blogs" collection, if the collection is not there it will be automatically created
