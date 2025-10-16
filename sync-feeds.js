#!/usr/bin/env node

/**
 * Simple script to sync RSS feeds
 * Usage: node sync-feeds.js
 */

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

async function syncFeeds() {
  console.log('🔄 Starting RSS feed sync...\n');

  try {
    const response = await fetch(`${BASE_URL}/api/sync-rss`, {
      method: 'POST',
    });

    const data = await response.json();

    if (data.success) {
      console.log('✅ Sync completed successfully!\n');
      console.log(`📊 Results:`);
      console.log(`   - Synced: ${data.data.synced} articles`);
      console.log(`   - Skipped: ${data.data.skipped} duplicates`);
      console.log(`   - Feeds fetched: ${data.data.feedsFetched}`);

      if (data.data.feedErrors.length > 0) {
        console.log('\n⚠️  Feed Errors:');
        data.data.feedErrors.forEach(err => {
          console.log(`   - ${err.source}: ${err.error}`);
        });
      }

      if (data.data.syncErrors.length > 0) {
        console.log('\n⚠️  Sync Errors:');
        data.data.syncErrors.forEach(err => {
          console.log(`   - ${err.article}: ${err.error}`);
        });
      }
    } else {
      console.error('❌ Sync failed:', data.message);
      if (data.error) {
        console.error('   Error:', data.error);
      }
    }
  } catch (error) {
    console.error('❌ Failed to sync feeds:', error.message);
    console.error('\n💡 Make sure your dev server is running: npm run dev');
  }
}

// Run the sync
syncFeeds();
