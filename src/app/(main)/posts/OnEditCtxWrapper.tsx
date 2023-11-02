'use client';

import { Post } from '@/__generated__/graphql';
import { useDynamicRecord } from '@/app/_hooks/useDynamicRecord';
import { useReducer, useEffect, createContext, useContext, useState, Dispatch, SetStateAction } from 'react';

export const OnEditCtx = createContext({} as {
  onEditCtx: Partial<Post>[]
  setOnEditCtx: (id: string, val: unknown) => void
})

export default function OnEditCtxWrapper({ children }: React.PropsWithChildren) {
  const { map, set, del, fromMaptoArray } = useDynamicRecord<Partial<Post>, Post[keyof Post]>()

  return (
    <OnEditCtx.Provider value={{ onEditCtx: fromMaptoArray(map), setOnEditCtx: set }}>
      {children}
    </OnEditCtx.Provider>
  );
}

export const usePostListCtx = () => useContext(OnEditCtx)