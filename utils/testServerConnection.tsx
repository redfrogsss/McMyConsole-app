import axios from "axios";
import { useRouter } from "expo-router";

export default function testServerConnection(ip = "", port = "") {

    // const router = useRouter();

    return new Promise(async (res, rej) => {
        if (ip == "" || port == "") { rej(new Error("IP or Port is empty.")) };

        let address = `http://${ip}:${port}/test`;

        try {
            console.log(`Testing server connection at ${address}`)
            await axios.get(address, { timeout: 10000 });
            console.log(`Server is responding at ${address}`)
            res(true);
        } catch (error) {
            console.error(`Server is not responding at ${address}`)
            // router.push({ pathname: "/", params: { toast: "Server is not responding." } })
            rej(error);
        }
    });
}
