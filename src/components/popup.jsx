import React from 'react';

export default class PopUp extends React.Component {
  render() {
    const { onCancel, onAdd, onChange, value, onKeyUp } = this.props;
    return (
      <div className="pop-up-wrapper">
        <div className="pop-up" onKeyUp={onKeyUp}>
          <div>
            <input
              autoFocus
              autocomplete="off"
              value={value}
              id="new-recipe"
              name="new-recipe"
              onChange={onChange}
              placeholder="Enter the name of recipe"
            />
          </div>
          <div>
            <button className="add" onClick={onAdd}>
              <i className="fas fa-check"></i>
            </button>
            <button className="cancel" onClick={onCancel}>
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      </div>
    )
  }
};
