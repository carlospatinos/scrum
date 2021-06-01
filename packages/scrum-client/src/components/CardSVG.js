import React from 'react';
import './CardSVG.css';

const CardSVG = props => {
  const { text, isSelected } = props;
  const className = isSelected ? 'card-selected' : 'card-not-selected';
  const textFontSize = text.length < 3 ? '4em' : '2em';
  const variant = {
    innerRectColor: isSelected ? '#61DAFB' : '#DDDDDD',
  };

  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className}>
      <g>
        <title>background</title>
        <g
          display="none"
          overflow="visible"
          y="0"
          x="0"
          height="100%"
          width="100%"
          id={`canvasGrid-${text}`}
        >
          <rect fill="url(#gridpattern)" strokeWidth="0" y="0" x="0" height="100%" width="100%" />
        </g>
      </g>
      <g>
        <title>upper-layer</title>
        {/* Border of the inner rect */}
        <rect
          rx="20"
          id={`svg_1-${text}`}
          width="99%"
          height="99%"
          y="1"
          x="1"
          strokeWidth="1.5"
          stroke="#000"
          fill="#fff"
        />
        {/* inner rect */}
        <rect
          stroke="#a6a5a4"
          rx="20"
          id={`svg_2-${text}`}
          width="93%"
          height="94%"
          y="5"
          x="4"
          strokeWidth="1.5"
          className="inner-rect"
          fill={variant.innerRectColor}
        />
      </g>
      <path d="M25,5 a1,1 0 0,0 40,0" fill="white" stroke="#a6a5a4" strokeWidth="1.5" />
      <text
        x="50%"
        y="55%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize={textFontSize}
        fontFamily="sans-serif"
      >
        {text}
      </text>
    </svg>
  );
};

export default CardSVG;
