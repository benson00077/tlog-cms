'use client';

import { UpdatePostInput, UpdatePostsInput } from '@/__generated__/graphql';
import { useDynamicRecord } from '@/app/_hooks/useDynamicRecord';
import { createContext, useContext } from 'react';

export const OnEditCtx = createContext({} as {
  // onEditCtx: Partial<Post>[]
  onEditCtx: UpdatePostsInput
  setOnEditCtx: (id: string, val: unknown) => void
})

export default function OnEditCtxWrapper({ children }: React.PropsWithChildren) {
  const { map, set, del, fromMaptoArray } = useDynamicRecord<UpdatePostInput, UpdatePostInput[keyof UpdatePostInput]>()

  return (
    <OnEditCtx.Provider value={{ onEditCtx: { posts: fromMaptoArray(map) }, setOnEditCtx: set }}>
      {children}
    </OnEditCtx.Provider>
  );
}

export const usePostListCtx = () => useContext(OnEditCtx)