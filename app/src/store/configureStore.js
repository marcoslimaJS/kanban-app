import { combineReducers, configureStore } from '@reduxjs/toolkit';
import sidebar from './sidebar';

const reducer = combineReducers({ sidebar });

const store = configureStore({ reducer });

export default store;
