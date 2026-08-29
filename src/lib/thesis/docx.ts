import { PAPER_MD, PAPER_TITLE } from "./paper";

const enc = new TextEncoder();

function crc32(buf: Uint8Array): number {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
  }
  return (c ^ 0xffffffff) >>> 0;
}

function u16(n: number) {
  const b = new Uint8Array(2);
  new DataView(b.buffer).setUint16(0, n, true);
  return b;
}
function u32(n: number) {
  const b = new Uint8Array(4);
  new DataView(b.buffer).setUint32(0, n, true);
  return b;
}

function zipStore(files: { name: string; data: Uint8Array }[]): Uint8Array {
  const locals: Uint8Array[] = [];
  const centrals: Uint8Array[] = [];
  let offset = 0;
  for (const f of files) {
    const name = enc.encode(f.name);
    const crc = crc32(f.data);
    const local = concat(
      u32(0x04034b50),
      u16(20),
      u16(0),
      u16(0),
      u16(0),
      u16(0),
      u32(crc),
      u32(f.data.length),
      u32(f.data.length),
      u16(name.length),
      u16(0),
      name,
      f.data,
    );
    locals.push(local);
    centrals.push(
      concat(
        u32(0x02014b50),
        u16(20),
        u16(20),
        u16(0),
        u16(0),
        u16(0),
        u16(0),
        u32(crc),
        u32(f.data.length),
        u32(f.data.length),
        u16(name.length),
        u16(0),
        u16(0),
        u16(0),
        u16(0),
        u32(0),
        u32(offset),
        name,
      ),
    );
    offset += local.length;
  }
  const central = concat(...centrals);
  const eocd = concat(
    u32(0x06054b50),
    u16(0),
    u16(0),
    u16(files.length),
    u16(files.length),
    u32(central.length),
    u32(offset),
    u16(0),
  );
  return concat(...locals, central, eocd);
}

function concat(...parts: Uint8Array[]) {
  const n = parts.reduce((s, p) => s + p.length, 0);
  const out = new Uint8Array(n);
  let o = 0;
  for (const p of parts) {
    out.set(p, o);
    o += p.length;
  }
  return out;
}

function xml(s: string) {
  return s.replaceAll("&", "&").replaceAll("<", "<").replaceAll(">", ">");
}

function run(text: string, opts?: { bold?: boolean; italic?: boolean; font?: string; size?: number; east?: string }) {
  const size = opts?.size ?? 24;
  const east = opts?.east ?? "宋体";
  const ascii = opts?.font ?? "Times New Roman";
  const rPr = [
    `<w:rFonts w:ascii="${ascii}" w:hAnsi="${ascii}" w:eastAsia="${east}" w:cs="${ascii}"/>`,
    `<w:sz w:val="${size}"/><w:szCs w:val="${size}"/>`,
    opts?.bold ? "<w:b/><w:bCs/>" : "",
    opts?.italic ? "<w:i/><w:iCs/>" : "",
  ].join("");
  const pieces: string[] = [];
  const parts = text.split(/(`[^`]+`)/g);
  for (const part of parts) {
    if (!part) continue;
    if (part.startsWith("`") && part.endsWith("`") && part.length >= 2) {
      const code = xml(part.slice(1, -1));
      pieces.push(
        `<w:r><w:rPr><w:rFonts w:ascii="Consolas" w:hAnsi="Consolas" w:eastAsia="宋体"/><w:sz w:val="${size}"/></w:rPr><w:t xml:space="preserve">${code}</w:t></w:r>`,
      );
      continue;
    }
    pieces.push(`<w:r><w:rPr>${rPr}</w:rPr><w:t xml:space="preserve">${xml(part)}</w:t></w:r>`);
  }
  return pieces.join("");
}

function p(inner: string, extraPr = "") {
  return `<w:p><w:pPr>${extraPr}<w:spacing w:line="360" w:lineRule="auto"/></w:pPr>${inner}</w:p>`;
}

function parseBlocks(md: string) {
  const lines = md.replaceAll("\r\n", "\n").split("\n");
  const blocks: { type: string; text: string }[] = [];
  let para: string[] = [];
  const flush = () => {
    const t = para.join(" ").trim();
    para = [];
    if (t) blocks.push({ type: "p", text: t });
  };
  for (const raw of lines) {
    const line = raw.trimEnd();
    if (line.startsWith("# ")) {
      flush();
      continue;
    }
    if (line.startsWith("## ")) {
      flush();
      blocks.push({ type: "h1", text: line.slice(3).trim() });
      continue;
    }
    if (line.startsWith("### ")) {
      flush();
      blocks.push({ type: "h2", text: line.slice(4).trim() });
      continue;
    }
    if (line.trim() === "---") {
      flush();
      continue;
    }
    if (/^[-*]\s+/.test(line.trim())) {
      flush();
      blocks.push({ type: "li", text: line.trim().replace(/^[-*]\s+/, "") });
      continue;
    }
    if (/^\d+\.\s+/.test(line.trim())) {
      flush();
      blocks.push({ type: "ol", text: line.trim().replace(/^\d+\.\s+/, "") });
      continue;
    }
    if (line.trim() === "") {
      flush();
      continue;
    }
    para.push(line.trim());
  }
  flush();
  return blocks;
}

function formulaXml(src: string) {
  const t = src
    .replaceAll("\\mathrm{", "")
    .replaceAll("\\mid", "|")
    .replaceAll("{", "")
    .replaceAll("}", "")
    .replaceAll("\\", "")
    .trim();
  return p(run(t, { italic: true, size: 24 }), `<w:jc w:val="center"/>`);
}

function bodyXml(md: string) {
  const chunks: string[] = [];
  chunks.push(
    p(run("博士学位论文（学习用研究报告）", { east: "黑体", size: 28, bold: true }), `<w:jc w:val="center"/>`),
  );
  chunks.push(p(run(PAPER_TITLE, { east: "黑体", size: 36, bold: true }), `<w:jc w:val="center"/>`));
  chunks.push(
    p(
      run("学科：应用统计学 / 中国术数文献的可计算建模    地点：浙江省温州市瓯海区    数据：2025-01-01 至 2026-08-28", {
        size: 21,
      }),
      `<w:jc w:val="center"/>`,
    ),
  );
  chunks.push(`<w:p><w:pPr><w:spacing w:before="240" w:after="240"/></w:pPr></w:p>`);

  for (const b of parseBlocks(md)) {
    const math = b.text.match(/^\\\[([\s\S]+)\\\]$/);
    if (math) {
      chunks.push(formulaXml(math[1]));
      continue;
    }
    if (b.text.includes("\\[")) {
      const split = b.text.split(/\\\[|\\\]/);
      for (let i = 0; i < split.length; i++) {
        const t = split[i].trim();
        if (!t) continue;
        if (i % 2 === 1) chunks.push(formulaXml(t));
        else
          chunks.push(
            p(run(t, { size: 24 }), `<w:ind w:firstLine="480"/>`),
          );
      }
      continue;
    }
    if (b.type === "h1") {
      chunks.push(
        p(run(b.text, { east: "黑体", size: 32, bold: true }), `<w:outlineLvl w:val="0"/><w:spacing w:before="360" w:after="120"/>`),
      );
      continue;
    }
    if (b.type === "h2") {
      chunks.push(
        p(run(b.text, { east: "黑体", size: 28, bold: true }), `<w:outlineLvl w:val="1"/><w:spacing w:before="240" w:after="80"/>`),
      );
      continue;
    }
    if (b.type === "li") {
      chunks.push(p(run("· " + b.text, { size: 24 }), `<w:ind w:left="420"/>`));
      continue;
    }
    if (b.type === "ol") {
      chunks.push(p(run(b.text, { size: 24 }), `<w:ind w:left="420" w:firstLine="0"/>`));
      continue;
    }
    const isKw = b.text.startsWith("关键词") || b.text.startsWith("Abstract.");
    chunks.push(
      p(run(b.text, { size: 24, italic: b.text.startsWith("Abstract.") }), isKw ? "" : `<w:ind w:firstLine="480"/>`),
    );
  }
  chunks.push(
    `<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1800" w:header="720" w:footer="720"/></w:sectPr>`,
  );
  return chunks.join("");
}

const CONTENT_TYPES = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
</Types>`;

const RELS = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`;

const DOC_RELS = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`;

const STYLES = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:docDefaults>
    <w:rPrDefault>
      <w:rPr>
        <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:eastAsia="宋体" w:cs="Times New Roman"/>
        <w:sz w:val="24"/><w:szCs w:val="24"/>
        <w:lang w:val="en-US" w:eastAsia="zh-CN"/>
      </w:rPr>
    </w:rPrDefault>
  </w:docDefaults>
  <w:style w:type="paragraph" w:default="1" w:styleId="Normal">
    <w:name w:val="Normal"/>
    <w:qFormat/>
  </w:style>
</w:styles>`;

export const THESIS_DOCX_NAME = "qimen-ouhai-weather-thesis.docx";

export function thesisDocxBytes(md = PAPER_MD): Uint8Array {
  const document = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>${bodyXml(md)}</w:body>
</w:document>`;
  return zipStore([
    { name: "[Content_Types].xml", data: enc.encode(CONTENT_TYPES) },
    { name: "_rels/.rels", data: enc.encode(RELS) },
    { name: "word/_rels/document.xml.rels", data: enc.encode(DOC_RELS) },
    { name: "word/styles.xml", data: enc.encode(STYLES) },
    { name: "word/document.xml", data: enc.encode(document) },
  ]);
}

export function downloadThesisDocx() {
  const bytes = thesisDocxBytes();
  const copy = new Uint8Array(bytes.byteLength);
  copy.set(bytes);
  const blob = new Blob([copy], {
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = THESIS_DOCX_NAME;
  a.click();
  URL.revokeObjectURL(a.href);
}
