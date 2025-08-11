#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, '..', 'src', 'components', 'ui');

if (!fs.existsSync(componentsDir)) {
  console.log('Components directory not found. Skipping import updates.');
  process.exit(0);
}

const updateImports = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Update utils import
  content = content.replace(
    /import\s+{\s*cn\s*}\s+from\s+['"]\.\/utils['"];?/g,
    'import { cn } from "@/lib/utils";'
  );
  
  fs.writeFileSync(filePath, content);
};

// Get all .tsx files in components/ui directory
const files = fs.readdirSync(componentsDir)
  .filter(file => file.endsWith('.tsx'))
  .map(file => path.join(componentsDir, file));

files.forEach(updateImports);

console.log(`Updated imports in ${files.length} component files`);