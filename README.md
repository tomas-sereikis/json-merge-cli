# json-merge-cli

JSON merge CLI tool is used for merging JSON file with custom params via cli.

### Installing

```sh
npm install json-merge-cli -g
```

### Usage

Source file `some.json`

```json
{
  "file": "some.json",
  "test": "yes"
}
```

```
json-merge-cli --src some.json --dest .some.json --params.test no --params.other.test yes
```

Output file `.some.json`

```json
{
  "file": "some.json",
  "test": "no",
  "other": {
    "test": "yes"
  }
}
```