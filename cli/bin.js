#!/usr/bin/env node

const BOLD = '\x1b[1m';
const DIM = '\x1b[2m';
const CYAN = '\x1b[36m';
const YELLOW = '\x1b[33m';
const RESET = '\x1b[0m';

const query = process.argv.slice(2).join(' ').trim();

if (!query) {
  console.log(`\n  ${BOLD}findskills${RESET} — Search 15,000+ AI agent skills\n`);
  console.log(`  ${DIM}Usage:${RESET}  findskills <query>\n`);
  console.log(`  ${DIM}Examples:${RESET}`);
  console.log(`    findskills "web scraping"`);
  console.log(`    findskills github automation`);
  console.log(`    findskills database\n`);
  process.exit(0);
}

const API = 'https://findskills.org/api/v1/search';

try {
  const res = await fetch(`${API}?q=${encodeURIComponent(query)}&limit=10&source=cli`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const data = await res.json();

  if (!data.skills?.length) {
    console.log(`\n  No skills found for "${query}"\n`);
    process.exit(0);
  }

  console.log(`\n  ${DIM}${data.total} results for${RESET} "${query}"${data.total > 10 ? ` ${DIM}(showing top 10)${RESET}` : ''}\n`);

  for (const s of data.skills) {
    const score = s.quality_score != null ? ` ${YELLOW}★ ${s.quality_score}${RESET}` : '';
    console.log(`  ${BOLD}${CYAN}${s.name}${RESET}${score}`);
    if (s.description) console.log(`  ${s.description}`);
    if (s.tags?.length) console.log(`  ${DIM}${s.tags.map(t => `[${t}]`).join(' ')}${RESET}`);
    if (s.url) console.log(`  ${DIM}→ ${s.url}${RESET}`);
    console.log();
  }
} catch (err) {
  console.error(`\n  ${BOLD}Error:${RESET} ${err.message}\n`);
  process.exit(1);
}
