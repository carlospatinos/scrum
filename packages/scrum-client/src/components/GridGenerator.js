import { chunk } from 'lodash';
import * as React from 'react';
import { Col, Row, Container } from 'react-bootstrap';

const GridGenerator = props => {
  const { columns } = props;
  const { children } = props;
  const colWidth = 12 / columns;
  const rows = chunk(React.Children.toArray(children), columns);
  return (
    <Container>
      {rows.map(cols => (
        <Row>
          {cols.map(currentValue => (
            // TODO provide a key to the col
            <Col sm={12} md={6} lg={colWidth}>
              {currentValue}
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  );
};
export default GridGenerator;
