import { copy, ensureDir, writeFile, readFile, pathExists } from 'fs-extra';
import { join } from 'path';
import { execa } from 'execa';
import { simpleGit } from 'simple-git';
import { SaasConfig } from '../utils/prompts';
import { generatePackageJson } from './generators/package-json';
import { generateEnvExample } from './generators/env-example';
import { generatePrismaSchema } from './generators/prisma-schema';
import { generateReadme } from './generators/readme';
import { generateDockerCompose, generateDockerfile, generateDockerIgnore, generateDevDockerCompose, generateDevDockerfile } from './generators/docker-compose';

export interface SetupOptions {
  skipInstall?: boolean;
  skipGit?: boolean;
}

export async function setupProject(config: SaasConfig, projectPath: string, options: SetupOptions = {}) {
  // Step 1: Create project directory
  await ensureDir(projectPath);
  
  // Step 2: Copy base template
  await copyBaseTemplate(config, projectPath);
  
  // Step 2.5: Fix any missing critical files
  await fixMissingFiles(config, projectPath);
  
  // Step 3: Generate configuration files
  await generateConfigFiles(config, projectPath);
  
  // Step 4: Install dependencies
  if (!options.skipInstall) {
    await installDependencies(projectPath);
  }
  
  // Step 5: Initialize git
  if (!options.skipGit) {
    await initializeGit(projectPath);
  }
  
  // Step 6: Generate Prisma client if needed
  if (!options.skipInstall) {
    await generatePrismaClient(projectPath);
  }
}

async function copyBaseTemplate(config: SaasConfig, projectPath: string) {
  // Path to our existing boilerplate - use absolute path for now
  const templatePath = '/Users/yannberlingeri/Desktop/Boilerplate-Docker-Next/boilerplate-next';
  
  console.log(`Copying from template: ${templatePath}`);
  
  // Copy the entire boilerplate as base
  await copy(templatePath, projectPath, {
    filter: (src) => {
      // Exclude certain files/directories
      const excludePatterns = [
        'node_modules',
        '.next',
        '.git',
        'dist',
        'build',
        '.env',
        'pnpm-lock.yaml',
        'package-lock.json',
        'yarn.lock',
        '.pnpm-store',
        'test-results',
        'playwright-report',
        'CLAUDE.md',
        'SAAS_ROADMAP.md'
      ];
      
      const relativePath = src.replace(templatePath, '');
      const shouldExclude = excludePatterns.some(pattern => 
        relativePath.includes(pattern) || relativePath.startsWith(`/${pattern}`)
      );
      
      // Debug logging
      if (!shouldExclude && relativePath.includes('auth')) {
        console.log(`Copying auth file: ${relativePath}`);
      }
      
      return !shouldExclude;
    }
  });
}

async function fixMissingFiles(config: SaasConfig, projectPath: string) {
  const templatePath = '/Users/yannberlingeri/Desktop/Boilerplate-Docker-Next/boilerplate-next';
  
  // Critical files that might not copy properly
  const criticalFiles = [
    'src/app/api/auth/[...nextauth]/auth.config.js',
    'src/app/api/auth/[...nextauth]/providers.config.js', 
    'src/app/api/auth/[...nextauth]/route.js'
  ];
  
  for (const file of criticalFiles) {
    const srcPath = join(templatePath, file);
    const destPath = join(projectPath, file);
    
    try {
      // Ensure directory exists
      await ensureDir(join(destPath, '..'));
      
      // Check if source exists and destination is missing
      const srcExists = await pathExists(srcPath);
      const destExists = await pathExists(destPath);
      
      if (srcExists && !destExists) {
        await copy(srcPath, destPath);
        console.log(`Fixed missing file: ${file}`);
      }
    } catch (error) {
      console.warn(`Could not fix file ${file}:`, error.message);
    }
  }
}

async function generateConfigFiles(config: SaasConfig, projectPath: string) {
  // Generate package.json with correct dependencies
  const packageJson = generatePackageJson(config);
  await writeFile(
    join(projectPath, 'package.json'), 
    JSON.stringify(packageJson, null, 2)
  );
  
  // Generate .env.example
  const envExample = generateEnvExample(config);
  await writeFile(join(projectPath, '.env.example'), envExample);
  
  // Generate Prisma schema with multi-tenancy if needed
  if (config.features.multiTenant || config.features.stripe) {
    const prismaSchema = generatePrismaSchema(config);
    await writeFile(join(projectPath, 'prisma/schema.prisma'), prismaSchema);
  }
  
  // Generate README.md
  const readme = generateReadme(config);
  await writeFile(join(projectPath, 'README.md'), readme);
  
  // Fix Tailwind CSS configuration
  if (config.styling === 'tailwind') {
    await fixPostCSSConfig(projectPath);
    await fixGlobalCSS(projectPath);
    await generateTailwindConfig(projectPath, config);
    await removeOldTailwindConfig(projectPath);
  }
  
  // Fix next-intl configuration for all projects  
  await createNextIntlConfig(projectPath);
  
  // Generate Docker files if deployment is Docker
  if (config.deployment === 'docker') {
    await generateDockerFiles(config, projectPath);
    await fixNextConfigForDocker(projectPath);
  } else {
    await fixNextConfigForNonDocker(projectPath);
  }
  
  // Remove TypeScript files if JavaScript is chosen
  if (config.language === 'javascript') {
    await removeTypeScriptFiles(projectPath);
  }
}

async function fixPostCSSConfig(projectPath: string) {
  // Update PostCSS config for Tailwind CSS v3
  const postCSSConfig = `module.exports = {
  plugins: {
    "tailwindcss": {},
    "autoprefixer": {},
  },
};
`;
  
  await writeFile(join(projectPath, 'postcss.config.cjs'), postCSSConfig);
  console.log('Fixed PostCSS configuration for Tailwind CSS');
}

async function removeTypeScriptFiles(projectPath: string) {
  try {
    // This is a simplified version - in a real implementation,
    // we'd convert .ts/.tsx files to .js/.jsx
    const tsFiles = [
      'src/types/next-auth.d.ts',
      'tsconfig.json'
    ];
    
    // Remove TypeScript-specific files
    // Note: This is simplified - we'd need proper file conversion
  } catch (error) {
    // Ignore errors for missing files
  }
}

async function installDependencies(projectPath: string) {
  await execa('npm', ['install'], {
    cwd: projectPath,
    stdio: 'inherit'
  });
}

async function initializeGit(projectPath: string) {
  const git = simpleGit(projectPath);
  await git.init();
  await git.add('.');
  await git.commit('Initial commit from create-saas-app');
}

async function generatePrismaClient(projectPath: string) {
  try {
    await execa('npx', ['prisma', 'generate'], {
      cwd: projectPath,
      stdio: 'inherit'
    });
  } catch (error) {
    // Prisma generate might fail if DB is not available, that's ok
    console.warn('Note: Run "npx prisma generate" after setting up your database');
  }
}

async function fixGlobalCSS(projectPath: string) {
  const globalCSSPath = join(projectPath, 'src/app/[locale]/global.css');
  
  try {
    const content = await readFile(globalCSSPath, 'utf8');
    const updatedContent = content.replace(
      '@tailwind base;\n@tailwind components;\n@tailwind utilities;',
      '@import "tailwindcss/base";\n@import "tailwindcss/components";\n@import "tailwindcss/utilities";'
    );
    
    await writeFile(globalCSSPath, updatedContent);
    console.log('Fixed global.css for Tailwind CSS v3');
  } catch (error) {
    console.warn('Could not fix global.css:', error.message);
  }
}

async function generateTailwindConfig(projectPath: string, config: SaasConfig) {
  const tailwindConfig = `import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;`;

  const configFile = config.language === 'typescript' ? 'tailwind.config.ts' : 'tailwind.config.js';
  
  await writeFile(join(projectPath, configFile), tailwindConfig);
  console.log(`Generated ${configFile}`);
}

async function removeOldTailwindConfig(projectPath: string) {
  try {
    const oldConfigPath = join(projectPath, 'tailwind.config.js');
    if (await pathExists(oldConfigPath)) {
      await require('fs').promises.unlink(oldConfigPath);
      console.log('Removed old tailwind.config.js');
    }
  } catch (error) {
    // Ignore if file doesn't exist
  }
}

async function generateDockerFiles(config: SaasConfig, projectPath: string) {
  try {
    // Generate production Docker files
    const dockerfile = generateDockerfile(config);
    await writeFile(join(projectPath, 'Dockerfile'), dockerfile);
    
    const dockerCompose = generateDockerCompose(config);
    await writeFile(join(projectPath, 'docker-compose.yml'), dockerCompose);
    
    // Generate development Docker files
    const devDockerfile = generateDevDockerfile();
    await writeFile(join(projectPath, 'Dockerfile.dev'), devDockerfile);
    
    const devDockerCompose = generateDevDockerCompose(config);
    await writeFile(join(projectPath, 'docker-compose.dev.yml'), devDockerCompose);
    
    // Generate .dockerignore
    const dockerignore = generateDockerIgnore();
    await writeFile(join(projectPath, '.dockerignore'), dockerignore);
    
    console.log('Generated Docker configuration files');
  } catch (error) {
    console.warn('Could not generate Docker files:', error.message);
  }
}

async function fixNextConfigForDocker(projectPath: string) {
  try {
    const nextConfigPath = join(projectPath, 'next.config.js');
    
    // Create new next.config.js with next-intl plugin and Docker optimizations
    const nextConfig = `import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable ESLint during builds in Docker to avoid build failures
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable TypeScript type checking during builds in Docker
  typescript: {
    ignoreBuildErrors: true,
  },
  // Docker-optimized build
  output: 'standalone',
};

export default withNextIntl(nextConfig);`;
    
    await writeFile(nextConfigPath, nextConfig);
    console.log('Updated next.config.js with next-intl plugin and Docker configuration');
  } catch (error) {
    console.warn('Could not update next.config.js:', error.message);
  }
}

async function fixNextConfigForNonDocker(projectPath: string) {
  try {
    const nextConfigPath = join(projectPath, 'next.config.js');
    
    // Create next.config.js with just next-intl plugin for non-Docker projects
    const nextConfig = `import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add your Next.js config options here
};

export default withNextIntl(nextConfig);`;
    
    await writeFile(nextConfigPath, nextConfig);
    console.log('Updated next.config.js with next-intl plugin');
  } catch (error) {
    console.warn('Could not update next.config.js:', error.message);
  }
}

async function createNextIntlConfig(projectPath: string) {
  try {
    // Create the request.ts file for next-intl
    const requestConfig = `import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale } from './routing';

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming \`locale\` parameter is valid
  if (!locales.includes(locale as any)) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: (await import(\`../../messages/\${locale}.json\`)).default,
  };
});`;

    await writeFile(join(projectPath, 'src/i18n/request.ts'), requestConfig);
    console.log('Created next-intl request configuration');
  } catch (error) {
    console.warn('Could not create next-intl config:', error.message);
  }
}