import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { BasicStrategy as Strategy } from 'passport-http';

@Injectable()
export class BasicAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      passReqToCallback: true,
    });
  }

  public validate = async (
    req,
    username: string,
    password: string,
  ): Promise<boolean> => {
    if (
      this.configService.get<string>('basicAuth.username') === username &&
      this.configService.get<string>('basicAuth.password') === password
    ) {
      return true;
    }
    throw new UnauthorizedException();
  };
}
