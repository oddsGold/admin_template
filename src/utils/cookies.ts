/**
 * Gets the CSRF token value from cookies.
 * Example cookie: "XSRF-TOKEN=abc123def456; Path=/"
 */
export function getCsrfToken(): string | null {
    if (typeof document !== 'undefined') {
        const name = 'XSRF-TOKEN=';
        const cookies = document.cookie.split(';');

        for (const cookie of cookies) {
            const trimmedCookie = cookie.trim();
            if (trimmedCookie.startsWith(name)) {
                return trimmedCookie.substring(name.length);
            }
        }
    }
    return null;
}