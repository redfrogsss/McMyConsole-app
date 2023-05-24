export default interface ToastAlertProps {
    status?: "info" | "warning" | "success" | "error";
    variant?: "solid" | "subtle" | "left-accent" | "top-accent" | "outline";
    title: string;
    description: string;
}
