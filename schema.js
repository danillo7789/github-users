const axios = require('axios');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLSchema,  
} = require('graphql');

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        login: {type: GraphQLString},
        id: {type: GraphQLInt},
        name: {type: GraphQLString},
        followers: {type: GraphQLInt},
        location: {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return axios.get('https://api.github.com/users', {
                    headers: {"Accept-Encoding": "gzip, deflate, compress"}
                }).then(res => res.data)
            }
        },

        user: {
            type: UserType,
            args: {
               login: {type: GraphQLString}
            },
            resolve(parent, args) {
                return axios.get(`https://api.github.com/users/${args.login}`, {
                    headers: {"Accept-Encoding": "gzip, deflate, compress"}
                }).then(res => res.data)
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});