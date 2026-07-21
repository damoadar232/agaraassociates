import { memo, useCallback, useMemo, useState } from "react";
import { Play } from "lucide-react";
import { ProjectLightbox } from "@/components/marketing/projects/ProjectLightbox";

function ProjectGalleryComponent({ images = [] }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const items = useMemo(
    () =>
      (images || []).filter(
        (item) => item?.src && (item.type === "image" || item.type === "video")
      ),
    [images]
  );

  const openAt = useCallback((index) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  if (items.length === 0) return null;

  return (
    <>
      <div className="mt-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-agara-charcoal/45">
          Gallery
        </p>
        <h2 className="mt-2 font-serif text-2xl leading-tight text-agara-charcoal lg:text-3xl">
          Project Media
        </h2>

        <div className="mt-6 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {items.map((item, index) => (
            <button
              key={`${item.type}-${index}`}
              type="button"
              onClick={() => openAt(index)}
              className="group relative mb-4 block w-full break-inside-avoid cursor-pointer overflow-hidden rounded-[20px] shadow-agara-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-agara-charcoal/30"
            >
              {item.type === "video" ? (
                <div className="relative">
                  <video
                    src={item.src}
                    muted
                    playsInline
                    preload="metadata"
                    className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors duration-300 group-hover:bg-black/30">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-white/25 text-white backdrop-blur-md">
                      <Play className="ml-0.5 h-4 w-4 fill-white" />
                    </span>
                  </span>
                </div>
              ) : (
                <img
                  src={item.src}
                  alt={`Project gallery ${index + 1}`}
                  loading="lazy"
                  className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <ProjectLightbox
        items={items}
        initialIndex={activeIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
      />
    </>
  );
}

export const ProjectGallery = memo(ProjectGalleryComponent);
