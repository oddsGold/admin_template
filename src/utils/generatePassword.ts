export default function generatePassword(length:number = 12) {
    const chars = {
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-=',
    };

    const allChars = chars.lowercase + chars.uppercase + chars.numbers + chars.symbols;
    let password = '';

    for (let i = 0; i < length; i++) {
        password += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }

    return password;
}
