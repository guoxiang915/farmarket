const schema = `
query getUsers {
    user {
        first_name
        last_name
        email
    }
}

type User {
    first_name: String
    last_name: String
    email: String!
    google: String
    facebook: String
    linkedin: String
}

type PlaceLocation {
    latitude: Float
    longitude: Float
}

input PlaceLocationInput {
    latitude: Float
    longitude: Float
}

type BusinessHours {
    start: String
    end: String
    weekday: String
}

input BusinessHoursInput {
    start: String
    end: String
    weekday: String
}

type Place {
    id: ID!
    name: String!
    bio: String
    category: String!
    location: PlaceLocation!
    hours: [BusinessHours!]
}

input PlaceOverviewInput {
    name: String!
    bio: String
    category: String!
    location: PlaceLocationInput!
    containing: Boolean
    otherLocation: PlaceLocationInput
    hours: [BusinessHoursInput!]
    facebookUrl: String
    orderUrl: String
    ownership: Boolean
}

type FarmShareContent {
    item: String!
    start: Float
    end: Float
}

input FarmShareContentInput {
    item: String!
    start: Float
    end: Float
}

input FarmShareType {
    type: String
    contents: [FarmShareContentInput!]
    payPeriod: String
    payment: Float
    payMethod: String
}

input PlaceFarmSharesInput {
    farmShare: [FarmShareType!]
}

type PlaceFarmShares {
    id: ID!
    type: String
    contents: [FarmShareContent!]
    pay_period: String
    payment: Float
    pay_method: String
}

input PlaceFarmInput {
    location: PlaceLocationInput
    hours: [BusinessHoursInput!]
    url: String
    specialities: [String!]
    tags: [String!]
}

type PlaceFarm {
    id: ID!
    location: PlaceLocation
    hours: [BusinessHours!]
    url: String
    specialities: [String!]
    tags: [String!]
}

input PlaceFoodCoOpInput {
    structure: String
    farm: [ID!]
    cost: Float
    size: String
}

type PlaceFoodCoOp {
    id: ID!
    structure: String
    farm: [ID!]
    cost: Float
    size: String
}

input PlaceGroceriesInput {
    farm: [ID!]
}

type PlaceGroceries {
    id: ID!
    farm: [ID!]
}

input PlaceFarmStandInput {
    farm: [ID!]
}

type PlaceFarmStand {
    id: ID!
    farm: [ID!]
}

input PlaceFarmerMarketInput {
    marketType: String
    farm: [ID!]
    structure: String
}

type PlaceFarmerMarket {
    id: ID!
    market_type: String
    farm: [ID!]
    structure: String
}

input AddPlaceInput {
    overview: PlaceOverviewInput!
    farmShares: PlaceFarmSharesInput
    farm: PlaceFarmInput
    foodCoOp: PlaceFoodCoOpInput
    groceries: PlaceGroceriesInput
    farmStand: PlaceFarmStandInput
    farmerMarket: PlaceFarmerMarketInput
}

type AddPlaceResult {
    id: ID!
    name: String
}

type PlaceDetail {
    id: ID!
    name: String!
    bio: String
    category: String!
    location: PlaceLocation!
    containing: Boolean
    other_location: PlaceLocation
    hours: [BusinessHours!]
    facebook_url: String
    order_url: String
    ownership: Boolean
    farmShares: PlaceFarmShares
    farm: PlaceFarm
    foodCoOp: PlaceFoodCoOp
    groceries: PlaceGroceries
    farmStand: PlaceFarmStand
    farmerMarket: PlaceFarmerMarket
}

type Mutation {
    # Create user info is available in dynamo integration
    registerUser(
        first_name: String,
        last_name: String,
        email: String!,
        password: String!
    ): User!

    # Create user info is available in dynamo integration
    registerUserByGoogle(
        first_name: String,
        last_name: String,
        google: String!,
        email: String!
    ): User!

    # Create user info is available in dynamo integration
    registerUserByFacebook(
        first_name: String,
        last_name: String,
        facebook: String!,
        email: String!
    ): User!

    # Create user info is available in dynamo integration
    registerUserByLinkedin(
        first_name: String,
        last_name: String,
        linkedin: String!,
        email: String!
    ): User!

    # Create user info is available in dynamo integration
    login(
        email: String!,
        password: String!
    ): String!

    # Create user info is available in dynamo integration
    loginByGoogle(
        google: String!,
        email: String!
    ): String!

    # Create user info is available in dynamo integration
    loginByFacebook(
        facebook: String!,
        email: String!
    ): String!

    # Create user info is available in dynamo integration
    loginByLinkedin(
        linkedin: String!,
        email: String!
    ): String!

    # Add place
    addPlace(place: AddPlaceInput!): AddPlaceResult!
}

type Query {
    meInfo: User
    searchFarms: User
    searchPlaces(q: String, cat: String, location: PlaceLocationInput): [Place]
    placeDetail(id: ID!): PlaceDetail
}

type Subscription {
    addTweet: String
}

schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
}
`;

// eslint-disable-next-line import/prefer-default-export
export { schema };
