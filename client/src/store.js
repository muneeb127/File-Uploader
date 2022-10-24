// Old createStore implementations

// import { configureStore } from '@reduxjs/toolkit'
// import {createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
// import rootReducer from './redux/reducers/index';

// const initialState = {}

// const middleware = [thunk];
// const store = createStore(
//     rootReducer, 
//     initialState, 
//     compose(
//         applyMiddleware(...middleware),
//         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     )
// );

//New redux toolkit implementation

import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './redux/reducers/index';

// const store = configureStore({ reducer: rootReducer })
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false
    })
})

export default store;




