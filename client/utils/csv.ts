import { CategoryRule } from "@/data/demo";

export interface ParsedCSVRow {
  date: string;
  payee: string;
  amount: number;
  notes?: string;
}

export function parseCSV(csvText: string): ParsedCSVRow[] {
  const lines = csvText.split(/\r?\n/).filter(Boolean);
  if (lines.length === 0) return [];
  const header = lines[0].split(",").map((h) => h.trim().toLowerCase());
  const iDate = header.indexOf("date");
  const iPayee = header.indexOf("payee");
  const iAmount = header.indexOf("amount");
  const iNotes = header.indexOf("notes");
  return lines.slice(1).map((line) => {
    const cols = splitCSVLine(line);
    return {
      date: cols[iDate] ?? "",
      payee: cols[iPayee] ?? "",
      amount: Number((cols[iAmount] ?? "0").replace(/[^0-9.-]/g, "")),
      notes: iNotes >= 0 ? cols[iNotes] : undefined,
    } as ParsedCSVRow;
  });
}

function splitCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result.map((s) => s.trim());
}

export function categorize(payee: string, rules: CategoryRule[], fallback = "Other"): string {
  for (const r of rules) {
    if (r.match.test(payee)) return r.category;
  }
  return fallback;
}
