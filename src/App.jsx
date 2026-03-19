import { useState, useEffect, useRef } from 'react'
import './index.css'

const FEATURES = [
  {
    icon: '🎙',
    title: 'Voice Assistant',
    desc: 'Always-on wake word detection. Say "Jarvis" and speak naturally — on-device speech recognition, no cloud dependency.',
    demo: 'jarvis> "open Safari and set volume to 50"',
  },
  {
    icon: '🧠',
    title: 'Conversational AI',
    desc: 'Multi-turn conversations powered by Claude API with Ollama fallback. Executes actions mid-conversation and remembers context.',
    demo: 'jarvis> remember my deadline is March 20th',
  },
  {
    icon: '👁',
    title: 'Screen Awareness',
    desc: 'OCR-based screen reading — JARVIS can see what\'s on your screen and respond to it contextually.',
    demo: 'jarvis> what\'s on my screen right now?',
  },
  {
    icon: '🌐',
    title: 'Browser Automation',
    desc: 'Full Playwright-powered browser control — navigate, search, click, fill forms, read pages, take screenshots.',
    demo: 'jarvis> browse youtube.com',
  },
  {
    icon: '⌚',
    title: 'Multi-Device',
    desc: 'Apple Watch and iPhone apps connect via AIM WebSocket relay. Same capabilities across all your devices.',
    demo: 'Connected: Mac, iPhone, Apple Watch',
  },
  {
    icon: '💬',
    title: 'WhatsApp',
    desc: 'Send and read WhatsApp messages through automated browser control. Hands-free messaging.',
    demo: 'jarvis> send whatsapp to John: Hey!',
  },
  {
    icon: '🎵',
    title: 'Media Control',
    desc: 'Full Spotify and Apple Music control — play, pause, skip, search, playlists, shuffle.',
    demo: 'jarvis> play Osamason',
  },
  {
    icon: '🔧',
    title: 'System Control',
    desc: 'Volume, brightness, dark mode, DND, sleep, lock, restart — full macOS system control.',
    demo: 'jarvis> dark mode on && volume 30',
  },
  {
    icon: '📁',
    title: 'File Operations',
    desc: 'Spotlight-powered file search, move, copy, delete. Browse directories and manage files by voice.',
    demo: 'jarvis> search package.json',
  },
  {
    icon: '🪟',
    title: 'Window Manager',
    desc: 'Tile windows, arrange side by side, fullscreen, resize — manage your workspace hands-free.',
    demo: 'jarvis> tile Safari left && tile Chrome right',
  },
  {
    icon: '⏱',
    title: 'Timers & Reminders',
    desc: 'Set timers, alarms, reminders with macOS notifications. Supports natural time formats.',
    demo: 'jarvis> remind me in 1 hour to push code',
  },
  {
    icon: '🔄',
    title: 'Workflows & Scheduling',
    desc: 'Create multi-step automations, schedule recurring tasks, run macOS Shortcuts.',
    demo: 'jarvis> every 5 min run battery',
  },
]

const COMMANDS = [
  { cmd: 'open Safari', result: 'Opened Safari', icon: '🚀' },
  { cmd: 'battery', result: 'Battery: 85%, charging', icon: '🔋' },
  { cmd: 'play Osamason', result: 'Searching Spotify...', icon: '🎵' },
  { cmd: 'dark mode on', result: 'Dark mode enabled', icon: '🌙' },
  { cmd: 'good morning', result: 'Running morning routine...', icon: '☀️' },
  { cmd: 'volume 50', result: 'Volume set to 50%', icon: '🔊' },
  { cmd: 'what\'s on my screen?', result: 'I can see VS Code open with...', icon: '👁' },
  { cmd: 'timer 5 min', result: 'Timer set for 5m', icon: '⏱' },
]

const STATS = [
  { value: '25+', label: 'Modules' },
  { value: '200+', label: 'Commands' },
  { value: '7', label: 'Parse Phases' },
  { value: '3', label: 'Devices' },
]

function TerminalDemo() {
  const [lines, setLines] = useState([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const termRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      const cmd = COMMANDS[currentIdx % COMMANDS.length]
      setLines(prev => {
        const newLines = [
          ...prev,
          { type: 'input', text: cmd.cmd },
          { type: 'output', text: `  ✓ ${cmd.result}`, icon: cmd.icon },
        ]
        return newLines.slice(-12)
      })
      setCurrentIdx(prev => prev + 1)
    }, 2500)
    return () => clearInterval(interval)
  }, [currentIdx])

  useEffect(() => {
    if (termRef.current) {
      termRef.current.scrollTop = termRef.current.scrollHeight
    }
  }, [lines])

  return (
    <div className="bg-jarvis-darker border border-jarvis-border rounded-xl overflow-hidden shadow-2xl max-w-2xl mx-auto">
      <div className="flex items-center gap-2 px-4 py-3 bg-jarvis-card border-b border-jarvis-border">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-3 text-xs text-zinc-500 font-mono">jarvis — voice-daemon</span>
      </div>
      <div ref={termRef} className="p-5 h-72 overflow-hidden font-mono text-sm space-y-1">
        <div className="text-zinc-500 text-xs mb-3">
          ✓ Voice assistant started. Say "Jarvis" to activate.
        </div>
        {lines.map((line, i) => (
          <div key={i} className={`${line.type === 'input' ? 'text-jarvis-blue' : 'text-green-400'} transition-opacity duration-300`}>
            {line.type === 'input' ? (
              <span><span className="text-jarvis-blue font-bold">jarvis&gt;</span> {line.text}</span>
            ) : (
              <span>{line.text}</span>
            )}
          </div>
        ))}
        <div className="text-jarvis-blue">
          <span className="font-bold">jarvis&gt;</span> <span className="cursor-blink"></span>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, desc, demo, delay }) {
  return (
    <div className={`card-hover bg-jarvis-card border border-jarvis-border rounded-xl p-6 text-left animate-fade-in-up ${delay}`}>
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-zinc-400 text-sm mb-4 leading-relaxed">{desc}</p>
      <div className="font-mono text-xs text-jarvis-blue bg-jarvis-darker rounded-lg px-3 py-2 border border-jarvis-border">
        {demo}
      </div>
    </div>
  )
}


function ArchitectureDiagram() {
  return (
    <div className="bg-jarvis-card border border-jarvis-border rounded-xl p-8 max-w-3xl mx-auto font-mono text-sm">
      <div className="text-center space-y-3">
        <div className="text-jarvis-blue">User Input (Voice / Text / Watch / Phone)</div>
        <div className="text-zinc-600">↓</div>
        <div className="flex flex-wrap justify-center gap-2">
          {['Variable Expansion', 'Alias Expansion', 'Pattern Parser', 'Keyword Match', 'Fuzzy Match', 'NLU Mapping', 'Conversation AI'].map((phase, i) => (
            <span key={i} className="px-3 py-1 bg-jarvis-darker border border-jarvis-border rounded text-xs text-zinc-300">
              {i + 1}. {phase}
            </span>
          ))}
        </div>
        <div className="text-zinc-600">↓</div>
        <div className="text-green-400">25 Modules → AppleScript / Shell / LLM → Response</div>
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-jarvis-darker bg-grid">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-jarvis-darker/80 backdrop-blur-xl border-b border-jarvis-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 shadow-lg shadow-amber-500/20" />
            <span className="font-mono font-bold text-white tracking-wider">J.A.R.V.I.S.</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#features" className="text-sm text-zinc-400 hover:text-white transition-colors">Features</a>
            <a href="#architecture" className="text-sm text-zinc-400 hover:text-white transition-colors">Architecture</a>
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

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="arc-reactor" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight animate-fade-in-up">
            J.A.R.V.I.S.
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 font-light mb-2 animate-fade-in-up delay-100">
            Just A Rather Very Intelligent System
          </p>
          <p className="text-base text-zinc-500 max-w-2xl mx-auto mb-10 animate-fade-in-up delay-200 leading-relaxed">
            A macOS AI assistant with voice control, screen awareness, browser automation,
            and multi-device support. Talk to it, type to it, or let it watch your screen.
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-8 md:gap-16 mb-14 animate-fade-in-up delay-300">
            {STATS.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-jarvis-blue glow-gold">{stat.value}</div>
                <div className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Terminal Demo */}
          <div className="animate-fade-in-up delay-400">
            <TerminalDemo />
          </div>

          {/* CTA */}
          <div className="flex justify-center gap-4 mt-10 animate-fade-in-up delay-500">
            <a
              href="https://github.com/ArhanCodes/jarvis"
              target="_blank"
              rel="noopener"
              className="px-8 py-3 bg-jarvis-blue text-black font-semibold rounded-lg hover:bg-amber-300 transition-all shadow-lg shadow-amber-500/20"
            >
              Star on GitHub
            </a>
            <a
              href="#features"
              className="px-8 py-3 border border-zinc-700 text-zinc-300 rounded-lg hover:border-zinc-500 hover:text-white transition-all"
            >
              Explore Features
            </a>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-jarvis-card border border-jarvis-border rounded-xl p-6">
            <h3 className="text-sm text-zinc-500 uppercase tracking-wider mb-4">Quick Start</h3>
            <div className="font-mono text-sm space-y-2">
              <div><span className="text-zinc-500">$</span> <span className="text-green-400">git clone</span> <span className="text-zinc-300">https://github.com/ArhanCodes/jarvis.git</span></div>
              <div><span className="text-zinc-500">$</span> <span className="text-green-400">cd</span> <span className="text-zinc-300">jarvis && npm install</span></div>
              <div><span className="text-zinc-500">$</span> <span className="text-green-400">npm run</span> <span className="text-zinc-300">dev</span></div>
            </div>
            <p className="text-xs text-zinc-600 mt-4">Requires macOS 13+ and Node.js 20+. Voice commands need Xcode CLI Tools.</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Features</h2>
            <p className="text-zinc-500">25+ modules. 200+ commands. Zero latency parsing.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <FeatureCard key={i} {...f} delay={`delay-${(i % 3) * 100 + 100}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section id="architecture" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Architecture</h2>
          <p className="text-zinc-500 mb-10">7-phase parsing engine. No AI for command matching — regex, fuzzy match, then NLU, then conversation.</p>
          <ArchitectureDiagram />
        </div>
      </section>

      {/* Multi-Device */}
      <section className="py-20 px-6 bg-jarvis-dark/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Multi-Device</h2>
          <p className="text-zinc-500 mb-10">Same JARVIS, everywhere. Connected via AIM WebSocket relay.</p>
          <div className="flex justify-center gap-8 md:gap-16">
            {[
              { device: '💻', name: 'Mac', desc: 'Full experience — CLI, voice, menubar, screen awareness' },
              { device: '📱', name: 'iPhone', desc: 'Send commands and receive responses via companion app' },
              { device: '⌚', name: 'Apple Watch', desc: 'Quick commands from your wrist with haptic feedback' },
            ].map((d, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl mb-3">{d.device}</div>
                <div className="text-white font-semibold mb-1">{d.name}</div>
                <div className="text-xs text-zinc-500 max-w-[150px]">{d.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-jarvis-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-yellow-600" />
            <span className="font-mono text-sm text-zinc-500">J.A.R.V.I.S.</span>
          </div>
          <div className="text-sm text-zinc-600">
            Built by <a href="https://arhan.dev" target="_blank" rel="noopener" className="text-zinc-400 hover:text-white transition-colors">Arhan Harchandani</a>
          </div>
          <a
            href="https://github.com/ArhanCodes/jarvis"
            target="_blank"
            rel="noopener"
            className="text-sm text-zinc-500 hover:text-white transition-colors"
          >
            GitHub →
          </a>
        </div>
      </footer>
    </div>
  )
}

export default App
