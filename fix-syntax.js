import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const pagesDir = 'src/pages';

const fixSyntax = (content) => {
  return content
    // Remove extra semicolons after object/array literals
    .replace(/};(\s*)\]/g, '}\n$1]')
    .replace(/,(\s*)\]/g, '\n$1]')
    // Fix missing semicolons after export default statements
    .replace(/export default \w+$/g, match => `${match};`)
    // Fix missing semicolons after React component definitions
    .replace(/}(\s*)$/g, '};$1')
    // Fix prop-types
    .replace(/PropTypes\./g, 'propTypes.')
    // Fix missing commas in object literals
    .replace(/}(\s+){/g, '},\n  {')
    // Fix missing commas in arrays
    .replace(/](\s+)\[/g, '],\n  [');
};

// Process all files in pages directory
const files = readdirSync(pagesDir);
files.forEach(file => {
  if (file.endsWith('.jsx') || file.endsWith('.js')) {
    const filePath = join(pagesDir, file);
    const content = readFileSync(filePath, 'utf8');
    const updatedContent = fixSyntax(content);
    
    if (content !== updatedContent) {
      writeFileSync(filePath, updatedContent, 'utf8');
      console.log(`Fixed syntax in ${filePath}`);
    }
  }
});

console.log('Finished fixing syntax in pages'); 