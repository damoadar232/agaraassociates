import { memo, useCallback, useMemo, useState } from "react";
import { Play } from "lucide-react";
import { ProjectLightbox } from "@/components/marketing/projects/ProjectLightbox";
import "@/assets/styles/components/ProjectGallery.scss";

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
      <div className="project-gallery">
        <p className="project-gallery__eyebrow">Gallery</p>
        <h2 className="project-gallery__title">Project Media</h2>

        <div className="project-gallery__grid">
          {items.map((item, index) => (
            <button
              key={`${item.type}-${index}`}
              type="button"
              onClick={() => openAt(index)}
              className="project-gallery__item"
            >
              {item.type === "video" ? (
                <div className="project-gallery__video-wrap">
                  <video
                    src={item.src}
                    muted
                    playsInline
                    preload="metadata"
                    className="project-gallery__media"
                  />
                  <span className="project-gallery__play-overlay">
                    <span className="project-gallery__play-btn">
                      <Play className="project-gallery__play-icon" />
                    </span>
                  </span>
                </div>
              ) : (
                <img
                  src={item.src}
                  alt={`Project gallery ${index + 1}`}
                  loading="lazy"
                  className="project-gallery__media"
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
