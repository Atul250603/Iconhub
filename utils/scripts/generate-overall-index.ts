/**
 * This script generates an overall index file for all the icons.
 * It will read all the registry.json files in the utils folder and merge them into a single index.json file.
 * The index.json file will be used to register the icons with the icon library.
 */

import fs from 'fs';
import path from 'path';
import type { IconElement } from '@/types';

const rootDir = 'public'
const outDir = 'utils'
const outputFile = 'icons-index.json'

const generateOverallIndex = () => {
  try {
    const libraries = fs.readdirSync(rootDir).filter((f) => fs.statSync(path.join(rootDir, f)).isDirectory());
    const allIcons: IconElement[] = [];

    let countOfRegistryAdded = 0;

    libraries.forEach((library) => {
      const registryPath = path.join(rootDir, library, 'registry.json');
      if (!fs.existsSync(registryPath)) {
        return  
      }

      const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
      allIcons.push(...registry);
      countOfRegistryAdded += 1;
    })

    const outputPath = path.join(outDir, outputFile);
    fs.writeFileSync(outputPath, JSON.stringify(allIcons, null, 2));
    console.log(`✅ Created overall index: ${outputFile} by merging ${countOfRegistryAdded} libraries`);
  } catch (error) {
    console.error(`❌ Error generating overall index:`, error);
  }
}

const mainFunction = () => {
  try {
    generateOverallIndex();
  } catch (error) {
    console.error(`❌ Error generating overall index:`, error);
  }
}

mainFunction();