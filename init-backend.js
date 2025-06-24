const fs = require('fs');
const path = require('path');

const folders = [
  'controllers',
  'models',
  'routes',
  'middleware',
  'config',
  'services',
  'utils'
];

const files = {
  '.gitignore': 'node_modules\n.env\n',
  '.env': '',
  'server.js': `const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Routes
// app.use('/api/yourroute', require('./routes/yourRoute'));

app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));
`,
  'package.json': `{
  "name": "backend",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.0"
  }
}`
};

const root = process.argv[2] || 'backend';

if (!fs.existsSync(root)) fs.mkdirSync(root);
folders.forEach(dir => fs.mkdirSync(path.join(root, dir), { recursive: true }));
Object.entries(files).forEach(([fileName, content]) => {
  fs.writeFileSync(path.join(root, fileName), content);
});

console.log(`✅ ${root}/ initialized.`);