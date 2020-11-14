import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export enum Breed {
  Persian = 'persian',
  Bengal = 'bengal',
  Siamese = 'siamese'
}

export enum MsgType {
  Error = 'error',
  Success = 'success'
}

export type Cat = {
  __typename?: 'Cat';
  id: Scalars['ID'];
  name: Scalars['String'];
  breed: Breed;
  gifs: Array<CatGif>;
};

export type CatGif = {
  __typename?: 'CatGif';
  id: Scalars['ID'];
  title: Scalars['String'];
  url: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['ID'];
  type: MsgType;
  content: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  cats: Array<Cat>;
  cat?: Maybe<Cat>;
  messages: Array<Message>;
};


export type QueryCatArgs = {
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addCat: CatMutationResponse;
  updateCat: CatMutationResponse;
  deleteCat: CatMutationResponse;
};


export type MutationAddCatArgs = {
  cat: CatInput;
};


export type MutationUpdateCatArgs = {
  id: Scalars['ID'];
  cat: CatInput;
};


export type MutationDeleteCatArgs = {
  id: Scalars['ID'];
};

export type CatMutationResponse = {
  __typename?: 'CatMutationResponse';
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
  cat?: Maybe<Cat>;
};

export type CatInput = {
  name: Scalars['String'];
  breed: Breed;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type CatsQueryVariables = Exact<{ [key: string]: never; }>;


export type CatsQuery = (
  { __typename?: 'Query' }
  & { cats: Array<(
    { __typename?: 'Cat' }
    & Pick<Cat, 'id' | 'name' | 'breed'>
  )> }
);

export type CatQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type CatQuery = (
  { __typename?: 'Query' }
  & { cat?: Maybe<(
    { __typename?: 'Cat' }
    & Pick<Cat, 'id' | 'name' | 'breed'>
    & { gifs: Array<(
      { __typename?: 'CatGif' }
      & GifFragment
    )> }
  )> }
);

export type MessagesQueryVariables = Exact<{ [key: string]: never; }>;


export type MessagesQuery = (
  { __typename?: 'Query' }
  & { messages: Array<(
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'type' | 'content'>
  )> }
);

export type GifFragment = (
  { __typename?: 'CatGif' }
  & Pick<CatGif, 'id'>
  & { label: CatGif['title'], src: CatGif['url'] }
);

export type AddcatMutationVariables = Exact<{
  data: CatInput;
}>;


export type AddcatMutation = (
  { __typename?: 'Mutation' }
  & { addCat: (
    { __typename?: 'CatMutationResponse' }
    & Pick<CatMutationResponse, 'success' | 'message'>
    & { cat?: Maybe<(
      { __typename?: 'Cat' }
      & Pick<Cat, 'id' | 'name' | 'breed'>
    )> }
  ) }
);

export type EditcatMutationVariables = Exact<{
  id: Scalars['ID'];
  data: CatInput;
}>;


export type EditcatMutation = (
  { __typename?: 'Mutation' }
  & { updateCat: (
    { __typename?: 'CatMutationResponse' }
    & Pick<CatMutationResponse, 'success' | 'message'>
    & { cat?: Maybe<(
      { __typename?: 'Cat' }
      & Pick<Cat, 'id' | 'name' | 'breed'>
    )> }
  ) }
);

export type DeletecatMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeletecatMutation = (
  { __typename?: 'Mutation' }
  & { deleteCat: (
    { __typename?: 'CatMutationResponse' }
    & Pick<CatMutationResponse, 'success' | 'message'>
  ) }
);

export const GifFragmentDoc = gql`
    fragment Gif on CatGif {
  id
  label: title
  src: url
}
    `;
export const CatsDocument = gql`
    query CATS {
  cats {
    id
    name
    breed
  }
}
    `;

/**
 * __useCatsQuery__
 *
 * To run a query within a React component, call `useCatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCatsQuery(baseOptions?: Apollo.QueryHookOptions<CatsQuery, CatsQueryVariables>) {
        return Apollo.useQuery<CatsQuery, CatsQueryVariables>(CatsDocument, baseOptions);
      }
export function useCatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CatsQuery, CatsQueryVariables>) {
          return Apollo.useLazyQuery<CatsQuery, CatsQueryVariables>(CatsDocument, baseOptions);
        }
export type CatsQueryHookResult = ReturnType<typeof useCatsQuery>;
export type CatsLazyQueryHookResult = ReturnType<typeof useCatsLazyQuery>;
export type CatsQueryResult = Apollo.QueryResult<CatsQuery, CatsQueryVariables>;
export const CatDocument = gql`
    query CAT($id: ID!) {
  cat(id: $id) {
    id
    name
    breed
    gifs {
      ...Gif
    }
  }
}
    ${GifFragmentDoc}`;

/**
 * __useCatQuery__
 *
 * To run a query within a React component, call `useCatQuery` and pass it any options that fit your needs.
 * When your component renders, `useCatQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCatQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCatQuery(baseOptions?: Apollo.QueryHookOptions<CatQuery, CatQueryVariables>) {
        return Apollo.useQuery<CatQuery, CatQueryVariables>(CatDocument, baseOptions);
      }
export function useCatLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CatQuery, CatQueryVariables>) {
          return Apollo.useLazyQuery<CatQuery, CatQueryVariables>(CatDocument, baseOptions);
        }
export type CatQueryHookResult = ReturnType<typeof useCatQuery>;
export type CatLazyQueryHookResult = ReturnType<typeof useCatLazyQuery>;
export type CatQueryResult = Apollo.QueryResult<CatQuery, CatQueryVariables>;
export const MessagesDocument = gql`
    query MESSAGES {
  messages @client {
    id
    type
    content
  }
}
    `;

/**
 * __useMessagesQuery__
 *
 * To run a query within a React component, call `useMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useMessagesQuery(baseOptions?: Apollo.QueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
        return Apollo.useQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, baseOptions);
      }
export function useMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
          return Apollo.useLazyQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, baseOptions);
        }
export type MessagesQueryHookResult = ReturnType<typeof useMessagesQuery>;
export type MessagesLazyQueryHookResult = ReturnType<typeof useMessagesLazyQuery>;
export type MessagesQueryResult = Apollo.QueryResult<MessagesQuery, MessagesQueryVariables>;
export const AddcatDocument = gql`
    mutation ADDCAT($data: CatInput!) {
  addCat(cat: $data) {
    success
    message
    cat {
      id
      name
      breed
    }
  }
}
    `;
export type AddcatMutationFn = Apollo.MutationFunction<AddcatMutation, AddcatMutationVariables>;

/**
 * __useAddcatMutation__
 *
 * To run a mutation, you first call `useAddcatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddcatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addcatMutation, { data, loading, error }] = useAddcatMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddcatMutation(baseOptions?: Apollo.MutationHookOptions<AddcatMutation, AddcatMutationVariables>) {
        return Apollo.useMutation<AddcatMutation, AddcatMutationVariables>(AddcatDocument, baseOptions);
      }
export type AddcatMutationHookResult = ReturnType<typeof useAddcatMutation>;
export type AddcatMutationResult = Apollo.MutationResult<AddcatMutation>;
export type AddcatMutationOptions = Apollo.BaseMutationOptions<AddcatMutation, AddcatMutationVariables>;
export const EditcatDocument = gql`
    mutation EDITCAT($id: ID!, $data: CatInput!) {
  updateCat(id: $id, cat: $data) {
    success
    message
    cat {
      id
      name
      breed
    }
  }
}
    `;
export type EditcatMutationFn = Apollo.MutationFunction<EditcatMutation, EditcatMutationVariables>;

/**
 * __useEditcatMutation__
 *
 * To run a mutation, you first call `useEditcatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditcatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editcatMutation, { data, loading, error }] = useEditcatMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useEditcatMutation(baseOptions?: Apollo.MutationHookOptions<EditcatMutation, EditcatMutationVariables>) {
        return Apollo.useMutation<EditcatMutation, EditcatMutationVariables>(EditcatDocument, baseOptions);
      }
export type EditcatMutationHookResult = ReturnType<typeof useEditcatMutation>;
export type EditcatMutationResult = Apollo.MutationResult<EditcatMutation>;
export type EditcatMutationOptions = Apollo.BaseMutationOptions<EditcatMutation, EditcatMutationVariables>;
export const DeletecatDocument = gql`
    mutation DELETECAT($id: ID!) {
  deleteCat(id: $id) {
    success
    message
  }
}
    `;
export type DeletecatMutationFn = Apollo.MutationFunction<DeletecatMutation, DeletecatMutationVariables>;

/**
 * __useDeletecatMutation__
 *
 * To run a mutation, you first call `useDeletecatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletecatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletecatMutation, { data, loading, error }] = useDeletecatMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletecatMutation(baseOptions?: Apollo.MutationHookOptions<DeletecatMutation, DeletecatMutationVariables>) {
        return Apollo.useMutation<DeletecatMutation, DeletecatMutationVariables>(DeletecatDocument, baseOptions);
      }
export type DeletecatMutationHookResult = ReturnType<typeof useDeletecatMutation>;
export type DeletecatMutationResult = Apollo.MutationResult<DeletecatMutation>;
export type DeletecatMutationOptions = Apollo.BaseMutationOptions<DeletecatMutation, DeletecatMutationVariables>;

      export interface IntrospectionResultData {
        __schema: {
          types: {
            kind: string;
            name: string;
            possibleTypes: {
              name: string;
            }[];
          }[];
        };
      }
      const result: IntrospectionResultData = {
  "__schema": {
    "types": []
  }
};
      export default result;
    