/**
 * Test AI Providers
 * Simple endpoint to verify OpenRouter and Fal AI are working
 */

import { NextResponse } from 'next/server';
import { getOpenRouter } from '@/lib/ai/providers/openrouter';
import { AI_CONFIG } from '@/lib/ai/config';

export async function GET() {
  try {
    // Test OpenRouter
    const openRouter = getOpenRouter();
    
    const testPrompt = 'Say "Hello from OpenRouter!" in exactly 5 words.';
    const response = await openRouter.complete(testPrompt, undefined, {
      temperature: 0.5,
      maxTokens: 50,
    });

    return NextResponse.json({
      success: true,
      message: 'AI providers are working',
      tests: {
        openRouter: {
          status: 'success',
          model: AI_CONFIG.openRouter.model,
          response: response.trim(),
        },
      },
    });

  } catch (error) {
    console.error('AI test error:', error);
    return NextResponse.json({
      success: false,
      message: 'AI provider test failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
