import { HttpService } from '@nestjs/axios';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';

import { CLOUDFLARE_TURNSTILE_API_URL } from '@/src/shared/constants/turnstile.constants';
import {
  TurnstileOptions,
  TurnstileOptionsSymbol,
} from '@/src/shared/types/turnstile.type';

@Injectable()
export class TurnstileService {
  private readonly secretKey: string;
  private readonly apiUrl: string;

  public constructor(
    @Inject(TurnstileOptionsSymbol)
    private readonly options: TurnstileOptions,
    private readonly httpService: HttpService,
  ) {
    this.secretKey = this.options.secretKey;
    this.apiUrl = CLOUDFLARE_TURNSTILE_API_URL;
  }

  public async validateToken(token: string) {
    const { data } = await firstValueFrom(
      this.httpService
        .post(`${this.apiUrl}/siteverify`, {
          response: token,
          secret: this.secretKey,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
        .pipe(
          catchError((error) => {
            throw new InternalServerErrorException(
              `Failed turnstile verification: ${error}`,
            );
          }),
        ),
    );

    return data;
  }
}
