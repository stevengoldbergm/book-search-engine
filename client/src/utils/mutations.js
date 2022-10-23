import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
                email
            }
        }
    }
`;

export const CREATE_USER = gql`
    mutation createUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`

export const SAVE_BOOK = gql`
    mutation saveBook($description: String!, $bookId: String!, $title: String!, $image: String, $link: String, $authors: [String]) {
        saveBook(description: $description, bookId: $bookId, title: $title, image: $image, link: $link, authors: $authors) {
            _id
            username
            email
            savedBooks {
                authors
                bookId
                image
                link
                title
                id
            }
        }
    } 
`

export const DELETE_BOOK = gql`
    mutation deleteBook($bookId: String!) {
        deleteBook(bookId: $bookId) {
            _id
            username
            email
            savedBooks {
                id
                authors
                description
                bookId
                image
                link
                title
            }
        }
    }
`