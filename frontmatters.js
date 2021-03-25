const globby = require("globby");
const { readFile, writeFile } = require("fs/promises");
const matter = require("gray-matter");
const path = require("path");

(async () => {
  const paths = await globby(["docs/**/*.{md,mdx}", "!docs/schedule.mdx"]);
  const content = await Promise.all(paths.map(async x => {
    return [x, await readFile(x, "utf8")]
  }))
  await writeFile(
    path.join(__dirname, "schedule.json"),
    JSON.stringify(content.map((c) => [c[0], matter(c[1]).data]))
  );
})();
