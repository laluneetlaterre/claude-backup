export const meta = {
  name: 'vscode-clickable-file-links',
  description: 'Find a reliable way to open Obsidian files referenced in the Claude Code VSCode chat',
  phases: [
    { title: 'Investigate' },
    { title: 'Verify' },
    { title: 'Synthesize' },
  ],
}

const EXT = '/Users/sakamotomitsue/.vscode/extensions/anthropic.claude-code-2.1.226-darwin-arm64'
const VAULT = '/Users/sakamotomitsue/Documents/works/obsidian'
const TESTFILE = '/Users/sakamotomitsue/Documents/works/obsidian/03_stock/02_IT_AIツール/サイト一覧.md'

const CONTEXT = `
CONTEXT — the user's problem:
The user (Miey, Japanese, non-programmer power-user) runs Claude Code as a VSCode extension
(native webview UI, NOT the terminal). When Claude writes a markdown link to a vault file in
the chat transcript, e.g. [サイト一覧](03_stock/02_IT_AIツール/サイト一覧.md), the link renders
blue/underlined but CLICKING DOES NOTHING. Right-click-copy of the link does not work either.
ALREADY TESTED AND CONFIRMED BROKEN (user clicked, nothing happened):
  - relative path markdown link
  - file:///absolute/path  (raw UTF-8)
  - file:///absolute/path  (percent-encoded)
Already established by reading ${EXT}/webview/index.js:
  - markdown links appear to render as <a href=... target="_blank" rel="noopener noreferrer">
  - the webview has an internal RPC: openFile(filePath, location) -> sendRequest({type:"open_file",...})
  - there is a fileOpener = { open, openContent } used somewhere in the UI
  - extension.js registers an MCP tool named "openFile" (filePath, preview, startText)
Extension dir: ${EXT}
  - extension.js  (node host, minified single line, large)
  - webview/index.js  (~4.8MB minified single line)
  - webview/index.css
  - package.json
Vault root: ${VAULT}
A real test file: ${TESTFILE}
Environment: macOS 15 (darwin 25.6), VSCode, extension version 2.1.226.
NOTE: files are minified onto ONE line. Do NOT try to read them with Read (it will blow up).
Use grep -o with fixed context windows, e.g.:
  grep -o '.\\{300\\}NEEDLE.\\{300\\}' ${EXT}/webview/index.js | head -5
Use python3 to slice by byte offset when you need a bigger window:
  python3 -c "s=open('PATH',encoding='utf-8',errors='replace').read(); i=s.find('NEEDLE'); print(s[i-2000:i+2000])"
Return RAW FINDINGS. Your final text is the return value, not a human-facing message.
`

const FINDINGS = {
  type: 'object',
  additionalProperties: false,
  required: ['findings', 'notes'],
  properties: {
    findings: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['claim', 'evidence', 'confidence'],
        properties: {
          claim: { type: 'string', description: 'One specific factual claim' },
          evidence: { type: 'string', description: 'Exact code snippet / doc quote / command output that proves it' },
          confidence: { type: 'string', enum: ['certain', 'likely', 'speculative'] },
        },
      },
    },
    notes: { type: 'string', description: 'Anything else worth knowing' },
  },
}

const CANDIDATES = {
  type: 'object',
  additionalProperties: false,
  required: ['candidates', 'notes'],
  properties: {
    candidates: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['name', 'howItWorks', 'exactPayload', 'setupRequired', 'likelihood', 'downside'],
        properties: {
          name: { type: 'string' },
          howItWorks: { type: 'string' },
          exactPayload: { type: 'string', description: 'The literal text/markdown/command Claude or the user would use, ready to paste' },
          setupRequired: { type: 'string', description: 'What the user must install/configure, or "none"' },
          likelihood: { type: 'string', enum: ['high', 'medium', 'low'] },
          downside: { type: 'string' },
        },
      },
    },
    notes: { type: 'string' },
  },
}

phase('Investigate')

const investigations = [
  {
    label: 'bundle:link-rendering',
    prompt: `${CONTEXT}

YOUR TASK — determine EXACTLY how the chat transcript renders and handles markdown links.
Dig into ${EXT}/webview/index.js.

Answer these specifically:
1. Find the markdown renderer's anchor/link component. What props does it set on <a>? Is there an
   onClick handler? Does it call preventDefault and route anywhere?
2. Is there ANY scheme allowlist or URL sanitizer applied to hrefs (e.g. a list containing
   'http','https','mailto','vscode','file')? Search for sanitize, allowedProtocols, isSafeUrl,
   safeUrl, javascript:, DOMPurify, xss, protocol checks.
3. Find the Content-Security-Policy for the webview (likely composed in extension.js). Does it
   restrict what a link can navigate to?
4. In extension.js, find how the webview panel/view handles link clicks — search for
   onDidReceiveMessage handlers, 'openExternal', 'vscode.open', 'asExternalUri',
   enableCommandUris, and any webview options object (enableScripts, localResourceRoots).
5. CRITICAL: is there any codepath at all where clicking rendered markdown in the transcript
   results in open_file / fileOpener.open being called? Or are markdown links strictly
   "external URL only"?
6. Does the renderer do any special-casing of text that LOOKS like a file path (bare paths,
   path:line, @-mentions, backticked paths)? Search for things like /\\.(md|ts|js)/ regexes,
   'filePath', 'looksLikePath', 'pathRegex', 'fileReference', 'FileChip', 'FilePill'.

Report each answer as a finding with the literal code snippet as evidence.`,
  },
  {
    label: 'bundle:what-is-clickable',
    prompt: `${CONTEXT}

YOUR TASK — find every UI affordance in the Claude Code webview that DOES successfully open a
file in the editor, and what produces it. The goal: if markdown links can never work, what
SHOULD Claude emit so that a clickable, working "open this file" control appears in the chat?

Dig into ${EXT}/webview/index.js and extension.js.

Answer specifically:
1. Every call site of fileOpener.open / connection.openFile / type:"open_file". What React
   component renders each one? What does that component look like to the user?
2. Do TOOL CALL result chips (e.g. the "Read  filename.md" row, Edit/Write diffs) render a
   clickable filename that calls openFile? If yes, that means: Claude simply calling the Read
   tool on a file gives the user a working click target. Verify this precisely — quote the code.
3. What about the "Show Tab" / diff-open / artifact links?
4. Is there an @-mention chip in the transcript (not the input box) that is clickable?
5. Check extension.js for the MCP tool "openFile" — is that MCP server exposed to the SAME
   Claude session running in the webview, or only to an external CLI attaching over the
   ide/lockfile socket? Search for the lockfile path (~/.claude/ide/*.lock), the port, and how
   the MCP server is advertised. Determine whether the in-webview Claude can call it.
6. Also check: 'claude-vscode.insertAtMention', 'revealInExplorer', 'openInEditor' — user-facing?

Report each as a finding with literal code as evidence.`,
  },
  {
    label: 'research:vscode-schemes',
    prompt: `${CONTEXT}

YOUR TASK — external research (use WebSearch and WebFetch aggressively; also test locally
with the 'open' command on macOS where safe).

Answer:
1. In a VSCode webview, when a link has target="_blank", what does VSCode do on click? Which
   URI schemes does it pass to vscode.env.openExternal, and which does it silently drop?
   Find the actual VSCode source behavior / docs / issues. Is file: explicitly blocked?
   (The user confirmed file:// does nothing — corroborate why.)
2. Does the 'vscode://file/<absolute-path>' scheme work when opened from OUTSIDE VSCode
   (e.g. macOS 'open' command)? Test it locally:
     open 'vscode://file/${TESTFILE}'
   and report whether VSCode opened the file. Try percent-encoded too. Report exactly.
3. Does 'obsidian://open?vault=Obsidian&file=...' work via macOS 'open'? Test it locally with the
   real vault (vault name is "Obsidian", root ${VAULT}). Report exactly.
   IMPORTANT: it is fine to actually launch Obsidian/VSCode for the test — the user wants this
   working. But do NOT modify any file.
4. Search GitHub issues for anthropics/claude-code about: clicking file paths in the VSCode
   extension doing nothing, markdown links not opening, "open in editor" from chat. Is this a
   known bug, is there a workaround, is a fix shipped in a newer version than 2.1.226?
   Also check what the newest published extension version is.
5. Is there any VSCode setting or third-party extension that linkifies file paths inside
   webviews? (Probably not, but check.) What about VSCode's built-in terminal link detection —
   irrelevant to webviews but confirm.

Report findings with URLs and literal command output as evidence.`,
  },
  {
    label: 'practical:zero-click-alternatives',
    prompt: `${CONTEXT}

YOUR TASK — design and TEST practical workarounds, assuming clickable links in the chat are
impossible. The user is a non-programmer who finds "copy the path, then paste it somewhere"
too much friction. She has ADHD traits; every extra step costs her.

Explore and ACTUALLY TEST these on this machine (macOS). Do not modify any user file; you may
create scratch files under /private/tmp/claude-501/-Users-sakamotomitsue-Documents-works-obsidian/cc0202aa-18aa-4b83-ad3a-5a249e71f09f/scratchpad

1. Claude-side: Claude can already run 'open -R <path>' (reveal in Finder),
   'open -a Obsidian', 'open -a "Visual Studio Code" <path>'. Verify each works and report the
   exact best command for: (a) reveal in Finder, (b) open in Obsidian at that note,
   (c) open in VSCode editor. Include how to handle Japanese chars and spaces in paths.
2. Is there a Claude Code HOOK that could auto-open / auto-reveal files Claude mentions?
   Read the real hook docs (~/.claude/settings.json, and the official docs). Which hook events
   exist, what JSON do they receive, and could a PostToolUse hook on Read/Write/Edit push the
   path somewhere useful (e.g. append to a "recently touched files" note, or copy to clipboard
   with pbcopy)? Assess feasibility honestly — do not invent hook events. Verify against
   ~/.claude/settings.json and the installed CLI's docs if present.
3. Clipboard idea: could Claude put the path on the macOS clipboard with pbcopy at the moment
   it mentions a file, so the user just hits Cmd+V in Finder's Cmd+Shift+G? Test pbcopy.
   Downside: clobbers whatever she had copied. Assess.
4. A "landing pad" note: Claude appends every referenced file as an Obsidian wikilink to one
   note, e.g. ${VAULT}/03_stock/00_今日ふれたファイル.md, which the user keeps open in Obsidian —
   wikilinks are 100% clickable inside Obsidian. Assess this seriously; it plays to the fact
   that she lives in Obsidian. Propose the exact format.
5. Finder-side: does macOS Finder accept a dragged text path? Is there a smarter reveal?
6. Anything else genuinely better that you can verify.

For each candidate give the EXACT payload/command/config, ready to use. Be honest about which
you actually tested vs. reasoned about.`,
  },
]

const raw = await parallel(investigations.map((inv) => () =>
  agent(inv.prompt, { label: inv.label, phase: 'Investigate', schema: inv.label.startsWith('practical') ? CANDIDATES : FINDINGS })
))

const [linkRendering, whatIsClickable, schemes, practical] = raw

log('Investigation done — verifying the load-bearing claims')

phase('Verify')

const claimsToVerify = []
for (const [src, res] of [['link-rendering', linkRendering], ['what-is-clickable', whatIsClickable], ['schemes', schemes]]) {
  if (res && res.findings) {
    for (const f of res.findings) {
      if (f.confidence !== 'certain' || /work|open|clickable|call|support|block/i.test(f.claim)) {
        claimsToVerify.push({ src, claim: f.claim, evidence: f.evidence })
      }
    }
  }
}
const topClaims = claimsToVerify.slice(0, 8)
log(`${claimsToVerify.length} claims found; adversarially verifying ${topClaims.length}` + (claimsToVerify.length > topClaims.length ? ` (dropped ${claimsToVerify.length - topClaims.length} lower-priority claims)` : ''))

const VERDICT = {
  type: 'object',
  additionalProperties: false,
  required: ['refuted', 'reasoning', 'correctedClaim'],
  properties: {
    refuted: { type: 'boolean' },
    reasoning: { type: 'string' },
    correctedClaim: { type: 'string', description: 'If refuted or partially wrong, the accurate version. Else repeat the claim.' },
  },
}

const verdicts = await parallel(topClaims.map((c, i) => () =>
  agent(`${CONTEXT}

YOUR TASK — adversarially REFUTE this claim. Default to refuted=true if you cannot independently
confirm it. Go look at the actual bytes / run the actual command. Do not take it on faith.

CLAIM (from investigator "${c.src}"):
${c.claim}

EVIDENCE THEY GAVE:
${c.evidence}

Independently verify. If the evidence is a code snippet, find it yourself and read enough
surrounding context to confirm the interpretation is right (minified code is easy to misread —
check that the snippet is actually on the codepath claimed, not dead code or a different feature).
If the claim is about runtime behavior, test it if you safely can.
Then answer: is this claim TRUE as stated?`,
    { label: `verify:${i}`, phase: 'Verify', schema: VERDICT })
))

const survived = topClaims
  .map((c, i) => ({ ...c, verdict: verdicts[i] }))
  .filter((c) => c.verdict && !c.verdict.refuted)
const corrected = topClaims
  .map((c, i) => ({ ...c, verdict: verdicts[i] }))
  .filter((c) => c.verdict && c.verdict.refuted)

log(`${survived.length} claims survived, ${corrected.length} refuted/corrected`)

phase('Synthesize')

const final = await agent(`${CONTEXT}

YOUR TASK — synthesize everything below into a decision for the user.

VERIFIED CLAIMS (survived adversarial review):
${JSON.stringify(survived.map((c) => ({ claim: c.claim, evidence: c.evidence })), null, 1)}

REFUTED / CORRECTED CLAIMS (the corrected version is authoritative):
${JSON.stringify(corrected.map((c) => ({ original: c.claim, corrected: c.verdict.correctedClaim, why: c.verdict.reasoning })), null, 1)}

PRACTICAL WORKAROUND CANDIDATES:
${JSON.stringify(practical, null, 1)}

RAW INVESTIGATOR NOTES:
${JSON.stringify({ linkRendering: linkRendering?.notes, whatIsClickable: whatIsClickable?.notes, schemes: schemes?.notes }, null, 1)}

Produce, in this exact structure:

A. ROOT CAUSE — one paragraph. Why clicking a file link in the Claude Code VSCode webview does
   nothing, stated precisely, with the code fact that proves it. Say plainly if any scheme
   (vscode://, obsidian://, https://) DOES work, since only file:// and relative were tested.

B. STILL-UNTESTED LINK FORMATS worth one more click-test by the user — list only ones with a
   real mechanistic reason to work, max 3, each as a literal markdown link using the real file
   ${TESTFILE}. If there are none, say so plainly — do not pad the list.

C. THE RECOMMENDED PERMANENT SOLUTION — pick ONE primary, and say exactly what Claude must do
   from now on and what (if anything) the user must set up once. Optimise for the user's actual
   constraint: she is non-technical, hates extra steps, and lives inside Obsidian. Include the
   exact command / format.

D. RUNNER-UP, in case the primary annoys her in practice.

E. WHAT NOT TO BOTHER WITH — dead ends, so nobody re-litigates this (include the multi-root
   workspace theory, which was already disproven).

Be concrete and honest. Mark anything unverified as 推測/unverified. Return the analysis as
plain text, no preamble.`,
  { label: 'synthesize', phase: 'Synthesize' })

return { final, survivedCount: survived.length, refutedCount: corrected.length }
