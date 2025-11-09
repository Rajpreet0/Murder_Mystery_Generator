export const isPremium = (): boolean => {
    if (typeof window === "undefined") return false;
    const token = localStorage.getItem("mmd-premium-token");
    return Boolean(token);
}