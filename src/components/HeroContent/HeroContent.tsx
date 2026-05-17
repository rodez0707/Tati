import { useEffect, useState } from 'react';
import styles from './HeroContent.module.css';

interface HeroContentProps {
  title: string;
  description: string;
  /** Unique key to trigger re-animation on content change */
  contentKey: string;
  isLight?: boolean;
  isFinal?: boolean;
  actionLabel?: string;
  onActionClick?: () => void;
}

export default function HeroContent({ title, description, contentKey, isLight, isFinal, actionLabel, onActionClick }: HeroContentProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const timer = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(timer);
  }, [contentKey]);

  return (
    <div className={`${styles.heroContentWrapper} ${isLight ? styles.lightTheme : ''} ${isFinal ? styles.finalTheme : ''}`} id="hero-content">
      <div className={styles.titleBlock}>
        <h1
          className={`${styles.title} ${visible ? styles.titleVisible : ''}`}
          id="hero-title"
        >
          {title}
        </h1>
      </div>

      <p
        className={`${styles.description} ${visible ? styles.descriptionVisible : ''}`}
        id="hero-description"
      >
        {description}
      </p>

      {actionLabel && (
        <button
          className={`${styles.ctaButton} ${visible ? styles.ctaButtonVisible : ''}`}
          onClick={onActionClick}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
