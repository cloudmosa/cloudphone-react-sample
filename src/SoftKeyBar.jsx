import MenuIcon from './assets/menu.svg?react'
import BackIcon from './assets/back.svg?react'
import PropTypes from 'prop-types'
import './SoftKeyBar.css'
import { useEffect } from 'react';

function getIconFromName(name) {
  switch (name) {
    case 'menu':
      return <MenuIcon />;
    case 'back':
      return <BackIcon />;
  }
}

function SoftKeyBar({
  buttons = { },
  onSoftKeyClick = () => { },
}) {
  const handleEvent = (event, position) => {
    if (!onSoftKeyClick) return;

    switch (event.key) {
      /* Left Soft Key (LSK) */
      case 'Escape':
        return onSoftKeyClick('start');
      case 'Enter':
        return onSoftKeyClick('center');
      /* Widgets cannot intercept RSK */
    }

    if (position)
      onSoftKeyClick(position);
  }

  useEffect(() => {
    window.addEventListener("keydown", handleEvent);

    return () => window.removeEventListener("keydown", handleEvent);
  });

  const renderButton = (position) => {
    const buttonConfig = buttons[position];
    if (!buttonConfig) return null;

    const { text, icon, component } = buttonConfig;

    return (
      <button
        key={position}
        onClick={(e) => handleEvent(e, position)}
      >
        {component || (
          <>
            {icon && getIconFromName(icon)}
            {text}
          </>
        )}
      </button>
    );
  };

  return (
    <>
      <footer>
        {['start', 'center', 'end'].map((position) => renderButton(position))}
      </footer>
    </>
  )
}

SoftKeyBar.propTypes = {
  buttons: PropTypes.shape({
    start: PropTypes.shape({
      text: PropTypes.string,
      icon: PropTypes.string,
      component: PropTypes.element,
    }),
    center: PropTypes.shape({
      text: PropTypes.string,
      icon: PropTypes.string,
      component: PropTypes.element,
    }),
    end: PropTypes.shape({
      text: PropTypes.string,
      icon: PropTypes.string,
      component: PropTypes.element,
    }),
  }),
  onSoftKeyClick: PropTypes.func,
};

export default SoftKeyBar
