// 版本同步：以 package.json 的 version 为唯一来源，写入 companion/manifest.json
// 由 `npm version` 的 version 生命周期脚本自动调用，保持两处版本一致。
const fs = require('fs');
const path = require('path');

const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
const manifestPath = path.join(__dirname, 'companion', 'manifest.json');
let manifest = fs.readFileSync(manifestPath, 'utf8');

if (!manifest.includes('"version"')) {
  console.error('companion/manifest.json 缺少 version 字段');
  process.exit(1);
}

const updated = manifest.replace(/\t"version":\s*"[^"]*"/, `\t"version": "${pkg.version}"`);
if (updated === manifest) {
  console.error('未能在 companion/manifest.json 中定位 version 行');
  process.exit(1);
}

fs.writeFileSync(manifestPath, updated);
console.log(`已同步 manifest.json 版本至 ${pkg.version}`);
