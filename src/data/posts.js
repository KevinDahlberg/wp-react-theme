import fetch from 'isomorphic-fetch'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const REQUEST_SINGLE_POST = 'REQUEST_SINGLE_POST'
export const RECEIVE_SINGLE_POST = 'RECEIVE_SINGLE_POST'

//sets initial state for the App
const initialState = {
  posts: [],
  currentPost: [],
  isFetching: false
}

/**
 * ACTIONS
 */

/**
 * @function requestPosts
 * @desc action that sets isFetching to true
 */
export function requestPosts() {
  return {type: REQUEST_POSTS, isFetching: true}
}

/**
 * @function receivePosts
 * @desc action that sets the posts array and changes isFetching to false
 */
function receivePosts(json) {
  return {type: RECEIVE_POSTS, posts: json, isFetching: false}
}

/**
 * @function requestSinglePost
 * @desc sets currentPost in state to blank
 */

 function requestSinglePost() {
   return {type: REQUEST_SINGLE_POST, currentPost: []}
 }

/**
 * @function receiveSinglePost
 * @desc sets the currentPost
 */
function receiveSinglePost(json) {
  return {type: RECEIVE_SINGLE_POST, currentPost: json}
}

/**
 * ACTION FUNCTIONS
 */

/**
 * @function fetchPostsIfNeeded
 * @desc evaluates shouldFetchPosts and if it comes out as true, fetches posts
 */
export function fetchPostsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState())) {
      return dispatch(fetchPosts())
    }
  }
}

/**
 * @function shouldFetchPosts
 * @desc evaluates whether or not there are posts
 * @return true if there are no posts, false if there are posts
 */
export function shouldFetchPosts(state) {
  const posts = state.postReducer.posts
  if (posts.length === 0 ) {
    return true
  } else {
    return false
  }
}

/**
 * @function fetchPosts
 * @desc fetches posts from the db
 */
export function fetchPosts() {
  const init = {
    method: 'GET'
  }
  return dispatch => {
    dispatch(requestPosts())
    fetch('http://theocdcoder.com/wp-json/wp/v2/posts?_embed=true', init)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(json)))
  }
}

/**
 * @function shouldFetchSinglePosts
 * @desc evaluates whether there are posts (which might not happen after a refresh)
 * if there aren't posts, fetches single post based on post name, then calls fetchposts,
 * if there are, calls filterSinglePost
 */
export function shouldFetchSinglePosts(postName) {
  return (dispatch, getState) => {
    dispatch(requestSinglePost())

    if (shouldFetchPosts(getState())) {
      dispatch(fetchSinglePost(postName))
      dispatch(fetchPosts())
    } else {
    dispatch(filterSinglePost(getState(), postName))
    }
  }
}

/**
 * @function getSinglePost
 * @desc gets a single post from the db
 */
export function fetchSinglePost(postName) {
  const init = {
    method: 'GET'
  }
  const url = 'http://theocdcoder.com/wp-json/wp/v2/posts?slug=' + postName
  return dispatch => {
    fetch(url, init)
    .then(response => response.json())
    .then(json => dispatch(receiveSinglePost(json)))
  }
}

/**
 * @function filterSinglePost
 * @desc filters out a single post the posts in state.postReducer
 */
export function filterSinglePost(state, postName) {
  const posts = state.postReducer.posts
  const singlePost = posts.filter((post) => {return post.slug === postName})
  return dispatch => {
    dispatch(receiveSinglePost(singlePost))
  }
}

/**
 * REDUCER
 */

function postReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_POSTS:
      return state
    case RECEIVE_POSTS:
      return {
        ...state,
        posts: action.posts
      }
    case REQUEST_SINGLE_POST:
      return {
        ...state,
        currentPost: action.currentPost
      }
    case RECEIVE_SINGLE_POST:
      return {
        ...state,
        currentPost: action.currentPost
      }
    default:
      return state
  }
}

export default postReducer
