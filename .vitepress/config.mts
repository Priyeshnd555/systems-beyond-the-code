import { defineConfig } from 'vitepress'

// Calculate base URL:
// If BASE_PATH is set (e.g. via command or CI), use it.
// If running in GitHub Actions with GITHUB_REPOSITORY (e.g. 'owner/repo'), use '/repo/'.
// Otherwise default to root '/' for local development.
const getBase = () => {
  if (process.env.BASE_PATH) {
    return process.env.BASE_PATH
  }
  if (process.env.GITHUB_REPOSITORY) {
    const repo = process.env.GITHUB_REPOSITORY.split('/')[1]
    return `/${repo}/`
  }
  return '/'
}

export default defineConfig({
  title: 'Systems Beyond the Code',
  description: 'The Anatomy of Software Systems: From First Principles to Resilient Architecture',
  base: getBase(),
  outDir: 'dist',
  srcExclude: ['.prompt/**', 'node_modules/**', 'README.md'],
  ignoreDeadLinks: true,

  head: [
    ['link', { rel: 'icon', href: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🏛️</text></svg>' }],
    ['meta', { name: 'theme-color', content: '#3b82f6' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }]
  ],

  markdown: {
    lineNumbers: true,
    config: (md) => {
      const defaultFence = md.renderer.rules.fence!
      md.renderer.rules.fence = (tokens, idx, options, env, self) => {
        const token = tokens[idx]
        if (token.info.trim() === 'mermaid') {
          const encoded = encodeURIComponent(token.content)
          return `<ClientOnly><Mermaid code="${encoded}" /></ClientOnly>`
        }
        return defaultFence(tokens, idx, options, env, self)
      }
    }
  },

  themeConfig: {
    siteTitle: '🏛️ Systems Beyond the Code',
    logo: false,

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Roadmap', link: '/ROADMAP' },
      {
        text: 'Parts',
        items: [
          { text: 'Part 1: Request Anatomy', link: '/book/part-01-request-anatomy/chapter-01-anatomy-of-a-keystroke' },
          { text: 'Part 2: Concurrency & State', link: '/book/part-02-concurrency-correctness/chapter-08-race-conditions-critical-sections' },
          { text: 'Part 3: Time & Asynchrony', link: '/book/part-03-time-space-asynchrony/chapter-15-illusion-of-global-clock-time' },
          { text: 'Part 4: Data & Streaming', link: '/book/part-04-media-search-edge/chapter-22-anatomy-of-large-data-chunks-checksums' },
          { text: 'Part 5: Trust & Multi-Tenancy', link: '/book/part-05-trust-multitenancy/chapter-27-zero-trust-perimeters' },
          { text: 'Part 6: Extreme Constraints', link: '/book/part-06-extreme-constraints/chapter-34-trading-matching-engines' },
          { text: 'Part 7: Master Architect', link: '/book/part-07-synthesis-architecture/chapter-39-architecture-decision-matrix' },
        ]
      },
      { text: 'Domain Matrix', link: '/roadmap/08-cross-domain-matrix' },
      { text: 'Progress', link: '/PROGRESS' }
    ],

    sidebar: [
      {
        text: 'Master Blueprint & Ledger',
        collapsed: false,
        items: [
          { text: 'Overview & Introduction', link: '/' },
          { text: 'Master Architectural Roadmap', link: '/ROADMAP' },
          { text: 'Cross-Domain Reference Matrix', link: '/roadmap/08-cross-domain-matrix' },
          { text: 'Manuscript Progress Ledger', link: '/PROGRESS' }
        ]
      },
      {
        text: 'Part 1: Anatomy of a Request & Web Fundamentals',
        collapsed: true,
        items: [
          { text: 'Part 1 Roadmap', link: '/roadmap/01-part-1-request-anatomy' },
          { text: 'Ch 01: Keystroke Anatomy (DNS & TLS)', link: '/book/part-01-request-anatomy/chapter-01-anatomy-of-a-keystroke' },
          { text: 'Ch 02: Browser Lifecycle & Rendering', link: '/book/part-01-request-anatomy/chapter-02-browser-execution-cycle' },
          { text: 'Ch 03: Request Meets Backend', link: '/book/part-01-request-anatomy/chapter-03-request-meets-backend' },
          { text: 'Ch 04: Database Indexing Mechanics', link: '/book/part-01-request-anatomy/chapter-04-database-indexing-mechanics' },
          { text: 'Ch 05: Caching Tiers & Stampedes', link: '/book/part-01-request-anatomy/chapter-05-caching-tiers-and-stampedes' },
          { text: 'Ch 06: Planetary URL Shortener (Case Study)', link: '/book/part-01-request-anatomy/chapter-06-case-study-planetary-url-shortener' },
          { text: 'Ch 07: Distributed Rate Limiter (System)', link: '/book/part-01-request-anatomy/chapter-07-system-distributed-rate-limiter' }
        ]
      },
      {
        text: 'Part 2: Concurrency, Correctness & State',
        collapsed: true,
        items: [
          { text: 'Part 2 Roadmap', link: '/roadmap/02-part-2-concurrency-correctness' },
          { text: 'Ch 08: Race Conditions & Critical Sections', link: '/book/part-02-concurrency-correctness/chapter-08-race-conditions-critical-sections' },
          { text: 'Ch 09: Ticket Booking Architecture', link: '/book/part-02-concurrency-correctness/chapter-09-ticket-booking-architecture' },
          { text: 'Ch 10: Banking Ledgers & Correctness', link: '/book/part-02-concurrency-correctness/chapter-10-banking-ledgers-correctness' },
          { text: 'Ch 11: Idempotency & Partial Failures', link: '/book/part-02-concurrency-correctness/chapter-11-idempotency-partial-failures' },
          { text: 'Ch 12: Flash Sales & Inventory Depletion', link: '/book/part-02-concurrency-correctness/chapter-12-flash-sales-inventory-depletion' },
          { text: 'Ch 13: Tamper-Evident Audit Log (System)', link: '/book/part-02-concurrency-correctness/chapter-13-system-tamper-evident-audit-log' },
          { text: 'Ch 14: Distributed Job Queue (System)', link: '/book/part-02-concurrency-correctness/chapter-14-system-distributed-job-queue' }
        ]
      },
      {
        text: 'Part 3: Time, Space & Asynchrony',
        collapsed: true,
        items: [
          { text: 'Part 3 Roadmap', link: '/roadmap/03-part-3-time-space-asynchrony' },
          { text: 'Ch 15: The Illusion of Global Clock Time', link: '/book/part-03-time-space-asynchrony/chapter-15-illusion-of-global-clock-time' },
          { text: 'Ch 16: Chat & Collaboration Ordering', link: '/book/part-03-time-space-asynchrony/chapter-16-chat-collaboration-ordering' },
          { text: 'Ch 17: Geospatial Indexing & Ride-Hailing', link: '/book/part-03-time-space-asynchrony/chapter-17-geospatial-indexing-ride-hailing' },
          { text: 'Ch 18: Logistics & Event Sourcing', link: '/book/part-03-time-space-asynchrony/chapter-18-logistics-event-sourcing' },
          { text: 'Ch 19: Travel & Hospitality Systems (Sagas)', link: '/book/part-03-time-space-asynchrony/chapter-19-travel-hospitality-systems' },
          { text: 'Ch 20: Planetary Notification Engine (System)', link: '/book/part-03-time-space-asynchrony/chapter-20-system-planetary-notification-engine' },
          { text: 'Ch 21: Distributed Search Autocomplete (System)', link: '/book/part-03-time-space-asynchrony/chapter-21-system-distributed-search-autocomplete' }
        ]
      },
      {
        text: 'Part 4: Data at Rest and in Motion',
        collapsed: true,
        items: [
          { text: 'Part 4 Roadmap', link: '/roadmap/04-part-4-media-search-edge' },
          { text: 'Ch 22: Anatomy of Large Data Chunks', link: '/book/part-04-media-search-edge/chapter-22-anatomy-of-large-data-chunks-checksums' },
          { text: 'Ch 23: Video & Audio Streaming Architecture', link: '/book/part-04-media-search-edge/chapter-23-video-audio-streaming-architecture' },
          { text: 'Ch 24: Social Media Dynamic Feeds', link: '/book/part-04-media-search-edge/chapter-24-social-media-dynamic-feeds' },
          { text: 'Ch 25: Gaming Multiplayer Systems (60-Tick)', link: '/book/part-04-media-search-edge/chapter-25-gaming-multiplayer-systems' },
          { text: 'Ch 26: Resilient File Upload Platform (System)', link: '/book/part-04-media-search-edge/chapter-26-system-resilient-file-upload' }
        ]
      },
      {
        text: 'Part 5: Trust, Isolation & Compliance',
        collapsed: true,
        items: [
          { text: 'Part 5 Roadmap', link: '/roadmap/05-part-5-trust-multitenancy' },
          { text: 'Ch 27: Zero-Trust Perimeter & mTLS', link: '/book/part-05-trust-multitenancy/chapter-27-zero-trust-perimeters' },
          { text: 'Ch 28: Healthcare & Medical Systems (FHIR)', link: '/book/part-05-trust-multitenancy/chapter-28-healthcare-medical-systems' },
          { text: 'Ch 29: Enterprise SaaS Multi-Tenancy', link: '/book/part-05-trust-multitenancy/chapter-29-enterprise-saas-multitenancy' },
          { text: 'Ch 30: Government & Identity Platforms', link: '/book/part-05-trust-multitenancy/chapter-30-government-identity-platforms' },
          { text: 'Ch 31: Education Online Examinations', link: '/book/part-05-trust-multitenancy/chapter-31-education-online-examinations' },
          { text: 'Ch 32: Enterprise API Gateway (System)', link: '/book/part-05-trust-multitenancy/chapter-32-system-enterprise-api-gateway' },
          { text: 'Ch 33: Dynamic Feature Flags (System)', link: '/book/part-05-trust-multitenancy/chapter-33-system-dynamic-feature-flags' }
        ]
      },
      {
        text: 'Part 6: High Velocity & Extreme Constraints',
        collapsed: true,
        items: [
          { text: 'Part 6 Roadmap', link: '/roadmap/06-part-6-extreme-constraints' },
          { text: 'Ch 34: Trading Matching Engines (Microseconds)', link: '/book/part-06-extreme-constraints/chapter-34-trading-matching-engines' },
          { text: 'Ch 35: IoT Edge Constrained Devices', link: '/book/part-06-extreme-constraints/chapter-35-iot-edge-constrained-devices' },
          { text: 'Ch 36: AI Applications & Deterministic Guardrails', link: '/book/part-06-extreme-constraints/chapter-36-ai-agents-deterministic-guardrails' },
          { text: 'Ch 37: Cloud Control Planes Reconciliation', link: '/book/part-06-extreme-constraints/chapter-37-cloud-control-planes-reconciliation' },
          { text: 'Ch 38: Realtime Stream Analytics (System)', link: '/book/part-06-extreme-constraints/chapter-38-system-realtime-stream-analytics' }
        ]
      },
      {
        text: 'Part 7: The Master Architect',
        collapsed: true,
        items: [
          { text: 'Part 7 Roadmap', link: '/roadmap/07-part-7-synthesis-architecture' },
          { text: 'Ch 39: Architecture Decision Matrix', link: '/book/part-07-synthesis-architecture/chapter-39-architecture-decision-matrix' },
          { text: 'Ch 40: Chaos Engineering & Failure Taxonomy', link: '/book/part-07-synthesis-architecture/chapter-40-chaos-engineering-failure-taxonomy' },
          { text: 'Ch 41: Full-Spectrum Observability', link: '/book/part-07-synthesis-architecture/chapter-41-observability-production-readiness' },
          { text: 'Ch 42: Grand Capstone Planetary Blueprint', link: '/book/part-07-synthesis-architecture/chapter-42-grand-capstone-planetary-blueprint' }
        ]
      }
    ],

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: 'Search book (Cmd+K)',
                buttonAriaLabel: 'Search book'
              },
              modal: {
                noResultsText: 'No architectural patterns found',
                resetButtonTitle: 'Reset search',
                footer: {
                  selectText: 'to select',
                  navigateText: 'to navigate',
                  closeText: 'to close'
                }
              }
            }
          }
        }
      }
    },

    docFooter: {
      prev: 'Previous Chapter',
      next: 'Next Chapter'
    },

    outline: {
      level: [2, 3],
      label: 'On This Page'
    },

    footer: {
      message: 'The Anatomy of Software Systems — Domain-Driven Architectural Masterclass.',
      copyright: 'Built with VitePress & GitHub Pages.'
    }
  }
})
