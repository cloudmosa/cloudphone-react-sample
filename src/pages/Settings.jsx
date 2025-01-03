/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from 'react'
import './Home.css'
import Header from '../components/Header'
import SoftKeyBar from '../components/SoftKeyBar'
import i18n from 'i18next'
import { t } from 'i18next'
import OptionsMenu from '../components/OptionsMenu'
import { withTranslation } from 'react-i18next'
import { autoFocus } from '../utils/focus'
import { useNavigate } from 'react-router'

const getLanguageName = (contextLanguage, languageCode) => {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames
  return new Intl.DisplayNames([contextLanguage], {
    type: 'language'
  }).of(languageCode);
};

function SettingsComponent() {
  const navigate = useNavigate();
  const [languageMenuVisible, setLanguageMenuVisible] = useState(location.hash.includes('#menu'));
  const availableLanguages = Object.keys(i18n.services.resourceStore.data);

  const handlePopState = () => {
    if (languageMenuVisible) {
      navigate(-1);
      setLanguageMenuVisible(false);
    }
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
        navigate(-1);
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
            autoFocus
            className='focused'
            role='menuitem'
            onClick={showLanguageSelector}>
            <span className='title'>{t('Language')}</span>
            <span className='description'>{getLanguageName(i18n.resolvedLanguage, i18n.resolvedLanguage)}</span>
          </button>
        </div>
      </section>

      <OptionsMenu
        onMenuItemSelected={onMenuItemSelected}
        visible={languageMenuVisible}
        onClose={() => setLanguageMenuVisible(false)}>
        {availableLanguages.map((langCode) =>
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
