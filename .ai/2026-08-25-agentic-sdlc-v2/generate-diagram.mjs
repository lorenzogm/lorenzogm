/**
 * Generate the Agentic SDLC v2 diagram images for the blog.
 *
 * Recreates docs/guides/agentic-sdlc.html from the Boost repo using the
 * lorenzogm.com accent red (#b91c1c) instead of the original blue, and
 * renders one PNG per language into apps/lorenzogm/public/.
 *
 * Usage:
 *   cd apps/lorenzogm && node ../../.ai/2026-08-25-agentic-sdlc-v2/generate-diagram.mjs
 */

import { mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const APP_DIR = "/Users/lorenzogm/lorenzogm/lorenzogm/apps/lorenzogm";
// Playwright is only installed in the web app workspace, so resolve it from there.
const { chromium } = await import(
  `${APP_DIR}/node_modules/@playwright/test/index.mjs`
);

const OUT_DIR = `${APP_DIR}/public`;
const SLUG = "agentic-software-development-life-cycle-v2";

const CONTENT = {
  en: {
    title:
      'The <span class="accent">Agentic</span> Software Development Life Cycle',
    subtitle: "A structured, AI-augmented workflow from idea to shipped code.",
    legendBot: "can run unattended in the Software Factory",
    legendHand: "needs a human approval before moving on",
    planning: "Planning",
    xd: "Experience Design",
    prototype: "Prototype",
    prototypeDesc:
      "Design artefacts and prototypes that ground the experience before planning begins.",
    backlog: "Backlog",
    backlogDesc:
      "Specs (epics) and tickets (stories) are stored in the issue tracker.",
    development: "Development",
    steps: {
      "plan-idea":
        "AI asks you business questions to develop your idea and reach a shared understanding.",
      "plan-spec":
        "Synthesise the conversation into a spec — the epic — and publish it to the issue tracker.",
      "plan-tickets":
        "Break the spec into tickets — the stories — each declaring the tickets that block it.",
      "xd-discover": "Intake and inspiration — diverge on the problem space.",
      "xd-frame":
        "Narrative, strategy and principles — converge on a direction.",
      "xd-define": "Define the experience to take into prototyping.",
      "plan-prototype-to-tickets":
        "Turn the prototype into tickets — the stories — ready for the backlog.",
      "dev-implementation-plan":
        "AI asks you technical questions to define the implementation plan.",
      "dev-implement":
        "Implement the tickets from the plan, using TDD at the agreed seams.",
      "dev-code-review":
        "Review the implementation against the plan and the codebase standards.",
      "dev-qa":
        "Test the functionality against the stories' acceptance criteria and the quality gates.",
      "dev-ship":
        "Open the PR, add reviewers, and make sure the pipelines pass.",
    },
  },
  es: {
    title:
      'El Ciclo de Vida de Desarrollo de Software <span class="accent">Agéntico</span>',
    subtitle:
      "Un flujo estructurado y aumentado con IA, de la idea al código en producción.",
    legendBot: "puede ejecutarse sin supervisión en la Software Factory",
    legendHand: "necesita aprobación humana antes de continuar",
    planning: "Planificación",
    xd: "Diseño de Experiencia",
    prototype: "Prototipo",
    prototypeDesc:
      "Artefactos de diseño y prototipos que aterrizan la experiencia antes de planificar.",
    backlog: "Backlog",
    backlogDesc:
      "Las specs (epics) y los tickets (historias) viven en el gestor de incidencias.",
    development: "Desarrollo",
    steps: {
      "plan-idea":
        "La IA te hace preguntas de negocio para desarrollar tu idea y llegar a un entendimiento común.",
      "plan-spec":
        "Sintetiza la conversación en una spec — el epic — y la publica en el gestor de incidencias.",
      "plan-tickets":
        "Divide la spec en tickets — las historias — declarando qué tickets la bloquean.",
      "xd-discover":
        "Recogida de información e inspiración: divergir sobre el espacio del problema.",
      "xd-frame":
        "Narrativa, estrategia y principios: converger en una dirección.",
      "xd-define": "Define la experiencia que entra en prototipado.",
      "plan-prototype-to-tickets":
        "Convierte el prototipo en tickets — las historias — listos para el backlog.",
      "dev-implementation-plan":
        "La IA te hace preguntas técnicas para definir el plan de implementación.",
      "dev-implement":
        "Implementa los tickets del plan, con TDD en las costuras acordadas.",
      "dev-code-review":
        "Revisa la implementación contra el plan y los estándares del código.",
      "dev-qa":
        "Prueba la funcionalidad contra los criterios de aceptación y los quality gates.",
      "dev-ship":
        "Abre la PR, añade revisores y comprueba que los pipelines pasan.",
    },
  },
};

const BOT = "🤖";
const HAND = "✋";

const ARROW_COLOR = "#c9cac0";
const ARROW_DOWN = `<svg width="26" height="34" viewBox="0 0 24 32" fill="${ARROW_COLOR}"><path d="M9 0h6v16h6L12 30 3 16h6z"/></svg>`;
const ARROW_RIGHT = `<svg width="34" height="26" viewBox="0 0 32 24" fill="${ARROW_COLOR}"><path d="M0 9h16V3l14 9-14 9v-6H0z"/></svg>`;

function card(c, name, flags = "", extraClass = "") {
  return `<div class="card ${extraClass}">
    <div class="card-head"><span class="cmd">/${name}</span>${flags}</div>
    <div class="card-desc">${c.steps[name]}</div>
  </div>`;
}

function html(c) {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: -apple-system, "Helvetica Neue", Arial, sans-serif;
  background: #fefefe; color: #1a1a1a;
  width: 1400px; padding: 48px;
}
h1 { font-size: 34px; font-weight: 700; letter-spacing: -0.5px; margin-bottom: 8px; }
h1 .accent { color: #b91c1c; }
.subtitle { font-size: 16px; color: #374151; margin-bottom: 14px; }
.legend { display: flex; gap: 28px; font-size: 13px; color: #374151; margin-bottom: 32px; }
.legend span.icon { font-size: 15px; }
.top { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: start; }
.group {
  border: 2px dashed #e5e7eb; border-radius: 18px; padding: 18px;
}
.group + .group { margin-top: 0; }
.group-label {
  display: inline-block; background: #1a1a1a; color: #fff;
  font-size: 13px; font-weight: 600; padding: 5px 16px; border-radius: 999px; margin-bottom: 14px;
}
.col { display: flex; flex-direction: column; gap: 8px; }
.row { display: flex; gap: 8px; align-items: stretch; }
.card {
  border: 2px solid #1a1a1a; border-radius: 12px; padding: 12px 14px; background: #fff;
  flex: 1; min-width: 0;
}
.card-head { display: flex; align-items: center; gap: 7px; margin-bottom: 5px; flex-wrap: wrap; }
.cmd { font-family: "SF Mono", Menlo, monospace; font-size: 14px; font-weight: 700; color: #b91c1c; }
.card-desc { font-size: 12.5px; line-height: 1.45; color: #374151; }
.arrow-d { display: flex; justify-content: center; line-height: 0; }
.arrow-r { display: flex; align-items: center; line-height: 0; padding: 0 2px; }
.band {
  border: 2px solid #b91c1c; background: #fef2f2; border-radius: 14px;
  padding: 18px; text-align: center;
}
.band h3 { font-size: 19px; font-weight: 700; margin-bottom: 5px; }
.band p { font-size: 13.5px; color: #374151; }
.right-col { display: flex; flex-direction: column; gap: 8px; }
.spacer-d { padding: 6px 0; }
.footer { margin-top: 34px; font-size: 12px; color: #9ca3af; }
</style></head>
<body>
  <h1>${c.title}</h1>
  <p class="subtitle">${c.subtitle}</p>
  <div class="legend">
    <div><span class="icon">${BOT}</span> = ${c.legendBot}</div>
    <div><span class="icon">${HAND}</span> = ${c.legendHand}</div>
  </div>

  <div class="top">
    <div class="group">
      <span class="group-label">${c.planning}</span>
      <div class="col">
        ${card(c, "plan-idea")}
        <div class="arrow-d">${ARROW_DOWN}</div>
        ${card(c, "plan-spec", `<span>${BOT}</span>`)}
        <div class="arrow-d">${ARROW_DOWN}</div>
        ${card(c, "plan-tickets", `<span>${BOT}</span><span>${HAND}</span>`)}
      </div>
    </div>

    <div class="right-col">
      <div class="group">
        <span class="group-label">${c.xd}</span>
        <div class="row">
          ${card(c, "xd-discover")}
          <div class="arrow-r">${ARROW_RIGHT}</div>
          ${card(c, "xd-frame")}
          <div class="arrow-r">${ARROW_RIGHT}</div>
          ${card(c, "xd-define")}
        </div>
      </div>
      <div class="arrow-d spacer-d">${ARROW_DOWN}</div>
      <div class="band">
        <h3>${c.prototype}</h3>
        <p>${c.prototypeDesc}</p>
      </div>
      <div class="arrow-d spacer-d">${ARROW_DOWN}</div>
      <div class="group">
        <span class="group-label">${c.planning}</span>
        ${card(c, "plan-prototype-to-tickets", `<span>${BOT}</span><span>${HAND}</span>`)}
      </div>
    </div>
  </div>

  <div class="arrow-d spacer-d" style="margin-top:10px">${ARROW_DOWN}</div>
  <div class="band">
    <h3>${c.backlog}</h3>
    <p>${c.backlogDesc}</p>
  </div>
  <div class="arrow-d spacer-d">${ARROW_DOWN}</div>

  <div class="group">
    <span class="group-label">${c.development}</span>
    <div class="row">
      ${card(c, "dev-implementation-plan", `<span>${BOT}</span><span>${HAND}</span>`)}
      <div class="arrow-r">${ARROW_RIGHT}</div>
      ${card(c, "dev-implement", `<span>${BOT}</span>`)}
      <div class="arrow-r">${ARROW_RIGHT}</div>
      ${card(c, "dev-code-review", `<span>${BOT}</span><span>${HAND}</span>`)}
      <div class="arrow-r">${ARROW_RIGHT}</div>
      ${card(c, "dev-qa", `<span>${BOT}</span>`)}
      <div class="arrow-r">${ARROW_RIGHT}</div>
      ${card(c, "dev-ship", `<span>${BOT}</span><span>${HAND}</span>`)}
    </div>
  </div>

  <p class="footer">lorenzogm.com · Agentic SDLC v2</p>
</body></html>`;
}

const dir = await mkdtemp(join(tmpdir(), "asdlc-"));
const browser = await chromium.launch();

for (const lang of ["en", "es"]) {
  const file = join(dir, `${lang}.html`);
  await writeFile(file, html(CONTENT[lang]), "utf8");

  const page = await browser.newPage({
    viewport: { width: 1400, height: 1000 },
    deviceScaleFactor: 2,
  });
  await page.goto(`file://${file}`);
  const out = join(OUT_DIR, `${SLUG}-${lang}.png`);
  await page.screenshot({ path: out, fullPage: true });
  await page.close();
  console.log(`Saved ${out}`);
}

await browser.close();
