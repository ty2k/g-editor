import React, { useState } from 'react';

import './Dropdown.scss';

/**
 * Select-like dropdown component
 * @param {*} props
 * @param {Boolean} props.expanded - initial expanded/collapsed state
 * @param {string} props.id - `id` appended to top level <div>
 * @param {array} props.items - array of dropdown options
 * @param {string} props.label - dropdown button label
 */
function Dropdown({ expanded = false, id = '', items = [], label = '' }) {
  const [open, setOpen] = useState(expanded);

  return (
    <div className="dropdown" id={id}>
      <button
        aria-expanded={open}
        onBlur={() => { setOpen(false); }}
        onClick={() => { setOpen(!open); }}
      >
        <span>{label}</span>
        <i className="fas fa-chevron-down"></i>
      </button>
      {items && items.length > 0 && (
        <ul className={ open ? 'expanded' : 'collapsed' }>
          {items.map(({ id, label }) => {
            console.log("Inside item, id: ", id);
            console.log("Inside item, label: ", label);
            return (
              <li key={`li-${id}`} id={id}>
                <button>
                  <span>{label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export { Dropdown };
