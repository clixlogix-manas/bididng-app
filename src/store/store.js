import {createStore, compose, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import reducers from '../redux/reducers/rootReducer';
import rootSaga from '../middleware/Saga/rootSaga';
import AsyncStorage from '@react-native-community/async-storage';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  timeout: 0,
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = persistReducer(persistConfig, reducers);

export const store = createStore(
  rootReducer,
  compose(applyMiddleware(sagaMiddleware)),
);

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
