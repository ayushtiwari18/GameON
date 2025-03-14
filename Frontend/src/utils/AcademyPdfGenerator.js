import { PDFDocument, rgb, StandardFonts, degrees } from "pdf-lib";

// Function to download academy details as PDF with enhanced branding
const downloadAcademyDetails = async (academy) => {
  try {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();

    // Add a new page to the document
    let page = pdfDoc.addPage([595.28, 841.89]); // A4 size
    const { width, height } = page.getSize();

    // Get fonts
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const timesRoman = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const timesBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

    // Brand colors
    const primaryColor = rgb(0.1, 0.3, 0.6); // Dark blue
    const secondaryColor = rgb(0.2, 0.7, 0.3); // Green accent
    const accentColor = rgb(1, 0.6, 0); // Orange accent
    const lightGray = rgb(0.95, 0.95, 0.95);
    const darkText = rgb(0.2, 0.2, 0.2);

    // Background design - diagonal gradient stripe
    page.drawRectangle({
      x: 0,
      y: 0,
      width: width,
      height: height,
      color: rgb(0.98, 0.98, 1), // Very light blue background
    });

    // Diagonal design element - top right
    for (let i = 0; i < 10; i++) {
      page.drawLine({
        start: { x: width - 100 + i * 12, y: height },
        end: { x: width, y: height - 100 + i * 12 },
        thickness: 2,
        color: rgb(0.1, 0.3, 0.6, 0.1), // Transparent blue
      });
    }

    // Diagonal design element - bottom left
    for (let i = 0; i < 10; i++) {
      page.drawLine({
        start: { x: 0, y: 100 - i * 12 },
        end: { x: 100 - i * 12, y: 0 },
        thickness: 2,
        color: rgb(0.1, 0.3, 0.6, 0.1), // Transparent blue
      });
    }

    // Header with modern design
    page.drawRectangle({
      x: 0,
      y: height - 120,
      width: width,
      height: 120,
      color: primaryColor,
    });

    // Accent bar
    page.drawRectangle({
      x: 0,
      y: height - 130,
      width: width,
      height: 10,
      color: secondaryColor,
    });

    // Logo area - stylized "G" for GameON
    page.drawCircle({
      x: 70,
      y: height - 60,
      size: 40,
      color: rgb(1, 1, 1),
    });

    page.drawCircle({
      x: 70,
      y: height - 60,
      size: 30,
      color: primaryColor,
    });

    page.drawText("G", {
      x: 60,
      y: height - 74,
      size: 36,
      font: helveticaBold,
      color: rgb(1, 1, 1),
    });

    // Company name with modern typography
    page.drawText("GAME", {
      x: 120,
      y: height - 55,
      size: 32,
      font: helveticaBold,
      color: rgb(1, 1, 1),
    });

    page.drawText("ON", {
      x: 210,
      y: height - 55,
      size: 32,
      font: helveticaBold,
      color: accentColor,
    });

    // Tagline with more emphasis
    page.drawText("CONNECTING PLAYERS, ACADEMIES & TOURNAMENTS", {
      x: 120,
      y: height - 80,
      size: 12,
      font: helvetica,
      color: rgb(0.9, 0.9, 0.9),
    });

    // Stylish web address
    page.drawText("www.gameon.com", {
      x: width - 200,
      y: height - 50,
      size: 12,
      font: helvetica,
      color: rgb(1, 1, 1),
    });

    // Academy name with accent bar
    page.drawRectangle({
      x: 50,
      y: height - 175,
      width: 10,
      height: 40,
      color: secondaryColor,
    });

    page.drawText(academy.name, {
      x: 70,
      y: height - 150,
      size: 26,
      font: helveticaBold,
      color: primaryColor,
    });

    // Modern divider
    page.drawLine({
      start: { x: 50, y: height - 180 },
      end: { x: width - 50, y: height - 180 },
      thickness: 1,
      color: lightGray,
    });

    // Academy Overview section with styled heading
    page.drawRectangle({
      x: 50,
      y: height - 210,
      width: 200,
      height: 20,
      color: lightGray,
    });

    page.drawText("ACADEMY OVERVIEW", {
      x: 60,
      y: height - 205,
      size: 14,
      font: helveticaBold,
      color: primaryColor,
    });

    // Overview text (with word wrapping)
    const overviewText = academy.overview;
    const wrappedOverview = wrapText(overviewText, 70);
    let currentY = height - 230;

    wrappedOverview.forEach((line) => {
      page.drawText(line, {
        x: 50,
        y: currentY,
        size: 10,
        font: timesRoman,
        color: darkText,
      });
      currentY -= 15;
    });

    // Basic Details section with highlight box
    currentY -= 15;
    page.drawRectangle({
      x: 0,
      y: currentY - 130,
      width: width,
      height: 150,
      color: lightGray,
    });

    page.drawRectangle({
      x: 50,
      y: currentY + 5,
      width: 130,
      height: 20,
      color: primaryColor,
    });

    page.drawText("BASIC DETAILS", {
      x: 60,
      y: currentY + 10,
      size: 14,
      font: helveticaBold,
      color: rgb(1, 1, 1),
    });
    currentY -= 25;

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
        x: 60,
        y: currentY,
        size: 10,
        font: timesBold,
        color: darkText,
      });
      currentY -= 15;
    });

    // Contact Information section with icons
    currentY -= 25;
    page.drawRectangle({
      x: 50,
      y: currentY + 5,
      width: 210,
      height: 20,
      color: secondaryColor,
    });

    page.drawText("CONTACT INFORMATION", {
      x: 60,
      y: currentY + 10,
      size: 14,
      font: helveticaBold,
      color: rgb(1, 1, 1),
    });
    currentY -= 25;

    // Contact info with icon placeholders
    const contactInfo = [
      { label: `Phone:`, value: academy.contactInfo.phone },
      { label: `Email:`, value: academy.contactInfo.email },
      { label: `Website:`, value: academy.contactInfo.website },
    ];

    if (academy.contactInfo.whatsapp !== "Not available") {
      contactInfo.push({
        label: `WhatsApp:`,
        value: academy.contactInfo.whatsapp,
      });
    }

    contactInfo.forEach((info) => {
      // Icon placeholder circle
      page.drawCircle({
        x: 60,
        y: currentY + 5,
        size: 5,
        color: accentColor,
      });

      page.drawText(`${info.label} ${info.value}`, {
        x: 75,
        y: currentY,
        size: 10,
        font: timesRoman,
        color: darkText,
      });
      currentY -= 15;
    });

    // Training Programs section with accent styling
    currentY -= 20;
    page.drawRectangle({
      x: 0,
      y: currentY - 25,
      width: 15,
      height: 30,
      color: accentColor,
    });

    page.drawText("TRAINING PROGRAMS", {
      x: 60,
      y: currentY,
      size: 16,
      font: helveticaBold,
      color: primaryColor,
    });
    currentY -= 30;

    if (Array.isArray(academy.programs) && academy.programs.length > 0) {
      academy.programs.forEach((program, index) => {
        // Program box with light background
        const boxHeight = 70;
        page.drawRectangle({
          x: 50,
          y: currentY - boxHeight + 15,
          width: width - 100,
          height: boxHeight,
          color: lightGray,
          borderColor: primaryColor,
          borderWidth: 1,
        });

        // Program number badge
        page.drawCircle({
          x: 70,
          y: currentY,
          size: 12,
          color: primaryColor,
        });

        page.drawText(`${index + 1}`, {
          x: 66,
          y: currentY - 4,
          size: 12,
          font: helveticaBold,
          color: rgb(1, 1, 1),
        });

        // Program name
        page.drawText(`${program.name}`, {
          x: 90,
          y: currentY,
          size: 14,
          font: helveticaBold,
          color: primaryColor,
        });
        currentY -= 20;

        // Program description
        const wrappedDesc = wrapText(program.description, 65);
        wrappedDesc.forEach((line) => {
          page.drawText(line, {
            x: 90,
            y: currentY,
            size: 10,
            font: timesRoman,
            color: darkText,
          });
          currentY -= 15;
        });

        // Fix for rupee symbol - replace with "Rs."
        const formattedFee = program.fee.replace(/₹/g, "Rs.");

        page.drawRectangle({
          x: width - 200,
          y: currentY,
          width: 140,
          height: 20,
          color: rgb(0.95, 0.95, 1),
          borderColor: primaryColor,
          borderWidth: 0.5,
        });

        page.drawText(`Duration: ${program.duration} | Fee: ${formattedFee}`, {
          x: width - 190,
          y: currentY + 5,
          size: 10,
          font: timesBold,
          color: darkText,
        });
        currentY -= 25;
      });
    } else {
      page.drawText("Program details will be announced soon", {
        x: 60,
        y: currentY,
        size: 10,
        font: timesRoman,
        color: darkText,
      });
      currentY -= 20;
    }

    // Check if we need a new page for facilities and achievements
    if (currentY < 250) {
      page = pdfDoc.addPage([595.28, 841.89]);

      // Add header to new page
      page.drawRectangle({
        x: 0,
        y: height - 50,
        width: width,
        height: 50,
        color: primaryColor,
      });

      page.drawText("GAME ON", {
        x: 50,
        y: height - 30,
        size: 20,
        font: helveticaBold,
        color: rgb(1, 1, 1),
      });

      currentY = height - 80;
    }

    // Create a visual divider
    currentY -= 10;
    page.drawRectangle({
      x: 50,
      y: currentY,
      width: width - 100,
      height: 5,
      color: lightGray,
    });
    currentY -= 30;

    // Facilities Section with visual elements
    page.drawRectangle({
      x: 50,
      y: currentY + 5,
      width: 240,
      height: 20,
      color: primaryColor,
    });

    page.drawText("FACILITIES & INFRASTRUCTURE", {
      x: 60,
      y: currentY + 10,
      size: 14,
      font: helveticaBold,
      color: rgb(1, 1, 1),
    });
    currentY -= 25;

    if (Array.isArray(academy.facilities) && academy.facilities.length > 0) {
      // Create a grid layout for facilities
      let itemsPerRow = 2;
      let itemWidth = (width - 120) / itemsPerRow;
      let rowStartY = currentY;

      academy.facilities.forEach((facility, index) => {
        let colPosition = index % itemsPerRow;
        let rowPosition = Math.floor(index / itemsPerRow);
        let xPosition = 60 + colPosition * itemWidth;
        let yPosition = rowStartY - rowPosition * 30;

        // Draw checkbox style bullet
        page.drawRectangle({
          x: xPosition - 15,
          y: yPosition - 5,
          width: 10,
          height: 10,
          color: rgb(1, 1, 1, 0),
          borderColor: secondaryColor,
          borderWidth: 1,
        });

        // Draw check mark
        page.drawLine({
          start: { x: xPosition - 13, y: yPosition - 2 },
          end: { x: xPosition - 9, y: yPosition - 6 },
          thickness: 1,
          color: secondaryColor,
        });

        page.drawLine({
          start: { x: xPosition - 9, y: yPosition - 6 },
          end: { x: xPosition - 5, y: yPosition },
          thickness: 1,
          color: secondaryColor,
        });

        page.drawText(`${facility}`, {
          x: xPosition,
          y: yPosition,
          size: 10,
          font: timesRoman,
          color: darkText,
        });
      });

      // Update currentY to after the last row of facilities
      currentY =
        rowStartY -
        Math.ceil(academy.facilities.length / itemsPerRow) * 30 -
        10;
    } else {
      page.drawText("Facility details will be updated soon", {
        x: 60,
        y: currentY,
        size: 10,
        font: timesRoman,
        color: darkText,
      });
      currentY -= 20;
    }

    // Coaching Staff Section with eye-catching design
    currentY -= 30;

    // Section header with angled accent
    page.drawRectangle({
      x: 50,
      y: currentY + 5,
      width: 160,
      height: 20,
      color: accentColor,
    });

    page.drawText("COACHING STAFF", {
      x: 60,
      y: currentY + 10,
      size: 14,
      font: helveticaBold,
      color: rgb(1, 1, 1),
    });
    currentY -= 25;

    if (Array.isArray(academy.coaches) && academy.coaches.length > 0) {
      academy.coaches.forEach((coach, index) => {
        // Coach profile box
        const coachBoxHeight = 50;
        page.drawRectangle({
          x: 50,
          y: currentY - coachBoxHeight + 15,
          width: width - 100,
          height: coachBoxHeight,
          color: rgb(0.97, 0.97, 1),
          borderColor: accentColor,
          borderWidth: 0.5,
        });

        // Coach image placeholder (circle)
        page.drawCircle({
          x: 80,
          y: currentY - 15,
          size: 20,
          color: lightGray,
          borderColor: primaryColor,
          borderWidth: 1,
        });

        // Draw person icon in circle
        page.drawLine({
          start: { x: 80, y: currentY - 5 },
          end: { x: 80, y: currentY - 15 },
          thickness: 1.5,
          color: primaryColor,
        });

        page.drawCircle({
          x: 80,
          y: currentY - 25,
          size: 6,
          color: primaryColor,
        });

        // Coach name with highlight
        page.drawText(`${coach.name}`, {
          x: 110,
          y: currentY - 5,
          size: 14,
          font: helveticaBold,
          color: primaryColor,
        });

        // Coach details with styled format
        page.drawText(
          `Experience: ${coach.experience} | Specialization: ${coach.specialization}`,
          {
            x: 110,
            y: currentY - 25,
            size: 10,
            font: timesRoman,
            color: darkText,
          }
        );

        currentY -= coachBoxHeight + 10;
      });
    } else {
      page.drawText("Coaching staff information will be updated soon", {
        x: 60,
        y: currentY,
        size: 10,
        font: timesRoman,
        color: darkText,
      });
      currentY -= 20;
    }

    // Check if we need a new page for achievements
    if (currentY < 150) {
      page = pdfDoc.addPage([595.28, 841.89]);

      // Add header to new page
      page.drawRectangle({
        x: 0,
        y: height - 50,
        width: width,
        height: 50,
        color: primaryColor,
      });

      page.drawText("GAME ON", {
        x: 50,
        y: height - 30,
        size: 20,
        font: helveticaBold,
        color: rgb(1, 1, 1),
      });

      currentY = height - 80;
    }

    // Achievements Section with trophy design
    currentY -= 30;

    // Trophy icon
    const trophyX = 50;
    const trophyY = currentY + 10;

    // Draw trophy cup
    page.drawRectangle({
      x: trophyX - 5,
      y: trophyY - 10,
      width: 30,
      height: 5,
      color: accentColor,
    });

    page.drawRectangle({
      x: trophyX + 5,
      y: trophyY - 25,
      width: 10,
      height: 15,
      color: accentColor,
    });

    page.drawRectangle({
      x: trophyX + 2,
      y: trophyY - 30,
      width: 16,
      height: 5,
      color: accentColor,
    });

    page.drawRectangle({
      x: 90,
      y: currentY + 5,
      width: 210,
      height: 20,
      color: primaryColor,
    });

    page.drawText("ACADEMY ACHIEVEMENTS", {
      x: 100,
      y: currentY + 10,
      size: 14,
      font: helveticaBold,
      color: rgb(1, 1, 1),
    });
    currentY -= 25;

    if (
      Array.isArray(academy.achievements) &&
      academy.achievements.length > 0
    ) {
      // Create a decorative achievement list
      academy.achievements.forEach((achievement, index) => {
        // Achievement badge
        page.drawRectangle({
          x: 60,
          y: currentY - 5,
          width: width - 120,
          height: 25,
          color: lightGray,
          borderColor: primaryColor,
          borderWidth: 0.5,
          borderOpacity: 0.5,
        });

        // Star icon
        const starPoints = [
          { x: 75, y: currentY + 10 },
          { x: 70, y: currentY },
          { x: 75, y: currentY - 10 },
          { x: 80, y: currentY },
        ];

        for (let i = 0; i < starPoints.length; i++) {
          page.drawLine({
            start: starPoints[i],
            end: starPoints[(i + 1) % starPoints.length],
            thickness: 1,
            color: accentColor,
          });
        }

        page.drawText(`${achievement}`, {
          x: 90,
          y: currentY,
          size: 10,
          font: timesBold,
          color: darkText,
        });
        currentY -= 30;
      });
    } else {
      page.drawText("Achievement details will be updated soon", {
        x: 60,
        y: currentY,
        size: 10,
        font: timesRoman,
        color: darkText,
      });
      currentY -= 20;
    }

    // QR Code placeholder - for future website/app linking
    if (currentY > 150) {
      const qrSize = 80;
      page.drawRectangle({
        x: width - qrSize - 50,
        y: 100,
        width: qrSize,
        height: qrSize,
        borderColor: primaryColor,
        borderWidth: 1,
        color: rgb(1, 1, 1, 0),
      });

      // QR code grid pattern simulation
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
          if (
            ((i === 0 || i === 4) && (j === 0 || j === 4)) ||
            (i === 2 && j === 2)
          ) {
            page.drawRectangle({
              x: width - qrSize - 50 + (i * qrSize) / 5,
              y: 100 + (j * qrSize) / 5,
              width: qrSize / 5,
              height: qrSize / 5,
              color: primaryColor,
            });
          }
        }
      }

      page.drawText("Scan for more info", {
        x: width - qrSize - 50,
        y: 90,
        size: 8,
        font: helvetica,
        color: darkText,
      });
    }

    // Footer with modern design
    page.drawRectangle({
      x: 0,
      y: 0,
      width: width,
      height: 40,
      color: lightGray,
    });

    page.drawLine({
      start: { x: 0, y: 40 },
      end: { x: width, y: 40 },
      thickness: 2,
      color: secondaryColor,
    });

    page.drawText("Generated on " + new Date().toLocaleDateString(), {
      x: 50,
      y: 20,
      size: 8,
      font: helvetica,
      color: darkText,
    });

    page.drawText("© Game ON - All Rights Reserved", {
      x: width - 200,
      y: 20,
      size: 8,
      font: helveticaBold,
      color: primaryColor,
    });

    // Contact footer
    page.drawText("Contact us: info@gameon.com | +1-555-GAME-ON", {
      x: 50,
      y: 10,
      size: 8,
      font: helvetica,
      color: darkText,
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
