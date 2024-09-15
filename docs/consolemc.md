---
sidebar_position: 6
---

# ConsoleMC

ConsoleMC is available on [Modrinth](https://modrinth.com/mod/consolemc) and [Curseforge](https://www.curseforge.com/minecraft/mc-mods/consolemc).

This mod allows You to execute shell commands (system commands) on the server's machine through the minecraft chat. The command requires operator rights.

:::danger

This mod can be very dangerous on public servers and may only be used with caution. Anyone that is an operator on the server can do **ANYTHING** to the server and potentially all systems connected to the network.

USE AT YOUR OWN RISK!

:::

## /cmd Command

The command `/cmd` works as follows

```properties
/cmd [shell command]
```

The shell command is the command that is to be executed on the server's host machine.

## Examples (Linux/MacOS)

Below are a few examples.

### Server Uptime
The command to get the uptime of a server (how long the host computer has been running for) is `uptime`.

By running the following command, you will get the uptime for servers

```properties
/cmd uptime
```

Result (Example):

```properties
[cmd] 03:31:58 up 14 days,  4:50,  2 users,  load average: 0.72, 0.85, 0.97
```

### Cowsay
A simple program that returns a message as a talking cow ASCII art

```properties
/cmd cowsay "Hello World!"
```

Result (Example):

```properties
[cmd]  _____________
[cmd] < Hello World >
[cmd]  -------------
[cmd]         \   ^__^
[cmd]          \  (oo)\_______
[cmd]             (__)\       )\/\ 
[cmd]                 ||----w |
[cmd]                 ||     ||
```

## Further Inspiration and Ideas
For more examples and similar usecases check out the [BetterConsoleMC Examples](/betterconsolemc/examplecommands)
