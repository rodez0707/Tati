import { useState } from 'react';
import type { Destination } from '../../types';
import styles from './Carousel.module.css';

interface CarouselProps {
  /** All destinations — each card is a preview */
  destinations: Destination[];
  /** Currently active destination index */
  activeIndex: number;
  /** Called when user clicks a card to navigate */
  onCardClick: (index: number) => void;
}

export default function Carousel({ destinations, activeIndex, onCardClick }: CarouselProps) {
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  const handleImgError = (index: number) => {
    setImgErrors((prev) => ({ ...prev, [index]: true }));
  };

  /**
   * Calculate position relative to active card.
   * 0 = focused, ±1 = neighbors, ±2 = far, else hidden.
   */
  const getPosition = (index: number): string => {
    const total = destinations.length;
    let diff = index - activeIndex;

    // Shift negative diffs forward by total to make the rotation circular ONLY to the right
    if (diff < 0) {
      diff += total;
    }

    if (diff === 0) return '0';
    if (diff === 1) return '1';
    if (diff === 2) return '2';
    if (diff === 3) return '3';
    return 'hidden-right';
  };

  return (
    <div className={styles.carouselWrapper} id="carousel-section">
      {/* Slider */}
      <div className={styles.sliderViewport}>
        <div className={styles.sliderTrack}>
          {destinations.map((dest, i) => {
            const position = getPosition(i);
            const previewImage = dest.cards[0]?.image ?? dest.heroImage;
            const customObjectPosition = dest.cards[0]?.objectPosition;
            const title = dest.title.replace('\n', ' ');

            return (
              <div
                key={dest.id}
                className={styles.slideCard}
                data-position={position}
                data-is-final={dest.id === 'final-reflexion'}
                onClick={() => onCardClick(i)}
                id={`slide-card-${i}`}
                role="button"
                tabIndex={position === '0' ? 0 : -1}
                aria-label={`View ${title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') onCardClick(i);
                }}
              >
                {imgErrors[i] ? (
                  <div className={styles.cardPlaceholder}>
                    <span className={styles.placeholderLabel}>{title}</span>
                  </div>
                ) : (
                  <img
                    src={previewImage}
                    alt={title}
                    className={styles.cardImage}
                    loading="lazy"
                    style={{ objectPosition: customObjectPosition || 'center' }}
                    onError={() => handleImgError(i)}
                  />
                )}

                <div className={styles.cardOverlay}>
                  <div className={styles.cardTitle}>{title}</div>
                  <div className={styles.cardIndex}>
                    {String(i + 1).padStart(2, '0')} / {String(destinations.length).padStart(2, '0')}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dots */}
      <div className={styles.dots} id="carousel-dots">
        {destinations.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`}
            onClick={() => onCardClick(i)}
            aria-label={`Go to destination ${i + 1}`}
            id={`carousel-dot-${i}`}
          />
        ))}
      </div>
    </div>
  );
}
