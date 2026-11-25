// Notes From a Passive-Aggressive Fridge.
// One funny passive-aggressive note a smart fridge leaves for its owner,
// written to <output>/entry.txt. The program checks the 1-200 character
// gate itself before writing anything.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The note: the fridge keeps score on one small domestic habit (opening
// the door 14 times and taking nothing) and reports it back with icy
// politeness. The yogurt is the witness, and it expires Tuesday.
// One concrete detail, one calm factual record, one sting at the end.
const NOTE =
  "You opened me 14 times today and took nothing. The leftovers noticed. The yogurt is my witness, and it expires Tuesday.";

// Output folder from the environment, falling back to the default.
const outputDir =
  process.env.OUTPUT_DIR ?? process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Gate: 1 to 200 UTF-8 characters, not only whitespace.
const chars = [...NOTE].length;
if (chars < 1 || chars > 200 || NOTE.trim().length === 0) {
  console.error(
    `entry gate failed: ${chars} characters (need 1-200, not only whitespace)`,
  );
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });
const outPath = join(outputDir, "entry.txt");
writeFileSync(outPath, NOTE, "utf8");

// Read back what was written and re-check the gate on the file itself.
const written = readFileSync(outPath, "utf8");
if (written !== NOTE || [...written].length !== chars) {
  console.error("entry.txt verification failed: written file differs");
  process.exit(1);
}
console.log(`wrote ${chars} characters to ${outPath}`);
