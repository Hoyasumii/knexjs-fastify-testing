import fs from "fs";
import path from "path";

export function loadEnv(suffix?: string) {
  const envPath = path.resolve(process.cwd(), `.env${suffix ? `.${suffix}` : ""}`);

  const envData = fs.readFileSync(envPath, "utf-8");
  const lines = envData.split("\n");

  for (const line of lines) {
    if (!line || line.startsWith("#")) continue;

    const [key, value] = line.split("=");

    if (key && value) {
      process.env[key.trim()] = value.trim();
    }
  }
}
