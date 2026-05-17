import { useState, useMemo, useEffect, useRef } from 'react';
import type { Album } from '../../types';
import Navbar from '../Navbar/Navbar';
import Timeline from '../Timeline/Timeline';
import HeroContent from '../HeroContent/HeroContent';
import Carousel from '../Carousel/Carousel';
import PhotoAlbum from '../PhotoAlbum/PhotoAlbum';
import { Play, Pause, SkipForward, SkipBack, X, Volume2 } from 'lucide-react';
import styles from './LandingPage.module.css';

interface LandingPageProps {
  albums: Album[];
}

export default function LandingPage({ albums }: LandingPageProps) {
  const [activeAlbumId, setActiveAlbumId] = useState(albums[0].id);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isGuidedTourActive, setIsGuidedTourActive] = useState(false);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  const [isLeftBgLight, setIsLeftBgLight] = useState(false);
  const [showPhotoAlbum, setShowPhotoAlbum] = useState(false);

  // Splash screen states
  const [showSplash, setShowSplash] = useState(true);
  const [isSplashExiting, setIsSplashExiting] = useState(false);

  // Voice narration states
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const isFirstNarration = useRef(true);

  // Find the currently active album
  const currentAlbum = useMemo(() => {
    return albums.find((album) => album.id === activeAlbumId) ?? albums[0];
  }, [albums, activeAlbumId]);

  // Current active moment/destination inside the album
  const current = useMemo(() => {
    return currentAlbum.destinations[activeIndex] ?? currentAlbum.destinations[0];
  }, [currentAlbum, activeIndex]);

  // Flat list of all steps in the tour sequence across all albums
  const tourSequence = useMemo(() => {
    const steps: { albumId: string; destinationIndex: number }[] = [];
    albums.forEach((album) => {
      album.destinations.forEach((_, destIndex) => {
        steps.push({ albumId: album.id, destinationIndex: destIndex });
      });
    });
    return steps;
  }, [albums]);

  // Initialize background music: My Only Love by Omar Diaz (piano instrumental)
  useEffect(() => {
    const audio = new Audio('/audio/nostalgia_piano.mp3?v=5');
    audio.loop = true;
    audio.volume = 0.08; // Soft background volume so the narrator voice is clear
    bgMusicRef.current = audio;

    return () => {
      audio.pause();
      bgMusicRef.current = null;
    };
  }, []);

  // Analyze active background image left-side brightness to dynamically set text color theme
  useEffect(() => {
    if (!current?.heroImage) {
      setIsLeftBgLight(false);
      return;
    }

    const img = new Image();
    img.src = current.heroImage;
    img.crossOrigin = 'anonymous'; // Fallback to bypass CORS issues on local assets

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = 100;
        canvas.height = 100;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Draw image stretched to 100x100
        ctx.drawImage(img, 0, 0, 100, 100);

        // Analyze left side region (X: 0 to 45, Y: 10 to 90)
        const widthToAnalyze = 45;
        const heightToAnalyze = 80;
        const startX = 0;
        const startY = 10;

        const imgData = ctx.getImageData(startX, startY, widthToAnalyze, heightToAnalyze);
        const data = imgData.data;

        let totalLuminance = 0;
        let pixelCount = 0;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];

          // Skip completely transparent pixels if any
          if (a < 50) continue;

          // Standard relative luminance formula
          const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
          totalLuminance += luminance;
          pixelCount++;
        }

        const averageLuminance = pixelCount > 0 ? totalLuminance / pixelCount : 0;

        // Threshold: 128 is middle. If average luminance is > 145, it is a very light background
        setIsLeftBgLight(averageLuminance > 145);
        console.log(`[Brightness Detection] ${current.heroImage} | Avg Left Luminance: ${averageLuminance.toFixed(1)} -> Light Theme: ${averageLuminance > 145}`);
      } catch (err) {
        console.error("Error analyzing image brightness:", err);
        setIsLeftBgLight(false); // Fallback to dark theme (white text)
      }
    };

    img.onerror = () => {
      setIsLeftBgLight(false);
    };
  }, [current]);

  // Synchronize background music playing state with Guided Tour active/paused state
  useEffect(() => {
    const music = bgMusicRef.current;
    if (!music) return;

    if (isGuidedTourActive && !isPaused) {
      music.play().catch((err) => {
        console.warn("Background music autoplay was blocked initially; will play upon interaction:", err);
      });
    } else {
      music.pause();
    }
  }, [isGuidedTourActive, isPaused]);

  // Guided Tour Web Speech API narration logic
  useEffect(() => {
    // If tour is not active, cancel any speaking and reset
    if (!isGuidedTourActive) {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setIsSpeaking(false);
      setIsPaused(false);
      return;
    }

    // Standard safety check for browser support
    if (!window.speechSynthesis) {
      console.warn("Speech synthesis not supported in this browser.");
      // Fallback: standard 7-second timer to advance slide if TTS is unavailable
      const timer = setTimeout(() => {
        const currentStep = tourSequence.findIndex(
          (step) => step.albumId === activeAlbumId && step.destinationIndex === activeIndex
        );
        const nextStepIndex = (currentStep + 1) % tourSequence.length;
        const nextStep = tourSequence[nextStepIndex];
        setActiveAlbumId(nextStep.albumId);
        setActiveIndex(nextStep.destinationIndex);
      }, 7000);
      return () => clearTimeout(timer);
    }

    // Cancel any active speaking before starting new one
    window.speechSynthesis.cancel();

    // Prepare text to read
    const textToSpeak = `${current.title.replace(/\n/g, ' ')}. ${current.description}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utteranceRef.current = utterance; // store in ref to prevent garbage collection

    // Setup voice specifically for US Spanish (es-US) as required, with fallback
    const availableVoices = window.speechSynthesis.getVoices();
    const usEsVoice = availableVoices.find((v) => {
      const normalizedLang = v.lang.toLowerCase().replace('_', '-');
      return normalizedLang === 'es-us';
    });

    if (usEsVoice) {
      utterance.voice = usEsVoice;
    } else {
      // Fallback: Find any available Spanish voice (es-ES, es-MX, etc.)
      const esVoice = availableVoices.find((v) => {
        const normalizedLang = v.lang.toLowerCase();
        return normalizedLang.startsWith('es') || normalizedLang.includes('-es');
      });
      if (esVoice) {
        utterance.voice = esVoice;
      }
    }

    // Setup rate (Standard 1.0 speech speed)
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onend = () => {
      // Transition to next slide when current text finishes
      setIsSpeaking(false);

      const currentStep = tourSequence.findIndex(
        (step) => step.albumId === activeAlbumId && step.destinationIndex === activeIndex
      );
      const nextStepIndex = (currentStep + 1) % tourSequence.length;
      const nextStep = tourSequence[nextStepIndex];

      setActiveAlbumId(nextStep.albumId);
      setActiveIndex(nextStep.destinationIndex);
    };

    utterance.onerror = (e) => {
      if (e.error !== 'interrupted') {
        console.error('SpeechSynthesis error:', e);
        setIsSpeaking(false);

        // Fallback: transition after a short delay anyway so the tour doesn't freeze
        const timer = setTimeout(() => {
          const currentStep = tourSequence.findIndex(
            (step) => step.albumId === activeAlbumId && step.destinationIndex === activeIndex
          );
          const nextStepIndex = (currentStep + 1) % tourSequence.length;
          const nextStep = tourSequence[nextStepIndex];
          setActiveAlbumId(nextStep.albumId);
          setActiveIndex(nextStep.destinationIndex);
        }, 3000);
        return () => clearTimeout(timer);
      }
    };

    let speakTimer: ReturnType<typeof setTimeout>;

    const startSpeakingAction = () => {
      // Track states
      setIsSpeaking(true);
      setIsPaused(false);

      // Speak!
      window.speechSynthesis.speak(utterance);

      // If the component was paused, resume it (sometimes cancel leaves in paused state)
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    };

    // If it's the very first time starting the tour from the splash screen, 
    // wait 3.5 seconds to let the music set the nostalgic atmosphere first!
    if (isFirstNarration.current) {
      isFirstNarration.current = false;
      speakTimer = setTimeout(startSpeakingAction, 3500);
    } else {
      startSpeakingAction();
    }

    return () => {
      clearTimeout(speakTimer);
      window.speechSynthesis.cancel();
    };
  }, [isGuidedTourActive, activeAlbumId, activeIndex, tourSequence, current]);

  // Audio actions
  const handlePlayPause = () => {
    if (!window.speechSynthesis) return;

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else if (isSpeaking) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    } else {
      setIsGuidedTourActive(true);
    }
  };

  const handleStopTour = () => {
    setIsGuidedTourActive(false);
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setIsPaused(false);
    isFirstNarration.current = true;
  };

  const handleNextStep = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    const currentStep = tourSequence.findIndex(
      (step) => step.albumId === activeAlbumId && step.destinationIndex === activeIndex
    );
    const nextStepIndex = (currentStep + 1) % tourSequence.length;
    const nextStep = tourSequence[nextStepIndex];

    setActiveAlbumId(nextStep.albumId);
    setActiveIndex(nextStep.destinationIndex);
  };

  const handlePrevStep = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    const currentStep = tourSequence.findIndex(
      (step) => step.albumId === activeAlbumId && step.destinationIndex === activeIndex
    );
    const prevStepIndex = (currentStep - 1 + tourSequence.length) % tourSequence.length;
    const prevStep = tourSequence[prevStepIndex];

    setActiveAlbumId(prevStep.albumId);
    setActiveIndex(prevStep.destinationIndex);
  };

  // Keyboard navigation for manual mode
  useEffect(() => {
    // Only enable keyboard navigation in manual mode and when splash is closed
    if (isGuidedTourActive || showSplash) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || (e.key === 'Tab' && !e.shiftKey)) {
        e.preventDefault();
        handleNextStep();
      } else if (e.key === 'ArrowLeft' || (e.key === 'Tab' && e.shiftKey)) {
        e.preventDefault();
        handlePrevStep();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGuidedTourActive, showSplash, activeAlbumId, activeIndex]);

  const handleStartTourMode = (isAccompanied: boolean) => {
    setIsSplashExiting(true);

    // If they choose accompanied, set tour active
    if (isAccompanied) {
      setIsGuidedTourActive(true);
    } else {
      setIsGuidedTourActive(false);
    }

    // Wait for the exit animation (1.2s blur/scale) to finish before unmounting the splash overlay
    setTimeout(() => {
      setShowSplash(false);
    }, 1200);
  };

  // Generate ambient particles positions once
  const particles = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 6}s`,
        duration: `${6 + Math.random() * 6}s`,
        size: `${1 + Math.random() * 2}px`,
      })),
    []
  );

  const handleSelect = (index: number) => {
    if (index !== activeIndex && index >= 0 && index < currentAlbum.destinations.length) {
      setActiveIndex(index);
    }
  };

  const handleAlbumSelect = (albumId: string) => {
    if (albumId !== activeAlbumId) {
      setActiveAlbumId(albumId);
      setActiveIndex(0); // Reset to first moment of the newly selected album
    }
  };

  const handleHeroImgError = (destId: string) => {
    setImgErrors((prev) => ({ ...prev, [destId]: true }));
  };

  // Extract simple label/id pairs for navbar
  const navbarAlbums = useMemo(() => {
    return albums.map((a) => ({ id: a.id, label: a.label }));
  }, [albums]);

  return (
    <div className={styles.landingPage} id="landing-page">
      {/* ═══ Background Images (all destinations from current album preloaded) ═══ */}
      <div className={styles.heroBackground}>
        {currentAlbum.destinations.map((dest, i) => {
          if (dest.heroImage === '') {
            return (
              <div
                key={dest.id}
                className={`${styles.heroBgFinal} ${i === activeIndex ? styles.heroBgFinalActive : ''}`}
              />
            );
          }
          return imgErrors[dest.id] ? (
            <div
              key={dest.id}
              className={`${styles.heroBgPlaceholder} ${i === activeIndex ? styles.heroBgPlaceholderActive : ''
                }`}
            >
              <span className={styles.placeholderText}>
                {dest.heroImage}
              </span>
            </div>
          ) : (
            <img
              key={dest.id}
              src={dest.heroImage}
              alt={dest.title.replace('\n', ' ')}
              className={`${styles.heroBgImage} ${i === activeIndex ? styles.heroBgImageActive : ''
                }`}
              loading={i === 0 ? 'eager' : 'lazy'}
              style={{ objectPosition: dest.heroPosition || 'center' }}
              onError={() => handleHeroImgError(dest.id)}
            />
          );
        })}
      </div>

      {/* ═══ Overlay ═══ */}
      <div className={styles.overlay} />
      <div className={styles.vignette} />

      {/* ═══ Ambient Particles ═══ */}
      {particles.map((p) => (
        <div
          key={p.id}
          className={styles.ambientParticle}
          style={{
            left: p.left,
            top: p.top,
            animationDelay: p.delay,
            animationDuration: p.duration,
            width: p.size,
            height: p.size,
          }}
        />
      ))}

      {/* ═══ Content Layer ═══ */}
      <div className={styles.contentLayer}>
        <Navbar
          albums={navbarAlbums}
          activeAlbumId={activeAlbumId}
          onAlbumSelect={handleAlbumSelect}
          isGuidedTourActive={isGuidedTourActive}
          onToggleGuidedTour={() => {
            if (isGuidedTourActive) {
              handleStopTour();
            } else {
              setIsGuidedTourActive(true);
            }
          }}
          onOpenAlbum={() => setShowPhotoAlbum(true)}
        />

        <Timeline
          total={currentAlbum.destinations.length}
          activeIndex={activeIndex}
          onSelect={handleSelect}
        />

        <HeroContent
          title={current.title}
          description={current.description}
          contentKey={`${activeAlbumId}-${current.id}`}
          isLight={isLeftBgLight}
          isFinal={activeAlbumId === 'final'}
          actionLabel={activeAlbumId === 'final' ? 'De donde vienes' : undefined}
          onActionClick={activeAlbumId === 'final' ? () => setShowPhotoAlbum(true) : undefined}
        />

        <Carousel
          destinations={currentAlbum.destinations}
          activeIndex={activeIndex}
          onCardClick={handleSelect}
        />

        {/* Floating Voice Narration Controller */}
        {isGuidedTourActive && (
          <div className={styles.narrationController} id="narration-controller">
            {/* The main controller capsule */}
            <div className={styles.narrationCapsule}>
              {/* Animated bouncing voice bars */}
              <div className={styles.audioWave} aria-hidden="true">
                <span className={`${styles.waveBar} ${!isPaused && isSpeaking ? styles.waveBarAnimating : ''}`} />
                <span className={`${styles.waveBar} ${!isPaused && isSpeaking ? styles.waveBarAnimating : ''}`} />
                <span className={`${styles.waveBar} ${!isPaused && isSpeaking ? styles.waveBarAnimating : ''}`} />
                <span className={`${styles.waveBar} ${!isPaused && isSpeaking ? styles.waveBarAnimating : ''}`} />
              </div>

              {/* Text metadata */}
              <div className={styles.narrationInfo}>
                <span className={styles.narrationLabel}>
                  <Volume2 size={10} strokeWidth={2} /> Recorrido Activo
                </span>
                <span className={styles.narrationTitle}>
                  {current.title.replace('\n', ' ')}
                </span>
              </div>

              {/* Action buttons */}
              <div className={styles.narrationActions}>
                <button
                  className={styles.controlBtn}
                  onClick={handlePrevStep}
                  title="Anterior"
                  aria-label="Anterior momento de memoria"
                >
                  <SkipBack size={15} fill="currentColor" />
                </button>

                <button
                  className={`${styles.controlBtn} ${styles.mainPlayBtn}`}
                  onClick={handlePlayPause}
                  title={isPaused ? "Reanudar" : "Pausar"}
                  aria-label={isPaused ? "Reanudar narración" : "Pausar narración"}
                >
                  {isPaused ? <Play size={16} fill="currentColor" /> : <Pause size={16} fill="currentColor" />}
                </button>

                <button
                  className={styles.controlBtn}
                  onClick={handleNextStep}
                  title="Siguiente"
                  aria-label="Siguiente momento de memoria"
                >
                  <SkipForward size={15} fill="currentColor" />
                </button>

                <button
                  className={`${styles.controlBtn} ${styles.closeBtn}`}
                  onClick={handleStopTour}
                  title="Cerrar recorrido"
                  aria-label="Detener y cerrar recorrido guiado"
                >
                  <X size={15} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Minimalist Git-inspired Premium Welcome Splash Screen */}
        {showSplash && (
          <div className={`${styles.splashOverlay} ${isSplashExiting ? styles.splashExit : ''}`}>
            <div className={styles.splashBackground}>
              <div className={styles.splashGlow} />
              <div className={styles.splashGrid} />
            </div>

            <div className={styles.splashContent}>
              <div className={styles.terminalHeader}>
                <span className={styles.terminalDot} />
                <span className={styles.terminalDot} />
                <span className={styles.terminalDot} />
                <span className={styles.terminalPath}>stephany-gift ~ init</span>
              </div>

              <div className={styles.splashBrand}>
                <h1 className={styles.splashTitle}>Stephany</h1>
                <p className={styles.splashSubtitle}>Regalo de cumpleaños</p>
              </div>

              <div className={styles.splashDivider} />

              <div className={styles.splashQuestionContainer}>
                <p className={styles.splashWelcome}>
                  Bienvenida a tu espacio, Stephany. Cada recuerdo es un suspiro guardado en el tiempo.
                </p>
                <p className={styles.splashQuestion}>¿Cómo deseas recorrer este viaje?</p>
              </div>

              <div className={styles.splashButtons}>
                <button
                  className={`${styles.splashBtn} ${styles.btnAccompanied}`}
                  onClick={() => handleStartTourMode(true)}
                >
                  <div className={styles.btnContent}>
                    <Volume2 size={18} />
                    <span>Recorrido Acompañado</span>
                  </div>
                  <span className={styles.btnSub}>Voz narradora & música de fondo</span>
                </button>

                <button
                  className={`${styles.splashBtn} ${styles.btnSolo}`}
                  onClick={() => handleStartTourMode(false)}
                >
                  <div className={styles.btnContent}>
                    <Play size={18} className={styles.btnPlayIcon} />
                    <span>Explorar Sola</span>
                  </div>
                  <span className={styles.btnSub}>Navegación manual y silenciosa</span>
                </button>
              </div>
            </div>

            <div className={styles.splashFooter}>
              <span>v1.0.0 • Hecho con amor</span>
            </div>
          </div>
        )}
      </div>
      {showPhotoAlbum && (
        <PhotoAlbum onClose={() => setShowPhotoAlbum(false)} />
      )}
    </div>
  );
}
