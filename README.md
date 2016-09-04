# Run
```bash
bundle exec puma
```

# Bundle
```bash
cd public
jspm bundle-sfx src/index bundle.js --minify --skip-source-maps
```

# Server Test
```bash
curl -s -X POST localhost:9292/assemble -d@server-test.json | jq
```
