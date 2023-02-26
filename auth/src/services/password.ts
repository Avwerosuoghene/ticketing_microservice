import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

// This enables us to convert the implementation from callback to async, so we can use async await
const scryptAsync = promisify(scrypt);

export class Password {

  // static method are methods that we can access without creating an instance of a class
  static async toHash(password: string) {
    const salt = randomBytes(8).toString('hex');
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buf.toString('hex')}.${salt}`;
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split('.');
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

    return buf.toString('hex') === hashedPassword;
  }
}
