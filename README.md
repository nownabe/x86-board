# Run locally
```bash
docker run -p 9292:80 nownabe/x86-emulator-js
```

# Development
## Run
```bash
bundle exec puma
```

## Bundle
```bash
cd public
jspm bundle-sfx src/index bundle.js --minify --skip-source-maps
```

## Build
```bash
docker build -t x86-emulator-js .
docker run -p 9292:80 x86-emulator-js
```

## Test to Assemble
```bash
curl -s -X POST localhost:9292/assemble -d@server-test.json | jq
```
