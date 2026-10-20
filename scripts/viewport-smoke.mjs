/* Browser smoke tests for the polished portfolio.
 * Captures desktop/mobile previews without a production deployment.
 * Run after npm run build and installing Playwright/Chromium. */
"use strict";

import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const url = "http://127.0.0.1:4173";
const widths = [360, 390, 768, 1280, 1440];
const output = join(process.cwd(), "viewport-previews");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function waitUntilReady() {
  for (let attempt = 0; attempt < 70; attempt++) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch { /* Server is still booting. */ }
    await sleep(750);
  }
  throw new Error("Next.js local server did not become ready.");
}

async function main() {
  mkdirSync(output, { recursive: true });
  const server = spawn("npm", ["run", "start", "--", "-p", "4173"], {
    cwd: process.cwd(),
    env: { ...process.env, PORT: "4173" },
    stdio: ["ignore", "pipe", "pipe"],
    detached: process.platform !== "win32",
  });
  let outputLog = "";
  server.stdout.on("data", (buffer) => { outputLog += buffer.toString(); });
  server.stderr.on("data", (buffer) => { outputLog += buffer.toString(); });
  let browser;
  try {
    await waitUntilReady();
    browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
    for (const width of widths) {
      const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
      await page.locator("#top").waitFor({ state: "visible", timeout: 12000 });
      // The Hero is revealed before its GSAP word/paragraph entrance completes.
      // Wait for the FINAL visible state, not the initial blank animation frame.
      await page.waitForFunction(() => {
        const title = document.querySelector(".hero-word");
        const intro = document.querySelector(".hero-introduction");
        return !!title && !!intro &&
          Number(getComputedStyle(title).opacity) > 0.98 &&
          Number(getComputedStyle(intro).opacity) > 0.98;
      }, null, { timeout: 12000 });
      await page.locator("#upcoming-projects").waitFor({ state: "attached" });
      await page.evaluate(async () => { await document.fonts.ready; });

      const metrics = await page.evaluate(() => ({
        documentWidth: document.documentElement.scrollWidth,
        viewportWidth: document.documentElement.clientWidth,
        selected: Array.from(document.querySelectorAll("#work .project-card h3")).map((node) => node.textContent?.trim()),
        upcoming: Array.from(document.querySelectorAll("#upcoming-projects .upcoming-card h3")).map((node) => node.textContent?.trim()),
        sections: Array.from(document.querySelectorAll("main > section")).map((node) => node.id),
      }));
      const overflow = metrics.documentWidth - metrics.viewportWidth;
      if (overflow > 3) throw new Error(`${width}px: page overflows viewport by ${overflow}px`);
      if (!metrics.selected.some((name) => name?.includes("Araf & Azreen"))) throw new Error(`${width}px: wedding project missing from Selected Work`);
      if (metrics.selected.some((name) => name?.includes("AcademicOS"))) throw new Error(`${width}px: AcademicOS still shown as completed`);
      if (!metrics.upcoming.some((name) => name?.includes("ACADEMICOS"))) throw new Error(`${width}px: AcademicOS missing from Upcoming`);
      if (metrics.upcoming.length !== 3) throw new Error(`${width}px: expected three upcoming projects`);
      if (metrics.sections.indexOf("upcoming-projects") < metrics.sections.indexOf("work")) throw new Error(`${width}px: invalid section order`);
      if (errors.length) throw new Error(`${width}px: runtime error: ${errors[0]}`);
      await page.screenshot({ path: join(output, `homepage-${width}.png`), animations: "disabled" });

      if (width === 390 || width === 1280) {
        await page.locator("#work").scrollIntoViewIfNeeded();
        await page.waitForTimeout(1150);
        const weddingImage = page.locator("#work img.project-art-image");
        await weddingImage.first().waitFor({ state: "visible", timeout: 15000 });
        await page.waitForFunction(() => {
          const preview = document.querySelector("#work img.project-art-image");
          return !!preview && preview.complete && preview.naturalWidth > 0;
        }, null, { timeout: 15000 });
        await page.locator("#work").screenshot({ path: join(output, `selected-work-${width}.png`), animations: "disabled" });

        await page.locator("#upcoming-projects").scrollIntoViewIfNeeded();
        await page.waitForTimeout(1150);
        await page.locator("#upcoming-projects").screenshot({ path: join(output, `upcoming-${width}.png`), animations: "disabled" });
      }
      console.log(`PASS ${width}px: hero readable, no overflow, correct project placement, no runtime exception`);
      await page.close();
    }
    const casePage = await browser.newPage();
    const resp = await casePage.goto(url + "/projects/araf-azreen-wedding", { waitUntil: "domcontentloaded" });
    if (!resp?.ok()) throw new Error("Wedding project case-study route unavailable");
    await casePage.getByRole("heading", { name: /Araf & Azreen/i }).first().waitFor();
    await casePage.close();
    console.log("PASS: Wedding case-study route");
  } finally {
    await browser?.close();
    try {
      if (process.platform !== "win32" && server.pid) {
        process.kill(-server.pid, "SIGTERM");
      } else {
        server.kill("SIGTERM");
      }
    } catch { server.kill("SIGTERM"); }
    server.stdout?.destroy();
    server.stderr?.destroy();
    if (outputLog.includes("Error:")) console.log("Server notes:", outputLog.slice(-2000));
  }
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
