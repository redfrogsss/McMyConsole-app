import { Box, FlatList, Input, KeyboardAvoidingView, NativeBaseProvider, ScrollView, Text, Toast, View } from "native-base";
import PageTitle from "../../components/PageTitle";
import AppBar from "../../components/AppBar";
import { useRouter, useSearchParams } from "expo-router";
import ServerInfo from "../../interfaces/ServerInfo";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { RefreshControl, SafeAreaView, TextInput } from "react-native";
import CommandInput from "../../components/console/CommandInput";

export default function ConsoleScreen () {

    // get params
    const router = useRouter();
    const params = useSearchParams();

    const [serverInfo, setServerInfo] = useState<ServerInfo>(params.serverInfo ? JSON.parse(params.serverInfo.toString()) : {} as ServerInfo);
    const [consoleLogs, setConsoleLogs] = useState<string[]>([]);

    const fetchConsoleLogs = async () => {
        let logsData = await axios.get(`http://${serverInfo.ip}:${serverInfo.port}/consoleLogs`);

        setConsoleLogs(logsData.data.consoleLogs);
    }
    
    // check if serverInfo is valid
    useEffect(() => {
        if (!params.serverInfo) {
            router.push({pathname: "/", params: {toast: "Something went wrong, please try again later."}});
        }
    }, [params]);

    // fetch console logs
    useEffect(() => {
        fetchConsoleLogs();
    }, []);

      // update console log every second
    useEffect(() => {
        fetchConsoleLogs();

        const interval = setInterval(() => {
            fetchConsoleLogs();
        }, 1000);

        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [])

    const renderItem = ({ item, index }: { item: string, index: number }) => {
        return (
            <View
                mx={4}
                my={2}
                backgroundColor="blueGray.900"
            >
                <Text color="white">{item}</Text>
            </View>
        );
    }

    return (
        <NativeBaseProvider>
            <View
                flex={1}
                h='100%'
                backgroundColor='blueGray.200'
            >
                <AppBar enableBack />
                <SafeAreaView>
                    <KeyboardAvoidingView
                        behavior="padding"
                    >
                        <Box
                            h='full'
                            pb="24"
                            backgroundColor='blueGray.900'
                            safeArea
                        >
                            <FlatList
                                data={consoleLogs.reverse()}
                                keyExtractor={(item, index) => index.toString()}
                                showsVerticalScrollIndicator={false}
                                renderItem={renderItem}
                                inverted={true}
                            />
                            <View
                                px="4"
                                py="2"
                            >
                                <CommandInput 
                                serverInfo={serverInfo}
                                afterExecution={fetchConsoleLogs}
                                />
                            </View>
                        </Box>
                    </KeyboardAvoidingView>
                </SafeAreaView>
                    
            </View>
        </NativeBaseProvider>
    );
}
