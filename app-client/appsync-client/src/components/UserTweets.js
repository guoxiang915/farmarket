import React from 'react';
import { graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Div, Container } from './helpers';
import { DeleteTweetMutation } from '../mutations';
import { UserTweetsQuery } from '../queries';

const Tweet = styled.div`
  border-bottom: 1px solid #e6ecf0;
  padding: 15px 15px;
  font-size: 14px;
  line-height: 20px;

  button {
    float: right;
  }
`;

class UserTweets extends React.Component {
  constructor(props) {
    super(props);

    this.deleteTweet = this.deleteTweet.bind(this);
  }

  deleteTweet(tweet) {
    if (window.confirm('Are you sure you want to delete this tweet?')) {
      this.props
        .mutate({
          variables: {
            handle: process.env.REACT_APP_HANDLE,
            tweet_id: tweet.tweet_id,
          },
        })
        .then(() => {
          this.props.data.refetch();
        });
    }
  }

  render() {
    const { data: { loading, error, getUserTwitterFeed } } = this.props;

    if (loading) {
      return (
        <Div>
          <Container>Loading ...</Container>
        </Div>
      );
    }
    if (error) {
      return (
        <Div>
          <Container>{error.message}</Container>
        </Div>
      );
    }

    return (
      <Div>
        <Container>
          {getUserTwitterFeed.tweets.items.map((item, index) => (
            <Tweet key={index}>
              <button onClick={() => this.deleteTweet(item)}>Delete</button>
              {item.tweet}
            </Tweet>
          ))}
        </Container>
      </Div>
    );
  }
}

UserTweets.propTypes = {
  data: PropTypes.any.isRequired, // eslint-disable-line
};

const tweetsQuery = graphql(UserTweetsQuery, {
  options: () => ({
    variables: {
      handle: process.env.REACT_APP_HANDLE,
      consumer_key: process.env.REACT_APP_CONSUMER_KEY,
      consumer_secret: process.env.REACT_APP_SECRET_KEY,
    },
  }),
});

const deleteMutation = graphql(DeleteTweetMutation);

export default compose(tweetsQuery, deleteMutation)(UserTweets);
