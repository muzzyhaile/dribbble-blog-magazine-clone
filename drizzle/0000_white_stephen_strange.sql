CREATE TABLE `articles` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`content` text,
	`category` text NOT NULL,
	`source` text NOT NULL,
	`author` text,
	`published_at` text NOT NULL,
	`image_url` text,
	`article_url` text NOT NULL,
	`trending_score` real DEFAULT 0,
	`view_count` integer DEFAULT 0,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
