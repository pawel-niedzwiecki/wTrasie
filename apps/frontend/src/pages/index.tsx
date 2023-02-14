import { Container, Row, Col, Box } from 'design-system';


export function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.styled-components file.
   */
  return (
    <Container>
      <Row>
        <Col xs={12}>
          <Box color='error.dark'>ok</Box>
        </Col>
        <Col xs={6}>6</Col>
        <Col xs={6}>6</Col>
      </Row>
    </Container>
  );
}

export default Index;
