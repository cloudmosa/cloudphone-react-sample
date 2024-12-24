import { useNavigate } from 'react-router';
import './App.css'
import { autoFocus } from './focus';
import Header from './Header'
import SoftKeyBar from './SoftKeyBar'
import { t } from 'i18next'

function About() {
  const navigate = useNavigate();

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

  return (
    <>
      <Header title={t('About')} />

      <section id="app" ref={autoFocus}>
        <h2>{t('About')}</h2>
        <p>{t('About_Description')}</p>
      </section>

      <SoftKeyBar
        buttons = {{
          end: { icon: 'back' },
        }}
        onSoftKeyClick={onSoftKeyClick} />
    </>
  )
}

export default About
