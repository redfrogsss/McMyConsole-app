import { Box, FlatList, HStack, Icon, Image, Pressable, Text, Toast, VStack, View } from "native-base";
import { MaterialIcons, Ionicons, Entypo } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import PageTitle from "../PageTitle";
import { useCallback, useEffect, useState } from "react";
import { ImageSourcePropType, ListRenderItemInfo, RefreshControl } from "react-native";
import { RowMap, SwipeListView } from "react-native-swipe-list-view";
import ServerInfo from "../../interfaces/ServerInfo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { testServerConnection } from "../../utils";
import axios from "axios";
import DefaultServerIcon from "../DefaultServerIcon";

export default function ServerList() {

    const router = useRouter();

    const [listData, setListData] = useState<ServerInfo[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    const loadServerList = async () => {
        return new Promise<ServerInfo[]>(async (res, rej) => {
            try {
                const serverList = await AsyncStorage.getItem("serverList");
                if (serverList == null) {
                    await AsyncStorage.setItem("serverList", JSON.stringify([]));
                    res([]);
                } else {
                    let list = JSON.parse(serverList);
                    // add id for key extractor
                    list = list.map((item: ServerInfo, index: number) => {
                        item.id = index;
                        return item;
                    });

                    res(list);
                }
            } catch (error) {
                rej(error);
            }
        })
    }

    const saveServerList = async (list: ServerInfo[]) => {
        return new Promise(async (res, rej) => {
            try {
                await AsyncStorage.setItem("serverList", JSON.stringify(list));
                res(true);
            } catch (error) {
                rej(error);
            }
        })
    }

    const fetchServerData = async () => {
        let list = await loadServerList()
        setListData(list);

        // show refresh indicator
        setRefreshing(true);

        for (let i = 0; i < list.length; i++) {
            let item = list[i];
            try {
                await testServerConnection(item.ip, item.port);
                item.status = "online";

                let serverInfoData = await axios.get(`http://${item.ip}:${item.port}/serverInfo`); 
                item.activePlayers = serverInfoData.data.activePlayers;
                item.totalPlayers = serverInfoData.data.totalPlayers;
                item.version = serverInfoData.data.version;
                item.icon = serverInfoData.data.icon? "data:image/png;base64," + serverInfoData.data.icon : DefaultServerIcon;
                item.uptime = serverInfoData.data.uptime;
                
            } catch (error) {
                item.status = "offline";
                item.activePlayers = "0";
                item.totalPlayers = "0";
                item.version = "0.0.0";
                item.uptime = "0h";
            }
        }

        setListData(list);
        saveServerList(list);

        // hide refresh indicator
        setRefreshing(false);
    }

    // fetch serverlist from async storage when app launch
    useEffect(() => {
        // onRefresh();
        fetchServerData();
    }, []);

    // debug
    useEffect(() => { console.log("listData", listData) }, [listData]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(async () => {
            await fetchServerData();
            setRefreshing(false);
        }, 2000);
    }, []);

    const closeRow = (rowMap: RowMap<any>, rowKey: number) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const deleteRow = (rowMap: RowMap<ServerInfo>, rowKey: ServerInfo) => {
        const newData: ServerInfo[] = [...listData];
        const prevIndex = listData.findIndex(item => item == rowKey);
        newData.splice(prevIndex, 1);
        closeRow(rowMap, prevIndex);
        setListData(newData);

        try {
            AsyncStorage.setItem("serverList", JSON.stringify(newData));
            console.log("Server deleted");
        } catch (error) {
            console.error(error)
        }
    };

    const onRowDidOpen = (rowKey: string) => {
        console.log('This row opened', rowKey);
    };

    const renderItem = ({ item }: { item: ServerInfo }) => {

        const onPress = () => {
            console.log("Server selected", item.id)
            if(item.status === "online") {
                router.push(`serverInfo/${item.id}`);
            } else {
                Toast.show({
                    title: "Server is offline.",
                })
            }
        }

        const showStatus = () => {

            if (item.status === undefined) {
                return (
                    <Icon size="sm" as={MaterialIcons} name="signal-cellular-null" color="green.500" my="auto" />
                );
            } else if (item.status === "online") {
                return (
                    <Icon size="sm" as={MaterialIcons} name="signal-cellular-alt" color="green.500" my="auto" />
                );
            } else {
                return (
                    <Icon size="sm" as={MaterialIcons} name="signal-cellular-off" color="red.500" my="auto" />
                );
            }
        }

        return <Pressable onPress={onPress} bg="blueGray.200">
            {({ isPressed }) => (
                <Box
                    rounded="xl"
                    bg={isPressed ? "blueGray.400" : "white"}
                    mx="4"
                    my="2"
                    p="5"
                >
                    <HStack justifyContent="space-between" maxW="full">
                        {/* Icon */}
                        <Image source={{ uri: item.icon }} alt="Server Icon" size="sm" my="auto" w="20%" rounded="lg" />
                        <View px="4" textAlign="left" w="75%">
                            {/* Server Name */}
                            <Text fontSize="lg" fontWeight="bold">{item.name}</Text>
                            {/* IP */}
                            <HStack justifyContent="space-between" pt="1">
                                <HStack>
                                    <Icon size="sm" as={MaterialIcons} name="computer" color="blueGray.500" m="auto" />
                                    <Text fontSize="sm" color="blueGray.500" m="auto" pl="1" isTruncated>{item.ip}:{item.port}</Text>
                                </HStack>
                            </HStack>
                            <HStack justifyContent="space-between" pt="1">
                                {/* Players */}
                                <HStack>
                                    <Icon size="xs" as={MaterialIcons} name="group" color="blueGray.500" m="auto" />
                                    <Text fontSize="xs" color="blueGray.500" m="auto" pl="1" isTruncated>{item.activePlayers}/{item.totalPlayers}</Text>
                                </HStack>
                                {/* Version */}
                                <HStack>
                                    <Icon size="xs" as={MaterialIcons} name="verified" color="blueGray.500" m="auto" />
                                    <Text fontSize="xs" color="blueGray.500" m="auto" pl="1" isTruncated>{item.version}</Text>
                                </HStack>
                                {/* Uptime */}
                                <HStack>
                                    <Icon size="xs" as={MaterialIcons} name="schedule" color="blueGray.500" m="auto" />
                                    <Text fontSize="xs" color="blueGray.500" m="auto" pl="1" isTruncated>{item.uptime}</Text>
                                </HStack>
                            </HStack>
                        </View>
                        {/* Signal */}
                        {showStatus()}
                    </HStack>
                </Box>
            )}
        </Pressable>
    }

    const renderHiddenItem = (data: ListRenderItemInfo<ServerInfo>, rowMap: RowMap<ServerInfo>) => <HStack flex="1" pl="2">
        <Pressable
            w="70"
            ml="auto"
            bg="red.500"
            justifyContent="center"
            onPress={() => deleteRow(rowMap, data.item)}
            _pressed={{
                opacity: 0.5
            }}
            rounded="xl"
            mr="4"
        >
            <VStack alignItems="center" space={2}>
                <Icon as={<MaterialIcons name="delete" />} color="white" size="xs" />
                <Text color="white" fontSize="xs" fontWeight="medium">
                    Delete
                </Text>
            </VStack>
        </Pressable>
    </HStack>;

    return (
        <SwipeListView
            data={listData}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={<PageTitle icon="dns" title="Server List" />}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-90}
            previewRowKey={'0'}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            onRowOpen={onRowDidOpen}
        />
    )
}