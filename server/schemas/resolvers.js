const { AuthenticationError } = require('apollo-server-express');

const { User } = require('../models');
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        getUser: async ( parent, { user = null, args } ) => {
            return await User.findOne({
                $or: [
                    { _id: user ? user._id : args.id }, 
                    { username: args.username }
                ],
              });
        },
    },

    
    Mutations: {
        
        createUser: async ( parent, { body } ) => {
            const user = await User.create(body);
            const token = signToken(user);
            return { token, user };
        },

        login: async ( parent, { body }) => {
            const user = await User.findOne({ 
                $or: [
                    { username: body.username }, 
                    { email: body.email }
                ] 
            });

            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(body.password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect Password');
            }

            const token = signToken(user);

            return {token, user};
        },

        saveBook: async (parent, { user, body }) => {
            return await User.findOneAndUpdate(
                { _id: user._id },
                { $addToSet: { savedBooks: body } },
                { new: true, runValidators: true }
            );
        },

        deleteBook: async ( parent, {user, args} ) => {
            return await User.findOneAndUpdate(
                { _id: user._id },
                { $pull: { savedBooks: { bookId: params.bookId } } },
                { new: true }
              );
        },
    },
};

module.exports = resolvers;