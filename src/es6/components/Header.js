import React from 'react';

import { Grid, Row, Col, PageHeader } from 'react-bootstrap';

const Header = () => (
  <Grid>
    <Row>
      <Col md={6} mdOffset={3} className='header-container'>
        <PageHeader>Roguelike Dungeon Crawler</PageHeader>
      </Col>
    </Row>
  </Grid>
 );

export default Header;
