// Frontmatter parser for the content schema. Deliberately minimal:
// flat key: value pairs, quoted strings, string arrays, booleans, ints.
// Kept in-house so content loading stays browser-native (no Node shims).

export function parseFrontmatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { data: {}, content: source }
  return { data: parseYamlish(match[1]), content: match[2] }
}

function parseYamlish(yaml) {
  const data = {}
  for (const line of yaml.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const colon = line.indexOf(':')
    if (colon === -1) continue
    const key = line.slice(0, colon).trim()
    let value = line.slice(colon + 1).trim()

    if (value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean)
    } else if (value === 'true') {
      value = true
    } else if (value === 'false') {
      value = false
    } else if (/^-?\d+$/.test(value)) {
      value = Number(value)
    } else {
      value = value.replace(/^["']|["']$/g, '')
    }
    data[key] = value
  }
  return data
}
