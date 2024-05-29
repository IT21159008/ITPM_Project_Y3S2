import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    cusProductID: {
      type: "string",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    added_date: {
      type: String,
    },
    expire_date: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timeStamps: true }
);

const Course = mongoose.model("addvertise", courseSchema);

export default Course;
