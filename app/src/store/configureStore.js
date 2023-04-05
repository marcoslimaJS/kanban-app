import { combineReducers, configureStore } from '@reduxjs/toolkit';
import sidebar from './sidebar';
import auth from './auth/auth';
import boards from './board/boards';

const reducer = combineReducers({ sidebar, auth, boards });

const store = configureStore({ reducer });

export default store;
