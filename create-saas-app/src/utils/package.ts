import { readFileSync } from 'fs';
import { join } from 'path';

export interface PackageInfo {
  name: string;
  version: string;
  description: string;
}

export function getPackageInfo(): PackageInfo {
  try {
    const packagePath = join(__dirname, '../../package.json');
    const packageContent = readFileSync(packagePath, 'utf-8');
    const packageJson = JSON.parse(packageContent);
    
    return {
      name: packageJson.name,
      version: packageJson.version,
      description: packageJson.description
    };
  } catch (error) {
    return {
      name: 'create-saas-app',
      version: '0.1.0',
      description: 'Create a production-ready SaaS application'
    };
  }
}