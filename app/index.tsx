import { NativeBaseProvider, View, Text } from 'native-base';
import { SafeAreaView } from 'react-native';

export default function Home() {
    return <NativeBaseProvider>
        <SafeAreaView>
            <Text>Hello World</Text>
        </SafeAreaView>
    </NativeBaseProvider>
}