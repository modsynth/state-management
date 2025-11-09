import { configureStore, Provider, useDispatch, useSelector } from './index';
import type { TypedUseSelectorHook } from './index';

describe('State Management Module', () => {
  describe('Exports', () => {
    it('exports configureStore from Redux Toolkit', () => {
      expect(configureStore).toBeDefined();
      expect(typeof configureStore).toBe('function');
    });

    it('exports Provider from react-redux', () => {
      expect(Provider).toBeDefined();
      // Provider can be either function or object depending on React version
      expect(['object', 'function']).toContain(typeof Provider);
    });

    it('exports useDispatch from react-redux', () => {
      expect(useDispatch).toBeDefined();
      expect(typeof useDispatch).toBe('function');
    });

    it('exports useSelector from react-redux', () => {
      expect(useSelector).toBeDefined();
      expect(typeof useSelector).toBe('function');
    });
  });

  describe('Integration Test', () => {
    it('can create a store with configureStore', () => {
      const store = configureStore({
        reducer: {
          counter: (state = { value: 0 }, action: any) => {
            switch (action.type) {
              case 'INCREMENT':
                return { value: state.value + 1 };
              case 'DECREMENT':
                return { value: state.value - 1 };
              default:
                return state;
            }
          },
        },
      });

      expect(store).toBeDefined();
      expect(store.getState()).toEqual({ counter: { value: 0 } });

      store.dispatch({ type: 'INCREMENT' });
      expect(store.getState()).toEqual({ counter: { value: 1 } });

      store.dispatch({ type: 'INCREMENT' });
      expect(store.getState()).toEqual({ counter: { value: 2 } });

      store.dispatch({ type: 'DECREMENT' });
      expect(store.getState()).toEqual({ counter: { value: 1 } });
    });

    it('works with Redux Toolkit createSlice', async () => {
      const { createSlice } = await import('@reduxjs/toolkit');

      const counterSlice = createSlice({
        name: 'counter',
        initialState: { value: 0 },
        reducers: {
          increment: (state) => {
            state.value += 1;
          },
          decrement: (state) => {
            state.value -= 1;
          },
          incrementByAmount: (state, action) => {
            state.value += action.payload;
          },
        },
      });

      const store = configureStore({
        reducer: {
          counter: counterSlice.reducer,
        },
      });

      expect(store.getState()).toEqual({ counter: { value: 0 } });

      store.dispatch(counterSlice.actions.increment());
      expect(store.getState()).toEqual({ counter: { value: 1 } });

      store.dispatch(counterSlice.actions.incrementByAmount(5));
      expect(store.getState()).toEqual({ counter: { value: 6 } });

      store.dispatch(counterSlice.actions.decrement());
      expect(store.getState()).toEqual({ counter: { value: 5 } });
    });

    it('works with async thunk', async () => {
      const { createSlice, createAsyncThunk } = await import('@reduxjs/toolkit');

      const fetchData = createAsyncThunk('data/fetch', async () => {
        return { data: 'test data' };
      });

      const dataSlice = createSlice({
        name: 'data',
        initialState: {
          value: null as any,
          loading: false,
          error: null as string | null,
        },
        reducers: {},
        extraReducers: (builder) => {
          builder
            .addCase(fetchData.pending, (state) => {
              state.loading = true;
            })
            .addCase(fetchData.fulfilled, (state, action) => {
              state.loading = false;
              state.value = action.payload;
            })
            .addCase(fetchData.rejected, (state, action) => {
              state.loading = false;
              state.error = action.error.message || 'Unknown error';
            });
        },
      });

      const store = configureStore({
        reducer: {
          data: dataSlice.reducer,
        },
      });

      const promise = store.dispatch(fetchData());
      expect(store.getState().data.loading).toBe(true);

      await promise;
      expect(store.getState().data.loading).toBe(false);
      expect(store.getState().data.value).toEqual({ data: 'test data' });
    });
  });

});

