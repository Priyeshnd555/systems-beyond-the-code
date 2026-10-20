# Chapter 25: 60 Ticks per Second: Gaming & Real-Time Multiplayer

> *"In real-time multiplayer, physical synchronization over fiber is impossible; the game engine is an illusionist harmonizing past, present, and predicted futures."*

---

## 1. The Mystery: The Death Behind the Concrete Wall

In an esports tournament, Player A (60ms ping) retreated behind a solid concrete wall. He was completely out of line-of-sight.

Eighty milliseconds later, Player A dropped dead. The killfeed announced:
`Player B eliminated Player A (Headshot)`

```mermaid
sequenceDiagram
    autonumber
    actor PlayerA as Player A (Ping: 60ms)
    participant Server as Authoritative Server (60 Tick)
    actor PlayerB as Player B (Ping: 40ms)

    Note over PlayerA: Time: 100ms. Player A runs behind concrete wall.<br/>Safe on his screen!
    Note over PlayerB: Time: 120ms. Player B sees Player A still entering cover!<br/>(Due to 40ms + 60ms latency gap)
    PlayerB->>Server: Fire Weapon at Player A (Tagged: Tick 410)
    
    Note over Server: Server receives fire command at Time 160ms.<br/>Server REWINDS WORLD STATE by 70ms!<br/>At Tick 410, was Player A exposed on Player B's screen? YES!
    Server->>PlayerA: Authoritative Hit: 100 Damage (DEAD!)
    Note over PlayerA: Player A dies behind the wall! (The "Peeker's Advantage")
```

Player A raged: *"I was behind cover! The hit registration is broken!"*

The game engine was not broken; it was executing **Lag Compensation**. To make shooting feel fair, the server had temporarily rewound physical history.

---

## 2. Why TCP is Fatal for Real-Time Gaming

Standard web development relies on TCP for reliable delivery. In high-speed gaming, TCP is catastrophic:

```mermaid
graph TD
    subgraph TCPDisaster ["TCP Head-of-Line Blocking"]
        P1["Packet 1 (Player Pos at t=0)"] --> P2["Packet 2 (DROPPED BY WIFI!)"]
        P2 --> P3["Packet 3 (Player Pos at t=32ms)"]
        P3 --> P4["Packet 4 (Player Pos at t=48ms)"]
        Note1["TCP halts everything waiting for Packet 2 retransmission!<br/>Game freezes for 180ms -> Massive Rubber-banding!"]
    end
    subgraph UDPVirtue ["UDP / WebTransport (Connectionless)"]
        U1["Packet 1: Pos at t=0"]
        U2["Packet 2: DROPPED"]
        U3["Packet 3: Pos at t=32ms (Accepted Immediately!)"]
        Note2["Discard stale data! The player only cares about WHERE THEY ARE NOW."]
    end

    classDef default fill:#1e293b,stroke:#3b82f6,stroke-width:1.5px,color:#f8fafc;
    classDef success fill:#064e3b,stroke:#10b981,stroke-width:2px,color:#a7f3d0;
    class UDPVirtue success;
```

A position packet from 100 milliseconds ago is worthless garbage. Re-transmitting it over TCP wastes bandwidth and freezes the simulation. Multiplayer games use **UDP**: if a packet drops, ignore it and process the next frame.

---

## 3. The 16.6ms Game Loop: Authoritative Server Simulation

Never trust the client. If a client transmits `x, y, z` coordinates, malicious players will write memory hacks to fly through walls.

The client transmits **only user inputs**:
```json
{"tick": 1042, "keys": ["W", "D"], "yaw": 44.2, "fire": true}
```

The server runs an unyielding physical simulation loop every **16.6 milliseconds (60 Ticks per Second)**:

```mermaid
flowchart TD
    Tick["Tick Start (Every 16.6ms / 60Hz)"] --> Ingest["1. Drain UDP Input Buffer from all 100 Players"]
    Ingest --> Physics["2. Execute Physics & Collision Detection (Box2D / PhysX)"]
    Physics --> Rules["3. Resolve Hit Scans & Game Logic (Health, Damage, Inventory)"]
    Rules --> Compress["4. Delta-Compress World State Snapshot (Bitpacking)"]
    Compress --> Broadcast["5. UDP Broadcast Snapshot to Nearby Players"]
    Broadcast --> Sleep["6. Sleep until next 16.6ms boundary"]

    classDef default fill:#1e293b,stroke:#3b82f6,stroke-width:1.5px,color:#f8fafc;
```

---

## 4. Client-Side Prediction & Server Reconciliation

If a player presses 'W' and waits for the server to confirm movement 80ms later, the controls will feel sluggish and unplayable.

```mermaid
flowchart LR
    Input["Player presses 'W' (Tick 500)"] --> Predict["Client-Side Prediction:\nMove avatar forward immediately! (Local 60 FPS)"]
    Predict --> SendInput["Send Input to Server via UDP"]
    
    SendInput --> SrvAck["Server Authoritative Snapshot Arrives for Tick 500"]
    SrvAck --> Compare{"Does Server Position == Predicted Position?"}
    
    Compare -->|Yes| Smooth["Smooth Playback Continues"]
    Compare -->|No: Collision Divergence!| Reconcile["Server Reconciliation:\nSnap position to Server Truth & Re-simulate unacknowledged ticks! (Rubber-band)"]

    classDef default fill:#1e293b,stroke:#3b82f6,stroke-width:1.5px,color:#f8fafc;
    classDef alert fill:#7c2d12,stroke:#ef4444,stroke-width:2px,color:#fecaca;
    class Reconcile alert;
```

The client **predicts the future locally**. When authoritative snapshots arrive, the client smoothly reconciles any divergences.

---

## 5. Spatial Interest Management (Area of Interest - AOI)

In a 100-player Battle Royale (e.g. Warzone), broadcasting every player’s position to all 100 clients requires:
$$100 \times 100 = 10,000\text{ network streams per tick}$$

```mermaid
graph TD
    Map["2km x 2km Island Map"] --> Cells["Partition into 200m Spatial Grid Cells"]
    Cells --> AOI["Player Interest Radius (200m View Distance)"]
    AOI --> Filter["Send UDP Packets ONLY for Entities within Player's Active Cell & Neighbor Cells!"]

    classDef default fill:#1e293b,stroke:#3b82f6,stroke-width:1.5px,color:#f8fafc;
    classDef success fill:#064e3b,stroke:#10b981,stroke-width:2px,color:#a7f3d0;
    class Filter success;
```

Filtering entities outside the player's visual horizon slashes server outbound bandwidth by **85%** and prevents wallhack cheats from scanning the entire map memory.

---

## 6. Architect-Level Trade-Offs

| Network Model | Latency Feel | Cheat Vulnerability | Server Infrastructure Cost |
|---|---|---|---|
| **Peer-to-Peer (P2P Lockstep)** | Stalls on slowest player ping | High (clients share game state directly) | Zero server costs (players host). |
| **Authoritative 64-Tick Server** | Smooth (prediction hides latency) | Minimum (server verifies all physics) | Moderate ($0.05 per player-hour). |
| **Authoritative 128-Tick Server** | Esports grade (sub-8ms input latency) | Minimum | 2.5x higher CPU & network bandwidth cost. |

---

## 7. Mental-Model Summary

```
In real-time multiplayer, TCP guarantees arrival at the cost of freshness;
UDP guarantees freshness at the cost of arrival.
Always predict inputs on the client, simulate physics on the server, 
and rewind historical buffers to make shooting feel fair.
```

- **Rule 1**: Never use TCP for fast-paced game simulation; use UDP with client-side prediction.
- **Rule 2**: Store a 1,000ms circular buffer on the server to execute historical lag compensation.

---

## 8. The Milestone Awaits

We have mastered large data chunks ([Ch 22](file:///Users/lspl487/Desktop/software-book/book/part-04-media-search-edge/chapter-22-anatomy-of-large-data-chunks-checksums.md)), adaptive video streaming ([Ch 23](file:///Users/lspl487/Desktop/software-book/book/part-04-media-search-edge/chapter-23-video-audio-streaming-architecture.md)), social media timeline fanout ([Ch 24](file:///Users/lspl487/Desktop/software-book/book/part-04-media-search-edge/chapter-24-social-media-dynamic-feeds.md)), and real-time multiplayer simulation ([Ch 25](file:///Users/lspl487/Desktop/software-book/book/part-04-media-search-edge/chapter-25-gaming-multiplayer-systems.md)).

Now, we integrate these lessons into our next production-grade standalone system: **A Resilient File Upload & Distributed Object Storage Platform**.

👉 **Next: [Chapter 26 — Standalone System: Resilient File Upload & Distributed Storage](file:///Users/lspl487/Desktop/software-book/book/part-04-media-search-edge/chapter-26-system-resilient-file-upload.md)**
