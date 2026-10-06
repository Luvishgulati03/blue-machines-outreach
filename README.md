# An application that got out of hand

A local, interactive application concept by Luvish Gulati for a conversation with Blue Machines. It is **not** a Blue Machines product, an internal platform view, or a live voice-agent integration.

## Run it

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. `npm run build` checks TypeScript and produces a static `dist/`; `npm run preview` serves that build. No API keys or backend are needed. The optional Orb uses the browser's own speech synthesis if enabled.

## What to try

1. Begin at the intro or use “the path” to jump to a chapter.
2. Answer the graph-vs-LLM challenge.
3. In Flow Studio, click blocks to inspect them and run the sample order-support call.
4. Toggle CRM failure and run it again. The trace takes a safe handoff route and does not invent an order status.
5. Try the optional Orb page, then read the final application reveal.

All sample calls, variables, outcomes and UI data are illustrative. Nothing is sent to a remote service. Progress is stored in this browser's local storage.

## Edit the content

- `src/content/story.ts`: chapter copy, order, checkpoint names
- `src/content/links.ts`: résumé, portfolio, contact and source URLs
- `src/features/flow-studio/FlowStudio.tsx`: sample call, graph, node explanations and fallback
- `src/features/orb/Orb.tsx`: optional voice-page prompts and scripted replies
- `src/styles/tokens.css` and `src/styles/app.css`: visual system and responsive layout

Before sharing, verify the résumé URL and all personal claims against the latest résumé. Do not put client data, credentials, or unapproved company material in this repository.

## GitHub Pages

The included `.github/workflows/pages.yml` builds and deploys to GitHub Pages on pushes to `main`. Enable **Settings → Pages → Build and deployment → GitHub Actions** in the destination repository. `HashRouter` and Vite's relative base make deep links work on a project Pages URL without server rewrites. This local folder is not connected to a remote repository and has not been deployed.

## Public context

The concept was informed by [Blue Machines' public website](https://bluemachines.ai/), its [role description](https://onboarding.bluemachines.ai/pre-joining/the-role), and its [systems-thinking introduction](https://onboarding.bluemachines.ai/pre-joining/systems-thinking-intro). These sources are context, not a claim about Blue Machines' private architecture. The chapter about GetVocal is grounded in Luvish's résumé-described work on client-facing voice agents using that platform; it does not claim he built GetVocal itself.
