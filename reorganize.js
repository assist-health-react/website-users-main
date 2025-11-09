import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync, renameSync } from 'fs';
import { join, dirname } from 'path';

// Ensure directories exist
const ensureDir = (dir) => {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
};

// Move public components to correct location
const movePublicComponents = () => {
  const publicComponents = [
    'Hero.jsx', 'About.jsx', 'WhyAssistHealth.jsx', 'WhoWeAre.jsx',
    'Testimonials.jsx', 'TestimonialDetail.jsx', 'TeamMemberModal.jsx',
    'Stats.jsx', 'SpecializedPackages.jsx', 'Services.jsx', 'ServiceDetail.jsx',
    'PlansMembership.jsx', 'Plans.jsx', 'Packages.jsx', 'Navigation.jsx',
    'Layout.jsx', 'HowWeHelp.jsx', 'HealthcareDeserve.jsx', 'Footer.jsx',
    'FAQ.jsx', 'CTASection.jsx', 'CTAButtons.jsx', 'ContactCTA.jsx',
    'Cart.jsx', 'Benefits.jsx', 'Navbar.jsx'
  ];

  ensureDir('src/components/public');
  
  publicComponents.forEach(file => {
    const srcPath = join('src/components', file);
    const destPath = join('src/components/public', file);
    
    if (existsSync(srcPath)) {
      renameSync(srcPath, destPath);
      console.log(`Moved ${file} to public components`);
    }
  });
};

// Update imports in a file
const updateImports = (filePath) => {
  const content = readFileSync(filePath, 'utf8');
  let updatedContent = content;

  // Update imports based on file location
  if (filePath.includes('components/ui/')) {
    updatedContent = updatedContent
      .replace(/from ["']\.\.\/\.\.\/lib\/utils["']/g, 'from "../../lib/utils"')
      .replace(/from ["']\.\.\/([^"']+)["']/g, 'from "./$1"');
  } else if (filePath.includes('components/public/')) {
    updatedContent = updatedContent
      .replace(/from ["']\.\.\/\.\.\/components\/ui\/([^"']+)["']/g, 'from "../ui/$1"')
      .replace(/from ["']\.\.\/\.\.\/lib\/utils["']/g, 'from "../../lib/utils"')
      .replace(/from ["']\.\.\/prop-types["']/g, 'from "prop-types"');
  } else if (filePath.includes('pages/')) {
    updatedContent = updatedContent
      .replace(/from ["']\.\.\/\.\.\/components\/ui\/([^"']+)["']/g, 'from "../components/ui/$1"')
      .replace(/from ["']\.\.\/\.\.\/components\/public\/([^"']+)["']/g, 'from "../components/public/$1"')
      .replace(/from ["']\.\.\/prop-types["']/g, 'from "prop-types"');
  }

  if (updatedContent !== content) {
    writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`Updated imports in ${filePath}`);
  }
};

// Process all files in a directory
const processDirectory = (dir) => {
  const files = readdirSync(dir);
  files.forEach(file => {
    const filePath = join(dir, file);
    if (file.endsWith('.jsx') || file.endsWith('.js')) {
      updateImports(filePath);
    } else if (existsSync(filePath) && file !== 'node_modules') {
      processDirectory(filePath);
    }
  });
};

// Main execution
const main = () => {
  // First, move files to correct locations
  movePublicComponents();

  // Then update all imports
  processDirectory('src');
  
  console.log('Project reorganization complete');
};

main(); 