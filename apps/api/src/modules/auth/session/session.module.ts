import { Module } from '@nestjs/common';

import { PubSubService } from '@/src/core/pubsub/pubsub.service';

import { VerificationService } from '../verification/verification.service';

import { SessionResolver } from './session.resolver';
import { SessionService } from './session.service';

@Module({
  providers: [
    PubSubService,
    SessionResolver,
    SessionService,
    VerificationService,
  ],
})
export class SessionModule {}
