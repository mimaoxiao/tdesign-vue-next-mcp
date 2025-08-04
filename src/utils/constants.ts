import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const ROOT_DIR = process.env.IS_BUILD
  ? resolve(dirname(fileURLToPath(import.meta.url)), "..")
  : resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");

const EXTRACTED_DATA_DIR = resolve(ROOT_DIR, "document");

export {
  ROOT_DIR,
  EXTRACTED_DATA_DIR,
}
