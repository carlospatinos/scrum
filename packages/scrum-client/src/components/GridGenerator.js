import { chunk } from 'lodash';
import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';
// TODO remove this
const GridGenerator = props => {
  const { columns } = props;
  const { children } = props;
  const colWidth = 12 / columns;
  const rows = chunk(React.Children.toArray(children), columns);
  return (
    <Container>
      {rows.map((cols, index) => {
        const key = `col-${index}`;
        return (
          <Row key={key}>
            {cols.map(clickableCard => (
              <Col key={clickableCard.props.id} sm={2} md={6} lg={colWidth}>
                {clickableCard}
              </Col>
            ))}
          </Row>
        );
      })}
    </Container>
  );
};
export default GridGenerator;
