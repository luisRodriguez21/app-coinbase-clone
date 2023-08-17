import ReduxThunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import watchlistReducer from './src/store/reducers/watchlist';
import topmoversReducer from './src/store/reducers/topmovers';
import newsReducer from './src/store/reducers/news';
import AppNavigation from './src/navigation/AppNavigation';

const rootReducer = combineReducers({
  watchlist: watchlistReducer,
  topmovers: topmoversReducer,
  news: newsReducer
})

const store =  createStore(rootReducer, applyMiddleware(ReduxThunk))


export default function App() {
  return (
     <Provider store={store}>
			<AppNavigation />
		</Provider>
  );
}

