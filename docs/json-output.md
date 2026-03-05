# JSON Output

Flutterkill supports two JSON output modes that allow you to integrate it into automation scripts, monitoring systems, or other tools.

## Table of Contents

- [Output Modes](#output-modes)
- [JSON Structure](#json-structure)
- [Examples](#examples)
- [TypeScript Interfaces](#typescript-interfaces)
- [Use Cases](#use-cases)

## Output Modes

### Simple JSON (`--json`)

The `--json` option collects all results and outputs them as a single JSON object at the end of the scan. This is useful when you need all results at once for batch processing.

```bash
flutterkill --json
```

### Streaming JSON (`--json-stream`)

The `--json-stream` option outputs each result as a separate JSON object on its own line as soon as it's found. This is useful for real-time processing or when dealing with large scans where you want to start processing results immediately.

```bash
flutterkill --json-stream
```

## JSON Structure

### Simple JSON Output

The simple JSON format includes all results in a single object with metadata:

```json
{
  "version": 1,
  "results": [
    {
      "path": "/home/user/project1/build",
      "size": 157286400,
      "modificationTime": 1640995200000,
      "riskAnalysis": {
        "isSensitive": false
      }
    },
    {
      "path": "/home/user/project2/.dart_tool",
      "size": 89478400,
      "modificationTime": 1640995300000
    }
  ],
  "meta": {
    "resultsCount": 2,
    "runDuration": 1523
  }
}
```

### Streaming JSON Output

Each line in streaming mode contains a single result:

```json
{"version":1,"result":{"path":"/home/user/project1/build","size":157286400,"modificationTime":1640995200000,"riskAnalysis":{"isSensitive":false}}}
{"version":1,"result":{"path":"/home/user/project2/.dart_tool","size":89478400,"modificationTime":1640995300000}}
```

### Error Output

Errors are output to stderr in JSON format:

```json
{
  "version": 1,
  "error": true,
  "message": "Permission denied accessing /restricted/path",
  "timestamp": "1640995300000"
}
```

### Field Descriptions

- **`version`**: Schema version.
- **`path`**: Absolute path to the found directory.
- **`size`**: Directory size in bytes.
- **`modificationTime`**: Unix timestamp (milliseconds) of the most recently modified file.
- **`riskAnalysis`**: Optional risk assessment for deletion
  - **`isSensitive`**: Whether the directory might be important for system functionality.
  - **`reason`**: Human-readable explanation of the risk assessment.
- **`resultsCount`**: Total number of results found.
- **`runDuration`**: Total scan time in milliseconds.

## Examples

### Basic Usage

```bash
# Get all results as JSON
flutterkill --json > results.json

# Stream results in real-time
flutterkill --json-stream | while read line; do
  echo "Found: $(echo $line | jq -r '.result.path')"
done
```

### Using with jq for Processing

```bash
# Extract only paths larger than 100MB
flutterkill --json | jq '.results[] | select(.size > 104857600) | .path'

# Count total size of all build artifacts
flutterkill --json | jq '.results | map(.size) | add'

# Get the 5 largest directories
flutterkill --json | jq '.results | sort_by(.size) | reverse | .[0:5] | .[] | "\(.size | tostring) bytes: \(.path)"'

# Convert streaming output to a valid JSON array
flutterkill --json-stream | jq -s 'map(.result)'
```

### Error Handling

```bash
# Save results to file, ignore errors
flutterkill --json 2>/dev/null > results.json

# Save both results and errors to separate files
flutterkill --json-stream > results.jsonl 2> errors.jsonl

# Process only successful results in streaming mode
flutterkill --json-stream 2>/dev/null | jq -r '.result.path'
```

### Automation Examples

```bash
# Find and delete directories older than 30 days
flutterkill --json | jq -r '.results[] | select(.modificationTime < (now - 2592000) * 1000) | .path' | while read dir; do
  echo "Deleting old directory: $dir"
  rm -rf "$dir"
done

# Generate a report of space usage
flutterkill --json | jq -r '.results[] | "\(.path): \(.size / 1048576 | floor)MB"' > space-report.txt

# Monitor in real-time and alert on large directories
flutterkill --json-stream | jq -r 'select(.result.size > 524288000) | "LARGE DIR: \(.result.path) (\(.result.size / 1048576 | floor)MB)"'
```

### Integration with Other Tools

```bash
# Send results to a monitoring system
flutterkill --json-stream | while read line; do
  curl -X POST -H "Content-Type: application/json" -d "$line" http://monitoring-system/api/flutterkill
done

# Create a CSV report
echo "Path,Size(MB),LastModified,Status" > report.csv
flutterkill --json | jq -r '.results[] | "\(.path),\(.size/1048576|floor),\(.modificationTime),\(.status)"' >> report.csv

# Filter and format for human reading
flutterkill --json | jq -r '.results[] | select(.size > 52428800) | "📁 \(.path)\n   💾 Size: \(.size/1048576|floor)MB\n   📅 Modified: \(.modificationTime | strftime("%Y-%m-%d %H:%M:%S"))\n"'
```

## Interfaces

```typescript
interface JsonOutputBase {
  version: number;
}

interface JsonStreamOutput extends JsonOutputBase {
  result: CliScanFoundFolder;
}

interface JsonSimpleOutput extends JsonOutputBase {
  results: CliScanFoundFolder[];
  meta: {
    resultsCount: number;
    runDuration: number; // milliseconds
  };
}

interface JsonErrorOutput extends JsonOutputBase {
  error: true;
  message: string;
  timestamp: string;
}

interface CliScanFoundFolder {
  path: string;
  size: number; // bytes
  modificationTime: number; // Unix timestamp
  riskAnalysis?: {
    isSensitive: boolean;
    reason?: string;
  };
}
```
