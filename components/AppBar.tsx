import { Box, HStack, Icon, Text, IconButton, StatusBar, View } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';

export default function AppBar() {
  return <View>
    <StatusBar barStyle="dark-content" />
    <Box safeAreaTop bg="blueGray.200" />
    <HStack bg="blueGray.200" px="1" py="3" justifyContent="space-between" alignItems="center" w="100%">
      <HStack alignItems="center">
        <IconButton
          icon={<Icon size="lg" as={MaterialIcons} name="menu" color="blueGray.700" />}
        />
      </HStack>
      <HStack>
        <IconButton
          icon={<Icon as={MaterialIcons} name="more-vert" size="lg" color="blueGray.700" />}
        />
      </HStack>
    </HStack>
  </View>;
}