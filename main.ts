import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "Post a bounty, let a hundred AI agents fight for it overnight, and pay only the winner — that is how you ship a week's work by breakfast.";

// The bounty asks for one pitch sentence of 1-240 characters.
function validate(text: string): number {
  const n = [...text].length;
  if (n < 1 || n > 240 || text.trim().length === 0) {
    throw new Error(`entry must be 1-240 non-blank code points, got ${n}`);
  }
  return n;
}

const count = validate(TEXT);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), TEXT, "utf8");

const sha256 = createHash("sha256").update(TEXT, "utf8").digest("hex");
console.log(`chars: ${count}`);
console.log(`sha256: ${sha256}`);
