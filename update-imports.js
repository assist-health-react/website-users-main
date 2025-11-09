import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function updateImports(filePath) {
  const content = readFileSync(filePath, 'utf8');
  let updatedContent = content;

  // Update paths to use aliases
  updatedContent = updatedContent
    // Update component imports
    .replace(
      /from ["']\.\.\/components\/(.*?)["']/g,
      'from "@/components/$1"'
    )
    .replace(
      /from ["']\.\.\/\.\.\/components\/(.*?)["']/g,
      'from "@/components/$1"'
    )
    .replace(
      /from ["']\.\/([^"']+)["']/g,
      (match, p1) => {
        // Don't change if it's a relative import in the same directory
        if (filePath.includes('components/ui/') && p1.indexOf('/') === -1) {
          return match;
        }
        return `from "@/components/ui/${p1}"`;
      }
    )
    // Update lib imports
    .replace(
      /from ["']\.\.\/lib\/(.*?)["']/g,
      'from "@/lib/$1"'
    )
    .replace(
      /from ["']\.\.\/\.\.\/lib\/(.*?)["']/g,
      'from "@/lib/$1"'
    )
    // Update services imports
    .replace(
      /from ["']\.\.\/services\/(.*?)["']/g,
      'from "@/services/$1"'
    )
    .replace(
      /from ["']\.\.\/\.\.\/services\/(.*?)["']/g,
      'from "@/services/$1"'
    )
    // Update pages imports
    .replace(
      /from ["']\.\.\/pages\/(.*?)["']/g,
      'from "@/pages/$1"'
    );

  if (updatedContent !== content) {
    writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`Updated imports in ${filePath}`);
  }
}

// Process all relevant files
const processDirectory = (dir) => {
  const files = readdirSync(dir);
  files.forEach(file => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
      updateImports(filePath);
    }
  });
};

// Start processing from src directory
processDirectory('src'); 