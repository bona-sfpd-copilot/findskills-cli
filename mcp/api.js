import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(join(__dirname, 'package.json'), 'utf8'));
const UA = `${pkg.name}/${pkg.version}`;

const BASE = 'https://findskills.org/api/v1';

async function request(path) {
  const separator = path.includes('?') ? '&' : '?';
  const res = await fetch(`${BASE}${path}${separator}source=mcp`, { redirect: 'follow', headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`FindSkills API error: ${res.status} ${res.statusText}`);
  return res.json();
}

export async function searchSkills(query, limit = 20) {
  return request(`/search?q=${encodeURIComponent(query)}&limit=${limit}`);
}

export async function listSkills({ category, source, auth_type, sort, min_quality, min_safety, limit = 20, offset = 0 } = {}) {
  const params = new URLSearchParams();
  params.set('limit', String(limit));
  params.set('offset', String(offset));
  if (category) params.set('category', category);
  if (source) params.set('source', source);
  if (auth_type) params.set('auth_type', auth_type);
  if (sort) params.set('sort', sort);
  if (min_quality != null) params.set('min_quality', String(min_quality));
  if (min_safety != null) params.set('min_safety', String(min_safety));
  return request(`/skills?${params}`);
}

export async function getSkill(id) {
  return request(`/skills/${encodeURIComponent(id)}`);
}

export async function getStats() {
  return request('/stats');
}

export async function listTags(limit = 50) {
  return request(`/tags?limit=${limit}`);
}
