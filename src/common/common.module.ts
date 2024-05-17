import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AzureBlobService } from '../common/services/s3/azure.service';

@Module({
  imports: [ConfigModule],
  providers: [AzureBlobService],
  exports: [AzureBlobService],
})
export class CommonModule {}
