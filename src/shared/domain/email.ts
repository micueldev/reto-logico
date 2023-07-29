export class Email {
    private static emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    public static validate(email: string): boolean {
        return Email.emailRegex.test(email);
    }
}