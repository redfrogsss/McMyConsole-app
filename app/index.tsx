import { NativeBaseProvider, ScrollView, View, } from 'native-base';
import AppBar from './../components/AppBar';
import ServerInfo from '../components/ServerInfo';
import HomeTitle from '../components/home/HomeTitle';

export default function Home() {
    return <NativeBaseProvider>
        <View
            flex={1}
            h='100%'
            backgroundColor='blueGray.200'
        >
            <AppBar />
            <ScrollView>
                <HomeTitle />
                <ServerInfo />
            </ScrollView>
        </View>
    </NativeBaseProvider>
}