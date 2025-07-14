# Supabase MCP Server Setup

This directory contains the configuration for the Supabase Model Context Protocol (MCP) server integration with VS Code.

## Files Overview

- `settings.json` - VS Code workspace settings including MCP server configuration
- `launch.json` - Debug configurations for running the MCP server
- `tasks.json` - Task definitions for managing the MCP server and development workflow

## Required Environment Variables

Make sure your `.env.local` file contains:

```bash
# Required for MCP server
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Optional but recommended
SUPABASE_ACCESS_TOKEN=your-access-token
DATABASE_URL=postgresql://postgres:[password]@db.your-project.supabase.co:5432/postgres
```

## Getting Your Supabase Keys

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to Settings > API
4. Copy the following:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!)

## Usage

### Starting the MCP Server

1. **Via VS Code Command Palette:**
   - Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
   - Type "Tasks: Run Task"
   - Select "Start Supabase MCP Server"

2. **Via VS Code Tasks:**
   - Go to Terminal > Run Task
   - Select "Start Supabase MCP Server"

3. **Via Command Line:**
   ```bash
   npx @supabase/mcp-server-supabase
   ```

### Available MCP Capabilities

The Supabase MCP server provides the following capabilities:

- **Database Operations**: Query, insert, update, delete operations on your Supabase tables
- **Authentication**: Manage users and authentication
- **Real-time**: Subscribe to real-time changes
- **Storage**: File upload and management
- **Edge Functions**: Invoke Supabase Edge Functions

### Debugging

Use the launch configuration "Start Supabase MCP Server" to debug the MCP server with VS Code's debugger.

## Troubleshooting

### Common Issues

1. **Environment Variables Not Found**
   - Ensure `.env.local` exists and contains all required variables
   - Restart VS Code after adding environment variables

2. **MCP Server Won't Start**
   - Check that `@supabase/mcp-server-supabase` is installed: `npm list @supabase/mcp-server-supabase`
   - Verify your Supabase URL and keys are correct

3. **Connection Errors**
   - Verify your Supabase project is active
   - Check that the service role key has the necessary permissions

### Support

- [Supabase Documentation](https://supabase.com/docs)
- [MCP Documentation](https://spec.modelcontextprotocol.io/)
- [VS Code Tasks Documentation](https://code.visualstudio.com/docs/editor/tasks)
