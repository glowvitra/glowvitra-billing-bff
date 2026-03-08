import * as fs from 'node:fs';
import * as path from 'node:path';

// Load the .env.test configuration natively before Jest instantiates the application modules
const envPath = path.join(__dirname, '../.env.test');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf8');
  envConfig.split('\n').forEach((line) => {
    const trimmedLine = line.trim();
    if (trimmedLine && !trimmedLine.startsWith('#')) {
      const [key, ...values] = trimmedLine.split('=');
      if (key) {
        process.env[key.trim()] = values.join('=').trim();
      }
    }
  });
}
