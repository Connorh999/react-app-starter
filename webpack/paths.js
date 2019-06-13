const path = require('path');

const projectRoot = path.resolve(__dirname, '../');

// Resolve paths relative to the project root.
const resolveProjectPath = (relativePath) => {
    return path.resolve(projectRoot, relativePath);
}

module.exports = {
    projectRoot,
    indexHtml: resolveProjectPath('public/index.html'),
    indexJs: resolveProjectPath('src/index.js'),
    build: resolveProjectPath('build'),
    src: resolveProjectPath('src')
};
