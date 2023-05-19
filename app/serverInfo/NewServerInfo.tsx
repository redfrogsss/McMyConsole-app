import { Button, FormControl, Icon, Input, KeyboardAvoidingView, NativeBaseProvider, ScrollView, Text, VStack, View } from "native-base";
import AppBar from "../../components/AppBar";
import PageTitle from "../../components/PageTitle";
import { MaterialIcons, Ionicons, Entypo, AntDesign } from '@expo/vector-icons';

export default function NewServerInfo() {
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
                    <KeyboardAvoidingView>
                        <PageTitle icon="playlist-add" title="Add Server" />
                        <VStack w="full" space={2}>
                            <FormControl isInvalid={false} w="75%" mx="auto">
                                <FormControl.Label>Server IP</FormControl.Label>
                                <Input placeholder="192.168.1.1 or mc.example.com" />
                                <FormControl.ErrorMessage leftIcon={<Icon as={MaterialIcons} name="error" size="xs" />}>
                                    Try different from previous passwords.
                                </FormControl.ErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={false} w="75%" mx="auto">
                                <FormControl.Label>Port</FormControl.Label>
                                <Input placeholder="25565" defaultValue="25565" keyboardType="numeric" />
                                <FormControl.ErrorMessage leftIcon={<Icon as={MaterialIcons} name="error" size="xs" />}>
                                    Try different from previous passwords.
                                </FormControl.ErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={false} w="75%" mx="auto">
                                <FormControl.Label>Username</FormControl.Label>
                                <Input placeholder="Enter username" />
                                <FormControl.ErrorMessage leftIcon={<Icon as={MaterialIcons} name="error" size="xs" />}>
                                    Try different from previous passwords.
                                </FormControl.ErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={false} w="75%" mx="auto">
                                <FormControl.Label>Password</FormControl.Label>
                                <Input placeholder="Enter password" type="password" />
                                <FormControl.ErrorMessage leftIcon={<Icon as={MaterialIcons} name="error" size="xs" />}>
                                    Try different from previous passwords.
                                </FormControl.ErrorMessage>
                            </FormControl>
                            <Button
                                mt={2}
                                w="75%"
                                mx="auto"
                                onPress={() => console.log("hello world")}
                            >
                                Add Server
                            </Button>
                        </VStack>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        </NativeBaseProvider>
    );
}