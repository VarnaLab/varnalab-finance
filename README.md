
# [varnalab-finance](https://docs.google.com/spreadsheets/d/14z48BCI1EKQvvtBV47PRq9I3r9lVL5IQbdTsKXcf25w/pub)


## `--sync` All Years

```bash
node bin/ \
  --id 14z48BCI1EKQvvtBV47PRq9I3r9lVL5IQbdTsKXcf25w \
  --sync \
  --out /path/to/output/location/
```

## `--sync` Specific Year

```bash
node bin/ \
  --id 14z48BCI1EKQvvtBV47PRq9I3r9lVL5IQbdTsKXcf25w \
  --sync 2017 \
  --out /path/to/output/location/
```

## `--parse` CSV to JSON

```bash
node bin/ \
  --parse /path/to/csv/dump/location/ \
  --out /path/to/output/location/
```

## `--render` JSON to HTML

```bash
node bin/ \
  --render /path/to/parsed/finance.json \
  --out /path/to/output/location/
```

## Omit `--out` to write to stdout
