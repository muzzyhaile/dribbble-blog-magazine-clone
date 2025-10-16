/**
 * OpenRouter AI Provider
 * Wrapper for OpenRouter API (GLM 4.6 and other models)
 */

import { AI_CONFIG } from '../config';

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatResponse {
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export class OpenRouterProvider {
  private apiKey: string;
  private baseUrl: string;
  private model: string;

  constructor() {
    this.apiKey = AI_CONFIG.openRouter.apiKey;
    this.baseUrl = AI_CONFIG.openRouter.baseUrl;
    this.model = AI_CONFIG.openRouter.model;

    if (!this.apiKey) {
      throw new Error('OpenRouter API key is required');
    }
  }

  /**
   * Send a chat completion request
   */
  async chat(
    messages: ChatMessage[],
    options?: {
      temperature?: number;
      maxTokens?: number;
      model?: string;
    }
  ): Promise<ChatResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
          'X-Title': 'AI Blog Generator',
        },
        body: JSON.stringify({
          model: options?.model || this.model,
          messages,
          temperature: options?.temperature ?? AI_CONFIG.openRouter.temperature,
          max_tokens: options?.maxTokens ?? AI_CONFIG.openRouter.maxTokens,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`OpenRouter API error: ${response.status} - ${error}`);
      }

      const data = await response.json();

      return {
        content: data.choices[0]?.message?.content || '',
        usage: data.usage ? {
          promptTokens: data.usage.prompt_tokens,
          completionTokens: data.usage.completion_tokens,
          totalTokens: data.usage.total_tokens,
        } : undefined,
      };
    } catch (error) {
      console.error('OpenRouter chat error:', error);
      throw error;
    }
  }

  /**
   * Simple prompt completion (convenience method)
   */
  async complete(
    prompt: string,
    systemPrompt?: string,
    options?: {
      temperature?: number;
      maxTokens?: number;
    }
  ): Promise<string> {
    const messages: ChatMessage[] = [];

    if (systemPrompt) {
      messages.push({ role: 'system', content: systemPrompt });
    }

    messages.push({ role: 'user', content: prompt });

    const response = await this.chat(messages, options);
    return response.content;
  }

  /**
   * Generate structured JSON output
   */
  async generateJSON<T>(
    prompt: string,
    systemPrompt?: string,
    options?: {
      temperature?: number;
      maxTokens?: number;
    }
  ): Promise<T> {
    const fullPrompt = `${prompt}\n\nRespond ONLY with valid JSON. No markdown, no explanations.`;
    const content = await this.complete(fullPrompt, systemPrompt, options);

    try {
      // Remove markdown code blocks if present
      const cleaned = content
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();

      return JSON.parse(cleaned);
    } catch (error) {
      console.error('Failed to parse JSON response:', content);
      throw new Error('AI returned invalid JSON');
    }
  }
}

// Singleton instance
let openRouterInstance: OpenRouterProvider | null = null;

export function getOpenRouter(): OpenRouterProvider {
  if (!openRouterInstance) {
    openRouterInstance = new OpenRouterProvider();
  }
  return openRouterInstance;
}
