import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk'
import Coin from '../../models/Coin'
import cmpData from '../../data/CoinMarketCapData'
import { TopmoversState } from '../reducers/topmovers';

export const SET_TOPMOVERS_DATA = 'SET_TOPMOVERS_DATA'

interface CBRequiredData {
    quote_currency: string;
    base_currency: string;
}

export const fetchTopMoversData = () => {
    return async (dispatch: ThunkDispatch<TopmoversState, void, Action>) => {

        try {
            
            const cbResponse = await fetch('https://api.pro.coinbase.com/products');
            const cbResponseData = await cbResponse.json();

            let availableCoins: string[] = [];

            const filteredData = cbResponseData.filter(
                (coin: CBRequiredData) => coin.quote_currency === 'USD'
            )

            // console.log("availableCoins: ",availableCoins)

            filteredData.forEach((coin: CBRequiredData) => {
                availableCoins.push(coin.base_currency);
            })

            // console.log("availableCoins: ",availableCoins) // algunas modenedas ya no vienen en la api por ello se pasaran fijas en URL

         
            const cryptoResponse = await fetch( 
                'https://min-api.cryptocompare.com/data/pricemultifull?tsyms=USD&relaxedValidation=true&fsyms=$XCN,DOT,FARM,DDX,RAI,RLY,BCH,UST,ALCX,ZEN,AMP,MTL,STG,GHST,POWR,INJ,DOGE,MSOL,API3,SHIB,LOOM,MCO2,AURORA,DAR,LINK,ORN,ELA,OSMO,KSM,RBN,FORT,ADA,CELR,HOPR,MDT,CVC,USDT,ASM,XLM,KAVA,ETC,LCX,BOND,COVAL,OCEAN,QUICK,APT,BADGER,DNT,REQ,ATA,DYP,PYR,OOKI,C98,MXC,NMR,BTRST,IOTX,LSETH,OGN,PERP,SYLO,ANKR,CLV,NCT,WCFG,XRP,DIA,GODS,NKN,NU,MPL,PLU,METIS,KRL,PRIME,RARI,PAX,T,CVX,SNX,HBAR,LTC,CTSI,CBETH,YFII,RAD,NEST,RARE,AIOZ,CGLD,IDEX,WAMPL,GRT,QI,GALA,GLM,MATH,AVT,MUSD,ENJ,XYO,OMG,JUP,MAGIC,SPA,FX,COMP,FLOW,FIL,SAND,CRV,ENS,BICO,POND,INDEX,AUDIO,MATIC,DESO,SUPER,WBTC,QSP,FLR,POLY,WAXL,BLUR,GUSD,BAND,PNG,GNO,ROSE,GMT,YFI,DEXT,SUI,STORJ,LQTY,PRQ,VOXEL,DASH,RNDR,BUSD,TRB,STX,UPI,ACS,PRO,JASMY,GYEN,EUROC,ILV,CHZ,MANA,DREP,AVAX,INV,POLS,AAVE,BAT,BAL,ALGO,ALEPH,MNDE,MIR,AST,UNFI,ARB,MONA,AERGO,KNC,BNT,AUCTION,MLN,UNI,RPL,1INCH,FOX,SWFTC,REP,APE,ERN,DAI,GAL,GST,ACH,SYN,AXL,PUNDIX,FIS,PLA,AGLD,BOBA,UMA,TRIBE,VGX,IMX,SUSHI,CRO,OXT,EOS,RLC,ORCA,MEDIA,ICP,COTI,LIT,HFT,NEAR,CRPT,SOL,OP,ATOM,DIMO,BTC'
            );
            const cryptoResponseData = await cryptoResponse.json();
            // console.log("cryptoResponseData: ",cryptoResponseData)


           let dataAsArray = Object.values(cryptoResponseData.RAW); // convierte el objeto en array


         
            // ordenar de manera ascendente 
            dataAsArray.sort((a:any, b:any) => 
                Math.abs(a.USD.CHANGEPCT24HOUR) < Math.abs(b.USD.CHANGEPCT24HOUR) ? 1 : -1
            )

            const coinData: Coin[] = [];


            for(const data of dataAsArray) {
                const cryptoData: any = data;

                const cmpDetails = cmpData.data.find(
                    (cmpCoin) => cryptoData.USD.FROMSYMBOL === cmpCoin.symbol
                );

                const coinID = cmpDetails?.id ?? 0;
                const coinName = cmpDetails?.name ?? 'N/A';


                coinData.push(
                    new Coin(
                        coinID,
                        coinName,
                        cryptoData.USD.FROMSYMBOL,
                        cryptoData.USD.PRICE,
                        cryptoData.USD.CHANGEPCT24HOUR,
                ))

                if( coinData.length === 6 ) {
                    break;
                }
            }

            // console.log("coinData in top: ",coinData);s            

            dispatch({
                type: SET_TOPMOVERS_DATA,
                coinData: coinData
            })

        } catch (error) {
            console.log("error: ", error);            
        }

    }
}

