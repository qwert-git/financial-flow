// ===== Number Animation =====
export function animateNumber(element, targetValue, duration = 1000) {
    if (!element) return;
    const startValue = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (easeOutExpo)
        const easeProgress = 1 - Math.pow(2, -10 * progress);
        const currentValue = Math.floor(startValue + (targetValue - startValue) * easeProgress);

        element.textContent = currentValue.toLocaleString('en-US');

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = targetValue.toLocaleString('en-US');
        }
    }

    requestAnimationFrame(update);
}
