// models/Session.js
import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema(
  {
    token: { type: String, required: true, unique: true },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  },
  { timestamps: true }
);

export default mongoose.models.Session ||
  mongoose.model("Session", SessionSchema);