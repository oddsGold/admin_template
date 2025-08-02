import { toast } from "sonner";

interface ClipboardOptions {
    successMessage?: string;
    errorMessage?: string;
}

export const copyToClipboard = async (
    text: string,
    options?: ClipboardOptions
): Promise<void> => {
    if (!text) return;

    const {
        successMessage = "Copied to clipboard",
        errorMessage = "Failed to copy"
    } = options || {};

    try {
        await navigator.clipboard.writeText(text);
        toast.success(successMessage, {
            description: "You can now paste it anywhere",
        });
    } catch {
        toast.error(errorMessage, {
            description: "Please try again or copy manually",
        });
    }
};