/**
 * AI Configuration
 * Centralized configuration for all AI providers
 */

export const AI_CONFIG = {
  // OpenRouter Configuration
  openRouter: {
    apiKey: process.env.OPENROUTER_API_KEY || '',
    baseUrl: 'https://openrouter.ai/api/v1',
    model: process.env.AI_MODEL || 'deepseek/deepseek-chat', // GLM 4.6 alternative
    temperature: 0.7,
    maxTokens: 4000,
  },

  // Fal AI Configuration
  fal: {
    apiKey: process.env.FAL_API_KEY || '',
    imageModel: process.env.IMAGE_MODEL || 'fal-ai/flux/schnell',
    imageSize: {
      width: 1472,
      height: 832,
    },
  },

  // Supabase Configuration
  supabase: {
    url: process.env.SUPABASE_URL || '',
    anonKey: process.env.SUPABASE_ANON_KEY || '',
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  },

  // Content Generation Settings
  content: {
    minWordCount: 1000,
    maxWordCount: 2000,
    targetReadingLevel: 70, // Flesch score
    articlesPerBatch: 10,
  },

  // Pipeline Settings
  pipeline: {
    maxRetries: 3,
    retryDelay: 5000, // ms
    timeout: 300000, // 5 minutes
  },
} as const;

// Validate required environment variables
export function validateConfig() {
  const required = [
    'OPENROUTER_API_KEY',
    'FAL_API_KEY',
    'SUPABASE_URL',
    'SUPABASE_ANON_KEY',
  ];

  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      'Please check your .env file.'
    );
  }
}
