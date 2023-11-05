/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type BatchDeleteModel = {
  __typename?: 'BatchDeleteModel';
  deletedCount?: Maybe<Scalars['Float']['output']>;
  ids: Array<Scalars['ID']['output']>;
  n?: Maybe<Scalars['Float']['output']>;
  ok?: Maybe<Scalars['Float']['output']>;
};

export type ChangePasswordInput = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};

export type CreatePostInput = {
  content: Scalars['String']['input'];
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  lastModifiedDate: Scalars['DateTime']['input'];
  posterUrl: Scalars['String']['input'];
  summary: Scalars['String']['input'];
  tags: Array<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type CreatePostStatisticsInput = {
  postId: Scalars['String']['input'];
  postName: Scalars['String']['input'];
  scenes: Scalars['String']['input'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: UserModel;
  createPost: Post;
  createPostStatistics: PostStatisticsModel;
  deletePostById: Post;
  deletePosts: BatchDeleteModel;
  getTopLikePosts: Post;
  getTopPVPosts: Post;
  register: UserModel;
  updateLike: Post;
  updatePV: Post;
  updatePostById: Post;
  updatePostsByIds: Array<Post>;
};


export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationCreatePostStatisticsArgs = {
  input: CreatePostStatisticsInput;
};


export type MutationDeletePostByIdArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeletePostsArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type MutationGetTopLikePostsArgs = {
  limit: Scalars['Int']['input'];
};


export type MutationGetTopPvPostsArgs = {
  limit: Scalars['Int']['input'];
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationUpdateLikeArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdatePvArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdatePostByIdArgs = {
  input: UpdatePostInput;
};


export type MutationUpdatePostsByIdsArgs = {
  input: UpdatePostsInput;
};

export type PaginationInput = {
  page: Scalars['Float']['input'];
  pageSize: Scalars['Float']['input'];
  tag?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Post = {
  __typename?: 'Post';
  _id: Scalars['ID']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  isPublic: Scalars['Boolean']['output'];
  lastModifiedDate: Scalars['DateTime']['output'];
  like: Scalars['Int']['output'];
  next?: Maybe<Post>;
  posterUrl: Scalars['String']['output'];
  prev?: Maybe<Post>;
  pv: Scalars['Int']['output'];
  summary: Scalars['String']['output'];
  tags: Array<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type PostStatisticsGroupItemModel = {
  __typename?: 'PostStatisticsGroupItemModel';
  operatedAt: Scalars['DateTime']['output'];
  postId: Scalars['String']['output'];
  postName: Scalars['String']['output'];
  scenes: Scalars['String']['output'];
};

export type PostStatisticsGroupModel = {
  __typename?: 'PostStatisticsGroupModel';
  _id: Scalars['String']['output'];
  count: Scalars['Float']['output'];
  items: Array<PostStatisticsGroupItemModel>;
};

export type PostStatisticsModel = {
  __typename?: 'PostStatisticsModel';
  _id: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  postId: Scalars['String']['output'];
  postName: Scalars['String']['output'];
  scenes: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Posts = {
  __typename?: 'Posts';
  items: Array<Post>;
  page: Scalars['Float']['output'];
  pageSize: Scalars['Float']['output'];
  total: Scalars['ID']['output'];
};

export type Query = {
  __typename?: 'Query';
  getAllTags: Tags;
  getPostById: Post;
  getPostStatistics: Array<PostStatisticsGroupModel>;
  getPosts: Posts;
  login: UserModel;
  posts: Posts;
};


export type QueryGetPostByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetPostsArgs = {
  input: PaginationInput;
};


export type QueryLoginArgs = {
  input: LoginInput;
};


export type QueryPostsArgs = {
  input: PaginationInput;
};

export type RegisterInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Tags = {
  __typename?: 'Tags';
  tags: Array<Scalars['String']['output']>;
};

export type UpdatePostInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  lastModifiedDate?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['Float']['input']>;
  posterUrl?: InputMaybe<Scalars['String']['input']>;
  pv?: InputMaybe<Scalars['Float']['input']>;
  summary?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePostsInput = {
  posts: Array<UpdatePostInput>;
};

export type UserModel = {
  __typename?: 'UserModel';
  _id: Scalars['ID']['output'];
  access_token: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  password: Scalars['String']['output'];
  role: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export type GetPostByIdQueryVariables = Exact<{
  input: Scalars['ID']['input'];
}>;


export type GetPostByIdQuery = { __typename?: 'Query', getPostById: { __typename?: 'Post', _id: string, title: string, summary: string, tags: Array<string>, content: string, posterUrl: string, createdAt: any, updatedAt: any, isPublic: boolean, prev?: { __typename?: 'Post', title: string, _id: string } | null } };

export type UpdatePostByIdMutationVariables = Exact<{
  input: UpdatePostInput;
}>;


export type UpdatePostByIdMutation = { __typename?: 'Mutation', updatePostById: { __typename?: 'Post', _id: string, title: string, summary: string, tags: Array<string>, content: string, posterUrl: string, createdAt: any, updatedAt: any, lastModifiedDate: any, isPublic: boolean, like: number, pv: number, prev?: { __typename?: 'Post', title: string, _id: string } | null } };

export type GetPostsQueryVariables = Exact<{
  input: PaginationInput;
}>;


export type GetPostsQuery = { __typename?: 'Query', getPosts: { __typename?: 'Posts', total: string, page: number, pageSize: number, items: Array<{ __typename?: 'Post', _id: string, posterUrl: string, title: string, summary: string, content: string, tags: Array<string>, lastModifiedDate: any, isPublic: boolean, createdAt: any, updatedAt: any, prev?: { __typename?: 'Post', _id: string } | null, next?: { __typename?: 'Post', _id: string } | null }> } };

export type UpdatePostsByIdsMutationVariables = Exact<{
  input: UpdatePostsInput;
}>;


export type UpdatePostsByIdsMutation = { __typename?: 'Mutation', updatePostsByIds: Array<{ __typename?: 'Post', _id: string, title: string, summary: string, tags: Array<string>, content: string, posterUrl: string, createdAt: any, updatedAt: any, lastModifiedDate: any, isPublic: boolean, like: number, pv: number, prev?: { __typename?: 'Post', title: string, _id: string } | null }> };

export type PostsQueryVariables = Exact<{
  input: PaginationInput;
}>;


export type PostsQuery = { __typename?: 'Query', posts: { __typename?: 'Posts', total: string, page: number, pageSize: number, items: Array<{ __typename?: 'Post', _id: string, posterUrl: string, title: string, summary: string, content: string, tags: Array<string>, lastModifiedDate: any, isPublic: boolean, createdAt: any, updatedAt: any, prev?: { __typename?: 'Post', _id: string } | null, next?: { __typename?: 'Post', _id: string } | null }> } };


export const GetPostByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPostById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPostById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"posterUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"prev"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]}}]} as unknown as DocumentNode<GetPostByIdQuery, GetPostByIdQueryVariables>;
export const UpdatePostByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePostById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePostInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePostById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"posterUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastModifiedDate"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"like"}},{"kind":"Field","name":{"kind":"Name","value":"pv"}},{"kind":"Field","name":{"kind":"Name","value":"prev"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdatePostByIdMutation, UpdatePostByIdMutationVariables>;
export const GetPostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPosts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPosts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"posterUrl"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"lastModifiedDate"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"prev"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"next"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetPostsQuery, GetPostsQueryVariables>;
export const UpdatePostsByIdsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePostsByIds"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePostsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePostsByIds"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"posterUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastModifiedDate"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"like"}},{"kind":"Field","name":{"kind":"Name","value":"pv"}},{"kind":"Field","name":{"kind":"Name","value":"prev"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdatePostsByIdsMutation, UpdatePostsByIdsMutationVariables>;
export const PostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Posts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"posts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"posterUrl"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"lastModifiedDate"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"prev"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"next"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PostsQuery, PostsQueryVariables>;