import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { saveAs } from "file-saver";

/**
 * Generates and downloads a PDF containing tournament details
 * @param {Object} tournament - The tournament data object
 */
export const generateTournamentPDF = async (tournament) => {
  try {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();

    // Add a page to the document
    let page = pdfDoc.addPage([595, 842]); // A4 size

    // Get fonts
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // Set font size and line height
    const titleFontSize = 18;
    const headingFontSize = 14;
    const normalFontSize = 10;
    const lineHeight = 20;

    // Current vertical position for content
    let y = 800;
    const leftMargin = 50;
    const pageWidth = 495; // Effective width with margins

    // Add tournament header information
    y = addTournamentHeader(page, tournament, {
      y,
      leftMargin,
      titleFontSize,
      headingFontSize,
      normalFontSize,
      lineHeight,
      helveticaFont,
      helveticaBold,
    });

    // Add tournament overview
    y = addTournamentOverview(page, tournament, {
      y,
      leftMargin,
      headingFontSize,
      normalFontSize,
      lineHeight,
      pageWidth,
      helveticaFont,
      helveticaBold,
    });

    // Check if we need a new page
    if (y < 500) {
      page = pdfDoc.addPage([595, 842]);
      y = 800;
    }

    // Add rules and guidelines
    y = addRulesAndGuidelines(page, tournament, {
      y,
      leftMargin,
      headingFontSize,
      normalFontSize,
      lineHeight,
      helveticaFont,
      helveticaBold,
    });

    // Check if we need a new page
    if (y < 350) {
      page = pdfDoc.addPage([595, 842]);
      y = 800;
    }

    // Add tournament track
    y = addTournamentTrack(page, tournament, {
      y,
      leftMargin,
      headingFontSize,
      normalFontSize,
      lineHeight,
      helveticaFont,
      helveticaBold,
    });

    // Check if we need a new page
    if (y < 250) {
      page = pdfDoc.addPage([595, 842]);
      y = 800;
    }

    // Add sponsors and partners
    addSponsorsAndPartners(page, tournament, {
      y,
      leftMargin,
      headingFontSize,
      normalFontSize,
      lineHeight,
      helveticaFont,
      helveticaBold,
    });

    // Add footer
    addFooter(page, leftMargin, helveticaFont);

    // Serialize the PDFDocument to bytes
    const pdfBytes = await pdfDoc.save();

    // Create a Blob from the bytes
    const blob = new Blob([pdfBytes], { type: "application/pdf" });

    // Use file-saver to save the file
    saveAs(blob, `${tournament.Name.replace(/\s+/g, "_")}_Details.pdf`);

    return true;
  } catch (error) {
    console.error("Error generating PDF:", error);
    return false;
  }
};

/**
 * Format date for display
 * @param {string} dateString - Date string to format
 * @returns {string} Formatted date
 */
export const formatDate = (dateString) => {
  if (!dateString) return "TBA";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * Adds the tournament header to the PDF
 */
const addTournamentHeader = (page, tournament, options) => {
  const {
    y,
    leftMargin,
    titleFontSize,
    normalFontSize,
    lineHeight,
    helveticaFont,
    helveticaBold,
  } = options;

  let currentY = y;

  // Draw title
  page.drawText(tournament.Name, {
    x: leftMargin,
    y: currentY,
    size: titleFontSize,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  });

  currentY -= lineHeight * 2;

  // Draw header with basic info
  page.drawText(`Date: ${formatDate(tournament.Date)}`, {
    x: leftMargin,
    y: currentY,
    size: normalFontSize,
    font: helveticaFont,
  });

  currentY -= lineHeight;

  page.drawText(`Location: ${tournament.Location}, ${tournament.City}`, {
    x: leftMargin,
    y: currentY,
    size: normalFontSize,
    font: helveticaFont,
  });

  currentY -= lineHeight;

  page.drawText(
    `Registration Deadline: ${formatDate(tournament.registration_deadline)}`,
    {
      x: leftMargin,
      y: currentY,
      size: normalFontSize,
      font: helveticaFont,
    }
  );

  currentY -= lineHeight;

  // Replace ₹ with "Rs." to avoid encoding issues
  page.drawText(`Registration Fee: Rs.${tournament.Registration_fee}`, {
    x: leftMargin,
    y: currentY,
    size: normalFontSize,
    font: helveticaFont,
  });

  currentY -= lineHeight;

  page.drawText(
    `Teams: Min ${tournament.Min_Teams} - Max ${tournament.Max_Teams}`,
    {
      x: leftMargin,
      y: currentY,
      size: normalFontSize,
      font: helveticaFont,
    }
  );

  currentY -= lineHeight;

  page.drawText(`Age Group: ${tournament.Age_group || "Open"}`, {
    x: leftMargin,
    y: currentY,
    size: normalFontSize,
    font: helveticaFont,
  });

  currentY -= lineHeight;

  page.drawText(`Category: ${tournament.Category}`, {
    x: leftMargin,
    y: currentY,
    size: normalFontSize,
    font: helveticaFont,
  });

  currentY -= lineHeight;

  // Replace ₹ with "Rs." to avoid encoding issues
  page.drawText(`Prize Pool: Rs.${tournament.Prize_pool?.toLocaleString()}`, {
    x: leftMargin,
    y: currentY,
    size: normalFontSize,
    font: helveticaFont,
  });

  currentY -= lineHeight * 2;

  return currentY;
};

/**
 * Adds the tournament overview to the PDF
 */
const addTournamentOverview = (page, tournament, options) => {
  const {
    y,
    leftMargin,
    headingFontSize,
    normalFontSize,
    lineHeight,
    pageWidth,
    helveticaFont,
    helveticaBold,
  } = options;

  let currentY = y;

  // Tournament Overview heading
  page.drawText("Tournament Overview", {
    x: leftMargin,
    y: currentY,
    size: headingFontSize,
    font: helveticaBold,
  });

  currentY -= lineHeight;

  // Description might need to be wrapped
  const description = tournament.description || "No description available";

  // Text wrapping function
  const descriptionLines = wrapText(
    description,
    pageWidth,
    normalFontSize,
    helveticaFont
  );

  descriptionLines.forEach((line) => {
    page.drawText(line, {
      x: leftMargin,
      y: currentY,
      size: normalFontSize,
      font: helveticaFont,
    });
    currentY -= lineHeight;
  });

  currentY -= lineHeight;

  return currentY;
};

/**
 * Adds the rules and guidelines to the PDF
 */
const addRulesAndGuidelines = (page, tournament, options) => {
  const {
    y,
    leftMargin,
    headingFontSize,
    normalFontSize,
    lineHeight,
    helveticaFont,
    helveticaBold,
  } = options;

  let currentY = y;

  // Rules & Guidelines heading
  page.drawText("Rules & Guidelines", {
    x: leftMargin,
    y: currentY,
    size: headingFontSize,
    font: helveticaBold,
  });

  currentY -= lineHeight;

  // Default rules and regulations if not provided in the API
  const defaultRules = [
    "All players must bring valid ID proof",
    "Teams must arrive 30 minutes before match",
    "Tournament rules apply as per federation guidelines",
    `Registration fee of Rs.${tournament.Registration_fee} must be paid before the deadline`, // Fixed ₹ symbol
    "Teams must have proper uniforms with visible numbers",
    "Minimum 8 players must be registered per team",
    "Substitutions must follow official game rules",
    "Decisions by referees are final",
    "Unsportsmanlike conduct may result in disqualification",
  ];

  // Use rules from API if available, otherwise use default
  const rulesContent = tournament.rules ? tournament.rules : defaultRules;

  // Draw each rule as a bullet point
  if (typeof rulesContent === "string") {
    page.drawText(`• ${rulesContent}`, {
      x: leftMargin + 10,
      y: currentY,
      size: normalFontSize,
      font: helveticaFont,
    });
    currentY -= lineHeight;
  } else if (Array.isArray(rulesContent)) {
    rulesContent.forEach((rule) => {
      // Replace any ₹ symbols in rule text if present
      const safeRule = rule.replace(/₹/g, "Rs.");

      page.drawText(`• ${safeRule}`, {
        x: leftMargin + 10,
        y: currentY,
        size: normalFontSize,
        font: helveticaFont,
      });
      currentY -= lineHeight;
    });
  }

  currentY -= lineHeight;

  return currentY;
};

/**
 * Adds the tournament track to the PDF
 */
const addTournamentTrack = (page, tournament, options) => {
  const {
    y,
    leftMargin,
    headingFontSize,
    normalFontSize,
    lineHeight,
    helveticaFont,
    helveticaBold,
  } = options;

  let currentY = y;

  // Tournament Track heading
  page.drawText("Tournament Track", {
    x: leftMargin,
    y: currentY,
    size: headingFontSize,
    font: helveticaBold,
  });

  currentY -= lineHeight;

  // Default tournament track if not provided in the API
  const defaultTrack = [
    {
      phase: "Registration Phase",
      dates: `Until ${formatDate(tournament.registration_deadline)}`,
    },
    {
      phase: "Team Confirmation",
      dates: `${formatDate(tournament.registration_deadline)} - ${formatDate(
        new Date(
          new Date(tournament.registration_deadline).getTime() +
            2 * 24 * 60 * 60 * 1000
        )
      )}`,
    },
    {
      phase: "Group Stage",
      dates: `${formatDate(tournament.Date)} - ${formatDate(
        new Date(new Date(tournament.Date).getTime() + 2 * 24 * 60 * 60 * 1000)
      )}`,
    },
    {
      phase: "Quarter Finals",
      dates: `${formatDate(
        new Date(new Date(tournament.Date).getTime() + 3 * 24 * 60 * 60 * 1000)
      )}`,
    },
    {
      phase: "Semi Finals",
      dates: `${formatDate(
        new Date(new Date(tournament.Date).getTime() + 4 * 24 * 60 * 60 * 1000)
      )}`,
    },
    {
      phase: "Finals",
      dates: `${formatDate(
        new Date(new Date(tournament.Date).getTime() + 5 * 24 * 60 * 60 * 1000)
      )}`,
    },
  ];

  // Use tournament track from API if available, otherwise use default
  const trackContent = tournament.track ? tournament.track : defaultTrack;

  // Draw timeline
  if (Array.isArray(trackContent)) {
    trackContent.forEach((phase) => {
      page.drawText(`${phase.phase}`, {
        x: leftMargin,
        y: currentY,
        size: normalFontSize,
        font: helveticaBold,
      });

      currentY -= lineHeight;

      page.drawText(`${phase.dates}`, {
        x: leftMargin + 20,
        y: currentY,
        size: normalFontSize,
        font: helveticaFont,
      });

      currentY -= lineHeight;
    });
  }

  currentY -= lineHeight;

  return currentY;
};

/**
 * Adds the sponsors and partners to the PDF
 */
const addSponsorsAndPartners = (page, tournament, options) => {
  const {
    y,
    leftMargin,
    headingFontSize,
    normalFontSize,
    lineHeight,
    helveticaFont,
    helveticaBold,
  } = options;

  let currentY = y;

  // Sponsors heading
  page.drawText("Sponsors & Partners", {
    x: leftMargin,
    y: currentY,
    size: headingFontSize,
    font: helveticaBold,
  });

  currentY -= lineHeight;

  // Default sponsors if not provided in the API
  const defaultSponsors = [
    "MP Sports Council",
    "District Basketball Association",
    "State Youth Department",
    "Regional Sports Authority",
    "City Youth Development Program",
  ];

  // Use sponsors from API if available, otherwise use default
  const sponsorsContent = tournament.sponsors
    ? tournament.sponsors
    : defaultSponsors;

  // Draw sponsors list
  if (typeof sponsorsContent === "string") {
    page.drawText(`• ${sponsorsContent}`, {
      x: leftMargin + 10,
      y: currentY,
      size: normalFontSize,
      font: helveticaFont,
    });
    currentY -= lineHeight;
  } else if (Array.isArray(sponsorsContent)) {
    sponsorsContent.forEach((sponsor) => {
      page.drawText(`• ${sponsor}`, {
        x: leftMargin + 10,
        y: currentY,
        size: normalFontSize,
        font: helveticaFont,
      });
      currentY -= lineHeight;
    });
  }

  return currentY;
};

/**
 * Adds footer to the PDF
 */
const addFooter = (page, leftMargin, helveticaFont) => {
  page.drawText(`Generated on ${new Date().toLocaleDateString()}`, {
    x: leftMargin,
    y: 30,
    size: 8,
    font: helveticaFont,
    color: rgb(0.5, 0.5, 0.5),
  });
};

/**
 * Simple text wrapping function
 */
const wrapText = (text, maxWidth, fontSize, font) => {
  const words = text.split(" ");
  let lines = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const width = font.widthOfTextAtSize(
      `${currentLine} ${words[i]}`,
      fontSize
    );
    if (width < maxWidth) {
      currentLine += ` ${words[i]}`;
    } else {
      lines.push(currentLine);
      currentLine = words[i];
    }
  }

  lines.push(currentLine);
  return lines;
};
