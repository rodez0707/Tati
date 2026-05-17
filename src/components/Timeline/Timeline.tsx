import React from 'react';
import styles from './Timeline.module.css';

interface TimelineProps {
  total: number;
  activeIndex: number;
  onSelect: (index: number) => void;
}

export default function Timeline({ total, activeIndex, onSelect }: TimelineProps) {
  return (
    <div className={styles.timelineContainer} id="timeline">
      <div className={styles.timelineLine}>
        {Array.from({ length: total }).map((_, i) => (
          <React.Fragment key={i}>
            {i > 0 && (
              <div
                className={`${styles.segment} ${i <= activeIndex ? styles.segmentActive : ''}`}
              />
            )}
            <button
              className={`${styles.node} ${i === activeIndex ? styles.nodeActive : ''}`}
              onClick={() => onSelect(i)}
              aria-label={`Go to section ${i + 1}`}
              id={`timeline-node-${i}`}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
