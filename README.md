# Component builder for Unirender

- Connect unirender-app-vue volume
- Connect output directory volume

Send a post request to "/build" to build.

## Request params:

```
{
  "component": <string>,
  "version": <number>, default: 0
  "format": <"umd" | "umd-min">, default: "umd-min"
  "destination": <"dev" | "prod">, default: "dev"
}
```
