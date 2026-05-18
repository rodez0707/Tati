import { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import styles from './Navbar.module.css';

interface NavbarProps {
  albums: { id: string; label: string }[];
  activeAlbumId: string;
  onAlbumSelect: (albumId: string) => void;
  isGuidedTourActive: boolean;
  onToggleGuidedTour: () => void;
  onOpenAlbum?: () => void;
}

export default function Navbar({ albums, activeAlbumId, onAlbumSelect, isGuidedTourActive, onToggleGuidedTour, onOpenAlbum }: NavbarProps) {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsProfileModalOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className={styles.navbar} id="main-navbar">
      <a className={styles.logo} href="#" id="nav-logo" onClick={(e) => { e.preventDefault(); onAlbumSelect(albums[0].id); }}>
        MEMORIES
      </a>

      <ul className={styles.navLinks} id="nav-links">
        {albums.map((album) => (
          <li key={album.id}>
            <a
              className={`${styles.navLink} ${album.id === activeAlbumId ? styles.navLinkActive : ''}`}
              href={`#${album.id}`}
              id={`nav-link-${album.id}`}
              onClick={(e) => {
                e.preventDefault();
                onAlbumSelect(album.id);
              }}
            >
              {album.label}
            </a>
          </li>
        ))}
      </ul>

      <div className={styles.navRight} ref={modalRef}>
        <div
          className={styles.avatar}
          id="nav-avatar"
          onClick={() => setIsProfileModalOpen(!isProfileModalOpen)}
        >
          <img src="/images/image.png" alt="Stephany Profile" className={styles.avatarImage} />
        </div>

        {isProfileModalOpen && (
          <div className={styles.profileModal} id="profile-modal">
            <div className={styles.modalHeader}>
              <div className={styles.modalAvatar} onClick={() => setIsLightboxOpen(true)} title="Ver foto de perfil en pantalla completa">
                <img src="/images/image.png" alt="Stephany Profile Avatar" className={styles.modalAvatarImage} />
              </div>
              <h4 className={styles.modalName}>Stephany Oca Rangel</h4>
            </div>

            <div className={styles.modalInfoGrid}>
              <div className={styles.infoBlock}>
                <span className={styles.infoLabel}>Nombre</span>
                <span className={styles.infoValue}>Stephany</span>
              </div>
              <div className={styles.infoBlock}>
                <span className={styles.infoLabel}>Apellido</span>
                <span className={styles.infoValue}>Oca</span>
              </div>
              <div className={styles.infoBlock}>
                <span className={styles.infoLabel}>Nacimiento</span>
                <span className={styles.infoValue}>17 / 05 / 1995</span>
              </div>
              <div className={styles.infoBlock}>
                <span className={styles.infoLabel}>Edad</span>
                <span className={styles.infoValue}>31 Años</span>
              </div>
            </div>

            <div className={styles.modalActions}>
              <button
                className={`${styles.guidedTourBtn} ${isGuidedTourActive ? styles.guidedTourBtnActive : ''}`}
                onClick={onToggleGuidedTour}
                id="guided-tour-btn"
              >
                {isGuidedTourActive ? 'Detener Recorrido' : 'Recorrido Guiado'}
              </button>

              <button
                className={styles.guidedTourBtn}
                onClick={() => {
                  setIsProfileModalOpen(false);
                  if (onOpenAlbum) onOpenAlbum();
                }}
              >
                Álbum Completo
              </button>

              <div className={styles.switchContainer}>
                <span className={styles.switchLabel}>
                  Modo: {isGuidedTourActive ? 'Automático' : 'Manual'}
                </span>
                <div
                  className={`${styles.switchTrack} ${isGuidedTourActive ? styles.switchTrackActive : ''}`}
                  onClick={onToggleGuidedTour}
                  id="guided-tour-switch"
                >
                  <div
                    className={`${styles.switchThumb} ${isGuidedTourActive ? styles.switchThumbActive : ''}`}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {isLightboxOpen && (
          <div className={styles.lightboxOverlay} onClick={() => setIsLightboxOpen(false)}>
            <button className={styles.lightboxCloseBtn} onClick={() => setIsLightboxOpen(false)} aria-label="Cerrar imagen">
              <X size={20} />
            </button>
            <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
              <img src="/images/image.png" alt="Stephany Profile Fullscreen" className={styles.lightboxImage} />
              <span className={styles.lightboxCaption}>Stephany Oca Rangel</span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
