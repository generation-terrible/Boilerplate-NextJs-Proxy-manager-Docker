import chalk from 'chalk';
import ora from 'ora';
import { existsSync } from 'fs';
import { validateProjectName, validateProjectPath, getProjectPath } from '../utils/validation';
import { promptForConfig, SaasConfig } from '../utils/prompts';
import { setupProject } from '../templates/setup';

export async function createSaasApp(name?: string, options: any = {}) {
  // Step 1: Get configuration
  let config: SaasConfig;
  
  if (name && Object.keys(options).some(key => ['typescript', 'javascript', 'stripe', 'multi-tenant', 'docker'].includes(key))) {
    // Use CLI options without prompts
    config = {
      name,
      template: options.template || 'base',
      language: options.typescript ? 'typescript' : 'javascript',
      styling: options.tailwind ? 'tailwind' : 'tailwind',
      uiLibrary: options.shadcn ? 'shadcn' : 'shadcn',
      database: 'postgresql',
      auth: 'nextauth',
      features: {
        stripe: options.stripe || false,
        multiTenant: options['multi-tenant'] || false,
        errorTracking: false,
        analytics: false
      },
      deployment: options.docker ? 'docker' : 'vercel'
    };
  } else {
    // Interactive mode
    config = await promptForConfig(name, options);
  }

  // Step 2: Validate project name
  const nameValidation = validateProjectName(config.name);
  if (!nameValidation.valid) {
    console.error(chalk.red('❌ Invalid project name:'));
    nameValidation.problems?.forEach(problem => {
      console.error(chalk.red(`  • ${problem}`));
    });
    process.exit(1);
  }

  // Step 3: Validate project path
  const projectPath = getProjectPath(config.name);
  const pathValidation = validateProjectPath(projectPath);
  if (!pathValidation.valid) {
    console.error(chalk.red('❌'), pathValidation.error);
    process.exit(1);
  }

  // Step 4: Show summary
  console.log(chalk.cyan('\\n📋 Project Configuration:'));
  console.log(chalk.gray('  Name:'), chalk.white(config.name));
  console.log(chalk.gray('  Language:'), chalk.white(config.language));
  console.log(chalk.gray('  Styling:'), chalk.white(config.styling));
  console.log(chalk.gray('  UI Library:'), chalk.white(config.uiLibrary));
  console.log(chalk.gray('  Database:'), chalk.white(config.database));
  console.log(chalk.gray('  Auth:'), chalk.white(config.auth));
  console.log(chalk.gray('  Features:'));
  console.log(chalk.gray('    - Stripe:'), config.features.stripe ? chalk.green('✓') : chalk.red('✗'));
  console.log(chalk.gray('    - Multi-tenant:'), config.features.multiTenant ? chalk.green('✓') : chalk.red('✗'));
  console.log(chalk.gray('    - Error tracking:'), config.features.errorTracking ? chalk.green('✓') : chalk.red('✗'));
  console.log(chalk.gray('    - Analytics:'), config.features.analytics ? chalk.green('✓') : chalk.red('✗'));
  console.log(chalk.gray('  Deployment:'), chalk.white(config.deployment));
  
  // Step 5: Create project
  const spinner = ora('Creating project...').start();
  
  try {
    await setupProject(config, projectPath, {
      skipInstall: options['skip-install'],
      skipGit: options['skip-git']
    });
    
    spinner.succeed(chalk.green('✅ Project created successfully!'));
    
    // Step 6: Show next steps
    console.log(chalk.cyan('\\n🚀 Next steps:'));
    console.log(chalk.white(`  1. cd ${config.name}`));
    console.log(chalk.white(`  2. cp .env.example .env`));
    console.log(chalk.white(`  3. Configure your environment variables`));
    
    if (config.deployment === 'docker') {
      if (!options['skip-install']) {
        console.log(chalk.white(`  4. npm run docker:setup`));
        console.log(chalk.gray(`     (This will start containers and setup database)`));
        console.log(chalk.yellow('\\n  Or for production:'));
        console.log(chalk.white(`    npm run docker:up`));
      } else {
        console.log(chalk.white(`  4. npm install`));
        console.log(chalk.white(`  5. npm run docker:setup`));
        console.log(chalk.gray(`     (This will start containers and setup database)`));
      }
    } else {
      if (!options['skip-install']) {
        console.log(chalk.white(`  4. npm run dev`));
      } else {
        console.log(chalk.white(`  4. npm install`));
        console.log(chalk.white(`  5. npm run dev`));
      }
    }
    
    console.log(chalk.cyan('\\n📚 Documentation:'));
    console.log(chalk.gray('  • Project structure: README.md'));
    console.log(chalk.gray('  • Environment setup: .env.example'));
    
    if (config.deployment === 'docker') {
      console.log(chalk.gray('  • Docker commands: npm run docker:help'));
      console.log(chalk.gray('  • Development: docker-compose.dev.yml'));
      console.log(chalk.gray('  • Production: docker-compose.yml'));
    }
    
    if (config.features.stripe) {
      console.log(chalk.gray('  • Stripe setup: docs/stripe.md'));
    }
    
    if (config.features.multiTenant) {
      console.log(chalk.gray('  • Multi-tenancy: docs/multi-tenant.md'));
    }
    
    console.log(chalk.green('\\n🎉 Happy coding!'));
    
  } catch (error) {
    spinner.fail(chalk.red('❌ Failed to create project'));
    throw error;
  }
}