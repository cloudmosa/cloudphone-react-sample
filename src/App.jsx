/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react'
import './App.css'
import Header from './Header'
import OptionsMenu from './OptionsMenu'
import SoftKeyBar from './SoftKeyBar'
import { t } from 'i18next'
import { Link, useLocation, useNavigate } from 'react-router'
import { withTranslation } from 'react-i18next'
import { autoFocus } from './focus'

function AppComponent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(location.hash.includes('#menu'));

  // Toggle menu visibility and go back
  const onSoftKeyClick = (position) => {
    switch (position) {
      case 'start':
        if (menuVisible)
          navigate(-1);
        else
          setMenuVisible(!menuVisible);
        break;
      case 'center':
        break;
      // This is the default behavior of Cloud Phone
      // It cannot be overriden by widgets
      case 'end':
        navigate(-1);
        break;
    }
  };

  const onMenuItemSelected = () => setMenuVisible(false);

  return (
    <>
      <Header title={t('Cloud Phone')} />

      <section id="app" ref={autoFocus}>
        <h2>{t('React Demo')}</h2>
        <p>{t('Home_Description')}</p>
      </section>

      <OptionsMenu
        onMenuItemSelected={onMenuItemSelected}
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}>
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
