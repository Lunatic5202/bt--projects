export type PointerVelocity = {
  x: number;
  y: number;
};

export type BobbleSpringImpulse = {
  xVelocity: number;
  yVelocity: number;
  rotateVelocity: number;
  scaleXVelocity: number;
  scaleYVelocity: number;
};

const MAX_POINTER_VELOCITY = 900;

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

/**
 * Converts the latest global pointer velocity into a bounded spring impulse.
 * Faster cursor sweeps produce a more noticeable nudge, tilt, and squash/stretch.
 */
export function getBobbleSpringImpulse({ x, y }: PointerVelocity): BobbleSpringImpulse {
  const pointerX = clamp(x, -MAX_POINTER_VELOCITY, MAX_POINTER_VELOCITY);
  const pointerY = clamp(y, -MAX_POINTER_VELOCITY, MAX_POINTER_VELOCITY);
  const speed = Math.hypot(pointerX, pointerY);

  return {
    xVelocity: pointerX * 0.24,
    yVelocity: pointerY * 0.24,
    rotateVelocity: clamp((pointerX - pointerY) * 0.004, -5, 5),
    scaleXVelocity: speed * 0.0007,
    scaleYVelocity: -speed * 0.0005,
  };
}
