import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

// Function to download academy details as PDF
const downloadAcademyDetails = async (academy) => {
  try {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();

    // Add a new page to the document
    let page = pdfDoc.addPage([595.28, 841.89]); // A4 size - using let instead of const
    const { width, height } = page.getSize();

    // Get fonts
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const timesRoman = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    // GameON Letterhead
    page.drawRectangle({
      x: 0,
      y: height - 100,
      width: width,
      height: 100,
      color: rgb(0.1, 0.3, 0.6), // Dark blue header
    });

    // Company name on letterhead
    page.drawText("GAME ON", {
      x: 50,
      y: height - 60,
      size: 28,
      font: helveticaBold,
      color: rgb(1, 1, 1), // White text
    });

    // Tagline on letterhead
    page.drawText("CONNECTING PLAYERS, ACADEMIES & TOURNAMENTS", {
      x: 50,
      y: height - 85,
      size: 10,
      font: helvetica,
      color: rgb(0.9, 0.9, 0.9), // Light grey text
    });

    // Academy name
    page.drawText(academy.name, {
      x: 50,
      y: height - 150,
      size: 24,
      font: helveticaBold,
      color: rgb(0.1, 0.3, 0.6), // Dark blue
    });

    // Divider line
    page.drawLine({
      start: { x: 50, y: height - 170 },
      end: { x: width - 50, y: height - 170 },
      thickness: 1,
      color: rgb(0.1, 0.3, 0.6),
    });

    // Academy Overview section
    page.drawText("ACADEMY OVERVIEW", {
      x: 50,
      y: height - 200,
      size: 14,
      font: helveticaBold,
      color: rgb(0.1, 0.3, 0.6),
    });

    // Overview text (with word wrapping)
    const overviewText = academy.overview;
    const wrappedOverview = wrapText(overviewText, 70);
    let currentY = height - 220;

    wrappedOverview.forEach((line) => {
      page.drawText(line, {
        x: 50,
        y: currentY,
        size: 10,
        font: timesRoman,
        color: rgb(0, 0, 0),
      });
      currentY -= 15;
    });

    // Basic Details section
    currentY -= 20;
    page.drawText("BASIC DETAILS", {
      x: 50,
      y: currentY,
      size: 14,
      font: helveticaBold,
      color: rgb(0.1, 0.3, 0.6),
    });
    currentY -= 20;

    const details = [
      `Established: ${academy.established}`,
      `Students: ${academy.students} active students`,
      `Contact Person: ${academy.contactPerson}`,
      `Has Vacancies: ${academy.hasVacancies}`,
      `Location: ${academy.location}`,
      `Specialization: ${academy.specialization}`,
      `Language: ${academy.language}`,
    ];

    details.forEach((detail) => {
      page.drawText(detail, {
        x: 50,
        y: currentY,
        size: 10,
        font: timesRoman,
        color: rgb(0, 0, 0),
      });
      currentY -= 15;
    });

    // Contact Information section
    currentY -= 20;
    page.drawText("CONTACT INFORMATION", {
      x: 50,
      y: currentY,
      size: 14,
      font: helveticaBold,
      color: rgb(0.1, 0.3, 0.6),
    });
    currentY -= 20;

    const contactInfo = [
      `Phone: ${academy.contactInfo.phone}`,
      `Email: ${academy.contactInfo.email}`,
      `Website: ${academy.contactInfo.website}`,
    ];

    if (academy.contactInfo.whatsapp !== "Not available") {
      contactInfo.push(`WhatsApp: ${academy.contactInfo.whatsapp}`);
    }

    contactInfo.forEach((info) => {
      page.drawText(info, {
        x: 50,
        y: currentY,
        size: 10,
        font: timesRoman,
        color: rgb(0, 0, 0),
      });
      currentY -= 15;
    });

    // Training Programs section
    currentY -= 20;
    page.drawText("TRAINING PROGRAMS", {
      x: 50,
      y: currentY,
      size: 14,
      font: helveticaBold,
      color: rgb(0.1, 0.3, 0.6),
    });
    currentY -= 20;

    if (Array.isArray(academy.programs) && academy.programs.length > 0) {
      academy.programs.forEach((program, index) => {
        page.drawText(`${index + 1}. ${program.name}`, {
          x: 50,
          y: currentY,
          size: 12,
          font: helveticaBold,
          color: rgb(0, 0, 0),
        });
        currentY -= 15;

        page.drawText(`   ${program.description}`, {
          x: 50,
          y: currentY,
          size: 10,
          font: timesRoman,
          color: rgb(0, 0, 0),
        });
        currentY -= 15;

        // Fix for rupee symbol - replace with "Rs."
        const formattedFee = program.fee.replace(/₹/g, "Rs.");

        page.drawText(
          `   Duration: ${program.duration} | Fee: ${formattedFee}`,
          {
            x: 50,
            y: currentY,
            size: 10,
            font: timesRoman,
            color: rgb(0, 0, 0),
          }
        );
        currentY -= 20;
      });
    } else {
      page.drawText("Program details will be announced soon", {
        x: 50,
        y: currentY,
        size: 10,
        font: timesRoman,
        color: rgb(0, 0, 0),
      });
      currentY -= 20;
    }

    // Check if we need a new page for facilities and achievements
    if (currentY < 200) {
      page = pdfDoc.addPage([595.28, 841.89]); // Now can reassign to page
      currentY = height - 50;
    }

    // Facilities Section
    currentY -= 20;
    page.drawText("FACILITIES & INFRASTRUCTURE", {
      x: 50,
      y: currentY,
      size: 14,
      font: helveticaBold,
      color: rgb(0.1, 0.3, 0.6),
    });
    currentY -= 20;

    if (Array.isArray(academy.facilities) && academy.facilities.length > 0) {
      academy.facilities.forEach((facility, index) => {
        page.drawText(`• ${facility}`, {
          x: 50,
          y: currentY,
          size: 10,
          font: timesRoman,
          color: rgb(0, 0, 0),
        });
        currentY -= 15;
      });
    } else {
      page.drawText("Facility details will be updated soon", {
        x: 50,
        y: currentY,
        size: 10,
        font: timesRoman,
        color: rgb(0, 0, 0),
      });
      currentY -= 15;
    }

    // Coaching Staff Section
    currentY -= 20;
    page.drawText("COACHING STAFF", {
      x: 50,
      y: currentY,
      size: 14,
      font: helveticaBold,
      color: rgb(0.1, 0.3, 0.6),
    });
    currentY -= 20;

    if (Array.isArray(academy.coaches) && academy.coaches.length > 0) {
      academy.coaches.forEach((coach, index) => {
        page.drawText(`${coach.name}`, {
          x: 50,
          y: currentY,
          size: 12,
          font: helveticaBold,
          color: rgb(0, 0, 0),
        });
        currentY -= 15;

        page.drawText(
          `   Experience: ${coach.experience} | Specialization: ${coach.specialization}`,
          {
            x: 50,
            y: currentY,
            size: 10,
            font: timesRoman,
            color: rgb(0, 0, 0),
          }
        );
        currentY -= 20;
      });
    } else {
      page.drawText("Coaching staff information will be updated soon", {
        x: 50,
        y: currentY,
        size: 10,
        font: timesRoman,
        color: rgb(0, 0, 0),
      });
      currentY -= 15;
    }

    // Achievements Section
    currentY -= 20;
    page.drawText("ACADEMY ACHIEVEMENTS", {
      x: 50,
      y: currentY,
      size: 14,
      font: helveticaBold,
      color: rgb(0.1, 0.3, 0.6),
    });
    currentY -= 20;

    if (
      Array.isArray(academy.achievements) &&
      academy.achievements.length > 0
    ) {
      academy.achievements.forEach((achievement, index) => {
        page.drawText(`• ${achievement}`, {
          x: 50,
          y: currentY,
          size: 10,
          font: timesRoman,
          color: rgb(0, 0, 0),
        });
        currentY -= 15;
      });
    } else {
      page.drawText("Achievement details will be updated soon", {
        x: 50,
        y: currentY,
        size: 10,
        font: timesRoman,
        color: rgb(0, 0, 0),
      });
      currentY -= 15;
    }

    // Footer
    page.drawLine({
      start: { x: 50, y: 50 },
      end: { x: width - 50, y: 50 },
      thickness: 1,
      color: rgb(0.1, 0.3, 0.6),
    });

    page.drawText("Generated on " + new Date().toLocaleDateString(), {
      x: 50,
      y: 30,
      size: 8,
      font: helvetica,
      color: rgb(0.5, 0.5, 0.5),
    });

    page.drawText("© Game ON - All Rights Reserved", {
      x: width - 200,
      y: 30,
      size: 8,
      font: helvetica,
      color: rgb(0.5, 0.5, 0.5),
    });

    // Serialize the PDFDocument to bytes
    const pdfBytes = await pdfDoc.save();

    // Create a blob from the bytes
    const blob = new Blob([pdfBytes], { type: "application/pdf" });

    // Create a URL for the blob
    const url = URL.createObjectURL(blob);

    // Create a link element and trigger a download
    const link = document.createElement("a");
    link.href = url;
    link.download = `${academy.name.replace(/\s+/g, "-")}-Details.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up the URL object
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("Failed to generate PDF. Please try again.");
  }
};

// Helper function to wrap text
const wrapText = (text, maxCharsPerLine) => {
  const words = text.split(" ");
  const lines = [];
  let currentLine = "";

  words.forEach((word) => {
    if ((currentLine + word).length <= maxCharsPerLine) {
      currentLine += (currentLine === "" ? "" : " ") + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  });

  if (currentLine !== "") {
    lines.push(currentLine);
  }

  return lines;
};

export default downloadAcademyDetails;
