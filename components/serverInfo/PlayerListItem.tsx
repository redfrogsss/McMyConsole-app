import { Image, Text, HStack, IconButton, Icon, Menu, Pressable, HamburgerIcon, Toast } from "native-base";
import PlayerInfo from "../../interfaces/PlayerInfo";
import { MaterialIcons } from '@expo/vector-icons';
import axios from "axios";

export default function PlayerListItem({ player, serverAddress, onRefresh }: { player: PlayerInfo, serverAddress: string, onRefresh: () => void }) {

    const actionHandler = async (player: PlayerInfo, action: "kick" | "ban" | "ban-ip", serverAddress: string) => {
        
        const data = {
            player: player.name,
            action: action
        }

        try {
            await axios.post(`${serverAddress}/player`, data);

            // refresh player list
            onRefresh();
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

    return (
        <HStack justifyContent="space-between">
            <HStack>
                <Image source={{ uri: player.icon }} alt="Player Icon" size="xs" mx="auto" my="auto" />
                <Text fontSize="sm" fontWeight="bold" color="blueGray.700" textAlign="left" pl="4" my="auto">{player.name}</Text>
            </HStack>

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
                <Menu.Item onPress={() => { actionHandler(player, "kick", serverAddress) }}>Kick</Menu.Item>
                <Menu.Item onPress={()=>{ actionHandler(player, "ban", serverAddress) }}>Ban</Menu.Item>
                <Menu.Item onPress={() => { actionHandler(player, "ban-ip", serverAddress) }}>Ban-IP</Menu.Item>
            </Menu>

        </HStack>
    );

}