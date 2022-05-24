import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    avatar: {
      type: String,
      default: "https://ui-avatars.com/api/?name=Unnamed+User",
    },
  },
  { timestamps: true }
);

authorSchema.pre("save", function (done) {
  this.avatar = `https://ui-avatars.com/api/?name=${this.name}+${this.surname}`;
  done();
});

export default mongoose.model("Author", authorSchema);
