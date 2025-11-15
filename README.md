# State Management

[![npm version](https://badge.fury.io/js/%40modsynth%2Fstate-management.svg)](https://www.npmjs.com/package/@modsynth/state-management)
[![npm downloads](https://img.shields.io/npm/dm/@modsynth/state-management.svg)](https://www.npmjs.com/package/@modsynth/state-management)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Redux Toolkit state management module

Part of the [Modsynth](https://github.com/modsynth) ecosystem.

## Features

- Redux Toolkit integration
- Type-safe hooks
- Store configuration
- ✨ **Typed Hooks Factory**: `createTypedHooks()` (v0.2.0)
- ✨ **Async Thunk Helpers**: `createAppAsyncThunk()` (v0.2.0)
- ✨ **Reducer Helpers**: `createAsyncReducers()` (v0.2.0)

## What's New in v0.2.0

- **Type-Safe Hooks**: `createTypedHooks<RootState, AppDispatch>()` factory
- **Async Thunk Helpers**: Automatic error handling with `createAppAsyncThunk()`
- **Reducer Helpers**: Simplified async reducers

## Installation

```bash
npm install @modsynth/state-management @reduxjs/toolkit react-redux
```

## Version

Current version: `v0.2.0`

## License

MIT
