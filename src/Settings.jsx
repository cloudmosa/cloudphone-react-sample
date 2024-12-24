/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from 'react'
import './App.css'
import Header from './Header'
import SoftKeyBar from './SoftKeyBar'
import i18n from 'i18next'
import { t } from 'i18next'
import OptionsMenu from './OptionsMenu'
import { withTranslation } from 'react-i18next'
import { autoFocus } from './focus'

const getLanguageName = (contextLanguage, languageCode) => {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames
  return new Intl.DisplayNames([contextLanguage], {
    type: 'language'
  }).of(languageCode);
};

function SettingsComponent() {
  const [languageMenuVisible, setLanguageVisible] = useState(false);

  const setLanguageMenuVisible = (isVisible) => {
    // Update history when the menu is shown
    // This allows the back button to hide the menu
    if (!languageMenuVisible && isVisible) {
      location.hash = '#language';
      history.pushState({ menu: true }, '', location.hash);
    } else if (languageMenuVisible && !isVisible) {
      location.hash = '';
      history.back();
    }

    setLanguageVisible(isVisible);
  };

  const handlePopState = () => {
    if (languageMenuVisible)
      setLanguageMenuVisible(false);
  };

  // Update the menu visibility when user presses back button
  useEffect(() => {
    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  });

  // Toggle menu visibility and go back
  const onSoftKeyClick = (position) => {
    switch (position) {
      // This is the default behavior of Cloud Phone
      // It cannot be overriden by widgets
      case 'end':
        history.back();
        break;
    }
  };

  const showLanguageSelector = () => setLanguageMenuVisible(true);

  const onMenuItemSelected = (e) => {
    if (e.key !== i18n.resolvedLanguage) {
      i18n.changeLanguage(e.key);
    }
    setLanguageMenuVisible(false);
  };

  return (
    <>
      <Header title={t('Settings')} />

      <section id='app'>
        <div>
          <button
            ref={autoFocus}
            className='focused'
            role='menuitem'
            onClick={showLanguageSelector}>
            <span className='title'>{t('Language')}</span>
            <span className='description'>{getLanguageName(i18n.resolvedLanguage, i18n.resolvedLanguage)}</span>
          </button>
        </div>
      </section>

      <OptionsMenu onMenuItemSelected={onMenuItemSelected} visible={languageMenuVisible}>
        {Object.keys(i18n.services.resourceStore.data).map((langCode) =>
          <span key={langCode}>{getLanguageName(i18n.resolvedLanguage, langCode)}</span>
        )}
      </OptionsMenu>

      <SoftKeyBar
        buttons = {{
          center: { icon: 'select', title: t('Select') },
          end: { icon: 'back' },
        }}
        onSoftKeyClick={onSoftKeyClick} />
    </>
  )
}

export default withTranslation()(SettingsComponent)
