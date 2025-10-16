/**
 * Simple Job Queue System
 * Lightweight alternative to BullMQ for content generation pipeline
 */

type JobStatus = 'pending' | 'processing' | 'completed' | 'failed';

interface Job<T = any> {
  id: string;
  type: string;
  data: T;
  status: JobStatus;
  attempts: number;
  maxAttempts: number;
  error?: string;
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
}

type JobHandler<T = any> = (data: T) => Promise<void>;

export class SimpleQueue {
  private jobs: Map<string, Job> = new Map();
  private handlers: Map<string, JobHandler> = new Map();
  private processing: boolean = false;
  private maxConcurrent: number = 1;
  private currentlyProcessing: number = 0;

  constructor(options?: { maxConcurrent?: number }) {
    this.maxConcurrent = options?.maxConcurrent || 1;
  }

  /**
   * Register a job handler
   */
  registerHandler<T>(jobType: string, handler: JobHandler<T>) {
    this.handlers.set(jobType, handler as JobHandler);
  }

  /**
   * Add a job to the queue
   */
  async addJob<T>(
    jobType: string,
    data: T,
    options?: { maxAttempts?: number }
  ): Promise<string> {
    const jobId = `${jobType}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const job: Job<T> = {
      id: jobId,
      type: jobType,
      data,
      status: 'pending',
      attempts: 0,
      maxAttempts: options?.maxAttempts || 3,
      createdAt: new Date(),
    };

    this.jobs.set(jobId, job);

    // Start processing if not already running
    if (!this.processing) {
      this.startProcessing();
    }

    return jobId;
  }

  /**
   * Get job status
   */
  getJob(jobId: string): Job | undefined {
    return this.jobs.get(jobId);
  }

  /**
   * Get all jobs
   */
  getAllJobs(): Job[] {
    return Array.from(this.jobs.values());
  }

  /**
   * Get jobs by status
   */
  getJobsByStatus(status: JobStatus): Job[] {
    return Array.from(this.jobs.values()).filter(job => job.status === status);
  }

  /**
   * Start processing jobs
   */
  private async startProcessing() {
    if (this.processing) return;

    this.processing = true;

    while (this.processing) {
      // Get pending jobs
      const pendingJobs = this.getJobsByStatus('pending');

      if (pendingJobs.length === 0) {
        // No more jobs, stop processing
        this.processing = false;
        break;
      }

      // Process jobs up to max concurrent limit
      while (
        this.currentlyProcessing < this.maxConcurrent &&
        pendingJobs.length > 0
      ) {
        const job = pendingJobs.shift();
        if (job) {
          this.processJob(job);
        }
      }

      // Wait a bit before checking again
      await this.sleep(100);
    }
  }

  /**
   * Process a single job
   */
  private async processJob(job: Job) {
    this.currentlyProcessing++;

    try {
      // Update job status
      job.status = 'processing';
      job.startedAt = new Date();
      job.attempts++;

      // Get handler
      const handler = this.handlers.get(job.type);

      if (!handler) {
        throw new Error(`No handler registered for job type: ${job.type}`);
      }

      // Execute handler
      await handler(job.data);

      // Mark as completed
      job.status = 'completed';
      job.completedAt = new Date();

      console.log(`✅ Job ${job.id} completed`);
    } catch (error) {
      console.error(`❌ Job ${job.id} failed:`, error);

      job.error = error instanceof Error ? error.message : 'Unknown error';

      // Retry if attempts remaining
      if (job.attempts < job.maxAttempts) {
        job.status = 'pending';
        console.log(`🔄 Retrying job ${job.id} (attempt ${job.attempts + 1}/${job.maxAttempts})`);
      } else {
        job.status = 'failed';
        console.log(`💀 Job ${job.id} failed after ${job.attempts} attempts`);
      }
    } finally {
      this.currentlyProcessing--;
    }
  }

  /**
   * Clear completed jobs
   */
  clearCompleted() {
    const completed = this.getJobsByStatus('completed');
    completed.forEach(job => this.jobs.delete(job.id));
    return completed.length;
  }

  /**
   * Clear all jobs
   */
  clearAll() {
    const count = this.jobs.size;
    this.jobs.clear();
    return count;
  }

  /**
   * Stop processing
   */
  stop() {
    this.processing = false;
  }

  /**
   * Helper: Sleep for ms
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Singleton instance
let queueInstance: SimpleQueue | null = null;

export function getQueue(): SimpleQueue {
  if (!queueInstance) {
    queueInstance = new SimpleQueue({ maxConcurrent: 1 });
  }
  return queueInstance;
}
