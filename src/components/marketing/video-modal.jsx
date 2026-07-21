import { motion, AnimatePresence } from "framer-motion";
import { Maximize, Volume2, VolumeX, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

export function VideoModal({ isOpen, onClose, videoSrc, title, location }) {
  const videoRef = useRef(null);
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || !modalRef.current) return;
    const focusableElements = modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    if (closeButtonRef.current) closeButtonRef.current.focus();
    function handleTab(e) {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else if (document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable?.focus();
      }
    }
    window.addEventListener("keydown", handleTab);
    return () => window.removeEventListener("keydown", handleTab);
  }, [isOpen]);

  const handleExitComplete = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setIsMuted(true);
  }, []);

  function handleToggleMute() {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  }

  function handleFullscreen() {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if (videoRef.current.webkitRequestFullscreen) {
      videoRef.current.webkitRequestFullscreen();
    }
  }

  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {isOpen && (
        <motion.div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} project film`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-md"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-[95vw] max-w-[1100px] overflow-hidden rounded-3xl border border-white/10 bg-[#111] shadow-2xl md:w-[90vw] lg:w-[70vw]"
          >
            <div className="relative aspect-video w-full">
              <video
                ref={videoRef}
                src={videoSrc}
                autoPlay
                muted
                controls
                loop
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close video"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/80 backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:bg-black/60 hover:text-white"
            >
              <X className="h-4 w-4" strokeWidth={1.5} />
            </button>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            <div className="absolute bottom-5 left-5 z-10 pointer-events-none">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                Featured Project
              </p>
              <p className="mt-1 font-serif text-lg leading-tight text-white/90">
                {title}
              </p>
              <p className="mt-0.5 text-[11px] text-white/50">{location}</p>
            </div>

            <div className="absolute bottom-5 right-5 z-10 flex items-center gap-2.5">
              <button
                type="button"
                onClick={handleToggleMute}
                aria-label={isMuted ? "Unmute video" : "Mute video"}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/70 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-black/60 hover:text-white"
              >
                {isMuted ? (
                  <VolumeX className="h-3.5 w-3.5" strokeWidth={1.5} />
                ) : (
                  <Volume2 className="h-3.5 w-3.5" strokeWidth={1.5} />
                )}
              </button>
              <button
                type="button"
                onClick={handleFullscreen}
                aria-label="Enter fullscreen"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/70 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-black/60 hover:text-white"
              >
                <Maximize className="h-3.5 w-3.5" strokeWidth={1.5} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
