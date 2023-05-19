import { Box, Fab, HStack, Icon, NativeBaseProvider, Text, View, } from 'native-base';
import AppBar from './../components/AppBar';
import ServerList from '../components/home/ServerList';
import { MaterialIcons, Ionicons, Entypo, AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Home() {
    const router = useRouter();

    return <NativeBaseProvider>
        <View
            flex={1}
            h='100%'
            backgroundColor='blueGray.200'
        >
            <AppBar />
            <ServerList />
            <Fab
                renderInPortal={false}
                shadow={2}
                size="lg"
                icon={<Icon color="white" as={MaterialIcons} name="playlist-add" size="lg" />}
                onPress={() => { router.push("/serverInfo/NewServerInfo") }}
                my="4"
            />
        </View>
    </NativeBaseProvider>
}