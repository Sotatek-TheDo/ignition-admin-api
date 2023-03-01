import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { GetObjectOutput } from 'aws-sdk/clients/s3';
import { AppLogger } from 'src/shared/logger/logger.service';
import { RequestContext } from 'src/shared/request-context/request-context.dto';
import { v4 as uuid } from 'uuid';

import { S3UploadPolicy } from '../s3.types';

@Injectable()
export class S3Service {
  s3: S3;
  ctx: RequestContext;

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: AppLogger,
  ) {
    this.ctx = new RequestContext();
    this.logger.setContext(S3Service.name);
    this.s3 = new S3({
      region: this.configService.get('aws.region'),
    });
  }

  async uploadFile({
    file,
    policy = S3UploadPolicy.PUBLIC_READ,
    path = '',
  }: {
    file: Express.Multer.File;
    policy: S3UploadPolicy;
    path?: string;
  }): Promise<any> {
    const fileExtension = file?.originalname?.split('.')?.pop() || '';
    if (!fileExtension) {
      throw new Error('File extension not found!');
    }
    const buffer = file.buffer;
    const filename = `${
      path ? `${path}/` : ''
    }${uuid()}-${Date.now()}.${fileExtension}`;
    const response = await this.s3
      .upload({
        Bucket: this.configService.get<string>('aws.bucketName'),
        Body: buffer,
        ContentType: file.mimetype,
        Key: filename,
        ACL: policy,
      })
      .promise();

    return response;
  }

  async getS3SignedUrl({
    bucket,
    s3key,
    fileType,
  }: {
    fileType: string;
    bucket: string;
    s3key: string;
  }): Promise<string> {
    const { key, bucket: bucketName } = this.getKeyAndBucket(s3key, bucket);

    return this.s3.getSignedUrlPromise('getObject', {
      Bucket: bucketName,
      Key: key,
      Expires: 3600,
      ResponseContentType: fileType,
    });
  }

  private getKeyAndBucket(
    s3Key: string,
    s3Bucket: string,
  ): { bucket: string; key: string } {
    let key = s3Key;
    let bucket = s3Bucket;
    if (key.includes('/')) {
      const splittedBySlash = key.split('/');
      const len = splittedBySlash.length;
      key = splittedBySlash[len - 1];
      if (len > 1) {
        bucket += `/${splittedBySlash.slice(0, len - 1).join('/')}`;
      }
    }

    return {
      key,
      bucket,
    };
  }

  async uploadBuffer({
    bucket,
    buffer,
    key,
    policy = S3UploadPolicy.PUBLIC_READ,
    contentType,
  }: {
    buffer: Buffer;
    key: string;
    bucket: string;
    policy: S3UploadPolicy;
    contentType: string;
  }): Promise<S3.ManagedUpload.SendData> {
    console.log('key', key);

    const response = await this.s3
      .upload({
        Bucket: bucket || this.configService.get<string>('aws.bucketName'),
        Body: buffer,
        Key: key,
        ContentType: contentType,
        ACL: policy,
      })
      .promise();

    return response;
  }

  async getObject(s3Key: string, bucket: string): Promise<GetObjectOutput> {
    const response = await this.s3
      .getObject({
        Bucket: bucket || this.configService.get<string>('aws.bucketName'),
        Key: s3Key,
      })
      .promise();

    return response;
  }

  async deleteS3File({
    bucket,
    s3key,
  }: {
    bucket: string;
    s3key: string;
  }): Promise<void> {
    await this.s3
      .deleteObject({
        Bucket: bucket,
        Key: s3key,
      })
      .promise();
  }
}
