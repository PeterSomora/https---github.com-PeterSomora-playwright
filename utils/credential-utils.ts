export function maskPassword(password: string): string {
    const firstChar = password.charAt(0);
    const lastChar = password.charAt(password.length - 1);
    const maskedLength = password.length - 2;
    return `${firstChar}${'*'.repeat(maskedLength)}${lastChar}`;
}