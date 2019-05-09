import { spawn } from 'child_process';
// @ts-ignore
import copydir from 'copy-dir';
import fs from 'fs';
import mkdirp from 'mkdirp';
import path from 'path';
import rimraf from 'rimraf';
import { promisify } from 'util';

const copydirAsync = promisify(copydir);
const mkdirpAsync = promisify(mkdirp);
const rimrafAsync = promisify(rimraf);

interface CommandOptions {
  logError: boolean;
}

const generateApp = (to: string): Promise<void> => {
  console.log(`Copying app template to ${to}`);

  return copydirAsync(path.join(__dirname, '..', 'template'), to);
};

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const writeReport = (dir: string, report: any): void => {
  const dataDir = path.join(dir, 'src', 'data');
  const location = path.join(dataDir, 'gimbal.json');

  mkdirp.sync(dataDir);

  console.log(`Writing gimbal report to ${location}`);

  fs.writeFileSync(location, JSON.stringify(report, null, 2), 'utf8');
};

const doCommand = (dir: string, args: string[], options: CommandOptions): Promise<void> =>
  new Promise(
    (resolve, reject): void => {
      console.log(`Executing: ${args.join(' ')}`);

      const spawned = spawn(args[0], args.slice(1), {
        cwd: dir,
        env: process.env,
        timeout: 5 * 1000 * 60, // 5 minutes
      });

      if (options && options.logError) {
        spawned.stderr.on('data', (data: Buffer): void => console.log(data.toString()));
      }

      spawned.on(
        'close',
        (code: number): void => {
          if (code) {
            reject();
          } else {
            resolve();
          }
        },
      );
    },
  );

const maybeDoCommand = (
  dir: string,
  foo: boolean | string,
  defaultFoo: string[],
  options: CommandOptions,
): void | Promise<void> => {
  if (foo) {
    const args = foo === true ? defaultFoo : foo.split(' ');

    return doCommand(dir, args, options);
  }

  return undefined;
};

const doInstall = (dir: string, install: boolean | string, options: CommandOptions): Promise<void> | void =>
  maybeDoCommand(dir, install, ['npm', 'install'], options);
const doBuild = (dir: string, build: boolean | string, options: CommandOptions): Promise<void> | void =>
  maybeDoCommand(dir, build, ['npm', 'run', 'build'], options);
const doClean = (dir: string): Promise<void> => {
  console.log(`Cleaning ${dir}`);

  return rimrafAsync(dir).then((): Promise<void> => mkdirpAsync(dir));
};

interface PluginOptions {
  commandOptions: {
    cwd: string;
  };
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  event: any;
}

interface PluginConfig {
  build: boolean | string;
  clean: boolean;
  install: boolean | string;
  logError: boolean;
  out: string;
}

interface EventOptions {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  report: any;
}

const createGimbalReactOutput = ({ commandOptions: { cwd }, event }: PluginOptions, config: PluginConfig): void => {
  const { build = true, clean = true, install = true, logError = false, out = './artifacts/report' } = config;
  const dir = path.join(cwd, out);

  event.on(
    'command/*/end',
    (name: string, { report }: EventOptions): Promise<void> => {
      console.log(`Writing out Gimbal report as a React app to: ${dir}`);
      console.log();

      return (clean ? doClean(dir) : Promise.resolve())
        .then((): Promise<void> => generateApp(dir))
        .then((): void => writeReport(dir, report))
        .then(
          (): Promise<void> | void =>
            doInstall(dir, install, {
              logError,
            }),
        )
        .then(
          (): Promise<void> | void =>
            doBuild(dir, build, {
              logError,
            }),
        )
        .then(
          (): void => {
            console.log();
            console.log('Gimbal report as a React app finished!');
            console.log();
          },
        );
    },
  );
};

export default createGimbalReactOutput;
