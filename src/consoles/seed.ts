import { ConfigService } from '@nestjs/config';
import { Command, Console, createSpinner } from 'nestjs-console';

@Console()
export class SeedConsole {
  constructor(private readonly configService: ConfigService) {}

  @Command({
    command: 'hello-world',
  })
  async update(): Promise<void> {
    const spin = createSpinner();
    spin.start('Start hello world command!');
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve(() => {
          console.log('Hello world');
        });
      }, 1000),
    );
    spin.succeed('Hello world command finished!');
  }
}
