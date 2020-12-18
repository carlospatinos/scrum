import React from 'react';

const ClickableCard = props => {
  const { clickableFunction } = props;
  const { keyboardFunction } = props;
  const { image } = props;
  return (
    <div
      onClick={clickableFunction}
      role="button"
      tabIndex={0}
      onKeyDown={keyboardFunction}
      style={{ display: 'inline-block' }}
    >
      <img src={image} alt="Card" width="100" id="one" />
    </div>
  );
};

export default ClickableCard;
