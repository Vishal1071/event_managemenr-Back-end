import bcrypt from "bcrypt";

const generateHash = async () => {
  const password = "admin@123";
  const hashed = await bcrypt.hash(password, 10);
  console.log("Your bcrypt hash is:\n", hashed);
};

generateHash();
