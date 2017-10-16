import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class PostExcerpt extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  excerptTitle (title) {
    return (
      <Row>
        <h1>{title}</h1>
      </Row>
    )
  }

  excerptSummary (summary) {
    return (
      <Row>
        <div dangerouslySetInnerHTML={{__html: summary}} />
        </Row>
    )
  }

  excerptImage (image) {
    return (
      <img src={image.url} alt={image.alt} />
    )
  }

  excerptLayout (postInfo) {
    if (postInfo.image) {
      return (
        <Row>
          <Col xs={6}>
            {this.excerptImage(postInfo.image)}
          </Col>
          <Col xs={6}>
            {this.excerptTitle(postInfo.title.rendered)}
            {this.excerptSummary(postInfo.excerpt.rendered)}
          </Col>
        </Row>
      )
    } else {
      return (
        <Row>
          <Col xs={12}>
            {this.excerptTitle(postInfo.title.rendered)}
            {this.excerptSummary(postInfo.excerpt.rendered)}
          </Col>
        </Row>
      )
    }
  }

  excerptBox (postInfo) {
    const postPath = '/post/' + postInfo.title.rendered.toLowerCase().toString().replace(/\s/g,'-')
    return (
    <Link to={postPath}>
      <div key={postInfo.id}>
      <Col xs={4}>
        {this.excerptLayout(postInfo)}
      </Col>
      </div>
    </Link>
    )
  }

  handleClick(e) {
    this.props.onItemClick(e.target.value)
  }

  render() {
    return (
      <div className="excerpt-box">
        {this.props.posts.map((post, idx) => {
            return (
              <div key={idx} onClick={this.handleClick} value={post.id}>
              {this.excerptBox(post)}
              </div>
            )
          })
        }
      </div>
    )
  }
}
