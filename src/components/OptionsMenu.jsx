import PropTypes from 'prop-types'
import './OptionsMenu.css'
import React, { useEffect, useRef, useState } from 'react'
import { autoFocusFirstFocusable } from '../utils/focus'
import { useNavigate } from 'react-router'

function OptionsMenu({
  visible = false,
  children = [ ],
  onMenuItemSelected = () => { },
  onClose = () => { },
}) {
  const menuRef = useRef(null);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const navigate = useNavigate();

  // Update the hash when the menu is open
  useEffect(() => {
    if (visible)
      navigate('#menu');
  }, [visible, navigate]);

  const handlePopState = () => {
    if (!location.hash.includes('#menu'))
      if (onClose) onClose();
  };

  // Update the menu visibility when user presses back button
  useEffect(() => {
    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  });

  // Handle key navigation (Arrow Up, Arrow Down) and selection (Enter)
  const handleKeyDown = (e) => {
    if (!visible) return;
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

        if (items[focusedIndex]) {
          // Trigger link navigation behavior
          items[focusedIndex].click();

          if (onMenuItemSelected)
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
    const items = menuRef?.current?.querySelectorAll('[role="menuitem"]') || [];
    if (items[focusedIndex]) {
      items[focusedIndex].focus();
    }
  }, [menuRef, focusedIndex]);

  // Update the focus whenever the arrow keys are ysed
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  useEffect(() => autoFocusFirstFocusable(menuRef?.current), [menuRef]);

  if (!visible) return null;

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
            tabIndex: index,
            autoFocus: (index === focusedIndex),
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
  onClose: PropTypes.func.isRequired,
};

export default OptionsMenu
