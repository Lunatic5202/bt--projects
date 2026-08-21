/*
 * Hydrogrid Editorial — floating WhatsApp chat button.
 * Fixed bottom-right, appears after a short scroll, navy brand style.
 * Number is a shared constant so it can be corrected in one place.
 */
export const WHATSAPP_NUMBER = "913335850822"; // +91 333585 0822
export const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hello BT Projects, I would like to make an enquiry about your water solutions services.",
);
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="whatsapp-fab fixed bottom-5 right-5 z-50 h-14 w-14 rounded-full bg-[#128C7E] text-white shadow-[0_8px_24px_-6px_rgba(18,140,126,0.6)] flex items-center justify-center transition-transform duration-200 hover:scale-110 active:scale-95"
    >
      {/* Bobbing icon on gentle current */}
      <span className="whatsapp-fab-inner">
        <svg viewBox="0 0 32 32" className="h-8 w-8 fill-current" aria-hidden="true">
        <path d="M16.004 3.2C9 3.2 3.312 8.888 3.312 15.89c0 2.24.585 4.425 1.7 6.356L3.2 28.8l6.72-1.772a12.63 12.63 0 0 0 6.082 1.55h.005c7.002 0 12.692-5.69 12.692-12.69 0-3.386-1.32-6.57-3.716-8.968A12.61 12.61 0 0 0 16.004 3.2zm0 23.12h-.005a10.36 10.36 0 0 1-5.28-1.446l-.378-.225-3.92 1.034 1.048-3.822-.247-.393a10.32 10.32 0 0 1-1.58-5.578c0-5.728 4.66-10.388 10.39-10.388a10.33 10.33 0 0 1 7.34 3.043 10.33 10.33 0 0 1 3.042 7.35c0 5.73-4.66 10.39-10.41 10.39zm5.7-7.78c-.312-.157-1.845-.91-2.13-1.015-.286-.104-.492-.157-.698.156-.208.312-.8 1.015-.98 1.223-.182.208-.363.235-.675.08-.312-.158-1.317-.486-2.51-1.55-.928-.827-1.555-1.85-1.738-2.163-.182-.312-.02-.48.137-.636.14-.14.312-.364.468-.546.157-.182.208-.312.313-.52.104-.208.05-.39-.027-.546-.08-.157-.698-1.685-.958-2.308-.253-.607-.51-.526-.698-.535l-.598-.01c-.208 0-.546.08-.832.39-.286.313-1.092 1.068-1.092 2.6 0 1.533 1.118 3.014 1.274 3.222.157.208 2.2 3.362 5.33 4.715.746.323 1.33.515 1.784.66.75.238 1.43.205 1.97.124.602-.09 1.845-.754 2.105-1.48.26-.728.26-1.353.182-1.48-.08-.13-.287-.208-.6-.364z" />
        </svg>
      </span>
      {/* Online dot */}
      <span className="absolute top-0.5 right-0.5 h-3 w-3 rounded-full bg-green-400 border-2 border-white" />
    </a>
  );
}
