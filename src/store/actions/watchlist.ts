import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk'
import Coin from '../../models/Coin'
import cmpData from '../../data/CoinMarketCapData'
import { WatchlistState } from '../reducers/watchlist';

export const SET_WATCHLIST_DATA = 'SET_WATCHLIST_DATA'

export const fecthCoinData = () => {
    console.log("in fecthCoinData");

    return async (dispatch: ThunkDispatch<WatchlistState, void, Action>) => {
        const coins = ['BTC', 'ETH', 'XRP', 'DOGE', 'SHIB', 'MANA']

        try {

            const cryptoResponse = await fetch(
                `https://min-api.cryptocompare.com/data/pricemultifull?tsyms=USD&relaxedValidation=true&fsyms=${coins.join()}`
            )

            const cryptoResponseData = await cryptoResponse.json()
            const coinsData: Coin[] = []


            coins.forEach(coin => {
                const coinDetails = cryptoResponseData.RAW[coin].USD
                const cmpDetails = cmpData.data.find(cmp => coinDetails.FROMSYMBOL === cmp.symbol);
                const coinID = cmpDetails?.id ?? 0;
                const coinName = cmpDetails?.name ?? 'N/A'

                coinsData.push(
                    new Coin(
                        coinID,
                        coinName,
                        coin,
                        coinDetails.PRICE,
                        coinDetails.CHANGEPCT24HOUR
                    )
                );
            })

            // console.log("coinsData: ", coinsData)

            dispatch({
                type: SET_WATCHLIST_DATA,
                coinData: coinsData
            })

        } catch (error) {
            console.log("error: ", error)
        }

    }
}


export const updateCoinData = (newData: Coin[]) => {
    return async (dispatch: ThunkDispatch<WatchlistState, void, Action>) => {
        dispatch({
            type: SET_WATCHLIST_DATA,
            coinData: newData
        })
    }
}