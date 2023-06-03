import { Box, HStack, Icon, Text, IconButton, StatusBar, View, Menu, Pressable } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { Linking } from "react-native";

export default function AppBar({ enableBack = false }: { enableBack?: boolean }) {

  const router = useRouter();

  return <View>
    <StatusBar barStyle="dark-content" />
    <Box safeAreaTop bg="blueGray.200" />
    <HStack bg="blueGray.200" px="1" py="3" justifyContent="space-between" alignItems="center" w="100%">
      <HStack alignItems="center">
        {/* Left Side of the AppBar */}
        {enableBack ? (
          <IconButton
            icon={<Icon size="lg" as={MaterialIcons} name="arrow-back" color="blueGray.700" />}
            onPress={() => {
              router.back();
            }}
          />
        )
          : (
            // <IconButton
            //   icon={<Icon size="lg" as={MaterialIcons} name="menu" color="blueGray.700" />}
            // />
        // <Menu w="190" trigger={triggerProps => {
        //   return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
        //     <Icon as={MaterialIcons} name="menu" size="lg" color="blueGray.700" mx="3"/>
        //   </Pressable>;
        // }}>
        //   <Menu.Item onPress={()=>{Linking.openURL("https://github.com/redfrogsss/McMyConsole-app")}}>About McMyConsole</Menu.Item>
        // </Menu>
        <></>
          )}
      </HStack>
      <HStack>
        {/* Right Side of the AppBar */}
        <Menu w="190" trigger={triggerProps => {
          return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
            <Icon as={MaterialIcons} name="more-vert" size="lg" color="blueGray.700" mx="3"/>
          </Pressable>;
        }}>
          <Menu.Item onPress={()=>{Linking.openURL("https://github.com/redfrogsss/McMyConsole-app")}}>About McMyConsole</Menu.Item>
        </Menu>
      </HStack>
    </HStack>
  </View>;
}