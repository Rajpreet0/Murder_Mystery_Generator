import { NextResponse } from "next/server";
import { PDFDocument, PDFFont, PDFPage, RGB, rgb, StandardFonts } from "pdf-lib";

// Helper Function for more lines
function wrapText(text: string, maxLength: number): string[] {
    const words = text.split(" ");
    const lines: string[] = [];
    let line = "";

    for (const word of words) {
        if ((line + word).length > maxLength) {
            lines.push(line.trim());
            line = "";
        }
        line += word + " ";
    }

    if (line.trim().length > 0) lines.push(line.trim());
    return lines;
}

function writeText(
    page: PDFPage,
    pdfDoc: PDFDocument,
    textLines: string[],
    font: PDFFont,
    color: RGB,
    fontSize: number,
    x: number,
    y: number,
    bgDark: RGB,
    width: number,
    height: number,
): {page: PDFPage; y: number} {
    for (const line of textLines) {
        if (y < 60) {
            // Neue Seite erstellen, wenn kein Platz
            page = pdfDoc.addPage();
            page.drawRectangle({ x: 0, y: 0, width, height, color: bgDark });
            y = height - 60;
        }

        page.drawText(line, { x, y, size: fontSize, font, color });
        y -= fontSize + 2;
  }

  return {page, y}
}


export async function POST(req: Request) {
  try {
    const { title, summary, roles, menu, phases } = await req.json();

    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage();
    const { width, height } = page.getSize();

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const bgDark = rgb(0.06, 0.06, 0.06);
    const textLight = rgb(0.92, 0.92, 0.92);
    const gold = rgb(0.83, 0.68, 0.22);
    const violet = rgb(0.56, 0.47, 0.76);
    const gray = rgb(0.3, 0.3, 0.3);

    const margin = 50;
    let y = height - 60;

    page.drawRectangle({ x: 0, y: 0, width, height, color: bgDark });

    // 🏷️ Titel
    page.drawText(title, { x: margin, y, size: 22, font: bold, color: gold });
    y -= 30;

    // 🧾 Summary
    const summaryLines = wrapText(summary, 90);
    ({ page, y } = writeText(page, pdfDoc, summaryLines, font, textLight, 11, margin, y, bgDark, width, height));
    y -= 20;

    // 🎭 Rollenübersicht
    page.drawText("Rollenübersicht", { x: margin, y, size: 16, font: bold, color: violet });
    y -= 20;

    for (const role of roles) {
      // Name
      page.drawText(`${role.character} (${role.player})`, {
        x: margin,
        y,
        size: 12,
        font: bold,
        color: gold,
      });
      y -= 16;

      ({ page, y } = writeText(page, pdfDoc, wrapText(role.description, 90), font, textLight, 10, margin + 10, y, bgDark, width, height));

      y -= 10;
    }

    // 🍽️ Menü
    y -= 25;
    page.drawText("Menü", { x: margin, y, size: 16, font: bold, color: violet });
    y -= 20;

    for (const item of menu) {
      page.drawText(`${item.course}:`, { x: margin, y, size: 12, font: bold, color: gold });
      y -= 14;
      ({ page, y } = writeText(page, pdfDoc, wrapText(item.dish, 90), font, textLight, 10, margin + 10, y, bgDark, width, height));
      y -= 10;
    }

    // 📜 Ablauf
    y -= 25;
    page.drawText("Ablauf", { x: margin, y, size: 16, font: bold, color: violet });
    y -= 20;

    for (const phase of phases) {
      page.drawText(`${phase.phase}:`, { x: margin, y, size: 12, font: bold, color: gold });
      y -= 14;
      ({ page, y } = writeText(page, pdfDoc, wrapText(phase.description, 90), font, textLight, 10, margin + 10, y, bgDark, width, height));
      y -= 10;
    }

    // 📄 PDF speichern
    const pdfBytes = await pdfDoc.save();
    const pdfBuffer = Buffer.from(pdfBytes);

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Murder_Mystery_${title}.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF Error:", error);
    return NextResponse.json({ error: "Fehler beim PDF-Erstellen" }, { status: 500 });
  }
}