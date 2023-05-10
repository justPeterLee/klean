import { genSaltSync, hashSync, compareSync } from "bcrypt";

const SALT_WORK_FACTOR: number = 10;

async function encryptPassword(password: string) {
  const salt = await genSaltSync(SALT_WORK_FACTOR);
  return hashSync(password, salt);
}

async function comparePassword(resPassword: string, storedPassword: string) {
  return await compareSync(resPassword, storedPassword);
}

export { encryptPassword, comparePassword };
