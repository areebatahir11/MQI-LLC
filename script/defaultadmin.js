import dbConnect from "@/lib/db";
import Admin from "@/models/admin";

async function createDefaultAdmin() {
  await dbConnect();
  const exists = await Admin.findOne({ email: "admin@mqi.com" });
  if (!exists) {
    await Admin.create({ email: "admin@mqi.com", password: "123456" });
    console.log("Default admin created!");
  }
}
createDefaultAdmin();