/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from 'react'
import './App.css'
import Header from './Header'
import OptionsMenu from './OptionsMenu'
import SoftKeyBar from './SoftKeyBar'
import { t } from 'i18next'
import { Link } from 'react-router'
import { withTranslation } from 'react-i18next'
import { autoFocus } from './focus'

function AppComponent() {
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
      <Header title={t('Cloud Phone')} />

      <section id="app" ref={autoFocus}>
        <h2>{t('React Demo')}</h2>
        <p>{t('Home_Description')}</p>
      </section>

      <OptionsMenu onMenuItemSelected={onMenuItemSelected} visible={menuVisible}>
        <Link to="about">
          {t('About')}
        </Link>
        <Link to="settings">
          {t('Settings')}
        </Link>
        <a href="https://www.cloudfone.com/dev-privacy" target="_self">
          {t('Privacy')}
        </a>
      </OptionsMenu>

      <SoftKeyBar
        buttons = {{
          start: { icon: 'menu' },
          center: { icon: 'select', title: t('Select') },
          end: { icon: 'back' },
        }}
        onSoftKeyClick={onSoftKeyClick} />
    </>
  )
}

export default withTranslation()(AppComponent)
