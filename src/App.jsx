import { useEffect, useState } from 'react';
import './App.css'
import Header from './Header'
import OptionsMenu from './OptionsMenu';
import SoftKeyBar from './SoftKeyBar'
import { t } from 'i18next';

function App() {
  const [menuVisible, setVisible] = useState(false);

  const setMenuVisible = (isVisible) => {
    // Update history when the menu is shown
    // This allows the back button to hide the menu
    if (!menuVisible && isVisible) {
      location.hash = '#menu';
      history.pushState({ menu: true }, '', location.hash);
    } else if (menuVisible && !isVisible) {
      location.hash = '';
      history.back();
    }

    setVisible(isVisible);
  };

  const handlePopState = () => {
    if (menuVisible)
      setMenuVisible(false);
  };

  // Toggle menu visibility and go back
  const onSoftKeyClick = (position) => {
    switch (position) {
      case 'start':
        setMenuVisible(!menuVisible);
        break;
      case 'center':
        break;
      // This is the default behavior of Cloud Phone
      // It cannot be overriden by widgets
      case 'end':
        history.back();
        break;
    }
  };

  const onMenuItemSelected = () => {
    setMenuVisible(false);
  };

  // Update the menu visibility when user presses back button
  useEffect(() => {
    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  });

  return (
    <>
      <Header title="Cloud Phone" />

      <div id="app">
        <h2>{t('React Demo')}</h2>
        <p>
          This is a demo widget for Cloud Phone using <a href="https://react.dev/">React</a>.
          Learn more at <a href="https://cloudfone.com">cloudfone.com</a>
        </p>
      </div>

      <OptionsMenu onMenuItemSelected={onMenuItemSelected} visible={menuVisible}>
        <span>{t('About')}</span>
        <span>{t('Settings')}</span>
        <span>{t('Privacy')}</span>
      </OptionsMenu>

      <SoftKeyBar
        buttons = {{
          start: { icon: 'menu' },
          center: { text: t('Select') },
          end: { icon: 'back' },
        }}
        onSoftKeyClick={onSoftKeyClick} />
    </>
  )
}

export default App
