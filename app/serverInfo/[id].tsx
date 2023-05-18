import { useRouter, useSearchParams } from "expo-router";
import { NativeBaseProvider, Text, Heading, Toast, View, Image, HStack, IconButton, Icon, Pressable, Box, Divider, FlatList, ScrollView } from "native-base";
import AppBar from "../../components/AppBar";
import { useCallback, useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import { serverList, playerList } from "../../components/DummyData";
import { MaterialIcons, Feather } from '@expo/vector-icons';
import PlayerListItem from "../../components/serverInfo/PlayerListItem";
import { RefreshControl } from "react-native";

export default function ServerInfo() {
    const params = useSearchParams();
    const router = useRouter()

    const id = params.id;
    const server = serverList[0]   // dummy data

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    useEffect(()=>{
        if(!id){
            router.back();
            Toast.show({
                title: "Invalid server id",
            });
        }
    }, [])

    return <NativeBaseProvider>
        <View
            flex={1}
            h='100%'
            backgroundColor='blueGray.200'
        >
            <AppBar enableBack/>
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <PageTitle icon="info" title="Server Info" />
                <View py="4" w="full">
                    <Image source={{ uri: server.icon }} alt="Server Icon" size="lg" mx="auto" />
                    <Text fontSize="xl" fontWeight="bold" color="blueGray.700" textAlign="center" py="2">{server.name}</Text>
                    <HStack m="auto">
                        <HStack py="2">
                            <Icon as={MaterialIcons} name="computer" size="md" color="blueGray.700" m="auto" />
                            <Text fontSize="md" color="blueGray.700" textAlign="center" px="2">{server.ip}:{server.port}</Text>
                        </HStack>
                    </HStack>
                    <HStack justifyContent="space-between" py="4">
                        <Pressable onPress={() => { }} mx="auto">
                            <Icon as={MaterialIcons} name="stop" size="lg" color="blueGray.700" mx="auto" />
                            <Text>Stop</Text>
                        </Pressable>
                        <Pressable onPress={() => { }} mx="auto">
                            <Icon as={MaterialIcons} name="monitor" size="lg" color="blueGray.700" mx="auto" />
                            <Text>Console</Text>
                        </Pressable>
                        <Pressable onPress={() => { }} mx="auto">
                            <Icon as={MaterialIcons} name="delete" size="lg" color="blueGray.700" mx="auto" />
                            <Text>Delete</Text>
                        </Pressable>
                    </HStack>

                    {/* Server Status */}
                    <View p="4">
                        <HStack justifyContent="space-between" py="2">
                            <HStack>
                                <Icon as={Feather} name="cpu" size="lg" color="blueGray.700" mx="auto" />
                                <Heading size="md" color="blueGray.700" textAlign="left" pl="2">Server Status</Heading>
                            </HStack>
                        </HStack>
                        <Box
                            backgroundColor="white"
                            rounded="xl"
                            p="4"
                        >
                            <HStack justifyContent="space-between">
                                <Text>CPU</Text>
                                <Text>RAM</Text>
                            </HStack>
                        </Box>
                    </View>

                    {/* Players List */}
                    <View p="4">
                        <HStack justifyContent="space-between" py="2">
                            <HStack>
                                <Icon as={MaterialIcons} name="group" size="lg" color="blueGray.700" mx="auto" />
                                <Heading size="md" color="blueGray.700" textAlign="left" pl="2">Players: 10</Heading>
                            </HStack>
                        </HStack>
                        <Box
                            backgroundColor="white"
                            rounded="xl"
                            p="4"
                        >
                            <FlatList
                                data={playerList}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => <PlayerListItem player={item} />}
                                ItemSeparatorComponent={() => (
                                    <Divider my="2" _light={{
                                        bg: "blueGray.600"
                                    }} _dark={{
                                        bg: "blueGray.50"
                                    }} />
                                )}
                                scrollEnabled={false}
                            />
                        </Box>
                    </View>
                </View>
            </ScrollView>
        </View>
    </NativeBaseProvider>
}