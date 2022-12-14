import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { animateCSS } from '../../exports/functions';
import useSound from 'use-sound';
import YaySound from '../../assets/sounds/yay.mp3';
import './score-reached.scss';
import './score-reached.mobile.scss';

function ScoreReached({ scoreReached, setShowScoreReached }) {
  const [playYaySound] = useSound(YaySound);

  // Animate component into view, throw confetti, then animate out
  useEffect(() => {
    // Throw confetti
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.3 } });

    // Play yay sound
    playYaySound();

    // Fade in
    animateCSS('.score-reached', 'fadeInDown', true).then(() => {
      // Fade out after 2.5 seconds
      setTimeout(
        () =>
          animateCSS('.score-reached', 'fadeOutUp', true).then(() => {
            // Remove score reached component from view
            const scoreReachedNode = document.querySelector('.score-reached');
            scoreReachedNode.style.setProperty('display', 'none');
            setShowScoreReached(false);
          }),
        2500
      );
    });
  }, [setShowScoreReached, playYaySound]);

  return (
    <div className="score-reached">
      <div className="score-reached-text-container">
        <h1>You've laid {scoreReached} eggs 🎉</h1>
        <h2>Keep it up!</h2>
      </div>
    </div>
  );
}

export default ScoreReached;
