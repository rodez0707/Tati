import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './PhotoAlbum.module.css';
import { albums } from '../../data/destinations';

interface PhotoAlbumProps {
  onClose: () => void;
}

export default function PhotoAlbum({ onClose }: PhotoAlbumProps) {
  const [zoomedIndex, setZoomedIndex] = useState<number | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);

  useEffect(() => {
    // Collect all unique images (both heroes and cards) from all destinations
    const collected: string[] = [];
    for (const album of albums) {
      for (const dest of album.destinations) {
        if (dest.heroImage && !collected.includes(dest.heroImage) && dest.heroImage !== '') {
          collected.push(dest.heroImage);
        }
        if (dest.cards) {
          for (const card of dest.cards) {
            if (card.image && !collected.includes(card.image) && card.image !== '') {
              collected.push(card.image);
            }
          }
        }
      }
    }
    setPhotos(collected);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (zoomedIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setZoomedIndex((prev) => (prev !== null && prev < photos.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowLeft') {
        setZoomedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
      } else if (e.key === 'Escape') {
        setZoomedIndex(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [zoomedIndex, photos.length]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (zoomedIndex !== null && zoomedIndex > 0) setZoomedIndex(zoomedIndex - 1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (zoomedIndex !== null && zoomedIndex < photos.length - 1) setZoomedIndex(zoomedIndex + 1);
  };

  return (
    <>
      <div className={styles.albumOverlay}>
        <div className={styles.header}>
          <button className={styles.backButton} onClick={onClose}>
            ← Regresar
          </button>
        </div>

        <div className={styles.grid}>
          {photos.map((src, index) => (
            <div key={index} className={styles.gridItem} onClick={() => setZoomedIndex(index)}>
              <img src={src} alt={`Memoria ${index + 1}`} className={styles.image} loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      {zoomedIndex !== null && createPortal(
        <div className={styles.lightbox} onClick={() => setZoomedIndex(null)}>
          <button className={styles.closeLightbox} onClick={() => setZoomedIndex(null)}>✕</button>
          
          {zoomedIndex > 0 && (
            <button className={`${styles.navButton} ${styles.prevButton}`} onClick={handlePrev}>
              ❮
            </button>
          )}
          
          <img 
            src={photos[zoomedIndex]} 
            alt="Zoom" 
            className={styles.lightboxImage} 
            onClick={(e) => e.stopPropagation()} 
          />
          
          {zoomedIndex < photos.length - 1 && (
            <button className={`${styles.navButton} ${styles.nextButton}`} onClick={handleNext}>
              ❯
            </button>
          )}
        </div>,
        document.body
      )}
    </>
  );
}
