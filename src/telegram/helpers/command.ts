export interface Command {
  name: string;
  args: string[];
  id?: number;
  target?: string;
}

const COMMAND_RE: RegExp = /^\/([a-zA-Z]*)_?(\d*)([^\n ]*)[ ]*(.*)/;

export function parseCommand(text: string) {
  if (COMMAND_RE.test(text)) {
    const parts = text.match(COMMAND_RE) || [];
    const command: Command = {
      name: parts[1].toLowerCase(),
      args: parts[4].match(/\S+/g) || [],
    };
    if (parts[2] !== '') command.id = Number(parts[2]);
    if (parts[3] !== '') command.target = parts[3];

    return command;
  }

  return null;
}
