import inquirer from 'inquirer';

export interface SaasConfig {
  name: string;
  template: string;
  language: 'typescript' | 'javascript';
  styling: 'tailwind' | 'styled-components' | 'css-modules';
  uiLibrary: 'shadcn' | 'chakra' | 'mantine' | 'none';
  database: 'postgresql' | 'mysql' | 'supabase';
  auth: 'nextauth' | 'supabase' | 'clerk';
  features: {
    stripe: boolean;
    multiTenant: boolean;
    errorTracking: boolean;
    analytics: boolean;
  };
  deployment: 'vercel' | 'docker' | 'none';
}

export async function promptForConfig(initialName?: string, options: any = {}): Promise<SaasConfig> {
  const questions = [];

  // Project name
  if (!initialName) {
    questions.push({
      type: 'input',
      name: 'name',
      message: 'What is your project name?',
      default: 'my-saas-app',
      validate: (input: string) => {
        if (!input || input.trim().length === 0) {
          return 'Project name is required';
        }
        return true;
      }
    });
  }

  // Language (if not specified via CLI)
  if (!options.typescript && !options.javascript) {
    questions.push({
      type: 'list',
      name: 'language',
      message: 'Which language would you like to use?',
      choices: [
        { name: 'TypeScript (recommended)', value: 'typescript' },
        { name: 'JavaScript', value: 'javascript' }
      ],
      default: 'typescript'
    });
  }

  // Styling framework
  questions.push({
    type: 'list',
    name: 'styling',
    message: 'Which styling solution would you like to use?',
    choices: [
      { name: 'Tailwind CSS (recommended)', value: 'tailwind' },
      { name: 'Styled Components', value: 'styled-components' },
      { name: 'CSS Modules', value: 'css-modules' }
    ],
    default: 'tailwind'
  });

  // UI Library
  questions.push({
    type: 'list',
    name: 'uiLibrary',
    message: 'Which UI library would you like to use?',
    choices: [
      { name: 'shadcn/ui (recommended)', value: 'shadcn' },
      { name: 'Chakra UI', value: 'chakra' },
      { name: 'Mantine', value: 'mantine' },
      { name: 'None - I will add my own', value: 'none' }
    ],
    default: 'shadcn'
  });

  // Database
  questions.push({
    type: 'list',
    name: 'database',
    message: 'Which database would you like to use?',
    choices: [
      { name: 'PostgreSQL (recommended)', value: 'postgresql' },
      { name: 'MySQL', value: 'mysql' },
      { name: 'Supabase (PostgreSQL + Auth)', value: 'supabase' }
    ],
    default: 'postgresql'
  });

  // Authentication
  questions.push({
    type: 'list',
    name: 'auth',
    message: 'Which authentication solution would you like to use?',
    choices: [
      { name: 'NextAuth.js (recommended)', value: 'nextauth' },
      { name: 'Supabase Auth', value: 'supabase' },
      { name: 'Clerk', value: 'clerk' }
    ],
    default: 'nextauth'
  });

  // SaaS Features
  questions.push({
    type: 'checkbox',
    name: 'features',
    message: 'Which SaaS features would you like to include?',
    choices: [
      { name: 'Stripe integration (billing & subscriptions)', value: 'stripe', checked: true },
      { name: 'Multi-tenancy (organizations & teams)', value: 'multiTenant', checked: true },
      { name: 'Error tracking (Sentry)', value: 'errorTracking', checked: false },
      { name: 'Analytics (PostHog)', value: 'analytics', checked: false }
    ]
  });

  // Deployment
  questions.push({
    type: 'list',
    name: 'deployment',
    message: 'How would you like to deploy your app?',
    choices: [
      { name: 'Vercel (recommended)', value: 'vercel' },
      { name: 'Docker', value: 'docker' },
      { name: 'I will configure this later', value: 'none' }
    ],
    default: 'vercel'
  });

  const answers = await inquirer.prompt(questions);

  // Process features array into boolean flags
  const featuresArray = answers.features || [];
  const features = {
    stripe: featuresArray.includes('stripe') || options.stripe,
    multiTenant: featuresArray.includes('multiTenant') || options['multi-tenant'],
    errorTracking: featuresArray.includes('errorTracking'),
    analytics: featuresArray.includes('analytics')
  };

  return {
    name: initialName || answers.name,
    template: options.template || 'base',
    language: options.typescript ? 'typescript' : options.javascript ? 'javascript' : answers.language,
    styling: options.tailwind ? 'tailwind' : answers.styling,
    uiLibrary: options.shadcn ? 'shadcn' : answers.uiLibrary,
    database: answers.database,
    auth: answers.auth,
    features,
    deployment: answers.deployment
  };
}