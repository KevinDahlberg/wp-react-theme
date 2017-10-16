import React, { Component } from 'react'
import { Grid, Row, Col, Jumbotron } from 'react-bootstrap'

export default class Header extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <Jumbotron>
              <h1>The OCD Coder</h1>
              <p>Coding, Tutorials, and Rants</p>
            </Jumbotron>
          </Col>
        </Row>
      </Grid>
    )
  }
}
