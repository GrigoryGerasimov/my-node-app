import path from "path";
import chalk from "chalk";
import { fileURLToPath } from "url";

// const __filename = process.argv[1];
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(chalk.magenta(__filename));
console.log(chalk.yellow(__dirname));
console.log(path.basename(__filename));
console.log(path.extname(__filename));


