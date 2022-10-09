import { useEffect, useRef, useState } from 'react';
import BabyChickenMouthClosedImage from '../../assets/images/baby-chicken-mouth-closed.png';
import BabyChickenMouthOpenImage from '../../assets/images/baby-chicken-mouth-open.png';
import { isBabyChickenOnLeftSide } from '../../exports/functions';
import './baby-chicken.scss';

function BabyChicken(props) {
  const interval = useRef(null);

  const [isMouthClosed, setIsMouthClosed] = useState(true);

  // Animate the baby chicken
  useEffect(() => {
    const babyId = `#${props.id}`;
    const babyChicken = document.querySelector(babyId);

    // Grow and move off screen
    let direction = '100vw'; // Move to the right off-screen
    const isLeftSide = isBabyChickenOnLeftSide(props.style.left);
    isLeftSide && (direction = '-100vw');

    babyChicken.style.setProperty('--move-off-screen-direction', direction);
    babyChicken.classList.add('grow-and-move-off-screen');

    // Change baby chicken image repeatedly
    interval.current = setInterval(() => setIsMouthClosed(!isMouthClosed), 500);

    return () => clearInterval(interval.current);
    //eslint-disable-next-line
  }, [props.id, isMouthClosed]);

  return (
    <div id={props.id} className="baby-chicken" style={props.style}>
      <img
        src={
          isMouthClosed
            ? BabyChickenMouthClosedImage
            : BabyChickenMouthOpenImage
        }
        alt="Baby Chicken"
      />
    </div>
  );
}

export default BabyChicken;
