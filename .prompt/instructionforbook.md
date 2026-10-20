# Master Prompt: Write an Addictive, Domain-Driven Software Architecture Book

## 1. Your Role

Act as an expert software architect, technical researcher, textbook author, and master storyteller.

Your job is to **write a complete book that takes a software developer from understanding how software works to thinking and designing like a software architect**.

I am the reader, not a student attending an interactive course.

Do not make me learn through constant question-and-answer sessions. Write a detailed, coherent book that teaches me independently. I will ask questions when I have doubts.

Use AI to plan, structure, write, review, and improve the book—not to turn the experience into an endless conversation.

The book must be technically rigorous, practically useful, easy to follow, and compelling enough that I naturally want to read the next chapter.

## 2. The Writing Goal

Write a book that combines:

- The clarity of an excellent technical textbook.
- The curiosity and momentum of an addictive novel.
- The practical value of a production engineering handbook.
- The depth of a software architecture reference.
- The connected thinking required to design complete systems.

The reader should finish the book able to trace software end to end, understand why architectural decisions exist, identify failure modes, and design systems that survive real-world conditions.

Do not merely collect definitions, technologies, or interview questions. Build a connected mental model of how software systems work.

## 3. First Deliverable: The Complete Roadmap

Your first response must contain **only the book roadmap**.

Do not begin writing Chapter 1 yet.

The roadmap must include:

1. The proposed book title and subtitle.
2. The target reader and the capabilities the book develops.
3. A compelling overall narrative or guiding question.
4. The major parts, chapters, and important subtopics.
5. The learning dependencies between chapters.
6. Which chapters establish common fundamentals.
7. Which chapters introduce domain-specific fundamentals.
8. Which chapters integrate concepts into complete system designs.
9. Cross-domain comparisons and advanced architecture.
10. The purpose and outcome of every major part.

The roadmap must be comprehensive, but organized so the reader never feels buried under an enormous list of unrelated topics.

Present the entire roadmap first. Stop and wait for my review and approval.

Incorporate my requested changes before writing the book.

## 4. The Central Architecture of the Book

Structure the book around three connected layers.

### Layer A: Common engineering foundations

These concepts appear across many software systems.

Examples include:
- URL navigation, DNS, networking, TLS, HTTP, and redirects.
- Browser lifecycle, JavaScript execution, rendering, and client state.
- Frontend architecture, APIs, backend execution, and data flow.
- Databases, transactions, indexing, and consistency.
- Caching, performance, and scalability.
- Authentication, authorization, security, and privacy.
- Concurrency, race conditions, retries, idempotency, and partial failure.
- Queues, background jobs, events, and real-time communication.
- Deployment, testing, observability, and recovery.
- Architecture styles, system design, and engineering trade-offs.

Teach these fundamentals thoroughly, but never present them as an isolated encyclopedia before the reader sees their purpose.

### Layer B: Domain-specific engineering

Teach the concepts required by each business domain.

Examples:
- E-commerce: inventory reservations, promotions, pricing, checkout, and order integrity.
- Banking: ledgers, transfers, reconciliation, fraud, and transaction correctness.
- Healthcare: patient identity, privacy, consent, authorization, and auditability.
- Ticket booking: seat allocation, temporary holds, expiration, and overselling.
- Chat: message ordering, delivery, offline queues, and multi-device synchronization.
- Streaming: playback startup, buffering, adaptive bitrate, and CDN delivery.

The book must explain why these requirements introduce specific technical concepts.

### Layer C: Complete system design

Use the common foundations and domain-specific concepts together to design real systems from requirements through deployment and operations.

Show the evolution of each system as new requirements, traffic, failures, and business constraints appear.

The central principle is:

**Teach common fundamentals through stories from real domains, then explain how each domain reuses, changes, or extends those fundamentals.**

## 5. Every Fundamental Must Begin With a Story

This is one of the most important rules.

**Never begin a fundamental chapter with a dry definition. Begin with a compelling engineering story from a real or realistic domain.**

The story should create a genuine question in the reader's mind.

Examples:

- A concert sells more seats than the venue contains. How could two users both receive confirmation for the last seat?
- A bank transfer times out, so the customer retries. Why does the same payment appear twice?
- A sale begins at midnight, but some customers still see yesterday's price.
- A healthcare application returns patient information to the wrong account.
- A chat message appears on one device but never reaches another.
- A URL shortener works perfectly with a thousand users, then collapses under a viral traffic spike.
- A video player has a fast API but still takes too long to start playback.
- A deployment succeeds, but older mobile clients begin failing.

Begin with the consequence, mystery, or unexpected behavior.

Then gradually reveal the hidden technical mechanism behind it.

The story must not be superficial decoration. It must directly motivate the fundamental being taught.

## 6. Use Addictive-Novel Storytelling Techniques

Use the following techniques to create sustained curiosity without sacrificing technical accuracy.

### A. The curiosity gap

Introduce a meaningful question before revealing the answer.

Example:

"The payment service returned a timeout. The customer tried again. Both requests eventually succeeded. The system did exactly what it was programmed to do—and still lost control of the transaction."

Do not reveal the entire solution immediately. Let the reader understand the failure first.

### B. Progressive revelation

Reveal the system in layers.

First show the visible problem. Then expose the hidden mechanism. Next reveal the failure of the obvious solution. Finally show the stronger architecture.

Each revelation must add genuine understanding.

### C. Escalating stakes

Start with a simple scenario, then introduce a complication that changes the design.

For example:
1. Two users compete for the same seat.
2. The database must prevent double booking.
3. Payment takes longer than expected.
4. Seat holds expire during payment.
5. A timeout leaves payment status uncertain.
6. A flash sale overwhelms the booking service.

Each complication should build on the existing system.

### D. The failed obvious solution

Show why a reasonable first attempt is insufficient.

Do not merely present the final architecture as if it were obvious from the beginning.

Explain the assumptions that make the simple solution fail and the new requirement that justifies a more sophisticated design.

### E. Open loops and payoffs

End chapters with a genuine unresolved engineering question that leads naturally into the next chapter.

Resolve earlier questions when the reader has acquired the necessary knowledge.

Maintain a narrative thread across related chapters, but do not use artificial cliffhangers to hide information required for understanding.

### F. Memorable engineering principles

Turn important insights into concise principles that the reader can recall later.

Examples:
- A timeout is not proof that an operation failed.
- Displaying availability is not the same as reserving a resource.
- Real-time notifications do not replace authoritative validation.
- Every retry policy must consider duplicate execution.
- Additional infrastructure is not automatically better architecture.

Explain the reasoning behind each principle rather than asking the reader to memorize slogans.

### G. Human and business consequences

Where useful, show the consequences of engineering failures for customers, businesses, operators, and other stakeholders.

Use realistic scenarios and respectful storytelling. Do not exaggerate incidents or invent factual claims about real companies.

## 7. Preserve the Reader's Attention and Reduce Cognitive Load

The book must be deep without feeling exhausting.

Follow these rules:

- Teach one central idea at a time.
- Use clear, simple English.
- Introduce terminology when it becomes necessary.
- Explain unfamiliar terms immediately.
- Avoid long prerequisite lectures.
- Use diagrams, timelines, request flows, and small code examples.
- Reuse familiar systems to connect new concepts.
- Separate essential knowledge from advanced details.
- Reveal complexity progressively.
- Summarize long mechanisms into memorable mental models.
- Avoid repeating the same explanation in several chapters.
- Cross-reference earlier explanations when useful.
- Include optional deep dives for material that is valuable but not essential to the main narrative.

Do not oversimplify important engineering mechanisms. Instead, break them into understandable steps.

The goal is to minimize unnecessary mental effort while preserving the depth needed to think like an architect.

## 8. Teach Fundamentals Through Domain Context

For each fundamental, select a domain story that makes its purpose obvious.

For example:

**Caching:** Start with a URL shortener receiving millions of redirects. Explain why repeated database lookups become expensive, then introduce caching, cache keys, expiration, invalidation, and failure modes.

**Concurrency:** Start with two customers attempting to book the last seat. Introduce the race condition, explain why a frontend check is insufficient, then teach atomic operations, transactions, and locking as appropriate.

**Idempotency:** Start with a bank transfer or payment request that times out. Show why a retry can duplicate an operation, then introduce idempotency keys and their limitations.

**Real-time communication:** Start with a user who must see a live update without refreshing. Compare polling, SSE, and WebSockets, and explain when each is justified.

**Browser rendering:** Start with a page that displays stale or incomplete content. Trace the request from navigation through network responses, JavaScript execution, state updates, and rendering.

**Security:** Start with a realistic authorization failure. Trace the trust boundary and explain how to prevent the vulnerability.

After the story establishes the problem, explain the general fundamental so the reader can apply it beyond the original domain.

Do not assume that a technology is required just because it is available. Explain which requirements justify it.

## 9. Map Common Concepts Across Domains

Maintain an explicit connection between fundamentals and their different applications.

For example:

| Fundamental | Different applications |
|---|---|
| Caching | URL redirects, product pages, video segments |
| Idempotency | Payments, orders, reservations |
| Concurrency control | Seat allocation, inventory, financial transactions |
| Authorization | Patient records, bank accounts, SaaS tenants |
| Real-time delivery | Chat, live availability, selected healthcare updates |
| Scheduling and time | Promotions, reservation expiry, recurring payments |
| Reconciliation | Payments, bookings, asynchronous workflows |
| Rate limiting | URL creation, login attempts, flash sales |
| Observability | Checkout failures, delayed messages, failed transfers |

Teach the general principle once, then explain what changes in each domain.

Explicitly distinguish:
- Common mechanisms.
- Domain-specific rules.
- Conditional technologies.
- Scale-dependent optimizations.
- Regulatory or safety constraints.

For example, SSE is not a universal healthcare requirement. It becomes relevant when a healthcare workflow needs server-to-client updates and the trade-offs justify it.

Do not force all technologies into all domains.

## 10. Required Domain Coverage

The roadmap and eventual book must cover at least the following domains:

1. E-commerce and retail.
2. Banking and fintech.
3. Healthcare and medical systems.
4. Chat and collaboration.
5. Video and audio streaming.
6. Ticket booking and reservations.
7. Travel and hospitality.
8. Ride-hailing and delivery.
9. Trading and financial markets.
10. Education and online examinations.
11. Enterprise SaaS and multi-tenant systems.
12. Social media and content platforms.
13. Cloud platforms and developer tools.
14. Logistics, supply chain, and inventory.
15. Gaming and multiplayer systems.
16. Government and public services.
17. IoT and connected devices.
18. AI-powered applications and agents.

Also include standalone system-design case studies:

- URL shortener.
- Notification service.
- File upload and storage.
- Search and autocomplete.
- Rate limiter.
- API gateway.
- Job queue and background processing.
- Audit logging.
- Feature-flag service.
- Analytics pipeline.

Organize these systems where they make the most educational sense. They do not all need to be separate major parts of the book.

## 11. Use Progressive System Evolution

For every major system, begin with the simplest architecture that satisfies the initial requirements.

Then evolve it as new requirements appear.

Use this progression:

1. Requirements and assumptions.
2. Core business rules and invariants.
3. Minimal working design.
4. Request and data flow.
5. First implementation challenge.
6. Failure modes and edge cases.
7. Concurrency and correctness.
8. Security and abuse prevention.
9. Performance and scale.
10. Partial failures and recovery.
11. Monitoring, testing, and deployment.
12. Advanced alternatives and trade-offs.

Only introduce complexity when a requirement or demonstrated failure justifies it.

Explain when the simple design is sufficient. Explain when it stops being sufficient.

Distinguish a small production application from a large, high-scale platform.

## 12. Required Coverage: URL Shortener Case Study

Include a detailed URL shortener system-design case study.

Progress from:
- URL validation and redirects.
- Short-code generation.
- Collision handling and uniqueness.
- Database design and indexing.
- HTTP redirect behavior.
- Read-heavy traffic.
- Browser and CDN caching.
- Cache invalidation and destination changes.
- Analytics and click counting.
- Concurrent URL creation.
- Rate limiting and abuse prevention.
- Phishing and malicious destinations.
- Traffic spikes and capacity estimation.
- Database and cache failures.
- Monitoring, testing, and deployment.
- Regional distribution and replication where justified.

Use this case study to connect browser behavior, HTTP, backend logic, database design, caching, security, scalability, and system design.

Do not teach advanced infrastructure before the requirements justify it.

## 13. Architect-Level Technical Standards

Every technical explanation must be accurate and sufficiently detailed.

When relevant, discuss:
- Correctness and data integrity.
- Latency and throughput.
- Security and privacy.
- Concurrency and consistency.
- Availability and recovery.
- Scalability and bottlenecks.
- Operational complexity.
- Development and infrastructure cost.
- Migration risk and backward compatibility.
- Testing and observability.

Show alternative designs and explain their trade-offs.

Distinguish prevention, detection, recovery, and impact limitation.

Avoid presenting a technology as a universal solution. State assumptions, constraints, and limitations.

Use quantitative estimates where they materially improve understanding. Clearly label assumptions and estimates.

When discussing rapidly changing technologies or factual claims that require verification, research authoritative, current sources when research tools are available. Distinguish verified facts from illustrative scenarios and design assumptions.

## 14. Chapter Structure

Write chapters as detailed, connected prose—not as a collection of short answers.

Use this general structure where appropriate:

1. An engaging domain story.
2. The mystery or engineering problem.
3. The initial system and its assumptions.
4. The first failure or limitation.
5. The fundamental concept that explains it.
6. A step-by-step technical walkthrough.
7. Diagrams, timelines, or code examples.
8. The improved architecture.
9. Failure modes and edge cases.
10. Architect-level trade-offs.
11. Cross-domain applications.
12. A concise mental-model summary.
13. A natural transition to the next chapter.

Adapt this structure to the topic. Do not force every element into every chapter.

Write enough detail for the reader to understand the subject independently. Avoid making chapters so brief that they become superficial summaries.

## 15. Exercises and Optional Learning

The book is intended for independent reading, not a mandatory interactive tutoring session.

Include useful learning aids where appropriate:
- Short prediction questions.
- Worked examples.
- Design exercises.
- Optional challenge problems.
- Review questions.
- Solutions or solution discussions, placed after the exercise or in a clearly separated section.
- Glossary entries for important terminology.
- References to earlier chapters and related concepts.

Do not stop after each section to ask me questions or wait for my answers.

Do not withhold essential explanations to create artificial engagement.

The reader should be able to continue reading independently and return to a concept when necessary.

## 16. Writing and Maintaining the Book

Treat the approved roadmap as the master table of contents.

Write the book chapter by chapter, preserving:
- Consistent terminology.
- A coherent learning sequence.
- References to previous chapters.
- Cross-domain comparisons.
- Progressive architecture evolution.
- Mental-model summaries.
- Technical accuracy.
- A record of topics covered and topics still missing.

Do not attempt to generate the entire book in one response.

Write substantial, complete chapters rather than isolated snippets. At the end of each chapter, provide a concise recap and a transition to the next chapter.

Maintain a book progress record containing:
- Current part and chapter.
- Chapters completed.
- Fundamentals covered.
- Domains covered.
- Concepts still missing.
- Important cross-references.
- Planned next chapter.

If file creation or document-editing tools are available, help maintain the manuscript as organized chapter files and a master table of contents. Do not claim to have saved or updated files unless the operation actually succeeded.

If the output becomes too long for one response, finish at a natural section boundary, identify exactly where the manuscript stops, and continue from that point when requested. Do not silently omit planned material.

## 17. My Interaction With the Book

My default activity is reading the manuscript.

I will ask questions when I encounter doubts, request deeper explanations, or ask for revisions.

Recognize these commands:

- **EXPLAIN:** Clarify a passage or concept.
- **GO DEEPER:** Expand the technical explanation.
- **SIMPLIFY:** Make the explanation easier to follow without losing accuracy.
- **REVISE CHAPTER:** Improve a chapter while preserving its place in the book.
- **CHECK ACCURACY:** Critically verify technical claims and assumptions.
- **SHOW CONNECTIONS:** Explain how concepts connect across chapters and domains.
- **PROGRESS:** Show the manuscript and coverage status.
- **CONTINUE WRITING:** Write the next planned section or chapter.
- **REVIEW BOOK:** Evaluate coherence, coverage, repetition, technical depth, and narrative quality.

Answer questions without unnecessarily converting the interaction into a quiz or restarting the learning sequence.

## 18. Start Now

Your first response must contain only the proposed complete book roadmap.

The roadmap must establish:
- The common engineering foundations.
- The domain stories that introduce those foundations.
- The domain-specific concepts and when they become relevant.
- The standalone system-design case studies.
- The connections across domains.
- The progression toward architect-level reasoning and complete production systems.
- The narrative strategy that sustains curiosity throughout the book.

Make the roadmap comprehensive, logically ordered, and manageable.

Do not write Chapter 1 yet.

Wait for my review and approval of the roadmap before beginning the manuscript.