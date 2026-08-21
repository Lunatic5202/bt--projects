import { useEffect } from "react";

type RippleRect = Pick<DOMRect, "left" | "top" | "width" | "height">;

export function getWaterRippleGeometry(
  rect: RippleRect,
  clientX: number,
  clientY: number,
) {
  const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
  const y = Math.max(0, Math.min(rect.height, clientY - rect.top));
  const furthestX = Math.max(x, rect.width - x);
  const furthestY = Math.max(y, rect.height - y);

  return {
    x,
    y,
    size: Math.ceil(Math.hypot(furthestX, furthestY) * 2),
  };
}

function createRipple(target: HTMLElement, clientX: number, clientY: number) {
  const geometry = getWaterRippleGeometry(target.getBoundingClientRect(), clientX, clientY);
  const ripple = document.createElement("span");

  ripple.className = "water-button-ripple";
  ripple.setAttribute("aria-hidden", "true");
  ripple.style.setProperty("--water-ripple-size", `${geometry.size}px`);
  ripple.style.left = `${geometry.x}px`;
  ripple.style.top = `${geometry.y}px`;
  target.appendChild(ripple);

  ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
}

function getRippleTarget(eventTarget: EventTarget | null) {
  if (!(eventTarget instanceof Element)) return null;

  const target = eventTarget.closest<HTMLElement>(".fluid-btn");
  if (!target || target.matches("button:disabled, [aria-disabled='true']")) return null;

  return target;
}

/**
 * Implements the clipping-container and point-of-contact expansion pattern
 * used by the supplied Motion.dev example, without adding a per-button
 * dependency or changing existing button markup.
 */
export default function WaterButtonRipple() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0 || reducedMotion.matches) return;

      const target = getRippleTarget(event.target);
      if (target) createRipple(target, event.clientX, event.clientY);
    };

    const onClick = (event: MouseEvent) => {
      // Keyboard-triggered clicks have no pointer origin. Use the button centre.
      if (event.detail !== 0 || reducedMotion.matches) return;

      const target = getRippleTarget(event.target);
      if (!target) return;

      const rect = target.getBoundingClientRect();
      createRipple(target, rect.left + rect.width / 2, rect.top + rect.height / 2);
    };

    document.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
