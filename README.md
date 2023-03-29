# cypress-crash win 10

- cypress 8.3.1 ok
- cypress 9.7.0 ok
- cypress 10.0.0 ok
- cypress 10.4.0 ok
- cypress 10.5.0 ok
- cypress 10.6.0 ok
- cypress 10.10.0 ok
- cypress 12.2.0 ok?!?!?!

# cypress-perf

ab 169 -> 50er run

9:00 - 11:20

- CYPRESS_NO_COMMAND_LOG=1
- Chrome 98.0.4758.82 (Official Build) (64-bit)
- Windows 10, i7-8700, 16 GB, SSD, MS Defender (no custom configuration)

`set CYPRESS_NO_COMMAND_LOG=1 && npx cypress run --browser chrome --headless`

| Version | Video | Headless | Browser              | CYPRESS_NO_COMMAND_LOG | Time Chrome            | ..  |
| ------- | ----- | -------- | -------------------- | ---------------------- | ---------------------- | --- |
| 6.9.1   | true  | false    | Chrome               | 1                      | 1:36                   |     |
| 6.9.1   | true  | true     | Chrome               | 1                      | 1:30                   |     |
| 6.9.1   | false | false    | Chrome               | 1                      | ?                      |     |
| 6.9.1   | false | true     | Chrome               | 1                      | 1:28                   |     |
| 7.5.0   | true  | true     | Chrome               | 1                      |                        |     |
| 7.5.0   | false | true     | Chrome               | 1                      | 1:31                   |     |
| 8.3.1   | true  | true     | Chrome               | 1                      | 1:32                   |     |
| 8.3.1   | false | true     | Chrome               | 1                      | 1:32                   |     |
| 8.3.1   | false | true     | Electron             | 1                      | 1:25                   |     |
| 8.3.1   | false | true     | Electron             | 0                      | 1:23                   |     |
| 8.3.1   | false | false    | Electron             | 1                      |                        |     |
| 8.3.1   | false | false    | Electron             | 0                      |                        |     |
| 8.7.0   | true  | true     | Chrome               | 1                      |                        |     |
| 8.7.0   | false | true     | Chrome               | 1                      | 1:29                   |     |
| 9.4.1   | true  | true     | Chrome               | 1                      |                        |     |
| 9.4.1   | false | true     | Chrome               | 1                      | 1:15                   |     |
| 9.5.0   | true  | true     | Chrome               | 1                      | 1:14                   |     |
| 9.5.0   | false | true     | Chrome               | 1                      | 1:17                   |     |
| 9.5.0   | false | true     | Chrome 98.0.4758.102 | 1                      | 1:18                   |     |
| 9.5.0   | false | true     | Chrome 98.0.4758.102 | 0                      | 1:17                   |     |
| 9.5.0   | true  | true     | Electron             | 1                      | 1:08                   |     |
| 9.5.0   | true  | true     | Electron             | 0                      | 1:10                   |     |
| 9.5.0   | false | true     | Electron             | 1                      | 1:07, 1:09             |     |
| 9.5.0   | false | true     | Electron             | 0                      | 1:08, 1:08, 1:10, 1:11 |     |
| 9.5.0   | true  | false    | Electron             | 1                      |                        |     |
| 9.5.0   | true  | false    | Electron             | 0                      |                        |     |
| 9.5.0   | false | false    | Electron             | 1                      | 1:07                   |     |
| 9.5.0   | false | false    | Electron             | 0                      | 1:09                   |     |

Cypress: 8.3.1 | Browser: Electron 91 (headless)

## electron without command log

`"cy:run-electron-log=1": "set CYPRESS_NO_COMMAND_LOG=1 && npx cypress run --headless"`

Cypress: 9.5.0 │ Browser: Electron 94 (headless) │ Node Version: v16.13.2 (C:\Program Files\nodejs\node.exe)

## electron with command log

`"cy:run-electron-log=0": "set CYPRESS_NO_COMMAND_LOG=0 && npx cypress run --headless"`

Cypress: 9.5.0 │ Browser: Electron 94 (headless) │ Node Version: v16.13.2 (C:\Program Files\nodejs\node.exe)
