# Repository Guidelines

## Project Structure & Module Organization
Static demos live under `views/`, grouped by library or topic (for example `views/element-plus/` and `views/高德地图/`). Shared vendor bundles sit in `static/`, mirroring those folder names (`static/echarts/`, `static/vue/`, etc.), and reusable images belong in `img/`. Add new examples in a subfolder named after the library (lowercase kebab-case) and keep supporting assets beside the demo or in the matching `static/` directory.

## Build, Test, and Development Commands
The repository is pure HTML, so no build step is needed. Use a lightweight HTTP server to keep relative paths intact:

```bash
python -m http.server 8000
```

Run the command from the repository root, then open `http://localhost:8000/views/...`. `npx serve` or `npx http-server` are equivalent Node.js options.

## Coding Style & Naming Conventions
Indent HTML, CSS, and JavaScript with two spaces and favor semantic tags over generic `<div>` wrappers. Link scripts with relative paths rooted at the project root (e.g., `../static/vue/vue.global.js`). Use lowercase kebab-case for files and folders unless the upstream library requires a different style. Wrap inline scripts in immediately invoked functions, and move shared helpers into `static/<library>/utils/` with brief header comments describing required globals.

## Testing Guidelines
There is no automated test suite, so rely on manual verification. Check the affected page in at least one Chromium-based browser and Firefox, confirm the console stays clean, and ensure localized folders (such as `views/高德地图/`) still load required fonts. When introducing new assets, add them to `static/` and sanity-check older demos that reuse the dependency.

## Commit & Pull Request Guidelines
Write commits in the present tense with focused scopes (`feat: add gantt drag handles`, `fix: correct pdf export font path`). Include screenshots or GIFs in pull requests for visual updates, along with reproduction steps. Reference related issues or demo paths (for example `views/html2pdf/invoice.html`) so reviewers can reach context quickly. Before requesting review, re-run the local server check and confirm new assets are sized appropriately.

## Asset & Configuration Tips
Vendored libraries should stay pinned; update only when a demo requires it, and stage the new files under `static/<library>/<version>/` before changing references. Avoid modifying `.idea/` or `.vscode/`; keep editor preferences local. If a demo needs credentials (for example map APIs), scaffold a `config.sample.js`, add the real file to `.gitignore`, and document the required keys.
