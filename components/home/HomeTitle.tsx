import { HStack, Heading, Icon, NativeBaseProvider, ScrollView, Text, View, } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

export default function HomeTitle() {
    return (
        <HStack justifyContent="space-between" px="4" pb="4" pt="0">
            <HStack>
                <Icon size="lg" as={MaterialIcons} name="dns" color="blueGray.700" m="auto" />
                <Heading p="2" color="blueGray.700">Server List</Heading>
            </HStack>
        </HStack>
    );
}