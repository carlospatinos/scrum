import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import { Container } from 'react-bootstrap';
import './VotingCards.css';

export default function Cards() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
    const cardDeck = [8, 5, 13, 9, 12];
    d3.selectAll('p').style('color', 'blue');
    d3.select('#myDiv').style('background-color', 'red');
    const allSVG = d3.selectAll('svg');
    console.log(allSVG.nodes.length);
    cardDeck.forEach(val => {
      console.log(val);
    });
    allSVG
      .append('text')
      .attr('dominant-baseline', 'middle')
      .attr('font-size', '2em')
      .attr('font-family', 'sans-serif')
      .style('text-anchor', 'middle')
      .attr('x', '50%')
      .attr('y', '50%')
      .text('2');
  });

  return (
    <Container className="Cards">
      <svg
        width="43.65625mm"
        height="70.114586mm"
        viewBox="0 0 43.65625 70.114586"
        version="1.1"
        id="svg1479"
      >
        <g id="layer1" transform="translate(-45.451637,-56.323658)">
          <image
            y="56.323658"
            x="45.451637"
            id="image2032"
            xlinkHref="data:image/png;base64,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
"
            preserveAspectRatio="none"
            height="70.114586"
            width="43.65625"
          />
        </g>
      </svg>
      <svg
        width="43.65625mm"
        height="70.114586mm"
        viewBox="0 0 43.65625 70.114586"
        version="1.1"
        id="svg1479"
      >
        <g id="layer1" transform="translate(-45.451637,-56.323658)">
          <image
            y="56.323658"
            x="45.451637"
            id="image2032"
            xlinkHref="data:image/png;base64,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
"
            preserveAspectRatio="none"
            height="70.114586"
            width="43.65625"
          />
        </g>
      </svg>
      <br />
      <br />
      <p>Welcome test</p>
      <div id="myDiv" />
      <div id="myDiv2" />
      <div>
        <p>You clicked {count} times</p>
        <button type="button" onClick={() => setCount(count + 1)}>
          Click me
        </button>
      </div>
      <br />
      <br />
      <br />
    </Container>
  );
}
