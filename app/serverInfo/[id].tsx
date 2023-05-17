import { useRouter, useSearchParams } from "expo-router";
import { NativeBaseProvider, Text, Heading, Toast, View, Image, HStack, IconButton, Icon, Pressable, Box } from "native-base";
import AppBar from "../../components/AppBar";
import { useEffect } from "react";
import PageTitle from "../../components/PageTitle";
import { serverList } from "../../components/DummyData";
import { MaterialIcons } from '@expo/vector-icons';

export default function ServerInfo() {
    const params = useSearchParams();
    const router = useRouter()

    const id = params.id;
    const server = serverList[0]   // dummy data

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
            <PageTitle icon="info" title="Server Info" />
            <View py="4" w="full">
                <Image source={{ uri: server.icon }} alt="Server Icon" size="lg" mx="auto"/>
                <Text fontSize="xl" fontWeight="bold" color="blueGray.700" textAlign="center" py="2">{server.name}</Text>
                <HStack justifyContent="space-between" py="4">
                    <Pressable onPress={() => { }} mx="auto">
                        <Icon as={MaterialIcons} name="stop" size="lg" color="blueGray.700" mx="auto" />
                        <Text>Stop</Text>
                    </Pressable>
                    <Pressable onPress={()=>{}} mx="auto">
                        <Icon as={MaterialIcons} name="edit" size="lg" color="blueGray.700" mx="auto" />
                        <Text>Edit</Text>
                    </Pressable>
                    <Pressable onPress={() => { }} mx="auto">
                        <Icon as={MaterialIcons} name="delete" size="lg" color="blueGray.700" mx="auto" />
                        <Text>Delete</Text>
                    </Pressable>
                </HStack>
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
                        <Text>List</Text>
                    </Box>
                </View>
            </View>
        </View>
    </NativeBaseProvider>
}