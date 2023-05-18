import { Image, Text, HStack, IconButton, Icon, Menu, Pressable, HamburgerIcon } from "native-base";
import PlayerInfo from "../../interfaces/PlayerInfo";
import { MaterialIcons } from '@expo/vector-icons';

export default function PlayerListItem({ player }: { player: PlayerInfo }) {

    const moreOptionHandler = () => {
        
    }

    return (
        <HStack justifyContent="space-between">
            <HStack>
                <Image source={{ uri: player.icon }} alt="Player Icon" size="xs" mx="auto" />
                <Text fontSize="sm" fontWeight="bold" color="blueGray.700" textAlign="left" pl="4" my="auto">{player.name}</Text>
            </HStack>
            {/* <IconButton
                icon={
                    <Icon as={MaterialIcons} name="more-vert" size="md" color="blueGray.700" mx="auto" />
                }
                color="blueGray.700"
                onPress={moreOptionHandler}
            /> */}

            <Menu w="190" trigger={triggerProps => {
                return <Pressable 
                accessibilityLabel="More options menu" 
                {...triggerProps} 
                p="4"
                placement="top left"
                >
                    <Icon as={MaterialIcons} name="more-vert" size="md" color="blueGray.700" my="auto" />
                </Pressable>;
            }}>
                <Menu.Item>Kick</Menu.Item>
                <Menu.Item>Ban</Menu.Item>
                <Menu.Item>Ban-IP</Menu.Item>
            </Menu>

        </HStack>
    );

}