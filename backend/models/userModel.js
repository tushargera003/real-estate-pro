import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    isAdmin: { type: Boolean, default: false },
    loginAttempts: { type: Number, default: 0 }, // ❗ Wrong password attempts
    lockUntil: { type: Date }, // ❗ Lock expiry time
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  if (this.lockUntil && this.lockUntil > Date.now()) {
    throw new Error("Account is temporarily locked. Try again later.");
  }

  const isMatch = await bcrypt.compare(enteredPassword, this.password);
  if (isMatch) {
    this.loginAttempts = 0; // ✅ Reset attempts on success
    this.lockUntil = undefined;
    await this.save();
  } else {
    this.loginAttempts += 1;
    if (this.loginAttempts >= 5) {
      this.lockUntil = new Date(Date.now() + 15 * 60 * 1000); // Lock for 15 min
    }
    await this.save();
  }
  return isMatch;
};

const User = mongoose.model("User", userSchema);
export default User;