import { useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import CCButton from '../components/CBButton';
import { StackNavigationProp } from '@react-navigation/stack';

import { WatchlistState } from '../store/reducers/watchlist';
import { TopmoversState } from '../store/reducers/topmovers';
import { NewsState } from '../store/reducers/news';

import * as watchlistActions from '../store/actions/watchlist';
import * as topmoversActions from '../store/actions/topmovers';
import * as newsActions from '../store/actions/news';
import { RootStackParamList } from '../navigation/AppNavigation';

import Colors from '../constants/Colors';
import Watchlist from '../components/Watchlist'
import TopMoversList from '../components/TopMoversList';
import NewsList from '../components/NewsList';

interface RootState {
    watchlist: WatchlistState
    topmovers: TopmoversState
    news: NewsState
}

// para recibir como props navigation
type HomeScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'HomeScreen'
>;

type Props = {
    navigation: HomeScreenNavigationProp;
};

export default function Home({ navigation }: Props) {
    const dispatch = useDispatch()

    const watchlistData = useSelector(
        (state: RootState) => state.watchlist.watchlistData
    )

    const topMoversData = useSelector(
        (state: RootState) => state.topmovers.topMoversData
    )

    const newsData = useSelector(
        (state: RootState) => state.news.newsData
    )

    console.log("newsData: ", newsData);



    const loadData = () => {
        try {
            dispatch(watchlistActions.fecthCoinData()) // cambiar a reduxjs 
            dispatch(topmoversActions.fetchTopMoversData())
            dispatch(newsActions.fetchNewsData())
        } catch (error) {
            console.log("error: ", error);
        }
    }

    const viewMoreHandler = () => {
        navigation.navigate('News');
    }


    useEffect(() => {
        loadData()
    }, [])


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={{ alignItems: 'center' }}
            >
                <Image
                    style={styles.image}
                    source={{ uri: 'https://i.imgur.com/9EEaSaS.png' }}
                />

                <Text style={styles.title} >Welcome to Coinbase!!</Text>
                <Text style={styles.subtitle} >Make your first investment today</Text>

                <CCButton title="Get started" />


                <Watchlist coinData={watchlistData} />

                <TopMoversList coinData={topMoversData} />

                <NewsList newsData={newsData} isHomeScreen={true} viewMoreHandler={viewMoreHandler} />

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#fff'
    },
    image: {
        height: 250,
        width: 150,
        marginTop: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 8,
        letterSpacing: .5
    },
    subtitle: {
        fontSize: 20,
        marginBottom: 24,
        color: Colors.subtitle
    }
})

export const screenOptions = () => {
    return {
        headerShown: false,
    };
};