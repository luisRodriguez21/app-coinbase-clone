import React, { FC } from 'react';
import { Text, View, TouchableHighlight, StyleSheet, Image } from 'react-native'
import Colors from '../constants/Colors';

interface WatchlistItemProps {
    id: number
    name: string
    symbol: string
    price: number
    percentChange: number
    drag: any
    isActive: any
}

const WatchlistItem:  FC<WatchlistItemProps> = ({id, name, symbol, price, percentChange, drag, isActive}) => {


    return (
        <TouchableHighlight
            underlayColor={isActive ? "white" : "#FAFBFE"}
            onLongPress={drag}
            onPress={() => console.log("onPress")}
        >
            <View style={isActive ? [styles.listItem, styles.activeItem] : styles.listItem} >

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image 
                        style={styles.logo}
                        source={{ uri: `https://s2.coinmarketcap.com/static/img/coins/64x64/${id.toString()}.png` }}                   
                    />

                    <View>
                        <Text style={styles.nameText} >{ name }</Text>
                        <Text style={styles.ticketText}>{ symbol }</Text>
                    </View>
                </View>

                <View>
                    <Text style={styles.priceText}>
                        $ { price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) } 
                    </Text>
                    <Text style={[ 
                        {
                            color: percentChange > 0 ? Colors.positiveGreen : Colors.negativeRed
                        },
                        styles.changeText
                    ]}> 
                        {percentChange > 0 ? '+' : ''}
                        {percentChange.toFixed(2)} % 
                    </Text>
                </View>


            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'row',
        width: '100%',
        height: 75,
        padding: 16,
        justifyContent: 'space-between',
    },
    activeItem: {
        backgroundColor: 'white',
        opacity: 0.9,
        shadowColor: 'black',
        shadowRadius: 15,
        shadowOpacity: 0.05
    },
    logo: {
        width: 32, 
        height: 32,
        marginRight: 16,
        borderRadius: 16,
        borderWidth: 0.3,
        borderColor: Colors.border
    },
    nameText: {
        fontSize: 18, 
        width: 145
    },
    ticketText: {
        color: Colors.secondarySubtitle,
        fontSize: 17
    },
    priceText: {
        fontSize: 18,
        textAlign: 'right',
    },
    changeText: {
        fontSize: 18,
        textAlign: 'right',
    }
})

export default WatchlistItem    