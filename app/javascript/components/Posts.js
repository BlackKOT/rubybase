import React from "react"
import PropTypes from "prop-types"
class Posts extends React.Component {

  constructor(props) {
    super(props);
    this.state = {posts : null};
  }

  componentDidMount() {
    $.get('/posts.json').done(function(res) {
      this.setState({posts: res});
    }.bind(this));
  }

  render () {
    if (!this.state.posts) {
      return <div>Loading...</div>;
    }

    return (
      <ul>
        <React.Fragment>
          {/*Greeting: {this.props.greeting}*/}
          {this.state.posts.map(function(post, i) {
            return <li key={'post' + i}><a href={post.path}>{post.name}</a></li>
          })}
        </React.Fragment>
      </ul>
    );
  }
}

Posts.propTypes = {
  greeting: PropTypes.string
};
export default Posts



