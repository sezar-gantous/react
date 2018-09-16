import React from "react";
import PropTypes from "prop-types";
import {partial} from '../../lib/utils'

export const TodoItem = todo => {
  const handleToggle = partial(todo.handleToggle, todo.id)
  const handleRemove = partial(todo.handleRemove, todo.id)
 
  return (
    <li>
    <span className="delete-item "><button type="button" href="#" onClick={handleRemove}>X</button></span>
      <input onChange={handleToggle} type="checkbox" checked={todo.isComplete} />
      {todo.name}
    </li>
  );
};

TodoItem.propTypes = {
  name: PropTypes.string.isRequired,
  isComplete: PropTypes.bool,
  id: PropTypes.number.isRequired
};
