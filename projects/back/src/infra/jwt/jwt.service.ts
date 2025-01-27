import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export interface JwtSignConfig {
  expires_in: number;
}

export interface JwtVerify<T> {
  status: 'VALID' | 'INVALID';
  payload: T | undefined;
}

@Injectable()
export class JwtService {
  sign<T extends string | Buffer | object>(
    data: T,
    SECRET: string,
    config: JwtSignConfig,
  ): string {
    const signOptions: any = { expiresIn: config.expires_in }; // Correctly defining options
    return jwt.sign(data, SECRET, signOptions);
  }

  verify<T>(token: string, SECRET: string): JwtVerify<T> {
    try {
      const decoded = jwt.verify(token, SECRET);
      return {
        status: 'VALID',
        payload: decoded as T,
      };
    } catch (_error) {
      return {
        status: 'INVALID',
        payload: undefined,
      };
    }
  }
}
