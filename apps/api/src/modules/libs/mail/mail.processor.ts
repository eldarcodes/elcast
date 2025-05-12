import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

import { MAIL_QUEUE_NAME } from '@/src/shared/constants/queue.constants';

import { MailService } from './mail.service';

const isMockMail = (mail: string) => mail.endsWith('@eldarcodes.com');

@Processor(MAIL_QUEUE_NAME)
export class MailProcessor extends WorkerHost {
  constructor(private readonly mailService: MailService) {
    super();
  }

  process(job: Job) {
    if (isMockMail(job.data.to)) {
      return Promise.resolve();
    }

    return this.mailService.sendMail(
      job.data.to,
      job.data.subject,
      job.data.html,
    );
  }
}
