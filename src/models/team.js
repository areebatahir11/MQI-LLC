import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    designation: { type: String, required: true },
    description: { type: String },

    image: { type: String, required: true },

    email: { type: String },
    phone: { type: String },

    experience: { type: Number }, 
    skills: [{ type: String }],

  },
  { timestamps: true }
);

export default mongoose.models.Team || mongoose.model("Team", TeamSchema);