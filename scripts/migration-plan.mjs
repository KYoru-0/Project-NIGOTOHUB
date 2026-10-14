/**
 * Utility to identify and sequence SQL migration files.
 */

export function isMigrationFile(fileName) {
  return /^\d{4}_.*\.sql$/.test(fileName);
}

export function pendingMigrations(entries, applied = []) {
  const appliedSet = new Set(applied);
  const plan = [];

  for (const entry of entries) {
    const name = typeof entry === "string" ? entry.split("/").pop() : "";
    if (!name || !isMigrationFile(name)) continue;
    if (appliedSet.has(name)) continue;
    plan.push({ name, path: typeof entry === "string" ? entry : name });
  }

  plan.sort((a, b) => a.name.localeCompare(b.name));
  return plan;
}
