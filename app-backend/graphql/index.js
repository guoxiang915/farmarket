const schema = `
scalar Upload

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

type RegisterResult {
    email: String!
    token: String!
}

type GetUserInfo {
    id: ID!
    email: String!
    first_name: String
    last_name: String
    places: [Place!]
}

type PlaceLocation {
    latitude: Float
    longitude: Float
}

input PlaceLocationInput {
    latitude: Float
    longitude: Float
}

type BusinessHour {
    start: String
    end: String
    weekday: String
}

type BusinessHours {
    status: String
    hours: [BusinessHour!]
}

input BusinessHourInput {
    start: String
    end: String
    weekday: String
}

input BusinessHoursInput {
    status: String
    hours: [BusinessHourInput!]
}

type Place {
    place_id: ID!
    name: String!
    bio: String
    category: String!
    location: PlaceLocation!
    hours: BusinessHours
}

input PlaceOverviewInput {
    name: String!
    bio: String
    category: String!
    location: PlaceLocationInput!
    containing: Boolean
    otherLocation: PlaceLocationInput
    hours: BusinessHoursInput
    facebookUrl: String
    orderUrl: String
    ownership: Boolean
    photos: [String!]
    services: [String!]
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
    id: ID
    type: String
    contents: [FarmShareContentInput!]
    payPeriod: String
    payment: Float
    payMethod: String
}

type PlaceFarmShare {
    id: ID!
    type: String
    contents: [FarmShareContent!]
    pay_period: String
    payment: Float
    pay_method: String
}

input PlaceFarmInput {
    id: ID
    location: PlaceLocationInput
    hours: BusinessHoursInput
    url: String
    specialities: [String!]
    tags: [String!]
    farmShare: [FarmShareType!]
}

type PlaceFarm {
    id: ID!
    location: PlaceLocation
    hours: BusinessHours
    url: String
    specialities: [String!]
    tags: [String!]
    farmShare: [PlaceFarmShare!]
}

input PlaceFoodCoOpInput {
    id: ID
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
    id: ID
    farm: [ID!]
}

type PlaceGroceries {
    id: ID!
    farm: [ID!]
}

input PlaceFarmStandInput {
    id: ID
    farm: [ID!]
}

type PlaceFarmStand {
    id: ID!
    farm: [ID!]
}

input PlaceFarmerMarketInput {
    id: ID
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
    place_id: ID
    overview: PlaceOverviewInput!
    farm: PlaceFarmInput
    foodCoOp: PlaceFoodCoOpInput
    groceries: PlaceGroceriesInput
    farmStand: PlaceFarmStandInput
    farmerMarket: PlaceFarmerMarketInput
}

type AddPlaceResult {
    place_id: ID!
    name: String
}

type PlaceDetail {
    place_id: ID!
    name: String!
    bio: String
    category: String!
    location: PlaceLocation!
    containing: Boolean
    other_location: PlaceLocation
    hours: BusinessHours
    facebook_url: String
    order_url: String
    creator_id: String
    owner_id: String
    photos: [String!]
    services: String
    farm: PlaceFarm
    foodCoOp: PlaceFoodCoOp
    groceries: PlaceGroceries
    farmStand: PlaceFarmStand
    farmerMarket: PlaceFarmerMarket
    associates: String
}

input FileInput {
    name: String!
}

type Mutation {
    registerUser(
        first_name: String,
        last_name: String,
        email: String!,
        password: String,
        google_id: String,
        token_id: String,
        facebook_id: String,
    ): RegisterResult!
    
    login(
        email: String!,
        password: String,
        google_id: String,
        token_id: String,
        facebook_id: String,
    ): String!

    addPlace(place: AddPlaceInput!): AddPlaceResult!

    updatePlace(place: AddPlaceInput!): AddPlaceResult!
}

type Query {
    meInfo: GetUserInfo
    searchPlaces(q: String, cat: String, rating: String, hour: String, location: PlaceLocationInput): [Place]
    placeDetail(id: ID!): PlaceDetail
    getUploadFileUrl(file: FileInput!): String!
    getUploadFilesUrl(files: [FileInput!]): [String!]
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
