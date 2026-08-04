#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const source = path.join(root, "2026 AĞUSTOS ECE HOCA YÖKDİL KAMP KELİMELERİ.pdf");
const categories = ["VERB", "ADJECTIVE", "ADVERB", "NOUN", "PHRASAL VERB"];
const expectedCounts = { 1: 124, 2: 125, 3: 125, 4: 125, 5: 125 };

function parseEntry(paragraph, day, category) {
  const normalized = paragraph
    .replace(/\s*\n\s*/g, " ")
    .replace(/\s+\[Not:.*?\]\s*$/, "")
    .trim();
  const match = normalized.match(/^([^:]+):\s*(.*?)\s*\(Synonym:\s*(.*?)\)\s*\*?\s*$/);

  if (!match) {
    throw new Error(`Gün ${day}, ${category}: çözümlenemeyen kayıt: ${normalized}`);
  }

  return {
    en: match[1].trim().toLocaleLowerCase("en-US"),
    tr: match[2].trim(),
    note: `Eş anlamlılar: ${match[3].trim()}`,
  };
}

function parseDays(text) {
  const campaign = text
    .split("SON TEKRAR")[0]
    .replace(/\f/g, "\n\n");
  const dayParts = campaign.split(/(?:^|\n)([1-5])\.GÜN\s*\n/);
  const days = [];

  for (let index = 1; index < dayParts.length; index += 2) {
    const day = Number(dayParts[index]);
    const categoryParts = dayParts[index + 1].split(
      /(?:^|\n)(VERB|ADJECTIVE|ADVERB|NOUN|PHRASAL VERB)\s*\n/
    );
    const groups = [];

    for (let categoryIndex = 1; categoryIndex < categoryParts.length; categoryIndex += 2) {
      const category = categoryParts[categoryIndex];
      const entries = categoryParts[categoryIndex + 1]
        .trim()
        .split(/\n\s*\n/)
        .filter(Boolean)
        .map((paragraph) => parseEntry(paragraph, day, category));
      groups.push({ category, entries });
    }

    const actualCategories = groups.map((group) => group.category);
    if (JSON.stringify(actualCategories) !== JSON.stringify(categories)) {
      throw new Error(`Gün ${day}: kategori sırası beklenenden farklı.`);
    }

    const total = groups.reduce((sum, group) => sum + group.entries.length, 0);
    if (total !== expectedCounts[day]) {
      throw new Error(`Gün ${day}: ${expectedCounts[day]} yerine ${total} kayıt bulundu.`);
    }

    days.push({ day, groups });
  }

  if (days.length !== 5) {
    throw new Error(`5 yerine ${days.length} gün bulundu.`);
  }

  return days;
}

function quote(value) {
  return JSON.stringify(value);
}

function renderDay({ day, groups }) {
  const lines = [
    `// 2026 YÖKDİL KAMP KELİMELERİ — ${day}. GÜN`,
    "// Kaynak: 2026 AĞUSTOS ECE HOCA YÖKDİL KAMP KELİMELERİ.pdf",
    "window.DATA = window.DATA || {};",
    "window.DATA.wordSets = window.DATA.wordSets || [];",
    "window.DATA.wordSets.push({",
    `  id: "yokdil-kamp-${day}-gun",`,
    `  name: "2026 YÖKDİL Kamp Kelimeleri – ${day}. Gün",`,
    "  items: [",
  ];

  groups.forEach((group, groupIndex) => {
    lines.push(`    // ${group.category}`);
    group.entries.forEach((entry) => {
      lines.push(
        `    { en: ${quote(entry.en)}, tr: ${quote(entry.tr)}, note: ${quote(entry.note)} },`
      );
    });
    if (groupIndex < groups.length - 1) lines.push("");
  });

  lines[lines.length - 1] = lines[lines.length - 1].replace(/,$/, "");
  lines.push("  ]", "});", "");
  return lines.join("\n");
}

function extractPdf() {
  try {
    return execFileSync("pdftotext", ["-layout", source, "-"], { encoding: "utf8" });
  } catch (error) {
    // Bazı kısıtlı çalışma ortamları işlemi EPERM ile işaretlese de çıktıyı verir.
    if (error.stdout) return String(error.stdout);
    throw error;
  }
}

const extractedText = process.argv[2];
const text = extractedText
  ? fs.readFileSync(path.resolve(extractedText), "utf8")
  : extractPdf();
const days = parseDays(text);

days.forEach((day) => {
  const target = path.join(root, "data", `kamp${day.day}.js`);
  fs.writeFileSync(target, renderDay(day), "utf8");
});

console.log(
  days
    .map(({ day, groups }) => {
      const count = groups.reduce((sum, group) => sum + group.entries.length, 0);
      return `Kamp ${day}: ${count} kelime`;
    })
    .join("\n")
);
