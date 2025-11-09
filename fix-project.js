import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ensure directories exist
const ensureDir = (dir) => {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
};

// Update imports in a file
const updateImports = (filePath, content) => {
  return content
    // Fix UI component imports
    .replace(
      /from ["']@\/components\/ui\/(.*?)["']/g,
      'from "../../components/ui/$1"'
    )
    .replace(
      /from ["']\.\.\/components\/ui\/(.*?)["']/g,
      'from "../components/ui/$1"'
    )
    // Fix lib imports
    .replace(
      /from ["']@\/lib\/(.*?)["']/g,
      'from "../../lib/$1"'
    )
    .replace(
      /from ["']\.\.\/lib\/(.*?)["']/g,
      'from "../lib/$1"'
    )
    // Fix public component imports
    .replace(
      /from ["']@\/components\/public\/(.*?)["']/g,
      'from "../../components/public/$1"'
    )
    .replace(
      /from ["']\.\.\/components\/public\/(.*?)["']/g,
      'from "../components/public/$1"'
    )
    // Fix page imports
    .replace(
      /from ["']@\/pages\/(.*?)["']/g,
      'from "../../pages/$1"'
    )
    .replace(
      /from ["']\.\.\/pages\/(.*?)["']/g,
      'from "../pages/$1"'
    );
};

// Process a directory
const processDirectory = (dir) => {
  const files = readdirSync(dir);
  files.forEach(file => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);
    
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
      let content = readFileSync(filePath, 'utf8');
      const updatedContent = updateImports(filePath, content);
      
      if (content !== updatedContent) {
        writeFileSync(filePath, updatedContent, 'utf8');
        console.log(`Updated imports in ${filePath}`);
      }
    }
  });
};

// Ensure all required directories exist
const ensureDirectories = () => {
  const dirs = [
    'src/components/ui',
    'src/components/public',
    'src/pages',
    'src/lib',
    'src/services'
  ];
  
  dirs.forEach(dir => ensureDir(dir));
};

// Main execution
const main = () => {
  ensureDirectories();
  processDirectory('src');
  console.log('Project structure and imports fixed');
};

main(); 