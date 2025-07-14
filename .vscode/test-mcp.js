#!/usr/bin/env node

/**
 * Test script to validate Supabase MCP server setup
 * Run with: node .vscode/test-mcp.js
 */

const { spawn } = require('child_process');
const path = require('path');

// Load environment variables from .env.local
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

console.log('🧪 Testing Supabase MCP Server Setup...\n');

// Check if required environment variables are set
const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY'
];

console.log('📋 Checking environment variables...');
let missingVars = [];

requiredEnvVars.forEach(varName => {
  if (process.env[varName]) {
    console.log(`✅ ${varName}: ${process.env[varName].substring(0, 20)}...`);
  } else {
    console.log(`❌ ${varName}: Not found`);
    missingVars.push(varName);
  }
});

if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.log(`✅ SUPABASE_SERVICE_ROLE_KEY: ${process.env.SUPABASE_SERVICE_ROLE_KEY.substring(0, 20)}...`);
} else {
  console.log(`⚠️  SUPABASE_SERVICE_ROLE_KEY: Not found (optional but recommended)`);
}

if (missingVars.length > 0) {
  console.log(`\n❌ Missing required environment variables: ${missingVars.join(', ')}`);
  console.log('Please add them to your .env.local file');
  process.exit(1);
}

console.log('\n📦 Checking MCP server package...');

try {
  require.resolve('@supabase/mcp-server-supabase');
  console.log('✅ @supabase/mcp-server-supabase is installed');
} catch (error) {
  console.log('❌ @supabase/mcp-server-supabase is not installed');
  console.log('Run: npm install -D @supabase/mcp-server-supabase');
  process.exit(1);
}

console.log('\n🚀 Testing MCP server startup...');

// Use proper command for Windows
const isWindows = process.platform === 'win32';
const command = isWindows ? 'npx.cmd' : 'npx';

const mcpProcess = spawn(command, ['@supabase/mcp-server-supabase'], {
  stdio: 'pipe',
  env: { ...process.env },
  shell: isWindows
});

let output = '';
let timeout;

mcpProcess.stdout.on('data', (data) => {
  output += data.toString();
});

mcpProcess.stderr.on('data', (data) => {
  output += data.toString();
});

timeout = setTimeout(() => {
  mcpProcess.kill();
  if (output.includes('error') || output.includes('Error')) {
    console.log('❌ MCP server failed to start:');
    console.log(output);
    process.exit(1);
  } else {
    console.log('✅ MCP server started successfully!');
    console.log('\n🎉 Supabase MCP server setup is complete!');
    console.log('\nNext steps:');
    console.log('1. Start the MCP server using VS Code tasks or the command palette');
    console.log('2. Begin using Supabase MCP capabilities in your project');
    process.exit(0);
  }
}, 5000);

mcpProcess.on('close', (code) => {
  clearTimeout(timeout);
  if (code === 0) {
    console.log('✅ MCP server test completed successfully');
  } else {
    console.log(`❌ MCP server exited with code ${code}`);
    console.log(output);
  }
});
