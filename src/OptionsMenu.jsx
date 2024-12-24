import PropTypes from 'prop-types'
import './OptionsMenu.css'
import React, { useEffect, useRef, useState } from 'react'

function OptionsMenu({
  visible = false,
  children = [ ],
  onMenuItemSelected = () => { },
}) {
  const menuRef = useRef(null);
  const [focusedIndex, setFocusedIndex] = useState(0);

  // Focus the first item by default
  useEffect(() => {
    if (menuRef.current) {
      const items = menuRef.current.querySelectorAll('[role="menuitem"]');
      if (items[0]) items[0].focus();
    }
  }, []);

  // Handle key navigation (Arrow Up, Arrow Down) and selection (Enter)
  const handleKeyDown = (e) => {
    const items = menuRef.current.querySelectorAll('[role="menuitem"]');
    if (!items.length) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex((prev) => (prev + 1) % items.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex((prev) => (prev - 1 + items.length) % items.length);
        break;
      case 'Enter':
        e.preventDefault();
        if (items[focusedIndex] && onMenuItemSelected) {
          onMenuItemSelected(children[focusedIndex]);
        }
        break;
    }
  };

  // Handle click events for menu item selection
  const handleClick = (index) => {
    if (onMenuItemSelected)
      onMenuItemSelected(children[index]);
  };

  // Update focus whenever focusedIndex changes
  useEffect(() => {
    const items = menuRef.current.querySelectorAll('[role="menuitem"]');
    if (items[focusedIndex]) {
      items[focusedIndex].focus();
    }
  }, [focusedIndex]);

  // Update the focus whenever the arrow keys are ysed
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <>
      <menu
        ref={menuRef}
        role="menu"
        hidden={!visible}
        aria-hidden={!visible}>
        {React.Children.map(children, (child, index) =>
          React.cloneElement(child, {
            role: 'menuitem',
            onClick: () => handleClick(index),
            className: ((index === focusedIndex) ? 'focused' : '')
          })
        )}
      </menu>
    </>
  )
}

OptionsMenu.propTypes = {
  visible: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onMenuItemSelected: PropTypes.func.isRequired,
};

export default OptionsMenu