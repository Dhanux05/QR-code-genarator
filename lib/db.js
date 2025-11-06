import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

// Ensure the data directory exists
function ensureDataDir() {
  const dataDir = path.dirname(DB_PATH);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Read all entries from db.json
export function getAllEntries() {
  try {
    ensureDataDir();
    if (!fs.existsSync(DB_PATH)) {
      fs.writeFileSync(DB_PATH, JSON.stringify([], null, 2));
      return [];
    }
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading database:', error);
    return [];
  }
}

// Get a single entry by ID
export function getEntryById(id) {
  const entries = getAllEntries();
  return entries.find(entry => entry.id === id);
}

// Add a new entry
export function addEntry(entry) {
  try {
    const entries = getAllEntries();
    entries.push(entry);
    fs.writeFileSync(DB_PATH, JSON.stringify(entries, null, 2));
    return entry;
  } catch (error) {
    console.error('Error adding entry:', error);
    throw new Error('Failed to save entry');
  }
}

// Update an existing entry
export function updateEntry(id, updatedData) {
  try {
    const entries = getAllEntries();
    const index = entries.findIndex(entry => entry.id === id);
    
    if (index === -1) {
      throw new Error('Entry not found');
    }
    
    entries[index] = { ...entries[index], ...updatedData };
    fs.writeFileSync(DB_PATH, JSON.stringify(entries, null, 2));
    return entries[index];
  } catch (error) {
    console.error('Error updating entry:', error);
    throw new Error('Failed to update entry');
  }
}

// Delete an entry
export function deleteEntry(id) {
  try {
    const entries = getAllEntries();
    const filtered = entries.filter(entry => entry.id !== id);
    fs.writeFileSync(DB_PATH, JSON.stringify(filtered, null, 2));
    return true;
  } catch (error) {
    console.error('Error deleting entry:', error);
    throw new Error('Failed to delete entry');
  }
}
