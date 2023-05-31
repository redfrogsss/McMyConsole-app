import axios from "axios";
import { Input, Toast } from "native-base";
import { useState } from "react";
import ServerInfo from "../../interfaces/ServerInfo";

export default function CommandInput({serverInfo, afterExecution}: {serverInfo: ServerInfo, afterExecution?: () => void}) {

    const [command, setCommand] = useState<string>("");

    const onCommandChange = (text: string) => {
        setCommand(text);
    }

    const onCommandSubmit = async () => {
        try {
            setCommand("");
            
            const data = {
                command: command,
                username: serverInfo.username,
                password: serverInfo.password
            }
            await axios.post(`http://${serverInfo.ip}:${serverInfo.port}/command`, data);
            
            if (afterExecution) afterExecution();
        } catch (error) {
            Toast.show({
                title: "Something went wrong, please try again later.",
            });
        }
    }

    return (
        <Input
            w="full"
            size="lg"
            placeholder="Enter command"
            color="white"
            value={command}
            onChangeText={onCommandChange}
            onSubmitEditing={onCommandSubmit}
        />
    );
}