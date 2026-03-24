import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { searchSkills, listSkills, getSkill, getStats, listTags } from './api.js';

function text(content) {
  return { content: [{ type: 'text', text: typeof content === 'string' ? content : JSON.stringify(content, null, 2) }] };
}

function error(err) {
  return { content: [{ type: 'text', text: `Error: ${err.message}` }], isError: true };
}

export function createServer() {
  const server = new McpServer({ name: 'findskills', version: '0.1.0' });

  server.registerTool('search_skills', {
    title: 'Search Skills',
    description: 'Search FindSkills directory by keyword. Returns skills ranked by relevance.',
    inputSchema: {
      query: z.string().describe('Search keyword (e.g. "web scraping", "slack", "database")'),
      limit: z.number().int().min(1).max(100).default(20).describe('Max results (default 20)'),
    },
  }, async ({ query, limit }) => {
    try { return text(await searchSkills(query, limit)); }
    catch (err) { return error(err); }
  });

  server.registerTool('list_skills', {
    title: 'List Skills',
    description: 'Browse and filter skills by category, source, safety tier, and more. Supports pagination.',
    inputSchema: {
      category: z.enum(['search', 'coding', 'data', 'communication', 'media', 'automation', 'security', 'ai-ml', 'devops', 'finance', 'productivity', 'integration', 'other']).optional().describe('Filter by category'),
      source: z.enum(['clawhub', 'github', 'manual']).optional().describe('Filter by data source'),
      auth_type: z.enum(['none', 'api_key', 'oauth2', 'bearer']).optional().describe('Filter by auth requirement'),
      sort: z.enum(['updated', 'added', 'stars', 'quality', 'safety', 'name']).default('updated').describe('Sort order'),
      min_quality: z.number().int().min(0).max(100).optional().describe('Minimum quality score (0-100)'),
      min_safety: z.number().int().min(0).max(100).optional().describe('Minimum safety score (0-100)'),
      limit: z.number().int().min(1).max(100).default(20).describe('Results per page'),
      offset: z.number().int().min(0).default(0).describe('Pagination offset'),
    },
  }, async (params) => {
    try { return text(await listSkills(params)); }
    catch (err) { return error(err); }
  });

  server.registerTool('get_skill', {
    title: 'Get Skill Details',
    description: 'Get full details for a specific skill including auth requirements, safety signals, and quality signals.',
    inputSchema: {
      id: z.string().describe('Skill ID (e.g. "clawhub-web-search")'),
    },
  }, async ({ id }) => {
    try { return text(await getSkill(id)); }
    catch (err) { return error(err); }
  });

  server.registerTool('get_stats', {
    title: 'Get Dataset Stats',
    description: 'Get FindSkills dataset overview: total skill count, category/source/auth breakdowns, quality and safety distributions. Call this first to understand the dataset.',
    inputSchema: {},
  }, async () => {
    try { return text(await getStats()); }
    catch (err) { return error(err); }
  });

  server.registerTool('list_tags', {
    title: 'List Tags',
    description: 'List all skill tags with usage counts, sorted by popularity.',
    inputSchema: {
      limit: z.number().int().min(1).max(500).default(50).describe('Max tags to return'),
    },
  }, async ({ limit }) => {
    try { return text(await listTags(limit)); }
    catch (err) { return error(err); }
  });

  return server;
}

export async function startServer() {
  const server = createServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('FindSkills MCP Server running on stdio');
}
