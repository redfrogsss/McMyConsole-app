export default interface ServerInfo {
    id?: number,
    name: string,
    ip: string,
    port: string,
    username: string,
    password: string,
    activePlayers?: string,
    totalPlayers?: string,
    version?: string,
    icon?: string,
    uptime?: string,
    status?: "online" | "offline"
}
