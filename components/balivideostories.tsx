"use client";

import { useEffect, useRef, useState } from "react";
import ArrowIcon from "@/components/arrow-icon";
import styles from "./balivideostories.module.css";

type Story = {
  title: string;
  eyebrow: string;
  description: string;
  src: string;
  poster: string;
};

const stories: Story[] = [
  {
    title: "Temple mornings",
    eyebrow: "The day begins",
    description: "Classic VWs, local guides and the first stop of a very Bali kind of day.",
    src: "/videos/vwtourbali-02.mp4",
    poster: "/video-posters/vwtourbali-02.jpg",
  },
  {
    title: "Road to the coast",
    eyebrow: "Top down",
    description: "Warm air, open roads and the Indian Ocean appearing around the next bend.",
    src: "/videos/vwtourbali-05.mp4",
    poster: "/video-posters/vwtourbali-05.jpg",
  },
  {
    title: "Through the terraces",
    eyebrow: "Jatiluwih",
    description: "Rice fields unfold beside the car as the road winds through Bali’s green heart.",
    src: "/videos/vwtourbali-06.mp4",
    poster: "/video-posters/vwtourbali-06.jpg",
  },
  {
    title: "Volcano country",
    eyebrow: "The highlands",
    description: "A classic Volkswagen, a quiet backroad and Mount Batur on the horizon.",
    src: "/videos/vwtourbali-07.mp4",
    poster: "/video-posters/vwtourbali-07.jpg",
  },
];

function PlayIcon({ playing }: { playing: boolean }) {
  return playing ? (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h4v14H7zm6 0h4v14h-4z" /></svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 5 11 7-11 7z" /></svg>
  );
}

function SoundIcon({ muted }: { muted: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 9v6h4l5 4V5L8 9H4zm11.5-.8v7.6a5 5 0 0 0 0-7.6z" />
      {muted && <path className={styles.muteSlash} d="m4 4 16 16" />}
    </svg>
  );
}

export default function BaliVideoStories() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const activeStory = stories[activeIndex];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;
    video.play().catch(() => setIsPlaying(false));
  }, [activeIndex, isMuted]);

  const chooseStory = (index: number) => {
    if (index === activeIndex) {
      videoRef.current?.play().catch(() => undefined);
      return;
    }
    setActiveIndex(index);
    setIsPlaying(false);
  };

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => undefined);
    else video.pause();
  };

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <section className={styles.section} aria-labelledby="video-stories-title">
      <div className={styles.inner}>
        <header className={styles.header}>
          <div>
            <p className={styles.kicker}>Stories in motion · Bali, Indonesia</p>
            <h2 id="video-stories-title" className={styles.title}>
              The road feels
              <span>different from here</span>
            </h2>
          </div>
          <p className={styles.intro}>
            Turn the sound on and ride along. Four small glimpses of a private Bali day,
            filmed from the open road by the people who were there.
          </p>
        </header>

        <div className={styles.experience}>
          <div className={styles.playerShell}>
            <video
              key={activeStory.src}
              ref={videoRef}
              className={styles.video}
              poster={activeStory.poster}
              src={activeStory.src}
              muted={isMuted}
              loop
              playsInline
              preload="metadata"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              aria-label={`${activeStory.title}. ${activeStory.description}`}
            />
            <div className={styles.videoShade} aria-hidden="true" />

            <div className={styles.nowPlaying} aria-live="polite">
              <span>{activeStory.eyebrow}</span>
              <strong>{activeStory.title}</strong>
            </div>

            <div className={styles.controls}>
              <button type="button" onClick={togglePlayback} aria-label={isPlaying ? "Pause video" : "Play video"}>
                <PlayIcon playing={isPlaying} />
              </button>
              <button type="button" onClick={toggleSound} aria-label={isMuted ? "Turn sound on" : "Mute video"} aria-pressed={!isMuted}>
                <SoundIcon muted={isMuted} />
              </button>
            </div>
          </div>

          <div className={styles.storyRail} aria-label="Choose a road story">
            {stories.map((story, index) => {
              const active = index === activeIndex;
              return (
                <button
                  key={story.src}
                  type="button"
                  className={`${styles.storyCard} ${active ? styles.active : ""}`}
                  onClick={() => chooseStory(index)}
                  aria-pressed={active}
                >
                  <span className={styles.thumb}>
                    <img src={story.poster} alt="" loading="lazy" />
                    <span className={styles.cardPlay} aria-hidden="true">▶</span>
                  </span>
                  <span className={styles.cardCopy}>
                    <span className={styles.cardNumber}>0{index + 1}</span>
                    <strong>{story.title}</strong>
                    <span>{story.description}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className={styles.footerLine}>
          <span>Private tours. Open roads. Your own story.</span>
          <a href="#contact">Plan your day <ArrowIcon /></a>
        </div>
      </div>
    </section>
  );
}
