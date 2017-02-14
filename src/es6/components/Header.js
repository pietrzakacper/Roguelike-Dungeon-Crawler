import React from 'react';

import { Row, Col, PageHeader } from 'react-bootstrap';

const Header = () => (
  <Row>
    <Col md={6} mdOffset={3} className='header-container'>
      <PageHeader>Roguelike Dungeon Crawler</PageHeader>
    </Col>
  </Row>
 );

export default Header;
