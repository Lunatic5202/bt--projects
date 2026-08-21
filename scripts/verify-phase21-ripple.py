from playwright.sync_api import sync_playwright
import json

BASE = "https://3000-iceey40il5br4s3gui6ii-1fa077a1.sg1.manus.computer/?v=phase21-ripple"

with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True, executable_path="/usr/bin/chromium", args=["--no-sandbox"])
    results = {}

    for label, viewport in (("desktop", {"width": 1280, "height": 720}), ("mobile", {"width": 375, "height": 812})):
        context = browser.new_context(viewport=viewport)
        page = context.new_page()
        page.goto(BASE, wait_until="commit", timeout=15000)
        page.locator(".fluid-btn").first.wait_for(state="visible", timeout=7000)
        result = page.evaluate("""
          () => {
            const button = document.querySelector('.fluid-btn');
            const rect = button.getBoundingClientRect();
            button.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, button: 0, clientX: rect.left + 9, clientY: rect.top + 11 }));
            const pointer = button.querySelector('.water-button-ripple');
            const pointerResult = pointer ? { left: pointer.style.left, top: pointer.style.top } : null;
            pointer?.remove();
            button.dispatchEvent(new MouseEvent('click', { bubbles: true, detail: 0 }));
            const keyboard = button.querySelector('.water-button-ripple');
            return {
              pointer: pointerResult,
              keyboard: keyboard ? { left: keyboard.style.left, top: keyboard.style.top, expectedLeft: `${rect.width / 2}px`, expectedTop: `${rect.height / 2}px` } : null,
            };
          }
        """)
        results[label] = result
        context.close()

    reduced = browser.new_context(viewport={"width": 1280, "height": 720}, reduced_motion="reduce")
    page = reduced.new_page()
    page.goto(BASE, wait_until="commit", timeout=15000)
    page.locator(".fluid-btn").first.wait_for(state="visible", timeout=7000)
    results["reducedMotion"] = page.evaluate("""
      () => {
        const button = document.querySelector('.fluid-btn');
        const rect = button.getBoundingClientRect();
        button.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, button: 0, clientX: rect.left + 9, clientY: rect.top + 11 }));
        return { rippleInserted: Boolean(button.querySelector('.water-button-ripple')) };
      }
    """)
    reduced.close()
    browser.close()
    print(json.dumps(results, indent=2))
