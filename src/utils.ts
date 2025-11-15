import { createAsyncThunk } from '@reduxjs/toolkit';

/**
 * Create async thunk with standard error handling
 */
export function createAppAsyncThunk<Returned, ThunkArg = void>(
  typePrefix: string,
  payloadCreator: (arg: ThunkArg) => Promise<Returned>
) {
  return createAsyncThunk<Returned, ThunkArg>(
    typePrefix,
    async (arg, { rejectWithValue }) => {
      try {
        return await payloadCreator(arg);
      } catch (error) {
        if (error instanceof Error) {
          return rejectWithValue(error.message);
        }
        return rejectWithValue('Unknown error occurred');
      }
    }
  );
}

/**
 * Helper to create common async slice reducers
 */
export function createAsyncReducers<T>(builder: any, thunk: any) {
  return builder
    .addCase(thunk.pending, (state: any) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(thunk.fulfilled, (state: any, action: any) => {
      state.loading = false;
      state.data = action.payload;
    })
    .addCase(thunk.rejected, (state: any, action: any) => {
      state.loading = false;
      state.error = action.payload || action.error.message;
    });
}
