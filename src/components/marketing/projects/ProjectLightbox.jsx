import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard, Zoom, A11y } from "swiper/modules";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";

function ProjectLightboxComponent({
  items = [],
  initialIndex = 0,
  isOpen,
  onClose,
}) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
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
    if (!swiperInstance || !prevRef.current || !nextRef.current) return;
    swiperInstance.params.navigation.prevEl = prevRef.current;
    swiperInstance.params.navigation.nextEl = nextRef.current;
    swiperInstance.navigation.destroy();
    swiperInstance.navigation.init();
    swiperInstance.navigation.update();
  }, [swiperInstance]);

  useEffect(() => {
    if (!isOpen || !swiperInstance) return;
    const target = initialIndex;
    if (swiperInstance.params.loop) {
      swiperInstance.slideToLoop(target, 0);
    } else {
      swiperInstance.slideTo(target, 0);
    }
  }, [isOpen, initialIndex, swiperInstance]);

  const playActiveVideo = useCallback((swiper) => {
    const slides = swiper?.slides;
    if (!slides) return;
    slides.forEach((slide) => {
      const video = slide.querySelector("video");
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    });
    const active = swiper.slides[swiper.activeIndex];
    const activeVideo = active?.querySelector("video");
    if (activeVideo) {
      activeVideo.muted = true;
      activeVideo.play().catch(() => {});
    }
  }, []);

  const handleBackdropClick = useCallback(
    (e) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  if (!isOpen || items.length === 0) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Project media gallery"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md"
      onClick={handleBackdropClick}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close gallery"
        className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/85 backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:bg-black/60 hover:text-white sm:right-6 sm:top-6"
      >
        <X className="h-4 w-4" strokeWidth={1.5} />
      </button>

      <button
        ref={prevRef}
        type="button"
        className="absolute left-3 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/85 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-black/60 hover:text-white sm:left-6"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
      </button>

      <button
        ref={nextRef}
        type="button"
        className="absolute right-3 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/85 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-black/60 hover:text-white sm:right-6"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
      </button>

      <div
        className="relative h-[78vh] w-[94vw] max-w-[1200px] overflow-hidden rounded-3xl border border-white/10 bg-[#111] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Swiper
          modules={[Navigation, Pagination, Keyboard, Zoom, A11y]}
          onSwiper={(swiper) => {
            setSwiperInstance(swiper);
            setTimeout(() => playActiveVideo(swiper), 50);
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          onSlideChange={playActiveVideo}
          initialSlide={initialIndex}
          loop={items.length > 1}
          grabCursor
          zoom
          keyboard={{ enabled: true }}
          pagination={{ clickable: true }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          className="project-lightbox-swiper h-full w-full"
        >
          {items.map((item, index) => (
            <SwiperSlide key={`${item.type}-${index}`}>
              <div className="swiper-zoom-container flex h-full w-full items-center justify-center bg-black">
                {item.type === "video" ? (
                  <video
                    src={item.src}
                    muted
                    controls
                    playsInline
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <img
                    src={item.src}
                    alt={`Gallery item ${index + 1}`}
                    className="max-h-full max-w-full object-contain"
                  />
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style>{`
        .project-lightbox-swiper .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.45);
          opacity: 1;
        }
        .project-lightbox-swiper .swiper-pagination-bullet-active {
          background: #fff;
        }
      `}</style>
    </div>
  );
}

export const ProjectLightbox = memo(ProjectLightboxComponent);
