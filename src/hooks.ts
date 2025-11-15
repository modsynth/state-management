import { useDispatch as useReduxDispatch, useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';
import type { Dispatch, UnknownAction } from '@reduxjs/toolkit';

/**
 * Type-safe hooks factory
 */
export function createTypedHooks<RootState, AppDispatch extends Dispatch<UnknownAction> = Dispatch<UnknownAction>>() {
  const useAppDispatch = () => useReduxDispatch<AppDispatch>();
  const useAppSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

  return {
    useAppDispatch,
    useAppSelector,
  };
}
