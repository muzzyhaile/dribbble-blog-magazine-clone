/**
 * Fal AI Provider
 * Wrapper for Fal AI image generation (NanoBanana Gemini model)
 */

import * as fal from '@fal-ai/serverless-client';
import { AI_CONFIG } from '../config';

interface ImageGenerationOptions {
  prompt: string;
  width?: number;
  height?: number;
  numImages?: number;
}

interface GeneratedImage {
  url: string;
  width: number;
  height: number;
  contentType: string;
}

export class FalProvider {
  constructor() {
    const apiKey = AI_CONFIG.fal.apiKey;

    if (!apiKey) {
      throw new Error('Fal AI API key is required');
    }

    // Configure Fal client
    fal.config({
      credentials: apiKey,
    });
  }

  /**
   * Generate an image using Fal AI
   */
  async generateImage(options: ImageGenerationOptions): Promise<GeneratedImage> {
    try {
      const result = await fal.subscribe(AI_CONFIG.fal.imageModel, {
        input: {
          prompt: options.prompt,
          image_size: {
            width: options.width || AI_CONFIG.fal.imageSize.width,
            height: options.height || AI_CONFIG.fal.imageSize.height,
          },
          num_images: options.numImages || 1,
        },
        logs: true,
        onQueueUpdate: (update) => {
          if (update.status === 'IN_PROGRESS') {
            console.log('Image generation in progress...');
          }
        },
      });

      // Extract the first image from the result
      const image = (result as any).images?.[0];

      if (!image || !image.url) {
        throw new Error('No image generated');
      }

      return {
        url: image.url,
        width: image.width || options.width || AI_CONFIG.fal.imageSize.width,
        height: image.height || options.height || AI_CONFIG.fal.imageSize.height,
        contentType: image.content_type || 'image/jpeg',
      };
    } catch (error) {
      console.error('Fal AI image generation error:', error);
      throw error;
    }
  }

  /**
   * Generate a blog featured image with optimized prompt
   */
  async generateBlogImage(
    title: string,
    altText: string,
    imagePrompt?: string
  ): Promise<GeneratedImage> {
    // Use provided prompt or create one from title/alt text
    const prompt = imagePrompt || this.createImagePrompt(title, altText);

    console.log('Generating image with prompt:', prompt);

    return this.generateImage({
      prompt,
      width: AI_CONFIG.fal.imageSize.width,
      height: AI_CONFIG.fal.imageSize.height,
    });
  }

  /**
   * Create an optimized image prompt from blog metadata
   */
  private createImagePrompt(title: string, altText: string): string {
    // Simple prompt creation - can be enhanced with AI later
    return `A professional, modern, and visually striking image representing: ${altText}. 
    Style: Clean, contemporary, high-quality photography or digital art. 
    Mood: Professional and engaging. 
    Context: ${title}. 
    No text or words in the image.`;
  }

  /**
   * Download image from URL and return as buffer
   */
  async downloadImage(url: string): Promise<Buffer> {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to download image: ${response.status}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      return Buffer.from(arrayBuffer);
    } catch (error) {
      console.error('Image download error:', error);
      throw error;
    }
  }
}

// Singleton instance
let falInstance: FalProvider | null = null;

export function getFal(): FalProvider {
  if (!falInstance) {
    falInstance = new FalProvider();
  }
  return falInstance;
}
