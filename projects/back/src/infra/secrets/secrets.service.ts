import { Injectable } from '@nestjs/common';
import * as argon2 from '@node-rs/argon2';
import { nanoid } from 'nanoid';

@Injectable()
export class SecretService {
  async encrypt(PEPPER: string, data: string) {
    const SALT = nanoid();
    const SEASONED = data + SALT + PEPPER;
    const HASH = await argon2.hash(SEASONED);
    return { hash: HASH, salt: SALT };
  }

  async validate(SALT: string, PEPPER: string, HASH: string, data: string): Promise<boolean> {
    const SEASONED = data + SALT + PEPPER;
    return await argon2.verify(HASH, SEASONED);
  }
}
