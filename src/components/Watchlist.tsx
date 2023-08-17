import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import React, { FC, useCallback, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'
import * as Haptics from 'expo-haptics'
import * as watchlistActions from '../store/actions/watchlist'
import Coin from '../models/Coin'
import Colors from '../constants/Colors'
import WatchlistItem from './WatchlistItem';


interface TopMoversProps {
    coinData: Coin[]
}

const Watchlist: FC<TopMoversProps> = ({ coinData }) => {
    const dispatch = useDispatch()

    const renderItem = useCallback(
        ({ item, drag, isActive }: RenderItemParams<Coin>) => {
            return (
                <WatchlistItem
                    id={item.id}
                    name={item.name}
                    symbol={item.symbol}
                    price={item.price}
                    percentChange={item.percentChange}
                    drag={drag}
                    isActive={isActive}
                />
            )
    },[])



    return (
        <GestureHandlerRootView>
            <>
                <Text style={styles.watchlistTitle}> WatchlistItem </Text>
                
                <View style={styles.watchlistContainer}>

                    <DraggableFlatList
                        data={coinData}
                        keyExtractor={(item) => item.id.toString()}
                        scrollEnabled={false}
                        onDragBegin={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
                        onDragEnd={({ data }) => dispatch(watchlistActions.updateCoinData(data))}
                        renderItem={renderItem}
                    />

                </View>
            </>
        </GestureHandlerRootView>        
    )
}

const styles = StyleSheet.create({
    watchlistTitle: {
        fontSize: 21, 
        fontWeight: "600",
        marginTop: 64,
        marginBottom: 10
    },
    watchlistContainer: {
        width: '85%',
        borderWidth: 1,
        borderRadius: 8,
        borderColor: Colors.border,
        backgroundColor: 'white'
    }
})

export default Watchlist