import { useState, useEffect } from 'react'
import './index.css'

const SECTIONS = [
  { id: 'getting-started', label: 'Getting Started' },
  { id: 'modules', label: 'Modules' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'intelligence', label: 'Intelligence' },
  { id: 'rust-sidecar', label: 'Rust Sidecar' },
  { id: 'voice', label: 'Voice' },
  { id: 'plugins', label: 'Plugins' },
]

const MODULE_CATEGORIES = [
  {
    name: 'Core',
    modules: [
      { name: 'App Launcher', desc: 'Open, quit, and manage macOS applications' },
      { name: 'System Monitor', desc: 'CPU, memory, disk, battery, and process stats' },
      { name: 'System Control', desc: 'Volume, brightness, dark mode, DND, sleep, lock, restart' },
      { name: 'File Operations', desc: 'Spotlight-powered search, move, copy, delete, browse' },
      { name: 'Process Manager', desc: 'List, kill, and monitor running processes' },
      { name: 'Clipboard', desc: 'Read, write, and manage clipboard history' },
      { name: 'Window Manager', desc: 'Tile, resize, fullscreen, and arrange windows' },
      { name: 'Timer', desc: 'Timers, alarms, and reminders with native notifications' },
      { name: 'Media Control', desc: 'Play, pause, skip, volume via system media keys' },
      { name: 'Conversions', desc: 'Unit, currency, and base conversions' },
    ],
  },
  {
    name: 'AI & Research',
    modules: [
      { name: 'AI Chat', desc: 'Multi-turn conversations via Claude API' },
      { name: 'Research', desc: 'Web search, summarization, and comparison reports' },
      { name: 'Smart Assist', desc: 'Context-aware suggestions based on current activity' },
      { name: 'Personality', desc: 'Configurable personality traits and response style' },
      { name: 'Screen Awareness', desc: 'OCR-based screen reading and contextual responses' },
      { name: 'Screen Interaction', desc: 'Click, type, and interact with on-screen elements' },
    ],
  },
  {
    name: 'Communications',
    modules: [
      { name: 'Email', desc: 'Gmail integration — read, send, search, and draft emails' },
      { name: 'Calendar', desc: 'Google Calendar — events, scheduling, and daily agenda' },
      { name: 'WhatsApp', desc: 'Send and read messages via automated browser control' },
      { name: 'Comms Stack', desc: 'Unified messaging across platforms' },
      { name: 'Dossier', desc: 'Contact profiles with aggregated communication history' },
    ],
  },
  {
    name: 'Automation',
    modules: [
      { name: 'Workflows', desc: 'Multi-step command chains with conditional logic' },
      { name: 'Scheduler', desc: 'Cron-like recurring task scheduling' },
      { name: 'Smart Routines', desc: 'Time and context-aware automated routines' },
      { name: 'Coding Agent', desc: 'AI-powered code generation, review, and refactoring' },
      { name: 'Dev Agent', desc: 'Project scaffolding, git ops, and dev environment setup' },
      { name: 'Self-Improve', desc: 'Auto-generate new modules from natural language specs' },
      { name: 'Multi-Agent', desc: 'Spawn parallel agents for complex multi-step tasks' },
      { name: 'Sandbox Runner', desc: 'Execute untrusted code in isolated sandboxed environments' },
    ],
  },
  {
    name: 'Media & Entertainment',
    modules: [
      { name: 'Spotify', desc: 'Full Spotify Web API — play, search, playlists, queue' },
      { name: 'YouTube Tools', desc: 'Search, summarize, and download YouTube content' },
      { name: 'Media Control', desc: 'System-level media playback control' },
    ],
  },
  {
    name: 'Smart Home & IoT',
    modules: [
      { name: 'Smart Home', desc: 'HomeKit control via macOS Shortcuts — lights, locks, scenes' },
      { name: 'Energy Monitor', desc: 'Track and optimize energy usage across devices' },
    ],
  },
  {
    name: 'Data & Intelligence',
    modules: [
      { name: 'Data Connectors', desc: 'Connect to APIs, databases, and external data sources' },
      { name: 'Deep Research', desc: 'Multi-hop research with arXiv, Semantic Scholar, and web' },
      { name: 'File Intelligence', desc: 'Smart file analysis, tagging, and organization' },
      { name: 'Morning Digest', desc: 'Daily briefing with weather, calendar, news, and tasks' },
      { name: 'API Orchestrator', desc: 'Chain and orchestrate multiple API calls' },
    ],
  },
  {
    name: 'Security',
    modules: [
      { name: 'Breach Monitor', desc: 'Dark web monitoring for compromised credentials' },
      { name: 'Network Guardian', desc: 'Network device scanning and anomaly detection' },
      { name: 'Threat Monitor', desc: 'Real-time threat detection via background services' },
    ],
  },
  {
    name: 'Device Integration',
    modules: [
      { name: 'Apple Watch', desc: 'WatchOS companion app with haptic feedback' },
      { name: 'iPhone', desc: 'iOS companion app connected via AIM WebSocket bridge' },
    ],
  },
]

function Docs() {
  const [active, setActive] = useState('getting-started')

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash && SECTIONS.find(s => s.id === hash)) {
      setActive(hash)
    }
  }, [])

  const navigate = (id) => {
    setActive(id)
    window.location.hash = id
    window.scrollTo(0, 0)
  }

  return (
    <div className="min-h-screen bg-jarvis-darker bg-grid">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-jarvis-darker/80 backdrop-blur-xl border-b border-jarvis-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 shadow-lg shadow-amber-500/20" />
            <span className="font-mono font-bold text-white tracking-wider">J.A.R.V.I.S.</span>
          </a>
          <div className="flex items-center gap-6">
            <a href="/" className="text-sm text-zinc-400 hover:text-white transition-colors">Home</a>
            <a href="/docs" className="text-sm text-jarvis-blue hover:text-white transition-colors">Docs</a>
            <a
              href="https://github.com/ArhanCodes/jarvis"
              target="_blank"
              rel="noopener"
              className="px-4 py-2 bg-jarvis-blue/10 border border-jarvis-blue/30 rounded-lg text-jarvis-blue text-sm hover:bg-jarvis-blue/20 transition-all"
            >
              GitHub
            </a>
          </div>
        </div>
      </nav>

      <div className="pt-24 flex max-w-7xl mx-auto px-6">
        {/* Sidebar */}
        <aside className="hidden md:block w-56 flex-shrink-0 sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto pr-6 border-r border-jarvis-border">
          <div className="text-xs text-zinc-500 uppercase tracking-wider mb-4 font-semibold">Documentation</div>
          <nav className="space-y-1">
            {SECTIONS.map(s => (
              <button
                key={s.id}
                onClick={() => navigate(s.id)}
                className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  active === s.id
                    ? 'bg-jarvis-blue/10 text-jarvis-blue border border-jarvis-blue/20'
                    : 'text-zinc-400 hover:text-white hover:bg-jarvis-card'
                }`}
              >
                {s.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Mobile nav */}
        <div className="md:hidden w-full mb-6">
          <select
            value={active}
            onChange={e => navigate(e.target.value)}
            className="w-full bg-jarvis-card border border-jarvis-border rounded-lg px-4 py-3 text-sm text-zinc-300"
          >
            {SECTIONS.map(s => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>
        </div>

        {/* Content */}
        <main className="flex-1 min-w-0 pb-20 md:pl-10">
          {active === 'getting-started' && <GettingStarted />}
          {active === 'modules' && <Modules />}
          {active === 'architecture' && <Architecture />}
          {active === 'intelligence' && <Intelligence />}
          {active === 'rust-sidecar' && <RustSidecar />}
          {active === 'voice' && <Voice />}
          {active === 'plugins' && <Plugins />}
        </main>
      </div>
    </div>
  )
}

function DocHeading({ children }) {
  return <h1 className="text-3xl font-bold text-white mb-6">{children}</h1>
}

function DocSubheading({ children }) {
  return <h2 className="text-xl font-semibold text-white mt-10 mb-4">{children}</h2>
}

function DocText({ children }) {
  return <p className="text-zinc-400 leading-relaxed mb-4">{children}</p>
}

function CodeBlock({ title, children }) {
  return (
    <div className="bg-jarvis-card border border-jarvis-border rounded-xl overflow-hidden mb-6">
      {title && (
        <div className="px-4 py-2 border-b border-jarvis-border text-xs text-zinc-500 font-mono">{title}</div>
      )}
      <pre className="p-4 font-mono text-sm text-zinc-300 overflow-x-auto">{children}</pre>
    </div>
  )
}

function GettingStarted() {
  return (
    <div>
      <DocHeading>Getting Started</DocHeading>
      <DocText>
        JARVIS is a macOS AI assistant built in TypeScript with a Rust performance sidecar,
        Swift companion apps, and AI-powered conversation. It runs as a CLI daemon with
        optional voice activation.
      </DocText>

      <DocSubheading>Requirements</DocSubheading>
      <ul className="text-zinc-400 text-sm space-y-2 mb-6 list-disc list-inside">
        <li>macOS 13 (Ventura) or later</li>
        <li>Node.js 20+</li>
        <li>Xcode Command Line Tools (for voice and screen features)</li>
        <li>Rust toolchain (optional, for sidecar build)</li>
        <li>Claude API key</li>
      </ul>

      <DocSubheading>Installation</DocSubheading>
      <CodeBlock title="terminal">
{`$ git clone https://github.com/ArhanCodes/jarvis.git
$ cd jarvis
$ npm install
$ cp .env.example .env   # add your API keys
$ npm run dev`}
      </CodeBlock>

      <DocSubheading>Building the Rust Sidecar</DocSubheading>
      <CodeBlock title="terminal">
{`$ cd rust-sidecar
$ cargo build --release
# Binary outputs to rust-sidecar/target/release/jarvis-sidecar`}
      </CodeBlock>
      <DocText>
        The Rust sidecar is optional. When available, JARVIS uses it for sub-millisecond
        fuzzy matching and vector search. When unavailable, it falls back to the TypeScript
        implementation.
      </DocText>

      <DocSubheading>Configuration</DocSubheading>
      <DocText>
        Configuration files live in the <code className="text-jarvis-blue font-mono text-sm">config/</code> directory.
        Key files include <code className="text-jarvis-blue font-mono text-sm">plugins.json</code> for
        module toggles, <code className="text-jarvis-blue font-mono text-sm">habits.json</code> for
        learned behaviors, and <code className="text-jarvis-blue font-mono text-sm">homekit-shortcuts.json</code> for
        smart home device mappings.
      </DocText>

      <DocSubheading>Environment Variables</DocSubheading>
      <CodeBlock title=".env">
{`ANTHROPIC_API_KEY=sk-ant-...       # Claude API (primary LLM)
ELEVENLABS_API_KEY=...              # Voice synthesis
SPOTIFY_CLIENT_ID=...               # Spotify Web API
SPOTIFY_CLIENT_SECRET=...
GOOGLE_CLIENT_ID=...                # Gmail & Calendar
GOOGLE_CLIENT_SECRET=...`}
      </CodeBlock>
    </div>
  )
}

function Modules() {
  return (
    <div>
      <DocHeading>Modules</DocHeading>
      <DocText>
        JARVIS has 45+ modules organized into categories. Each module registers its commands
        via the <code className="text-jarvis-blue font-mono text-sm">@RegisterModule()</code> decorator
        and is hot-reloadable at runtime.
      </DocText>

      {MODULE_CATEGORIES.map(cat => (
        <div key={cat.name}>
          <DocSubheading>{cat.name}</DocSubheading>
          <div className="bg-jarvis-card border border-jarvis-border rounded-xl overflow-hidden mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-jarvis-border">
                  <th className="text-left px-4 py-3 text-zinc-500 font-medium">Module</th>
                  <th className="text-left px-4 py-3 text-zinc-500 font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                {cat.modules.map((m, i) => (
                  <tr key={i} className="border-b border-jarvis-border last:border-0">
                    <td className="px-4 py-3 text-jarvis-blue font-mono whitespace-nowrap">{m.name}</td>
                    <td className="px-4 py-3 text-zinc-400">{m.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  )
}

function Architecture() {
  return (
    <div>
      <DocHeading>Architecture</DocHeading>
      <DocText>
        JARVIS processes every input through a 7-phase parsing pipeline before reaching the
        AI conversation engine. This means most commands resolve in sub-millisecond time
        without any LLM call.
      </DocText>

      <DocSubheading>Parser Pipeline</DocSubheading>
      <div className="space-y-3 mb-8">
        {[
          { phase: 1, name: 'Variable Expansion', desc: 'Expands $variables and ${expressions} in the input' },
          { phase: 2, name: 'Alias Expansion', desc: 'Resolves user-defined command aliases' },
          { phase: 3, name: 'Pattern Parser', desc: 'Regex-based pattern matching for structured commands' },
          { phase: 4, name: 'Keyword Match', desc: 'Direct keyword lookup against registered module commands' },
          { phase: 5, name: 'Rust Fuzzy Match', desc: 'Sub-millisecond fuzzy matching via Rust sidecar (falls back to TS)' },
          { phase: 6, name: 'NLU Mapping', desc: 'Natural language understanding for intent classification' },
          { phase: 7, name: 'Conversation AI', desc: 'Claude API multi-turn conversation with action execution' },
        ].map(p => (
          <div key={p.phase} className="bg-jarvis-card border border-jarvis-border rounded-lg p-4 flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-jarvis-blue/10 border border-jarvis-blue/20 flex items-center justify-center text-jarvis-blue font-mono text-sm flex-shrink-0">
              {p.phase}
            </div>
            <div>
              <div className="text-white font-medium">{p.name}</div>
              <div className="text-zinc-500 text-sm">{p.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <DocSubheading>Module Registry</DocSubheading>
      <DocText>
        All modules register with the central registry at startup. Each module declares its
        name, patterns, keywords, and handler functions. The registry provides fast lookup
        tables for phases 3-5 of the parser.
      </DocText>
      <CodeBlock title="src/core/registry.ts">
{`registry.register({
  name: 'spotify',
  patterns: [/play (.+) on spotify/i],
  keywords: ['spotify', 'play', 'pause', 'skip'],
  handler: async (input, match) => { ... }
})`}
      </CodeBlock>

      <DocSubheading>Conversation Engine</DocSubheading>
      <DocText>
        When no module matches (phases 1-6 fail), the input reaches the conversation engine.
        This maintains multi-turn context, can execute actions mid-conversation, and persists
        memory across sessions via the memory index.
      </DocText>

      <DocSubheading>Execution Backends</DocSubheading>
      <DocText>
        Modules execute through four backend engines depending on what they need to control:
      </DocText>
      <ul className="text-zinc-400 text-sm space-y-2 mb-6 list-disc list-inside">
        <li><span className="text-jarvis-blue">TypeScript</span> — core logic, API calls, orchestration</li>
        <li><span className="text-jarvis-blue">Rust Sidecar</span> — fuzzy match, vector search, trace analytics</li>
        <li><span className="text-jarvis-blue">Swift</span> — Apple Watch and iPhone companion apps</li>
        <li><span className="text-jarvis-blue">AppleScript / Shell</span> — macOS system control, app automation</li>
      </ul>
    </div>
  )
}

function Intelligence() {
  return (
    <div>
      <DocHeading>Intelligence Layer</DocHeading>
      <DocText>
        JARVIS learns from usage. Every command, its context, and its outcome are recorded
        in the trace store. The intelligence layer analyzes these traces to detect habits,
        predict actions, and suggest automations.
      </DocText>

      <DocSubheading>Trace Store</DocSubheading>
      <DocText>
        Every command execution produces a trace record containing the raw input, parsed
        intent, matched module, execution time, result, and timestamp. Traces are stored
        locally and indexed for fast retrieval.
      </DocText>
      <CodeBlock title="trace record">
{`{
  "input": "battery",
  "module": "system-monitor",
  "result": "Battery: 92%, charging",
  "timestamp": "2025-03-15T08:30:00Z",
  "executionMs": 12,
  "context": { "timeOfDay": "morning", "dayOfWeek": "Saturday" }
}`}
      </CodeBlock>

      <DocSubheading>Learning Engine</DocSubheading>
      <DocText>
        The learning engine analyzes trace patterns to detect recurring behaviors. When it
        identifies a habit with high regularity (e.g., "you check battery every morning at
        8:30"), it can suggest creating an automated routine.
      </DocText>

      <DocSubheading>Memory Index</DocSubheading>
      <DocText>
        The conversation engine uses a persistent memory index to store facts, preferences,
        and context across sessions. Memories are vectorized for semantic retrieval, enabling
        JARVIS to recall relevant context when needed.
      </DocText>
      <CodeBlock>
{`jarvis> remember my SSH key is at ~/.ssh/id_ed25519
  Saved to memory.

jarvis> where's my SSH key?
  Your SSH key is at ~/.ssh/id_ed25519`}
      </CodeBlock>

      <DocSubheading>Router Policy</DocSubheading>
      <DocText>
        The intelligence router decides whether a command should go to a specific module,
        the conversation engine, or a background agent. It uses trace history and current
        context to optimize routing decisions, minimizing unnecessary LLM calls.
      </DocText>
    </div>
  )
}

function RustSidecar() {
  return (
    <div>
      <DocHeading>Rust Sidecar</DocHeading>
      <DocText>
        The Rust sidecar is a compiled binary that provides performance-critical operations.
        It communicates with the TypeScript host via JSON-over-stdio and is automatically
        started when JARVIS launches.
      </DocText>

      <DocSubheading>Capabilities</DocSubheading>
      <ul className="text-zinc-400 text-sm space-y-2 mb-6 list-disc list-inside">
        <li><span className="text-jarvis-blue">Fuzzy Match</span> — sub-millisecond fuzzy command matching against the full registry</li>
        <li><span className="text-jarvis-blue">Vector Search</span> — cosine similarity search over memory embeddings</li>
        <li><span className="text-jarvis-blue">Trace Analytics</span> — fast aggregation and pattern detection over trace history</li>
        <li><span className="text-jarvis-blue">Text Processing</span> — tokenization, similarity scoring, and keyword extraction</li>
      </ul>

      <DocSubheading>Building</DocSubheading>
      <CodeBlock title="terminal">
{`$ cd rust-sidecar
$ cargo build --release

# Run tests
$ cargo test

# The binary is at:
# rust-sidecar/target/release/jarvis-sidecar`}
      </CodeBlock>

      <DocSubheading>Integration</DocSubheading>
      <DocText>
        The TypeScript bridge spawns the Rust binary as a child process. Requests are sent
        as JSON lines on stdin, and responses come back on stdout. If the sidecar is
        unavailable or crashes, JARVIS falls back to TypeScript implementations.
      </DocText>
      <CodeBlock title="src/watch/aim-bridge.ts">
{`// Rust bridge initialization
const sidecar = spawn('./rust-sidecar/target/release/jarvis-sidecar')
sidecar.stdout.on('data', handleResponse)

// Send a fuzzy match request
sidecar.stdin.write(JSON.stringify({
  type: 'fuzzy-match',
  input: 'btery',
  candidates: registry.getAllKeywords()
}) + '\\n')`}
      </CodeBlock>
    </div>
  )
}

function Voice() {
  return (
    <div>
      <DocHeading>Voice</DocHeading>
      <DocText>
        JARVIS supports always-on voice activation with the wake word "Jarvis". Speech
        recognition runs on-device, and voice synthesis uses ElevenLabs or Edge TTS.
      </DocText>

      <DocSubheading>Setup</DocSubheading>
      <ul className="text-zinc-400 text-sm space-y-2 mb-6 list-disc list-inside">
        <li>Install Xcode Command Line Tools for on-device speech recognition</li>
        <li>Set <code className="text-jarvis-blue font-mono">ELEVENLABS_API_KEY</code> in your .env for premium voice</li>
        <li>Or use Edge TTS (free, no API key required) as a fallback</li>
      </ul>

      <DocSubheading>Wake Word Detection</DocSubheading>
      <DocText>
        The voice daemon continuously listens for the wake word "Jarvis" using macOS native
        speech recognition. Once detected, it records your command and processes it through
        the standard parser pipeline.
      </DocText>
      <CodeBlock>
{`$ npm run voice
✓ Voice assistant started. Say "Jarvis" to activate.
Listening...

[wake-word] Detected: "Jarvis"
[recording] Listening for command...
[stt] "what's the weather like?"
[parser] → conversation-engine
[tts] Speaking response...`}
      </CodeBlock>

      <DocSubheading>ElevenLabs Configuration</DocSubheading>
      <DocText>
        For the best voice experience, configure ElevenLabs with a custom voice ID. JARVIS
        supports voice cloning, multiple voice profiles, and adjustable speech parameters.
      </DocText>
      <CodeBlock title=".env">
{`ELEVENLABS_API_KEY=your-key-here
ELEVENLABS_VOICE_ID=custom-voice-id    # optional
ELEVENLABS_MODEL=eleven_turbo_v2       # optional`}
      </CodeBlock>

      <DocSubheading>Multi-Device Voice</DocSubheading>
      <DocText>
        Voice commands from the Apple Watch and iPhone are relayed via the AIM WebSocket
        bridge to the Mac, processed by the same parser pipeline, and responses are sent
        back to the originating device with optional haptic feedback.
      </DocText>
    </div>
  )
}

function Plugins() {
  return (
    <div>
      <DocHeading>Plugins</DocHeading>
      <DocText>
        JARVIS uses a decorator-based module system. Every module is a class decorated
        with <code className="text-jarvis-blue font-mono text-sm">@RegisterModule()</code> that
        declares its commands, patterns, and handlers. Modules are hot-reloadable at runtime.
      </DocText>

      <DocSubheading>Creating a Module</DocSubheading>
      <CodeBlock title="src/modules/my-module.ts">
{`import { RegisterModule, Module } from '../core/types'

@RegisterModule({
  name: 'my-module',
  description: 'A custom JARVIS module',
  keywords: ['mycommand', 'custom'],
  patterns: [/my custom (\\w+)/i],
})
export class MyModule implements Module {
  async handle(input: string, match?: RegExpMatchArray) {
    const arg = match?.[1] || input
    return { response: \`Handled: \${arg}\` }
  }
}`}
      </CodeBlock>

      <DocSubheading>Module Lifecycle</DocSubheading>
      <ol className="text-zinc-400 text-sm space-y-2 mb-6 list-decimal list-inside">
        <li>Module file is discovered in <code className="text-jarvis-blue font-mono">src/modules/</code></li>
        <li>The <code className="text-jarvis-blue font-mono">@RegisterModule()</code> decorator registers it with the central registry</li>
        <li>Keywords and patterns are indexed for fast lookup</li>
        <li>The module is available immediately — no restart needed</li>
      </ol>

      <DocSubheading>Self-Improving Modules</DocSubheading>
      <DocText>
        JARVIS can generate new modules from natural language descriptions. The self-improve
        module analyzes your request, generates TypeScript code, validates it, and hot-loads
        it into the running system.
      </DocText>
      <CodeBlock>
{`jarvis> self-improve: create a pomodoro timer module
  Analyzing request...
  Generating module: pomodoro-timer
  Validating TypeScript...
  Module registered: pomodoro-timer (3 commands)
  ✓ Ready to use: "pomodoro start", "pomodoro stop", "pomodoro status"`}
      </CodeBlock>

      <DocSubheading>Plugin Configuration</DocSubheading>
      <DocText>
        Module toggles are managed in <code className="text-jarvis-blue font-mono text-sm">config/plugins.json</code>.
        You can enable/disable modules without modifying code.
      </DocText>
      <CodeBlock title="config/plugins.json">
{`{
  "spotify": { "enabled": true },
  "smart-home": { "enabled": true },
  "email": { "enabled": false },
  "breach-monitor": { "enabled": true }
}`}
      </CodeBlock>
    </div>
  )
}

export default Docs
