import bcrypt from 'bcrypt';

export class Bcrypt {
    private static salts: number = 10;

    public static encrypt(password: string) {
        return bcrypt.hash(password, this.salts);
    }
}