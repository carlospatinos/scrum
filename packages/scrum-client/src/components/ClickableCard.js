import React from 'react';
import CardSVG from './CardSVG';

const ClickableCard = props => {
  const { clickableFunction, keyboardFunction, text, id, isSelected } = props;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => clickableFunction({ target: { id } })}
      onKeyDown={() => keyboardFunction({ target: { id } })}
      className="card"
      id={id}
    >
      <object style={{ width: '110%', padding: 0, border: 0 }} className="card">
        <CardSVG text={text} isSelected={isSelected} />
      </object>
    </div>
  );
};

export default ClickableCard;
