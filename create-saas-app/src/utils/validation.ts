import validateNpmPackageName from 'validate-npm-package-name';
import { existsSync } from 'fs';
import { resolve } from 'path';

export function validateProjectName(name: string): { valid: boolean; problems?: string[] } {
  const validation = validateNpmPackageName(name);
  
  if (validation.validForNewPackages) {
    return { valid: true };
  }
  
  const problems: string[] = [];
  
  if (validation.errors) {
    problems.push(...validation.errors);
  }
  
  if (validation.warnings) {
    problems.push(...validation.warnings);
  }
  
  return { valid: false, problems };
}

export function validateProjectPath(projectPath: string): { valid: boolean; error?: string } {
  if (existsSync(projectPath)) {
    return { 
      valid: false, 
      error: `Directory already exists: ${projectPath}` 
    };
  }
  
  return { valid: true };
}

export function getProjectPath(name: string, cwd: string = process.cwd()): string {
  return resolve(cwd, name);
}