# FindSkills CLI & MCP Server

Search and discover **30,000+ AI Agent Skills** from your terminal or connect via [Model Context Protocol](https://modelcontextprotocol.io).

Powered by [FindSkills](https://findskills.org) — the open directory of AI agent skills.

## Packages

| Package | Description | Install |
|---------|-------------|---------|
| [`findskills`](./cli) | CLI tool to search skills from the terminal | `npx findskills "web scraping"` |
| [`findskills-mcp`](./mcp) | MCP Server for AI agents (Claude, etc.) | `npx findskills-mcp` |

## CLI Quick Start

```bash
# Search for skills
npx findskills "web scraping"
npx findskills "database connector"
npx findskills "slack automation"
```

## MCP Server Quick Start

### Claude Desktop

Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "findskills": {
      "command": "npx",
      "args": ["-y", "findskills-mcp"]
    }
  }
}
```

### Claude Code

```bash
claude mcp add findskills -- npx -y findskills-mcp
```

## MCP Tools

| Tool | Description |
|------|-------------|
| `search_skills` | Search by keyword, ranked by relevance |
| `list_skills` | Browse/filter by category, source, safety, quality |
| `get_skill` | Full details for a specific skill |
| `get_stats` | Dataset overview (total count, distributions) |
| `list_tags` | All tags with usage counts |

See [MCP README](./mcp/README.md) for full API documentation.

## License

MIT
