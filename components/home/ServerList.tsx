import { Box, FlatList, HStack, Icon, Image, Pressable, Text, View } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import PageTitle from "../PageTitle";
import { serverList } from "../DummyData";

export default function ServerList() {

    const router = useRouter();

    return <FlatList
        data={serverList}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={<PageTitle icon="dns" title="Server List" />}
        renderItem={({ item }) => {
            return <Pressable onPress={() => { router.push(`serverInfo/${item.id}`)}}>
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
        }} />

}