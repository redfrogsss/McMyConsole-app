import { NativeBaseProvider, ScrollView, View, } from 'native-base';
import AppBar from './../components/AppBar';
import ServerList from '../components/home/ServerList';

export default function Home() {
    return <NativeBaseProvider>
        <View
            flex={1}
            h='100%'
            backgroundColor='blueGray.200'
        >
                <AppBar />
                <ServerList />
        </View>
    </NativeBaseProvider>
}