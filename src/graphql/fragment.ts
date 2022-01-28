import { gql } from "@apollo/client";

// TODO: batch update

export const BATCH_DELETE_FRAGMENT = gql`
  fragment BatchDeleteFragment on BatchDeleteModel {
    ok
    n
    deletedCount
    ids
  }
`

