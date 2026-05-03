export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/971547461054"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-8 right-8 w-16 h-16 bg-[#25d366] rounded-full flex items-center justify-center text-white shadow-[0_12px_40px_rgba(37,211,102,0.4)] z-[999] hover:scale-110 transition-transform"
    >
      <span className="absolute inset-[-4px] rounded-full border-2 border-[#25d366] animate-pulse-ring" />
      <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.5 14.4c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2s-.8.9-1 1.1c-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.7.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5s-.7-1.6-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.2-.2-.5-.3z" />
      </svg>
    </a>
  );
}
