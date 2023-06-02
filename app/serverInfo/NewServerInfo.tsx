import { Box, Button, FormControl, Icon, Input, KeyboardAvoidingView, NativeBaseProvider, ScrollView, Text, VStack, View } from "native-base";
import AppBar from "../../components/AppBar";
import PageTitle from "../../components/PageTitle";
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import ToastAlert from "../../components/ToastAlert";
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ServerInfo from "../../interfaces/ServerInfo";
import { Platform } from "react-native";
import DefaultServerIcon from "../../components/DefaultServerIcon";


export default function NewServerInfo() {

    const router = useRouter();
    const [showToast, setShowToast] = useState(false);

    const [serverConfig, setServerConfig] = useState<ServerInfo>({
        name: "",
        ip: "",
        port: "8003",
        username: "",
        password: "",
        icon: DefaultServerIcon
    });

    const [invalidFields, setInvalidFields] = useState<string[]>([]); // ["name", "ip", "port", "username", "password"

    // debug 
    useEffect(() => { console.log(serverConfig) }, [serverConfig]);

    const onSubmitHandler = async () => {
        // check if any field is empty
        let invalidFields: string[] = [];
        if (serverConfig.name === "") invalidFields.push("name");
        if (serverConfig.ip === "") invalidFields.push("ip");
        if (serverConfig.port === "") invalidFields.push("port");
        if (serverConfig.username === "") invalidFields.push("username");
        if (serverConfig.password === "") invalidFields.push("password");

        if (invalidFields.length > 0) {
            setInvalidFields(invalidFields);
            return;
        }

        // save to async storage
        try {
            console.log("Saving config to the server")
            let serverConfigs: ServerInfo[] = [];
            const serverConfigsString = await AsyncStorage.getItem("serverList");
            if (serverConfigsString === null) {
                serverConfigs = [];
            } else {
                serverConfigs = JSON.parse(serverConfigsString);
            }
            serverConfigs.push(serverConfig);
            await AsyncStorage.setItem("serverList", JSON.stringify(serverConfigs));

            console.log("Saved config to the async storage.");

            router.push("/");


        } catch (error) {
            console.error(error);

            // show toast for 3s
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);

        }
    }

    return (
        <NativeBaseProvider>
            <View
                flex={1}
                h='100%'
                backgroundColor='blueGray.200'
            >
                <AppBar enableBack />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "padding"}
                    >
                        <PageTitle icon="playlist-add" title="Add Server" />
                        <VStack w="full" space={2}>

                            <Box bg="white" mx="4" my="1" p="4" rounded="xl">
                                <FormControl isInvalid={invalidFields.includes("name")} w="full" mx="auto">
                                    <FormControl.Label>Server Name</FormControl.Label>
                                    <Input
                                        placeholder="My Server"
                                        value={serverConfig.name}
                                        onChangeText={(value) => { setServerConfig({ ...serverConfig, name: value }) }}
                                    />
                                    <FormControl.ErrorMessage leftIcon={<Icon as={MaterialIcons} name="error" size="xs" />}>
                                        Please enter a name.
                                    </FormControl.ErrorMessage>
                                </FormControl>
                            </Box>

                            <Box bg="white" mx="4" my="1" p="4" rounded="xl">
                                <FormControl isInvalid={invalidFields.includes("ip")} w="full" mx="auto">
                                    <FormControl.Label>Server IP</FormControl.Label>
                                    <Input
                                        placeholder="192.168.1.1 or mc.example.com"
                                        value={serverConfig.ip}
                                        onChangeText={(value) => { setServerConfig({ ...serverConfig, ip: value }) }}
                                    />
                                    <FormControl.ErrorMessage leftIcon={<Icon as={MaterialIcons} name="error" size="xs" />}>
                                        Please enter a valid IP address.
                                    </FormControl.ErrorMessage>
                                </FormControl>
                            </Box>

                            <Box bg="white" mx="4" my="1" p="4" rounded="xl">
                                <FormControl isInvalid={invalidFields.includes("port")} w="full" mx="auto">
                                    <FormControl.Label>McMyConsole's Port</FormControl.Label>
                                    <Input
                                        placeholder="8003"
                                        defaultValue="8003"
                                        keyboardType="numeric"
                                        value={serverConfig.port.toString()}
                                        onChangeText={(value) => { setServerConfig({ ...serverConfig, port: value }) }}
                                    />
                                    <FormControl.ErrorMessage leftIcon={<Icon as={MaterialIcons} name="error" size="xs" />}>
                                        Please enter a port.
                                    </FormControl.ErrorMessage>
                                </FormControl>
                            </Box>

                            <Box bg="white" mx="4" my="1" p="4" rounded="xl">
                                <FormControl isInvalid={invalidFields.includes("username")} w="full" mx="auto">
                                    <FormControl.Label>Username</FormControl.Label>
                                    <Input
                                        placeholder="Enter username"
                                        value={serverConfig.username}
                                        onChangeText={(value) => { setServerConfig({ ...serverConfig, username: value }) }}
                                    />
                                    <FormControl.ErrorMessage leftIcon={<Icon as={MaterialIcons} name="error" size="xs" />}>
                                        Please enter an username.
                                    </FormControl.ErrorMessage>
                                </FormControl>
                            </Box>

                            <Box bg="white" mx="4" my="1" p="4" rounded="xl">
                                <FormControl isInvalid={invalidFields.includes("password")} w="full" mx="auto">
                                    <FormControl.Label>Password</FormControl.Label>
                                    <Input
                                        placeholder="Enter password"
                                        type="password"
                                        value={serverConfig.password}
                                        onChangeText={(value) => { setServerConfig({ ...serverConfig, password: value }) }}
                                    />
                                    <FormControl.ErrorMessage leftIcon={<Icon as={MaterialIcons} name="error" size="xs" />}>
                                        Please enter a password.
                                    </FormControl.ErrorMessage>
                                </FormControl>
                            </Box>

                            <Box mx="4" my="1" rounded="xl">
                                <Button
                                    w="full"
                                    mx="auto"
                                    mb="16"
                                    rounded="xl"
                                    onPress={onSubmitHandler}
                                >
                                    Add Server
                                </Button>
                            </Box>

                        </VStack>

                    </KeyboardAvoidingView>
                </ScrollView>

            </View>
            {showToast && <ToastAlert title="Error" description="Something went wrong. Please try again." status="error"/>}
        </NativeBaseProvider>
    );
}