import { HStack, Heading, Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

export default function HomeTitle({icon, title}: {icon: string, title: string}) {
    return (
        <HStack justifyContent="space-between" px="4" pb="4" pt="0">
            <HStack>
                <Icon size="lg" as={MaterialIcons} name={icon} color="blueGray.700" m="auto" />
                <Heading p="2" color="blueGray.700">{title}</Heading>
            </HStack>
        </HStack>
    );
}