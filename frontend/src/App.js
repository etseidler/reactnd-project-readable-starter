import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCategories } from './actions'
import { getCategories } from './utils/api'
import './App.css'

class App extends Component {
  componentDidMount() {
    getCategories()
      .then(this.props.fetchCategories)
  }
  render() {
    if (!this.props.categories) {
      return null
    }
    return (
      <div>
        {this.props.categories
          .map(cat => (
            <div>{cat.name}</div>
          ))
        }
      </div>
    );
  }
}

function mapStateToProps({ categories }) {
  return {
    categories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: data => dispatch(fetchCategories(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
