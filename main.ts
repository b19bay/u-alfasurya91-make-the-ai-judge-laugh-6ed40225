import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I asked IT for a second monitor and got a form, a ticket number, and a calendar invite to discuss the form.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

if (LINE.length < 1 || LINE.length > 200) {
  console.error(`line must be 1-200 characters, got ${LINE.length}`);
  process.exit(1);
}
if (LINE.trim().length === 0 || LINE.includes("\n")) {
  console.error("line must be a single non-blank line");
  process.exit(1);
}

writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");

// Read back and verify the written file is byte-identical to the line.
const written = readFileSync(join(outDir, "entry.txt"), "utf8");
if (written !== LINE || Buffer.byteLength(written, "utf8") !== 107) {
  console.error("entry.txt does not match the expected 107-byte line");
  process.exit(1);
}
