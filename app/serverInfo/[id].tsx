import { useRouter, useSearchParams } from "expo-router";
import { NativeBaseProvider, Text, Heading, Toast, View, Image, HStack, IconButton, Icon, Pressable, Box, Divider, FlatList, ScrollView, VStack, Skeleton } from "native-base";
import AppBar from "../../components/AppBar";
import { useCallback, useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import { MaterialIcons, Feather } from '@expo/vector-icons';
import PlayerListItem from "../../components/serverInfo/PlayerListItem";
import { RefreshControl } from "react-native";
import ServerInfo from "../../interfaces/ServerInfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PlayerInfo from "../../interfaces/PlayerInfo";
import axios, { Axios, AxiosResponse } from "axios";
import PieChart from "react-native-pie-chart";
import ServerStatus from "../../interfaces/ServerStatus";
import { testServerConnection } from "../../utils/";
import DefaultServerIcon from "../../components/DefaultServerIcon";

export default function ServerInfoScreen() {
    const params = useSearchParams();
    const router = useRouter()

    const id: string | undefined = params.id?.toString();

    const [serverInfo, setServerInfo] = useState<ServerInfo>({
        name: "",
        ip: "",
        port: "",
        username: "",
        password: "",
    });

    const [playersData, setPlayersData] = useState<PlayerInfo[]>([]);
    const [serverStatus, setServerStatus] = useState<ServerStatus>({
        tps: [1,1,1],
        currentMemory: 1,
        freeMemory: 1,
        maxMemory: 1,
    })

    const [refreshing, setRefreshing] = useState(false);
    const [showSkeleton, setShowSkeleton] = useState(true);

    // get server info from async storage
    const loadServerInfo = async () => {
        return new Promise<ServerInfo>(async (res, rej)=>{
            let item = await AsyncStorage.getItem("serverList");
            if (item == null) {
                router.back();
                Toast.show({
                    title: "Server list is empty",
                });
                return;
            }
            if (id == null || id == undefined) {
                router.back();
                Toast.show({
                    title: "Server id is empty",
                });
                return;
            }
            let info = JSON.parse(item ?? "[]")[parseInt(id)];
            setServerInfo(info);
            res(info);
        });
    }

    const removeServerInfo = async () => {
        return new Promise(async (res, rej) => {
            try {
                let listData = await AsyncStorage.getItem("serverList");
                if (listData == null) { rej(); return;}

                let list: ServerInfo[] = JSON.parse(listData);
                if (id == null || id == undefined) { rej(); return;}
                list.splice(parseInt(id), 1);

                await AsyncStorage.setItem("serverList", JSON.stringify(list));
                res(true);
            } catch (error) {
                rej(error);
            }
        })
    }

    // fetch server data 
    const fetchServerData = async (ip: string = "", port: string = "") => {
        const serverAddress = `http://${ip}:${port}`;
        let address = `${serverAddress}`;
        return new Promise(async (res, rej) => {
            try {
                if (!ip || !port) {
                    return;
                }
                // test server connection
                // console.log(`passing ${ip} and ${port} to testServerConnection`)
                await testServerConnection(ip, port);

                // fetch player data 
                address = `${serverAddress}/player`;
                let playerListRawData = await axios.get(address);

                let playerListData: PlayerInfo[] = playerListRawData.data.playerList.map((player: any) => {
                    let playerInfo: PlayerInfo = {
                        name: player,
                        icon: `https://minotar.net/avatar/${player}/64` ?? "https://minotar.net/avatar/steve/64" ?? DefaultServerIcon
                    }
                    return playerInfo;
                });

                setPlayersData(playerListData);

                // fetch server status
                address = `${serverAddress}/serverStatus`;
                let statusRawData: AxiosResponse<ServerStatus> = await axios.get(address);
                console.log(statusRawData.data);
                
                let statusData: ServerStatus = statusRawData.data;
                setServerStatus(statusData);

                res(playerListData);
            } catch (error: any) {
                if (error.response) {
                    // The server responded with an error status code (e.g. 404 Not Found)
                    console.error(`Server responded with status code ${error.response.status}: ${error.response.data}`);
                } else if (error.request) {
                    // The request was made but no response was received (e.g. a network error)
                    console.error(`No response received: ${error.request}`);
                } else {
                    // Something else happened while setting up the request
                    console.error(`Error setting up request: ${error.message}`);
                }

                Toast.show({
                    title: "Something went wrong. Please try again later.",
                });
                
                router.push({ pathname: "/", params: { toast: "Something went wrong. Please try again later." } })
                rej(error);
            }
        });
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        // console.log("serverInfo in refresh", serverInfo);
        setTimeout(() => {
            
            loadServerInfo().then((info) => {
                fetchServerData(info.ip, info.port).then((data)=>{
                    setRefreshing(false);
                });
            });
        }, 2000);
    }, []);

    const shutdownHandler = async () => {
        try {
            await axios.post(`http://${serverInfo.ip}:${serverInfo.port}/shutdown`, {username: serverInfo.username, password: serverInfo.password});
            Toast.show({
                title: "Server is shutting down.",
            });
            setTimeout(()=>{
                router.push("/");
            }, 3000);
            
        } catch (error: any) {

            if (error.response) {
                // The server responded with an error status code (e.g. 404 Not Found)
                console.error(`Server responded with status code ${error.response.status}: ${error.response.data}`);
            } else if (error.request) {
                // The request was made but no response was received (e.g. a network error)
                console.error(`No response received: ${error.request}`);
            } else {
                // Something else happened while setting up the request
                console.error(`Error setting up request: ${error.message}`);
            }

            Toast.show({
                title: "Something went wrong. Please try again later.",
            });

        }
    }

    const consoleHandler = () => {
        router.push({ pathname: "/serverInfo/Console", params: { serverInfo: JSON.stringify(serverInfo) } });
    }

    const deleteHandler = () => {
        removeServerInfo().then(() => {
            router.push({ pathname: "/", params: { toast: "Server deleted."}});
        });
    }

    useEffect(()=>{
        // check if id is valid
        if(!id){
            router.back();
            Toast.show({
                title: "Invalid server id",
            });
        }

        setRefreshing(true);
        setTimeout(()=>{
            loadServerInfo().then((info) => {
                fetchServerData(info.ip, info.port).then(() => {
                    setRefreshing(false);
                    setShowSkeleton(false);
                });
            });
        }, 1000)
    }, []);

    // debug
    useEffect(() => { 
        console.log("serverInfo", serverInfo);
     }, [serverInfo]);

    const getRamUsage = () => {
        const series = [serverStatus.currentMemory, serverStatus.freeMemory];
        const sliceColor = ['#0284c7', '#0c4a6e']
        return {series, sliceColor};
    }
    
    const getTPS = () => {
        console.log("tps", serverStatus.tps[0].toFixed(2));
        
        const series = [Number(serverStatus.tps[0].toFixed(2)), 20 - Number(serverStatus.tps[0].toFixed(1))];
        const sliceColor = ['#0284c7', '#0c4a6e']
        return {series, sliceColor};
    }

    // debug
    useEffect(() => {console.log("serverInfo: ",serverInfo)}, [serverInfo]);

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
                    {showSkeleton ? <Skeleton height="150" rounded="lg" startColor="blueGray.300" w="50%" mx="auto" py="4"/> : (
                        <Image source={{ uri: serverInfo.icon ?? DefaultServerIcon }} alt="Server Icon" size="lg" mx="auto" rounded="lg" />
                    )}
                    
                    {showSkeleton? <Skeleton.Text rounded="lg" w="50%" startColor="blueGray.300" mx="auto" /> : (
                        <Text fontSize="xl" fontWeight="bold" color="blueGray.700" textAlign="center" py="2">{serverInfo.name}</Text>
                    )}
                    <HStack m="auto">
                        <HStack py="2">
                            {showSkeleton ? null : (
                                <>
                                    <Icon as={MaterialIcons} name="computer" size="md" color="blueGray.700" m="auto" />
                                    <Text fontSize="md" color="blueGray.700" textAlign="center" px="2">{serverInfo.ip}:{serverInfo.port}</Text>
                                </>
                            )}
                        </HStack>
                    </HStack>
                    <HStack justifyContent="space-between" py="4">
                        <Pressable onPress={() => { shutdownHandler() }} mx="auto">
                            <Icon as={MaterialIcons} name="stop" size="lg" color="blueGray.700" mx="auto" />
                            <Text>Shutdown</Text>
                        </Pressable>
                        <Pressable onPress={() => { consoleHandler() }} mx="auto">
                            <Icon as={MaterialIcons} name="monitor" size="lg" color="blueGray.700" mx="auto" />
                            <Text>Console</Text>
                        </Pressable>
                        <Pressable onPress={() => { deleteHandler() }} mx="auto">
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
                                <VStack w="50%">
                                    {showSkeleton ? (
                                        <>
                                            <View mx="auto">
                                                <Skeleton height={125} width={125} rounded="lg" startColor="blueGray.300" />
                                            </View>
                                            <Skeleton.Text rounded="lg" w="50%" startColor="blueGray.300" h="1" lines={1} my="4" mx="auto" />
                                        </>
                                    ) : (
                                        <>
                                            <View mx="auto">
                                                <PieChart
                                                    widthAndHeight={125}
                                                    series={getTPS().series}
                                                    sliceColor={getTPS().sliceColor}
                                                    coverRadius={0.45}
                                                    coverFill={'#FFF'}
                                                />
                                            </View>
                                            <Text mx="auto" my="1">TPS: {serverStatus.tps[0].toFixed(1)} / 20.0</Text>
                                        </>
                                    )}
                                </VStack>
                                <VStack w="50%">
                                    {showSkeleton ? (
                                        <>
                                            <View mx="auto">
                                                <Skeleton height={125} width={125} rounded="lg" startColor="blueGray.300" />
                                            </View>
                                            <Skeleton.Text rounded="lg" w="50%" startColor="blueGray.300" h="1" lines={1} my="4" mx="auto" />
                                        </>
                                    ) : (
                                        <>
                                            <View mx="auto">
                                                <PieChart
                                                    widthAndHeight={125}
                                                    series={getRamUsage().series}
                                                    sliceColor={getRamUsage().sliceColor}
                                                    coverRadius={0.45}
                                                    coverFill={'#FFF'}
                                                />
                                            </View>
                                            <Text mx="auto" my="1">RAM: {serverStatus.currentMemory} MB / {serverStatus.maxMemory} MB</Text>
                                        </>
                                    )}
                                </VStack>
                            </HStack>
                        </Box>
                    </View>

                    {/* Players List */}
                    <View p="4">
                        <HStack justifyContent="space-between" py="2">
                            <HStack>
                                <Icon as={MaterialIcons} name="group" size="lg" color="blueGray.700" mx="auto" />
                                <Heading size="md" color="blueGray.700" textAlign="left" pl="2">Players: {playersData.length}</Heading>
                            </HStack>
                        </HStack>
                        <Box
                            backgroundColor="white"
                            rounded="xl"
                            p="4"
                        >
                            {showSkeleton ? <Skeleton.Text rounded="lg" /> : null}
                            {playersData.length > 0 ? (
                                <FlatList
                                    data={playersData}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item }) => <PlayerListItem player={item} serverInfo={serverInfo} onRefresh={onRefresh} />}
                                    ItemSeparatorComponent={() => (
                                        <Divider my="2" _light={{
                                            bg: "blueGray.600"
                                        }} _dark={{
                                            bg: "blueGray.50"
                                        }} />
                                    )}
                                    scrollEnabled={false}
                                />
                            ) : (
                                <HStack justifyContent="center" py="2">
                                    <Text>No players online</Text>
                                </HStack>
                            )}
                        </Box>
                    </View>
                </View>
            </ScrollView>
        </View>
    </NativeBaseProvider>
}