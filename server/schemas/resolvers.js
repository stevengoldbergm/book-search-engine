const { AuthenticationError } = require('apollo-server-express');

const { User } = require('../models');
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            // Check context (AuthMiddleware) to see if there is a user logged in
            if(context.user) {
                const data = await User
                    .findOne({ _id: context.user._id })
                    .select(" -password ");
                return data;
            }
            throw new AuthenticationError("Not Logged In");
        },
    },

    
    Mutation: {

        createUser: async ( parent, args ) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },

        login: async ( parent, args) => {
            const user = await User.findOne({ 
                $or: [
                    { username: args.username }, 
                    { email: args.email }
                ] 
            });

            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(args.password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect Password');
            }

            const token = signToken(user);

            return {token, user};
        },

        saveBook: async (parent, { body }, context) => {
            return await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: body } },
                { new: true, runValidators: true }
            );
        },

        deleteBook: async ( parent, args, context ) => {
            return await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId: args.bookId } } },
                { new: true }
              );
        },
    },
};

module.exports = resolvers;