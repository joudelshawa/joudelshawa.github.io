# Lightweight Portfolio Chat Architecture (Reusable Plan)

## Goal
Add an optional, low-latency chat assistant for portfolio visitors that answers questions about Joud, projects, and contact info.

## Scope (Phase 1)
- Keep hero intro animation and chat as separate experiences.
- Enable chat only after explicit user intent (CTA), not auto-open.
- Ground answers in site content (projects + profile text) using retrieval.
- Keep responses concise and friendly with light persona styling.

## Non-Goals (Phase 1)
- No full autonomous agent workflows.
- No broad web search.
- No account/auth requirement.

## UX Recommendation
1. Intro autoplay finishes.
2. Show CTA: "Ask me about my projects".
3. Open compact chat panel/composer on click.
4. Offer suggested prompts:
   - "What projects involve healthcare AI?"
   - "Tell me about your education"
   - "How can I contact you?"

## Model Strategy
### Default (Recommended)
- Hosted small instruct model (roughly 3B–8B class).
- Prefer 8B-class for better quality/consistency.
- Use retrieval-augmented generation (RAG) from local portfolio content.

### Experimental Local Option
- In-browser WebGPU model (1.5B–3B quantized).
- Tradeoffs: heavy first download, variable device compatibility, weaker output quality.
- Offer as optional "Experimental local mode", never as default.

## Persona Contract
Use system prompt constraints such as:
- Warm, enthusiastic, concise tone.
- Bunny emoji style: optional and sparse (max 1 🐰 per response).
- Domain constrained to provided portfolio context.
- If unknown, acknowledge uncertainty and suggest contact path.
- Default response length cap (e.g., <=120 words unless user asks for detail).

## Data and Retrieval
### Sources
- `content/projects/*.md`
- hero/about text in source data
- optional static profile facts file

### Indexing
- Build-time chunking + embedding generation.
- Store vectors in lightweight DB (managed vector store or edge KV + vector index).

### Retrieval Flow
1. Receive user message.
2. Retrieve top-k relevant chunks.
3. Compose compact context window.
4. Generate response with citations/links to project pages.

## Minimal API Shape
- `POST /api/chat`
  - input: `{ message: string, sessionId?: string }`
  - output: `{ answer: string, citations?: Array<{ title: string, href: string }> }`

## Safety, Abuse, and Cost Controls
- Server-side key handling only.
- Rate limiting per IP + session token bucket (example: 20 req/10 min, 200/day).
- Input length cap and max output tokens.
- One in-flight generation per session.
- Basic abuse filtering and denylist.
- Global daily budget cap with graceful fallback message.
- Cache common FAQ responses.

## Observability
Track:
- CTA click-through rate
- first message rate
- successful answer rate
- contact click after chat
- median latency and token usage

## Suggested Rollout
### Phase 0
- Finalize prompt/persona and retrieval schema.

### Phase 1
- Ship hosted small-model chat + RAG + limits.

### Phase 2
- Add quick-reply prompts and stronger citations.

### Phase 3 (Optional)
- Add experimental browser-local mode toggle.

## Open Decisions
- Provider/model selection based on latency in target regions.
- Vector store choice aligned with hosting stack.
- Whether to show citations inline by default or behind "Sources".
