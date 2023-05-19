import { Box, FlatList, HStack, Icon, Image, Pressable, Text, VStack, View } from "native-base";
import { MaterialIcons, Ionicons, Entypo } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import PageTitle from "../PageTitle";
import { serverList } from "../DummyData";
import { useCallback, useState } from "react";
import { RefreshControl } from "react-native";
import { RowMap, SwipeListView } from "react-native-swipe-list-view";
import ServerInfo from "../../interfaces/ServerInfo";

export default function ServerList() {

    const router = useRouter();

    const [listData, setListData] = useState(serverList);

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    const closeRow = (rowMap: RowMap<any>, rowKey: number) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const deleteRow = (rowMap: RowMap<any>, rowKey: number) => {
        closeRow(rowMap, rowKey);
        const newData = [...listData];
        const prevIndex = listData.findIndex(item => item.id === rowKey);
        newData.splice(prevIndex, 1);
        setListData(newData);
    };

    const onRowDidOpen = (rowKey: string) => {
        console.log('This row opened', rowKey);
    };

    const renderItem = ({ item }: { item: ServerInfo }) => {
        return <Pressable onPress={() => { router.push(`serverInfo/${item.id}`) }} bg="blueGray.200">
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
                        <Image source={{ uri: item.icon }} alt="Server Icon" size="sm" my="auto" w="20%" />
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
                                    <Text fontSize="xs" color="blueGray.500" m="auto" pl="1" isTruncated>1d 2h 22m</Text>
                                </HStack>
                            </HStack>
                        </View>
                        {/* Signal */}
                        <Icon size="sm" as={MaterialIcons} name="signal-cellular-alt" color="green.500" my="auto" />
                        {/* <Icon size="sm" as={MaterialIcons} name="signal-cellular-off" color="red.500" my="auto" /> */}
                    </HStack>
                </Box>
            )}
        </Pressable>
    }

    const renderHiddenItem = (data: any, rowMap: any) => <HStack flex="1" pl="2">
        <Pressable
            w="70"
            ml="auto"
            bg="red.500"
            justifyContent="center"
            onPress={() => deleteRow(rowMap, data.item.key)}
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
                keyExtractor={(item) => item.id.toString()}
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