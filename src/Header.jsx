import PropTypes from 'prop-types'
import './Header.css'

function Header({ title }) {
  return (
    <>
      <title>{title}</title>
      <header>
        <img src="/icon.png" alt="Cloud Phone logo" draggable="false" />
        <h1>{title}</h1>
      </header>
    </>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header
