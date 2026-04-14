import { existsSync } from "node:fs";
import path from "node:path";

export function assetExists(relativePublicPath: string): boolean {
  const normalized = relativePublicPath.replace(/^\/+/, "");
  const absolute = path.join(process.cwd(), "public", normalized);
  return existsSync(absolute);
}
