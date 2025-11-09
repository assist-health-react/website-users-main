import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const pagesDir = 'src/pages';

const updateImports = (content) => {
  return content
    // Fix prop-types import
    .replace(
      /from ["']\.\.\/prop-types["']/g,
      'from "prop-types"'
    )
    // Fix UI component imports
    .replace(
      /from ["']\.\.\/\.\.\/components\/ui\/([^"']+)["']/g,
      'from "../components/ui/$1"'
    )
    // Fix public component imports
    .replace(
      /from ["']\.\.\/\.\.\/components\/public\/([^"']+)["']/g,
      'from "../components/public/$1"'
    )
    // Fix other component imports
    .replace(
      /from ["']\.\.\/\.\.\/components\/([^"']+)["']/g,
      'from "../components/$1"'
    )
    // Fix lib imports
    .replace(
      /from ["']\.\.\/\.\.\/lib\/([^"']+)["']/g,
      'from "../lib/$1"'
    )
    // Fix hooks imports
    .replace(
      /from ["']\.\.\/\.\.\/hooks\/([^"']+)["']/g,
      'from "../hooks/$1"'
    )
    // Fix services imports
    .replace(
      /from ["']\.\.\/\.\.\/services\/([^"']+)["']/g,
      'from "../services/$1"'
    )
    // Add semicolons
    .replace(/}\n/g, '};\n')
    .replace(/}\s*$/g, '};')
    .replace(/export default [^;]+$/g, match => `${match};`);
};

// Process all files in pages directory
const files = readdirSync(pagesDir);
files.forEach(file => {
  if (file.endsWith('.jsx') || file.endsWith('.js')) {
    const filePath = join(pagesDir, file);
    const content = readFileSync(filePath, 'utf8');
    const updatedContent = updateImports(content);
    
    if (content !== updatedContent) {
      writeFileSync(filePath, updatedContent, 'utf8');
      console.log(`Updated imports in ${filePath}`);
    }
  }
});

console.log('Finished updating page imports'); 