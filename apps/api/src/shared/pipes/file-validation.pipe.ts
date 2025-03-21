import type { ReadStream } from 'node:fs';
import {
  type ArgumentMetadata,
  BadRequestException,
  Injectable,
  type PipeTransform,
} from '@nestjs/common';

import { MAX_FILE_SIZE } from '../constants/file.constants';
import { validateFileFormat, validateFileSize } from '../utils/file.util';

interface File {
  filename: string;
  createReadStream: () => ReadStream;
}

@Injectable()
export class FileValidationPipe implements PipeTransform {
  public async transform(value: File, metadata: ArgumentMetadata) {
    if (!value.filename) {
      throw new BadRequestException('File is not uploaded');
    }

    const { filename, createReadStream } = value;

    const fileStream = createReadStream() as ReadStream;

    const allowedFormats = ['png', 'jpg', 'jpeg', 'gif', 'webp'];
    const isFileFormatValid = validateFileFormat(filename, allowedFormats);

    if (!isFileFormatValid) {
      throw new BadRequestException('File format is not allowed');
    }

    const isFileSizeValid = await validateFileSize(fileStream, MAX_FILE_SIZE);

    if (!isFileSizeValid) {
      throw new BadRequestException('File size is too large');
    }

    return value;
  }
}
