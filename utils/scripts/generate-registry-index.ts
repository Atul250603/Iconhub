/**
 * This script generates a registry index file for each icon source.
 * For example, if you have a folder called `lucide` with the following structure:
 * 
 * lucide
 * ├── add.svg
 * ├── subtract.svg
 * ├── multiply.svg
 * ├── divide.svg
 * 
 * This script will generate a file called `registry.json` with the following content:
 * 
 * {
 *   "add": {
 *     "name": "add",
 *     "path": "lucide/add.svg",
 *     "source": "lucide"
 *   },
 * }
 * 
 * This file can be used to register the icons with the icon library.
 */

import fs from 'fs';
import path from 'path';
import type { IconElement } from '@/types';
import readline from 'readline';

const rootPath = 'public'

const generateRegistryIndex = (libName: string, source: string) => {
  try {
    const icons: IconElement[] = [];
    const inputPath = path.join(rootPath, libName);
  
    fs.readdirSync(inputPath).forEach((file) => {
      if (!file.endsWith('.svg')) return;
  
      const name = file.replace('.svg', '');
  
      icons.push({
        name,
        path : path.join(libName, file),
        source : source[0].toUpperCase() + source.slice(1).toLowerCase()
      });
    });
  
    const outputPath = path.join(inputPath, 'registry.json');
  
    fs.writeFileSync(outputPath, JSON.stringify(icons, null, 2));
    console.log(`✅ Created registry for library ${libName}`);
  } catch (error) {
    console.error(`❌ Error creating registry for library ${libName}:`, error);
  }
};

const mainFunction = async () => {
  // Create readline interface
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // Helper function to ask questions
  const askQuestion = (question: string): Promise<string> => {
    return new Promise((resolve) => {
      rl.question(question, (answer) => {
        resolve(answer.trim());
      });
    });
  };

  try {
    // Show usage information
    console.log('📋 Icon Registry Generator');
    console.log('========================');
    console.log('This script generates a registry index file for icon libraries.');
    console.log('');

    // Get library name
    const libName = await askQuestion('Enter library name (e.g., lucide): ');
    if (!libName) {
      console.error('❌ Error: Library name is required');
      process.exit(1);
    }

    // Get source
    const source = await askQuestion('Enter source name (e.g., lucide): ');
    if (!source) {
      console.error('❌ Error: Source name is required');
      process.exit(1);
    }

    console.log('');
    console.log(`Generating registry for library: ${libName}`);
    console.log(`Source: ${source}`);
    console.log('');

    generateRegistryIndex(libName, source);
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    rl.close();
  }
}

mainFunction();