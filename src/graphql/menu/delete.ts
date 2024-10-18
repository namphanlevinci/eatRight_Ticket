import { gql } from '@apollo/client';

export const DELETE_MENU = gql`
    mutation ($id: Int!) {
        merchentDeleteMenu(id: $id)
    }
`;
