export const meta = {
  name: 'remote-claude-code-options',
  description: 'Research how Claude Code can be used remotely from an iPhone (SSH vs web/app), verify claims',
  phases: [
    { title: 'Research', detail: 'official docs on web/mobile/desktop remote execution' },
    { title: 'Verify', detail: 'adversarially check each claim' },
  ],
}

const FINDINGS_SCHEMA = {
  type: 'object',
  properties: {
    claims: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          claim: { type: 'string' },
          evidence: { type: 'string', description: 'URL or doc quote supporting it' },
          confidence: { type: 'string', enum: ['high', 'medium', 'low'] },
        },
        required: ['claim', 'evidence', 'confidence'],
      },
    },
    summary: { type: 'string' },
  },
  required: ['claims', 'summary'],
}

const VERDICT_SCHEMA = {
  type: 'object',
  properties: {
    refuted: { type: 'boolean' },
    corrected_claim: { type: 'string', description: 'the accurate version of the claim' },
    reason: { type: 'string' },
  },
  required: ['refuted', 'corrected_claim', 'reason'],
}

const TOPICS = [
  {
    key: 'web',
    prompt: `Research Claude Code on the web (claude.ai/code) as of 2026. Answer PRECISELY, citing official Anthropic docs (docs.claude.com / anthropic.com) via WebSearch/WebFetch:
1. WHERE does the code/agent actually execute — Anthropic's cloud sandbox, or the user's own machine?
2. Does it REQUIRE a GitHub repo connection? Can it work on arbitrary local folders?
3. Can it read/write files that exist ONLY on the user's local Mac (not pushed to git)?
4. How do results get back to the user (PR? branch? direct commit?)
5. Is there any network/internet access restriction in the sandbox?
6. Does it work from a mobile browser on iPhone?
Return concrete claims with evidence URLs. Mark confidence honestly; say "unknown" rather than guessing.`,
  },
  {
    key: 'mobile-app',
    prompt: `Research the Claude iOS/mobile app's support for Claude Code as of 2026. Use WebSearch/WebFetch against official Anthropic docs and release notes:
1. Can the Claude mobile app run or drive Claude Code sessions? If so, what exactly does it connect to?
2. Can the mobile app attach to / control a Claude Code session running on the user's OWN Mac at home? Is there any official "remote session", "teleport", "handoff", or "connect to my machine" feature?
3. Can you start a task on desktop and continue it from the phone, or vice versa?
4. What are the limits vs the terminal CLI (permissions, MCP servers, hooks, skills, subagents, local file access)?
Return concrete claims with evidence URLs. Be explicit about what does NOT exist — do not invent features. Mark confidence honestly.`,
  },
  {
    key: 'cli-remote',
    prompt: `Research using the Claude Code CLI over SSH / on a remote machine as of 2026. Use official docs (docs.claude.com) plus the local install if helpful:
1. Is running \`claude\` inside an SSH session officially supported? Any known caveats (TTY, auth/browser login over SSH, OAuth token, terminal rendering, tmux/screen recommendations, long-running sessions surviving disconnect)?
2. How does authentication work on a headless/remote box (API key vs subscription login)?
3. Does Claude Code have any built-in remote/daemon/server mode, or a way to expose a local session to another device?
4. What breaks or degrades in a phone-sized SSH terminal (interactive prompts, permission dialogs, image display, IDE integration, /commands)?
5. Best practices for keeping a session alive when the phone disconnects.
Return concrete claims with evidence. Mark confidence honestly; say "unknown" rather than guessing.`,
  },
]

phase('Research')
const results = await pipeline(
  TOPICS,
  t => agent(t.prompt, { label: `research:${t.key}`, phase: 'Research', schema: FINDINGS_SCHEMA, agentType: 'claude-code-guide' }),
  (r, t) => {
    if (!r || !r.claims) return null
    const risky = r.claims.filter(c => c.confidence !== 'high').slice(0, 4)
    if (!risky.length) return { topic: t.key, result: r, verdicts: [] }
    return parallel(risky.map(c => () =>
      agent(`Try to REFUTE this claim about Claude Code. Search official Anthropic documentation (docs.claude.com, anthropic.com news/changelog) to check it. Default to refuted=true if you cannot find supporting evidence.

CLAIM: ${c.claim}
STATED EVIDENCE: ${c.evidence}

Return refuted (bool), corrected_claim (the accurate statement, even if the original was right), and reason.`,
        { label: `verify:${t.key}`, phase: 'Verify', schema: VERDICT_SCHEMA, agentType: 'claude-code-guide' })
        .then(v => ({ original: c.claim, verdict: v }))
    )).then(verdicts => ({ topic: t.key, result: r, verdicts: verdicts.filter(Boolean) }))
  }
)

return results.filter(Boolean)
