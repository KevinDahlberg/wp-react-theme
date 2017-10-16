import React, { Component } from 'react'
import { Col } from 'react-bootstrap'

export default class ViewPost extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  postHeader = (header) => (
    <h1>{header}</h1>
  )

  postContent = (content) => (
    <Col xs={12}>
    <div dangerouslySetInnerHTML={{__html: content}} />
    </Col>
  )

  postLayout = (post, idx) => (
    <Col xs={12} key={idx}>
    {this.postHeader(post.title.rendered)}
    {this.postContent(post.content.rendered)}
    </Col>
  )

  displayPosts = (postArray) => (
    postArray.map(this.postLayout)
  )

  render() {
    return (
      <Col xs={12}>
      {this.displayPosts(this.props.posts)}
      </Col>
    )
  }
}
