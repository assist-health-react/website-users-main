import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync, renameSync } from 'fs';
import { join } from 'path';

const componentsToMove = [
  'Services',
  'HowWeHelp',
  'Benefits',
  'Stats',
  'WhoWeAre',
  'WhyAssistHealth',
  'HealthcareDeserve',
  'Testimonials',
  'FAQ',
  'CTASection',
  'Plans',
  'PlansMembership',
  'Hero'
];

const srcDir = 'src/components';
const publicDir = join(srcDir, 'public');

// Create public directory if it doesn't exist
if (!existsSync(publicDir)) {
  mkdirSync(publicDir, { recursive: true });
}

// Move components to public directory
componentsToMove.forEach(component => {
  const componentFile = `${component}.jsx`;
  const srcPath = join(srcDir, componentFile);
  const destPath = join(publicDir, componentFile);

  if (existsSync(srcPath)) {
    try {
      // Read the file content
      const content = readFileSync(srcPath, 'utf8');
      
      // Update imports if needed
      const updatedContent = content
        .replace(/from ["']\.\/ui\//g, 'from "../ui/')
        .replace(/from ["']\.\/public\//g, 'from "./')
        .replace(/from ["']\.\/components\//g, 'from "../');

      // Write to new location
      writeFileSync(destPath, updatedContent);
      console.log(`Moved and updated ${componentFile}`);
    } catch (err) {
      console.error(`Error moving ${componentFile}:`, err);
    }
  }
});

console.log('Finished moving components'); 