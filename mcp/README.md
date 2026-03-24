# findskills-mcp

MCP Server for [FindSkills](https://findskills.org) — search and discover 15,000+ AI Agent Skills via the [Model Context Protocol](https://modelcontextprotocol.io).

## Quick Start

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

### Other MCP Clients

```bash
npx findskills-mcp
```

The server communicates over stdio using the MCP protocol.

## Tools

| Tool | Description |
|------|-------------|
| `search_skills` | Search by keyword, ranked by relevance |
| `list_skills` | Browse/filter by category, source, safety, quality |
| `get_skill` | Full details for a specific skill |
| `get_stats` | Dataset overview (total count, distributions) |
| `list_tags` | All tags with usage counts |

### search_skills

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | string | yes | Search keyword |
| `limit` | number | no | Max results (default 20, max 100) |

### list_skills

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `category` | enum | no | One of: search, coding, data, communication, media, automation, security, ai-ml, devops, finance, productivity, integration, other |
| `source` | enum | no | clawhub, github, manual |
| `auth_type` | enum | no | none, api_key, oauth2, bearer |
| `sort` | enum | no | updated, added, stars, quality, safety, name |
| `min_quality` | number | no | Minimum quality score (0-100) |
| `min_safety` | number | no | Minimum safety score (0-100) |
| `limit` | number | no | Results per page (default 20) |
| `offset` | number | no | Pagination offset |

### get_skill

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | yes | Skill ID |

### get_stats

No parameters.

### list_tags

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `limit` | number | no | Max tags (default 50) |

## Requirements

- Node.js >= 20.0.0

## License

MIT
