import fetch from 'isomorphic-fetch'
import { fetchPosts } from './posts'

const REQUEST_SINGLE_PAGE = 'REQUEST_SINGLE_PAGE'
const RECEIVE_SINGLE_PAGE = 'RECEIVE_SINGLE_PAGE'


const initialState = {
  currentPage: []
}

/** ACTIONS **/
//right now, there's only actions for a single page, for a more complete theme, multiple pages (listed in a nav widget) need to be taken into consideration.

function requestSinglePage(){
  return {type: REQUEST_SINGLE_PAGE}
}

function receiveSinglePage(json){
  return {type: RECEIVE_SINGLE_PAGE, currentPage: json}
}

function shouldFetchPages(state, pageName) {
  //this variable will get changed when multiple pages are taken into consideration
  const page = state.pageReducer.currentPage
  if (page.length !== 0 && page[0].slug === pageName) {
    return false
  } else {
    return true
  }
}

export function shouldFetchSinglePage(pageName) {
  return (dispatch, getState) => {
    dispatch(requestSinglePage())

    if (shouldFetchPages(getState(), pageName)) {
      dispatch(fetchSinglePage(pageName))
      dispatch(fetchPosts())
    } else {
      return
    }
  }
}

function fetchSinglePage(pageName) {
  const init = {
    method: 'GET'
  }
  const url = 'http://theocdcoder.com/wp-json/wp/v2/pages?slug=' + pageName
  return dispatch => {
    fetch(url, init)
    .then(response => response.json())
    .then(json => dispatch(receiveSinglePage(json)))
  }
}

/** REDUCER **/

function pageReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_SINGLE_PAGE:
      return state
    case RECEIVE_SINGLE_PAGE:
      return {
        ...state,
        currentPage: action.currentPage
      }
    default:
      return state
  }
}

export default pageReducer
