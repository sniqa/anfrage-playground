const fs = require("fs")
const path = require("path")

function playground() {
  const playgroundPath = path.join(__dirname, "./dist/index.html")
  return fs.readFileSync(playgroundPath, "utf-8")
}

module.exports = playground()