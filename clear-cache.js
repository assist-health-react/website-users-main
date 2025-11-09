import { rmSync } from 'fs';
import { join } from 'path';

const clearCache = () => {
  const paths = [
    'node_modules/.vite',
    'node_modules/.cache',
    'dist'
  ];

  paths.forEach(path => {
    try {
      rmSync(join(process.cwd(), path), { recursive: true, force: true });
      console.log(`Cleared ${path}`);
    } catch (err) {
      if (err.code !== 'ENOENT') {
        console.error(`Error clearing ${path}:`, err);
      }
    }
  });

  console.log('Cache cleared successfully');
};

clearCache(); 