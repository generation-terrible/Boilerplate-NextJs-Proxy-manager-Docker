#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { createSaasApp } from './commands/create';
import { getPackageInfo } from './utils/package';

async function main() {
  const packageInfo = getPackageInfo();
  
  const program = new Command()
    .name('create-saas-app')
    .description('Create a production-ready SaaS application with Next.js')
    .version(packageInfo.version)
    .argument('[name]', 'Name of the project')
    .option('-t, --template <template>', 'Template to use', 'base')
    .option('--typescript', 'Use TypeScript')
    .option('--javascript', 'Use JavaScript')
    .option('--tailwind', 'Include Tailwind CSS')
    .option('--shadcn', 'Include shadcn/ui components')
    .option('--stripe', 'Include Stripe integration')
    .option('--multi-tenant', 'Include multi-tenancy support')
    .option('--docker', 'Include Docker configuration')
    .option('--skip-install', 'Skip package installation')
    .option('--skip-git', 'Skip git initialization')
    .action(async (name, options) => {
      console.log(chalk.cyan('✨ Welcome to Create SaaS App!'));
      console.log(chalk.gray('Creating a production-ready SaaS application...\\n'));
      
      try {
        await createSaasApp(name, options);
      } catch (error) {
        console.error(chalk.red('❌ Error:'), error instanceof Error ? error.message : 'Unknown error');
        process.exit(1);
      }
    });

  // Add help examples
  program.addHelpText('after', `
${chalk.bold('Examples:')}
  ${chalk.gray('# Create a basic SaaS app')}
  $ npx create-saas-app my-saas

  ${chalk.gray('# Create with specific options')}
  $ npx create-saas-app my-saas --typescript --stripe --multi-tenant --docker

  ${chalk.gray('# Use a specific template')}
  $ npx create-saas-app my-saas --template=enterprise

${chalk.bold('Available templates:')}
  - ${chalk.cyan('base')}        Basic Next.js SaaS setup
  - ${chalk.cyan('stripe')}      Includes Stripe billing
  - ${chalk.cyan('enterprise')}  Full-featured SaaS with multi-tenancy
`);

  await program.parseAsync();
}

main().catch((error) => {
  console.error(chalk.red('Unexpected error:'), error);
  process.exit(1);
});