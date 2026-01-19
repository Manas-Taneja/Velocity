-- Seed data for Velocity Platform

-- Problem 1: Messy CSV Parsing
INSERT INTO public.problems (slug, title, difficulty, tags, description, ideal_solution_outline, example_prompts_for_ai)
VALUES (
    'messy-csv-parsing',
    'The Data Landfill',
    'medium',
    '["regex", "parsing", "data-cleaning"]'::jsonb,
    'You have received a 50MB export from a legacy system. The format is ostensibly CSV, but it is a nightmare. Some lines use commas, some use semicolons, and some use pipes (|). There are escaped quotes in the wrong places, and line breaks within fields. Your task is to write a script to normalize this into a clean, RFC-4180 compliant CSV file.',
    '1. Detect the delimiter per line or uses a robust sniffer.\n2. Handle multi-line fields by tracking quote balance.\n3. Normalize all delimiters to commas.\n4. Escape fields containing commas or quotes correctly.',
    '["Help me write a regex to match lines with different delimiters", "How do I handle newlines inside CSV fields in Python?"]'::jsonb
);

-- Problem 2: Timezone Debugging
INSERT INTO public.problems (slug, title, difficulty, tags, description, ideal_solution_outline, example_prompts_for_ai)
VALUES (
    'timezone-debugging',
    'Temporal Drift',
    'hard',
    '["datetime", "timezones", "debugging"]'::jsonb,
    'A scheduled job is firing at 3 AM local time instead of 3 AM UTC, but only on the second Tuesday of the month. The server is set to UTC. The database is in EST. The user is in IST. Figure out why the notification is being sent 9.5 hours early.',
    '1. Identify all sources of time (Server, DB, User Browser, Scheduler).\n2. Trace the timestamp conversion chain.\n3. Identify the double-conversion or missing offset.\n4. Fix the scheduler configuration to use explicit timezone object.',
    '["Explain how Python datetime.now() differs from datetime.utcnow()", "What is the offset difference between EST and IST?"]'::jsonb
);

-- Problem 3: PII Scrubber
INSERT INTO public.problems (slug, title, difficulty, tags, description, ideal_solution_outline, example_prompts_for_ai)
VALUES (
    'pii-scrubber',
    'Leak Containment',
    'easy',
    '["security", "regex", "scripting"]'::jsonb,
    'We accidentally dumped a debug log containing customer emails and credit card numbers (Luhn valid) into a public S3 bucket. Write a script to scan the text and redaction all emails (replace with [EMAIL]) and credit cards (replace with [CC]). Do not destroy other data.',
    '1. Use regex to identify email patterns.\n2. Use regex to identify potential CC numbers (13-19 digits).\n3. Apply Luhn algorithm to verify CC numbers before redacting (to avoid false positives like long IDs).\n4. Replace matches in-place.',
    '["Write a regex for email validation", "How to implement Luhn algorithm in TypeScript"]'::jsonb
);
