const fs = require("fs");
const path = require("path");

it("modern-module-dynamic-import-runtime", () => {
	const content = fs.readFileSync(path.resolve(__dirname, "main.js"), "utf-8");
	expect(content).toMatchSnapshot();
});
