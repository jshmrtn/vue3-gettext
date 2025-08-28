import { exec } from "node:child_process";

export function execShellCommand(cmd: string) {
  return new Promise((resolve) => {
    exec(cmd, { env: process.env }, (error, stdout, stderr) => {
      if (error) {
        console.warn(error);
      }
      resolve(stdout ? stdout : stderr);
    });
  });
}
