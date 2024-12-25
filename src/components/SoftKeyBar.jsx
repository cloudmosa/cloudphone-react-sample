import PropTypes from 'prop-types'
import { useEffect } from 'react'
import MenuIcon from '../assets/icons/menu.svg?react'
import BackIcon from '../assets/icons/back.svg?react'
import SelectIcon from '../assets/icons/select.svg?react'
import './SoftKeyBar.css'

function getIconFromName(name) {
  switch (name) {
    case 'menu':
      return <MenuIcon />;
    case 'back':
      return <BackIcon />;
    case 'select':
      return <SelectIcon />;
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
    if (!buttonConfig)
      return (
        <button
          key={position}
          className="disabled"
          disabled={true}
          aria-disabled="true"></button>
      );

    const { text, icon, component, title } = buttonConfig;

    return (
      <button
        key={position}
        onClick={(e) => handleEvent(e, position)}
        title={title}
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
