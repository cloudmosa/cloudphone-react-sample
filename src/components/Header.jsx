import PropTypes from 'prop-types'
import './Header.css'
import icon from '../assets/icon.png?inline'

function Header({ title }) {
  return (
    <>
      <title>{title}</title>
      <header>
        <img src={icon} alt="Cloud Phone logo" draggable="false" width="1em" height="1em" />
        <h1>{title}</h1>
      </header>
    </>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header
