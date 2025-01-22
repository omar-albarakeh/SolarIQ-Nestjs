import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class TokenService {
  extractToken(authorizationHeader: string): string {
    if (!authorizationHeader) {
      throw new UnauthorizedException('Authorization header is missing.');
    }

    const parts = authorizationHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      throw new UnauthorizedException('Malformed authorization header.');
    }

    return parts[1];
  }
}