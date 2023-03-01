import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { plainToClass } from 'class-transformer';
import { User } from 'src/modules/user/entities/user.entity';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import Web3 from 'web3';

import { UserOutput } from '../../modules/user/dtos/user-output.dto';
import { UserService } from '../../modules/user/services/user.service';
import { AppLogger } from '@shared/logger/logger.service';
import { RequestContext } from '@shared/request-context/request-context.dto';
import { ROLE } from '../constants/role.constant';
import { RegisterInput } from '../dtos/auth-register-input.dto';
import { RegisterOutput } from '../dtos/auth-register-output.dto';
import {
  AuthTokenOutput,
  UserAccessTokenClaims,
} from '../dtos/auth-token-output.dto';
import { VerifyWalletAddressInput } from '../dtos/verify-wallet-address-input.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(AuthService.name);
  }

  async validateUser(
    ctx: RequestContext,
    username: string,
    pass: string,
  ): Promise<UserAccessTokenClaims> {
    this.logger.log(ctx, `${this.validateUser.name} was called`);

    // The userService will throw Unauthorized in case of invalid username/password.
    const user = await this.userService.validateUsernamePassword(
      ctx,
      username,
      pass,
    );

    // Prevent disabled users from logging in.
    if (user.isAccountDisabled) {
      throw new UnauthorizedException('This user account has been disabled');
    }

    return user;
  }

  login(ctx: RequestContext): AuthTokenOutput {
    this.logger.log(ctx, `${this.login.name} was called`);

    return this.getAuthToken(ctx, ctx.user);
  }

  async register(
    ctx: RequestContext,
    input: RegisterInput,
  ): Promise<RegisterOutput> {
    this.logger.log(ctx, `${this.register.name} was called`);

    // TODO : Setting default role as USER here. Will add option to change this later via ADMIN users.
    input.roles = [ROLE.USER];
    input.isAccountDisabled = false;

    const registeredUser = await this.userService.createUser(ctx, input);
    return plainToClass(RegisterOutput, registeredUser, {
      excludeExtraneousValues: true,
    });
  }

  async refreshToken(ctx: RequestContext): Promise<AuthTokenOutput> {
    this.logger.log(ctx, `${this.refreshToken.name} was called`);

    const user = await this.userService.findById(ctx, ctx.user.id);
    if (!user) {
      throw new UnauthorizedException('Invalid user id');
    }

    return this.getAuthToken(ctx, user);
  }

  getAuthToken(
    ctx: RequestContext,
    user: UserAccessTokenClaims | UserOutput,
  ): AuthTokenOutput {
    this.logger.log(ctx, `${this.getAuthToken.name} was called`);

    const subject = { sub: user.id };
    const payload = {
      username: user.username,
      sub: user.id,
      roles: user.roles,
    };

    const authToken = {
      refreshToken: this.jwtService.sign(subject, {
        expiresIn: this.configService.get('jwt.refreshTokenExpiresInSec'),
      }),
      accessToken: this.jwtService.sign(
        { ...payload, ...subject },
        { expiresIn: this.configService.get('jwt.accessTokenExpiresInSec') },
      ),
    };
    return plainToClass(AuthTokenOutput, authToken, {
      excludeExtraneousValues: true,
    });
  }

  async verifyWalletAddress(
    ctx: RequestContext,
    input: VerifyWalletAddressInput,
  ): Promise<boolean> {
    this.logger.log(ctx, `${this.verifyWalletAddress.name} was called`);

    const { address, message, signature } = input;

    const web3 = new Web3();
    const recover = web3.eth.accounts.recover(message, signature);
    const recoverConvert = Web3.utils.toChecksumAddress(recover);
    const walletAddress = Web3.utils.toChecksumAddress(address);

    if (recoverConvert && recoverConvert !== walletAddress) {
      throw new Error('Invalid signature!');
    }

    return true;
  }

  async validateToken(token: string): Promise<{
    success: boolean;
    user: Partial<User>;
  }> {
    const jwtPayload = this.jwtService.verify(token);
    const user = await this.userRepository.findOne(jwtPayload.sub);
    return {
      success: !!user,
      user,
    };
  }
}
