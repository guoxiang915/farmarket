const schema = `
type Mutation {
	# Create a tweet for a user
	# consumer keys and tokens are not required for dynamo integration
	createTweet(
		tweet: String!,
		consumer_key: String,
		consumer_secret: String,
		access_token_key: String,
		access_token_secret: String,
		created_at: String!
	): Tweet!

	# Delete User Tweet
	deleteTweet(
	    tweet_id: String!,
	    consumer_key: String,
        consumer_secret: String,
        access_token_key: String,
        access_token_secret: String
    ): Tweet!

	# Retweet existing Tweet
	reTweet(
	    tweet_id: String!,
	    consumer_key: String,
        consumer_secret: String,
        access_token_key: String,
        access_token_secret: String
    ): Tweet!

	# Update existing Tweet
	updateTweet(tweet_id: String!, tweet: String!): Tweet!

    # Create user info is available in dynamo integration
	updateUserInfo(
		location: String!,
		description: String!,
		name: String!,
		followers_count: Int!,
		friends_count: Int!,
		favourites_count: Int!,
		following: [String!]!
	): User!
}

type Query {
	meInfo(consumer_key: String, consumer_secret: String): User!
	getUserInfo(handle: String!, consumer_key: String, consumer_secret: String): User!

	# search functionality is available in elasticsearch integration
	searchAllTweetsByKeyword(keyword: String!): TweetConnection
}

type Subscription {
	addTweet: Tweet
		@aws_subscribe(mutations: ["createTweet"])
}

type Tweet {
	tweet_id: String!
	tweet: String!
	retweeted: Boolean
	retweet_count: Int
	favorited: Boolean
	created_at: String!
}

type TweetConnection {
	items: [Tweet!]!
	nextToken: String
}

type User {
	name: String!
	handle: String!
	location: String!
	description: String!
	followers_count: Int!
	friends_count: Int!
	favourites_count: Int!
	following: [String!]!
	topTweet: Tweet
	tweets(limit: Int, nextToken: String): TweetConnection

	# search functionality is available in elasticsearch integration
    searchTweetsByKeyword(keyword: String!): TweetConnection
}

schema {
	query: Query
	mutation: Mutation
	subscription: Subscription
}`;

// eslint-disable-next-line import/prefer-default-export
export { schema };
