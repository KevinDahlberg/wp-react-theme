import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Grid, Col } from 'react-bootstrap'

import { shouldFetchSinglePosts } from '../data/posts'

import ViewPost from '../components/post/ViewPost'

class Post extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentPost: []
    }
  }

  componentDidMount(){
    const { shouldFetchSinglePosts } = this.props
    const currentPostTitle = this.props.match.params.title
    console.log('current poast title ', currentPostTitle);
    shouldFetchSinglePosts(currentPostTitle)
  }

  render() {
    if (this.props.currentPost.length === 0) {
      return (
        <Grid>
          <div>
            <Col xs={12} className="placeholder" />
          </div>
        </Grid>
      )
    } else {
      return (
        <Grid>
          <div>
            <ViewPost posts={this.props.currentPost} />
          </div>
        </Grid>
      )
    }
  }
}
const mapStateToProps = state => ({
  currentPost: state.postReducer.currentPost
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({shouldFetchSinglePosts}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
