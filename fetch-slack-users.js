/**
 * Fetch Slack Users Script
 *
 * This script fetches user information from your Slack workspace
 * and saves it to slack-users.json for use in the autocomplete feature.
 *
 * Setup:
 * 1. Go to https://api.slack.com/apps
 * 2. Create a new app or select an existing one
 * 3. Go to "OAuth & Permissions"
 * 4. Add the "users:read" and "users:read.email" scopes
 * 5. Install the app to your workspace
 * 6. Copy the "Bot User OAuth Token" (starts with xoxb-)
 * 7. Set it as SLACK_BOT_TOKEN environment variable or replace below
 *
 * Usage:
 * SLACK_BOT_TOKEN=xoxb-your-token-here node fetch-slack-users.js
 */

const fs = require('fs');
const https = require('https');

// Get token from environment variable or set it here
const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN || 'YOUR_SLACK_BOT_TOKEN_HERE';

if (!SLACK_BOT_TOKEN || SLACK_BOT_TOKEN === 'YOUR_SLACK_BOT_TOKEN_HERE') {
    console.error('❌ Error: Please set your Slack Bot Token');
    console.error('\nOption 1: Set environment variable:');
    console.error('  SLACK_BOT_TOKEN=xoxb-your-token-here node fetch-slack-users.js');
    console.error('\nOption 2: Edit this file and replace YOUR_SLACK_BOT_TOKEN_HERE with your token');
    console.error('\nTo get a token:');
    console.error('  1. Visit https://api.slack.com/apps');
    console.error('  2. Create/select your app');
    console.error('  3. Go to "OAuth & Permissions"');
    console.error('  4. Add scopes: users:read, users:read.email');
    console.error('  5. Install app to workspace');
    console.error('  6. Copy "Bot User OAuth Token"\n');
    process.exit(1);
}

/**
 * Make a request to Slack API
 */
function slackRequest(endpoint) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'slack.com',
            path: `/api/${endpoint}`,
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${SLACK_BOT_TOKEN}`,
                'Content-Type': 'application/json'
            }
        };

        const req = https.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    const jsonData = JSON.parse(data);
                    if (jsonData.ok) {
                        resolve(jsonData);
                    } else {
                        reject(new Error(jsonData.error || 'Unknown error'));
                    }
                } catch (error) {
                    reject(error);
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.end();
    });
}

/**
 * Fetch all users from Slack with pagination support
 */
async function fetchSlackUsers() {
    console.log('🔄 Fetching users from Slack...\n');

    try {
        let allMembers = [];
        let cursor = '';
        let pageCount = 0;

        // Fetch all pages of users
        do {
            pageCount++;
            const endpoint = cursor
                ? `users.list?limit=200&cursor=${encodeURIComponent(cursor)}`
                : 'users.list?limit=200';

            console.log(`   Fetching page ${pageCount}...`);
            const response = await slackRequest(endpoint);

            if (!response.members) {
                break;
            }

            allMembers = allMembers.concat(response.members);
            cursor = response.response_metadata?.next_cursor || '';

            console.log(`   → Got ${response.members.length} users (total so far: ${allMembers.length})`);

        } while (cursor);

        console.log(`\n✅ Fetched ${allMembers.length} total users from ${pageCount} page(s)\n`);

        if (allMembers.length === 0) {
            console.log('⚠️  No users found');
            return;
        }

        // Filter and format users
        const users = allMembers
            .filter(member => {
                // Exclude deleted users, bots (except specific ones), and slackbot
                return !member.deleted &&
                       !member.is_bot &&
                       member.id !== 'USLACKBOT';
            })
            .map(member => ({
                id: member.id,
                name: member.real_name || member.name,
                username: member.name,
                email: member.profile.email || '',
                role: member.profile.title || 'Team Member'
            }))
            .sort((a, b) => a.name.localeCompare(b.name));

        // Create teams object (you can customize this)
        const teams = {
            design: [],
            product: [],
            engineering: [],
            all: users.map(u => u.id)
        };

        // Save to JSON file
        const outputData = {
            users: users,
            teams: teams,
            lastUpdated: new Date().toISOString(),
            totalUsers: users.length
        };

        fs.writeFileSync(
            'slack-users.json',
            JSON.stringify(outputData, null, 2),
            'utf8'
        );

        console.log('✅ Successfully fetched and saved users!\n');
        console.log(`📊 Total users: ${users.length}`);
        console.log(`📁 Saved to: slack-users.json\n`);
        console.log('📝 Sample users:');
        users.slice(0, 5).forEach(user => {
            console.log(`   • ${user.name} (@${user.username}) - ${user.role}`);
        });

        if (users.length > 5) {
            console.log(`   ... and ${users.length - 5} more`);
        }

        console.log('\n💡 Tip: You can manually edit slack-users.json to:');
        console.log('   - Update user roles');
        console.log('   - Organize users into teams');
        console.log('   - Remove users you don\'t need\n');

    } catch (error) {
        console.error('❌ Error fetching users:', error.message);

        if (error.message === 'invalid_auth' || error.message === 'not_authed') {
            console.error('\n⚠️  Authentication failed. Please check:');
            console.error('   1. Your token is correct and starts with "xoxb-"');
            console.error('   2. The token hasn\'t been revoked');
            console.error('   3. The app is installed to your workspace\n');
        } else if (error.message === 'missing_scope') {
            console.error('\n⚠️  Missing permissions. Please add these scopes:');
            console.error('   - users:read');
            console.error('   - users:read.email\n');
        }

        process.exit(1);
    }
}

// Run the script
fetchSlackUsers();
