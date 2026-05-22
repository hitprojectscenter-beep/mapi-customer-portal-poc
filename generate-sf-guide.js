/**
 * Salesforce Implementation Guide Generator
 * Creates a comprehensive Hebrew DOCX guide for beginners
 */
const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, PageOrientation, LevelFormat,
  ExternalHyperlink, HeadingLevel, BorderStyle, WidthType,
  ShadingType, PageNumber, PageBreak, TabStopType, TabStopPosition,
  TableOfContents
} = require("docx");

// =============================================================
// Style configurations
// =============================================================
const FONT = "Arial";
const PRIMARY = "1F4E79";
const SECONDARY = "0B61A1";
const ACCENT = "BF8F00";
const GREEN = "548235";
const RED = "C00000";
const LIGHT_BG = "DEEBF7";
const LIGHT_GREY = "F2F2F2";

const border = { style: BorderStyle.SINGLE, size: 4, color: "BFBFBF" };
const allBorders = { top: border, bottom: border, left: border, right: border };
const noBorder = { style: BorderStyle.NIL, size: 0, color: "FFFFFF" };

// =============================================================
// Helper functions
// =============================================================
function rtlPara(text, options = {}) {
  return new Paragraph({
    bidirectional: true,
    alignment: AlignmentType.RIGHT,
    spacing: { after: 120, ...options.spacing },
    ...options,
    children: [
      new TextRun({
        text,
        font: FONT,
        size: options.size || 22,
        bold: options.bold || false,
        color: options.color || "1A1A1A",
        rightToLeft: true
      })
    ]
  });
}

function heading(text, level, color) {
  const sizes = { 0: 40, 1: 32, 2: 26, 3: 22 };
  const styleColors = { 0: PRIMARY, 1: PRIMARY, 2: SECONDARY, 3: SECONDARY };
  const headingMap = {
    0: HeadingLevel.TITLE,
    1: HeadingLevel.HEADING_1,
    2: HeadingLevel.HEADING_2,
    3: HeadingLevel.HEADING_3
  };
  return new Paragraph({
    heading: headingMap[level],
    bidirectional: true,
    alignment: AlignmentType.RIGHT,
    spacing: {
      before: level === 0 ? 0 : (level === 1 ? 480 : 280),
      after: level === 0 ? 240 : (level === 1 ? 200 : 120)
    },
    children: [
      new TextRun({
        text,
        font: FONT,
        size: sizes[level],
        bold: true,
        color: color || styleColors[level],
        rightToLeft: true
      })
    ]
  });
}

function bullet(text, level = 0, opts = {}) {
  return new Paragraph({
    bidirectional: true,
    alignment: AlignmentType.RIGHT,
    numbering: { reference: "rtl-bullets", level },
    spacing: { after: 80, ...opts.spacing },
    children: [
      new TextRun({
        text,
        font: FONT,
        size: opts.size || 22,
        bold: opts.bold || false,
        color: opts.color || "1A1A1A",
        rightToLeft: true
      })
    ]
  });
}

function numbered(text, opts = {}) {
  return new Paragraph({
    bidirectional: true,
    alignment: AlignmentType.RIGHT,
    numbering: { reference: "rtl-numbers", level: 0 },
    spacing: { after: 100 },
    children: [
      new TextRun({
        text,
        font: FONT,
        size: 22,
        rightToLeft: true,
        ...opts
      })
    ]
  });
}

function infoBox(title, text, color = LIGHT_BG, icon = "💡") {
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [9360],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 9360, type: WidthType.DXA },
            shading: { fill: color, type: ShadingType.CLEAR },
            margins: { top: 200, bottom: 200, left: 240, right: 240 },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 12, color: SECONDARY },
              bottom: { style: BorderStyle.SINGLE, size: 4, color: SECONDARY },
              left: { style: BorderStyle.SINGLE, size: 4, color: SECONDARY },
              right: { style: BorderStyle.SINGLE, size: 24, color: SECONDARY }
            },
            children: [
              new Paragraph({
                bidirectional: true,
                alignment: AlignmentType.RIGHT,
                spacing: { after: 100 },
                children: [
                  new TextRun({
                    text: `${icon} ${title}`,
                    font: FONT,
                    size: 24,
                    bold: true,
                    color: PRIMARY,
                    rightToLeft: true
                  })
                ]
              }),
              ...text.split("\n").map((line) =>
                new Paragraph({
                  bidirectional: true,
                  alignment: AlignmentType.RIGHT,
                  spacing: { after: 60 },
                  children: [
                    new TextRun({
                      text: line,
                      font: FONT,
                      size: 22,
                      color: "1A1A1A",
                      rightToLeft: true
                    })
                  ]
                })
              )
            ]
          })
        ]
      })
    ]
  });
}

function codeBlock(code, language = "") {
  const lines = code.split("\n");
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [9360],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 9360, type: WidthType.DXA },
            shading: { fill: "2A3640", type: ShadingType.CLEAR },
            margins: { top: 200, bottom: 200, left: 240, right: 240 },
            borders: allBorders,
            children: [
              ...(language
                ? [
                    new Paragraph({
                      alignment: AlignmentType.LEFT,
                      spacing: { after: 80 },
                      children: [
                        new TextRun({
                          text: `// ${language}`,
                          font: "Consolas",
                          size: 18,
                          color: "7CBAFF",
                          italics: true
                        })
                      ]
                    })
                  ]
                : []),
              ...lines.map((line) =>
                new Paragraph({
                  alignment: AlignmentType.LEFT,
                  spacing: { after: 0 },
                  children: [
                    new TextRun({
                      text: line || " ",
                      font: "Consolas",
                      size: 18,
                      color: "F8F9FB"
                    })
                  ]
                })
              )
            ]
          })
        ]
      })
    ]
  });
}

function makeCell(text, opts = {}) {
  return new TableCell({
    width: { size: opts.width || 2340, type: WidthType.DXA },
    shading: opts.shading ? { fill: opts.shading, type: ShadingType.CLEAR } : undefined,
    margins: { top: 100, bottom: 100, left: 120, right: 120 },
    borders: allBorders,
    children: [
      new Paragraph({
        bidirectional: true,
        alignment: opts.align || AlignmentType.RIGHT,
        children: [
          new TextRun({
            text,
            font: FONT,
            size: opts.size || 20,
            bold: opts.bold || false,
            color: opts.color || "1A1A1A",
            rightToLeft: true
          })
        ]
      })
    ]
  });
}

function simpleTable(headers, rows, columnWidths) {
  const widths = columnWidths || headers.map(() => Math.floor(9360 / headers.length));
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: widths,
    rows: [
      new TableRow({
        tableHeader: true,
        children: headers.map((h, i) =>
          makeCell(h, {
            width: widths[i],
            shading: PRIMARY,
            color: "FFFFFF",
            bold: true,
            align: AlignmentType.CENTER
          })
        )
      }),
      ...rows.map((row, ri) =>
        new TableRow({
          children: row.map((cell, ci) =>
            makeCell(String(cell), {
              width: widths[ci],
              shading: ri % 2 === 0 ? LIGHT_GREY : undefined
            })
          )
        })
      )
    ]
  });
}

function spacer(after = 200) {
  return new Paragraph({ spacing: { after }, children: [new TextRun({ text: "" })] });
}

function pageBreak() {
  return new Paragraph({ children: [new PageBreak()] });
}

// =============================================================
// Build document content
// =============================================================
const children = [];

// ============= COVER PAGE =============
children.push(spacer(400));
children.push(
  new Paragraph({
    bidirectional: true,
    alignment: AlignmentType.CENTER,
    spacing: { after: 0 },
    children: [
      new TextRun({
        text: '🇮🇱',
        font: FONT,
        size: 96,
        rightToLeft: true
      })
    ]
  })
);
children.push(spacer(200));
children.push(
  new Paragraph({
    bidirectional: true,
    alignment: AlignmentType.CENTER,
    spacing: { after: 100 },
    children: [
      new TextRun({
        text: 'מדריך יישום פורטל לקוחות',
        font: FONT,
        size: 52,
        bold: true,
        color: PRIMARY,
        rightToLeft: true
      })
    ]
  })
);
children.push(
  new Paragraph({
    bidirectional: true,
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
    children: [
      new TextRun({
        text: 'המרכז למיפוי ישראל ב-Salesforce',
        font: FONT,
        size: 36,
        color: SECONDARY,
        rightToLeft: true
      })
    ]
  })
);
children.push(
  new Paragraph({
    bidirectional: true,
    alignment: AlignmentType.CENTER,
    spacing: { after: 480 },
    children: [
      new TextRun({
        text: '— מדריך מקיף למתחילים —',
        font: FONT,
        size: 28,
        italics: true,
        color: "606060",
        rightToLeft: true
      })
    ]
  })
);
children.push(spacer(600));
children.push(
  new Paragraph({
    bidirectional: true,
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({
        text: 'גרסה 1.0',
        font: FONT,
        size: 22,
        bold: true,
        rightToLeft: true
      })
    ]
  })
);
children.push(
  new Paragraph({
    bidirectional: true,
    alignment: AlignmentType.CENTER,
    spacing: { after: 80 },
    children: [
      new TextRun({ text: 'מאי 2026', font: FONT, size: 22, rightToLeft: true })
    ]
  })
);
children.push(
  new Paragraph({
    bidirectional: true,
    alignment: AlignmentType.CENTER,
    spacing: { after: 80 },
    children: [
      new TextRun({
        text: 'מבוסס על POC חי: mapi-customer-portal-poc.vercel.app',
        font: FONT,
        size: 20,
        color: SECONDARY,
        rightToLeft: true
      })
    ]
  })
);
children.push(pageBreak());

// ============= ABOUT THIS GUIDE =============
children.push(heading('על המדריך הזה', 1));
children.push(
  rtlPara(
    'ברוך הבא! המדריך הזה נכתב במיוחד עבור מי שאין לו ידע קודם ב-Salesforce. אנחנו נלך יחד שלב-אחר-שלב, ונבנה ביחד את הפורטל החדש של המרכז למיפוי ישראל.'
  )
);
children.push(spacer());

children.push(
  infoBox(
    'למי המדריך מיועד?',
    'מנהל פרויקט במפ"י שרוצה להבין מה הולך לקרות\nמפתח/ת מתחיל/ה שמצטרף/ת לצוות היישום\nמנהל IT שצריך לדעת מה נדרש מבחינת תשתית\nכל מי שרוצה ללמוד איך בונים מערכת ענן מודרנית',
    LIGHT_BG,
    '👤'
  )
);
children.push(spacer());

children.push(heading('מה תקבל מהמדריך?', 2));
children.push(bullet('הבנה בסיסית של Salesforce - מה זה ולמה משתמשים בו'));
children.push(bullet('הכרת המוצרים השונים של Salesforce הרלוונטיים לפרויקט'));
children.push(bullet('סדר פעולות מפורט להקמת הפורטל מאפס'));
children.push(bullet('דוגמאות קוד מוכנות שאפשר להעתיק ולהדביק'));
children.push(bullet('הסבר על AI Agent חכם והקמתו'));
children.push(bullet('הסבר על תמיכה בשפות (עברית, אנגלית, צרפתית, ספרדית, רוסית, ערבית)'));
children.push(bullet('הערכת זמנים ועלויות'));
children.push(bullet('רשימת בדיקות לפני עליה לאוויר'));
children.push(bullet('מילון מונחים מקצועי + מקורות למידה נוספים'));
children.push(spacer());

children.push(
  infoBox(
    'איך לקרוא את המדריך',
    'אם זו הפעם הראשונה שלך - תקרא בסדר הכרונולוגי, פרק אחרי פרק.\nאם אתה כבר מכיר חלקים - תוכל לדלג ישירות לחלק הרלוונטי.\nכל שלב כולל הסבר "מה אנחנו עושים?", "למה?", ו"איך?"',
    'FFF4E6',
    '📖'
  )
);
children.push(pageBreak());

// ============= TABLE OF CONTENTS =============
children.push(heading('תוכן עניינים', 1));
children.push(spacer());

const toc = [
  ['חלק א - הבסיס', ''],
  ['פרק 1: מה זה Salesforce ולמה אנחנו צריכים אותו?', '5'],
  ['פרק 2: מבט על על הפרויקט', '8'],
  ['פרק 3: רכיבי המערכת', '11'],
  ['חלק ב - הכנות', ''],
  ['פרק 4: רישיונות ועלויות', '14'],
  ['פרק 5: הקמת ארגון Salesforce', '17'],
  ['פרק 6: התקנת חבילות (PSS)', '20'],
  ['חלק ג - בנייה', ''],
  ['פרק 7: הקמת אתר ב-Experience Cloud', '23'],
  ['פרק 8: מודל הנתונים', '27'],
  ['פרק 9: בניית רכיבי UI (LWC)', '32'],
  ['פרק 10: עיצוב ו-Design System', '38'],
  ['פרק 11: טפסים דינמיים (OmniScript)', '42'],
  ['פרק 12: שורת חדשות עם CMS', '47'],
  ['חלק ד - יכולות מתקדמות', ''],
  ['פרק 13: תמיכה ב-6 שפות', '50'],
  ['פרק 14: AI Agent חכם (Agentforce)', '54'],
  ['פרק 15: הזדהות לאומית', '60'],
  ['פרק 16: אינטגרציות עם מערכות חיצוניות', '63'],
  ['חלק ה - סיום', ''],
  ['פרק 17: בדיקות', '67'],
  ['פרק 18: עליה לאוויר', '70'],
  ['פרק 19: תחזוקה שוטפת', '72'],
  ['נספחים', ''],
  ['נספח א - מילון מונחים', '74'],
  ['נספח ב - מקורות למידה נוספים', '78'],
  ['נספח ג - שאלות נפוצות', '80']
];

children.push(
  new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [8000, 1360],
    rows: toc.map(([title, page]) => {
      const isSection = !page;
      return new TableRow({
        children: [
          new TableCell({
            width: { size: 8000, type: WidthType.DXA },
            margins: { top: 80, bottom: 80, left: 120, right: 120 },
            borders: {
              top: noBorder,
              bottom: { style: BorderStyle.DOTTED, size: 2, color: "C2C7D0" },
              left: noBorder,
              right: noBorder
            },
            shading: isSection ? { fill: LIGHT_BG, type: ShadingType.CLEAR } : undefined,
            children: [
              new Paragraph({
                bidirectional: true,
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: title,
                    font: FONT,
                    size: isSection ? 24 : 22,
                    bold: isSection,
                    color: isSection ? PRIMARY : "1A1A1A",
                    rightToLeft: true
                  })
                ]
              })
            ]
          }),
          new TableCell({
            width: { size: 1360, type: WidthType.DXA },
            margins: { top: 80, bottom: 80, left: 120, right: 120 },
            borders: {
              top: noBorder,
              bottom: { style: BorderStyle.DOTTED, size: 2, color: "C2C7D0" },
              left: noBorder,
              right: noBorder
            },
            shading: isSection ? { fill: LIGHT_BG, type: ShadingType.CLEAR } : undefined,
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: page,
                    font: FONT,
                    size: 22,
                    bold: !!page,
                    color: SECONDARY
                  })
                ]
              })
            ]
          })
        ]
      });
    })
  })
);
children.push(pageBreak());

// ============= PART A - FOUNDATIONS =============
children.push(heading('חלק א - הבסיס', 0));
children.push(spacer(400));
children.push(rtlPara('בחלק הזה נכיר את המושגים הבסיסיים ונבין למה בחרנו ב-Salesforce עבור פורטל מפ"י.'));
children.push(pageBreak());

// ============= CHAPTER 1 =============
children.push(heading('פרק 1: מה זה Salesforce ולמה אנחנו צריכים אותו?', 1));

children.push(heading('1.1 הסבר פשוט', 2));
children.push(
  rtlPara(
    'Salesforce היא חברת תוכנה אמריקאית גדולה (בערך כמו מיקרוסופט, רק שמתמחה במערכות לעסקים). הם מציעים מערכות "ענן" - כלומר תוכנות שרצות באינטרנט ולא דורשות התקנה במחשב או בשרת מקומי.'
  )
);
children.push(
  rtlPara(
    'בעולם, יותר מ-150,000 ארגונים משתמשים ב-Salesforce כדי לנהל את הלקוחות שלהם, את המכירות, את השירות, ועוד. גם ממשלת ישראל בחרה ב-Salesforce כפלטפורמת הענן הראשית למגזר הציבורי.'
  )
);
children.push(spacer());

children.push(
  infoBox(
    'דוגמה מהיום-יום',
    'דמיינו את מפ"י כמסעדה גדולה. Salesforce זה כמו "מערכת ניהול מסעדה" שלמה - היא יודעת לנהל הזמנות, לעקוב אחרי לקוחות קבועים, לנהל את המלאי, לשלוח חשבוניות, ולתת לבעלים לראות בזמן אמת מה קורה במסעדה.\n\nההבדל: ל-Salesforce יש מערכות מיוחדות לסוגי "מסעדות" שונים. למשל "Public Sector Solutions" זה כמו "מערכת מותאמת למסעדות יוקרה ממשלתיות".',
    LIGHT_BG,
    '🍽️'
  )
);
children.push(spacer());

children.push(heading('1.2 למה Salesforce ולא משהו אחר?', 2));
children.push(
  rtlPara(
    'הממשלה בחרה ב-Salesforce ככלי המרכזי לניהול קשרי לקוחות במגזר הציבורי מהסיבות הבאות:'
  )
);
children.push(spacer(120));

children.push(
  simpleTable(
    ['קריטריון', 'מה זה אומר', 'למה זה חשוב לנו'],
    [
      ['ענן (Cloud)', 'הכל באינטרנט, בלי שרתים מקומיים', 'אין צורך בחדר שרתים, אין תחזוקה'],
      ['אבטחה', 'תקני אבטחה הגבוהים ביותר', 'מתאים לדרישות יה"ב 5.35'],
      ['ויברנטיות', 'אלפי לקוחות בו-זמנית בלי בעיות', 'הפורטל מיועד למיליוני אזרחים'],
      ['Low-Code', 'אפשר לבנות הרבה בלי לכתוב קוד', 'פיתוח מהיר יותר'],
      ['גמישות', 'אפשר להתאים הכל למפ"י', 'מותאם לצרכים הייחודיים שלנו'],
      ['אינטגרציות', 'מתחבר לכל מערכת אחרת', 'נתחבר לתשלומים, GovMap, מרכבה...']
    ],
    [2000, 4000, 3360]
  )
);
children.push(spacer());

children.push(heading('1.3 איזה מוצרים של Salesforce אנחנו צריכים?', 2));
children.push(
  rtlPara('Salesforce מורכבת מהרבה מוצרים שונים. עבור פורטל מפ"י אנחנו נשתמש בשניים עיקריים:')
);
children.push(spacer());

children.push(heading('Sales Cloud', 3));
children.push(
  rtlPara(
    'מערכת ניהול מכירות. כאן יישמרו כל הלקוחות שלנו (אזרחים, חברות, רשויות), ההזמנות, ההצעות מחיר, החוזים, וכו\'. זה ה"מוח" של מפ"י מבחינת מכירות.'
  )
);
children.push(spacer());

children.push(heading('Experience Cloud', 3));
children.push(
  rtlPara(
    'זה החלק שאזרחים יראו. Experience Cloud מאפשרת לנו לבנות אתר אינטרנט (פורטל) שמחובר ישירות ל-Sales Cloud. כשלקוח מזמין מפה דרך הפורטל, ההזמנה נכנסת אוטומטית למערכת המכירות.'
  )
);
children.push(spacer());

children.push(
  infoBox(
    'אנלוגיה פשוטה',
    'Sales Cloud = חדר הצוות (פנימי, עובדי מפ"י)\nExperience Cloud = החנות (חיצוני, אזרחים)\n\nשניהם רואים את אותם הנתונים, אבל מהזווית שלהם.',
    'E2EFDA',
    '🏢'
  )
);
children.push(spacer());

children.push(heading('1.4 מה זה PSS (Public Sector Solutions)?', 2));
children.push(
  rtlPara(
    'PSS היא חבילה מיוחדת של Salesforce שנבנתה במיוחד למגזר הציבורי. היא כוללת כלים מובנים שמתאימים בדיוק לצרכים של גופים ממשלתיים כמו מפ"י.'
  )
);
children.push(spacer());

children.push(heading('מה כלול ב-PSS?', 3));
children.push(bullet('OmniScript - בונה טפסים דינמיים (כמו טפסי הזמנה שלנו)'));
children.push(bullet('FlexCards - תצוגות מידע מעוצבות (כמו כרטיסי שירות)'));
children.push(bullet('Business Rule Engine (BRE) - חישוב מחירים אוטומטי'));
children.push(bullet('DocGen - הפקת מסמכי PDF (הצעות מחיר, חשבוניות)'));
children.push(bullet('Action Plans - תבניות לתהליכי עבודה'));
children.push(bullet('Integration Procedures - אינטגרציות מוכנות'));
children.push(pageBreak());

// ============= CHAPTER 2 =============
children.push(heading('פרק 2: מבט על על הפרויקט', 1));

children.push(heading('2.1 מה אנחנו בונים?', 2));
children.push(
  rtlPara(
    'אנחנו בונים פורטל לקוחות אינטרנטי שיאפשר ל-3 קהלי לקוחות עיקריים לקבל שירות מהמרכז למיפוי ישראל:'
  )
);
children.push(spacer(120));

children.push(numbered('אזרחים פרטיים - למשל אדם שרוצה להזמין מפה של הכפר שלו', { bold: true }));
children.push(rtlPara('הם ייכנסו לפורטל, יעיינו בקטלוג, יעשו הזמנה, ישלמו, ויקבלו את התוצר.'));
children.push(spacer(80));

children.push(numbered('אנשי מקצוע - מודדים מוסמכים, מהנדסים, חברות תכנון', { bold: true }));
children.push(rtlPara('הם יזמינו שירותים מקצועיים כמו מנויי CORS, נתוני GIS, ושירותי מודד מבקר.'));
children.push(spacer(80));

children.push(numbered('ארגונים - רשויות מקומיות, משרדי ממשלה, חברות גדולות', { bold: true }));
children.push(rtlPara('הם יזמינו פתרונות בקנה מידה גדול כולל הסכמי שו"פ ארוכי טווח.'));
children.push(spacer());

children.push(heading('2.2 מה יוכל הלקוח לעשות בפורטל?', 2));
children.push(
  simpleTable(
    ['פעולה', 'תיאור'],
    [
      ['עיון בקטלוג', 'צפייה ב-14 השירותים של מפ"י עם פירוט'],
      ['חיפוש', 'חיפוש שירות לפי שם, קטגוריה, או טווח מחירים'],
      ['בקשת הצעת מחיר', 'מילוי טופס קצר לקבלת הצעה מותאמת'],
      ['הזמנה דינמית', 'מילוי טופס OmniScript ב-4 שלבים'],
      ['סימון אזור על המפה', 'דרך GovMap המוטמע'],
      ['תשלום מאובטח', 'דרך שרת התשלומים הממשלתי'],
      ['מעקב הזמנות', 'אזור אישי עם היסטוריה מלאה'],
      ['פתיחת פנייה', 'Case Management מובנה'],
      ['ניהול מנויים', 'CORS, WS, וכו\''],
      ['שיחה עם AI', 'מסייע חכם 24/7 ב-6 שפות']
    ],
    [3000, 6360]
  )
);
children.push(spacer());

children.push(heading('2.3 איך נראה הפורטל היום? (POC חי)', 2));
children.push(
  rtlPara(
    'יש לנו כבר POC עובד שנבנה ב-Next.js. ה-POC הזה הוא רפרנס מלא לעיצוב, התכנים והתנהגות שאנחנו רוצים לבנות ב-Salesforce.'
  )
);
children.push(spacer());

children.push(
  infoBox(
    'הפורטל החי',
    'URL: https://mapi-customer-portal-poc.vercel.app\n\nכל הצוות צריך להיכנס ולעיין בו. הוא ישמש כ"מפת דרכים" לכל החלטות עיצוב ו-UX.',
    LIGHT_BG,
    '🌐'
  )
);
children.push(spacer());

children.push(heading('2.4 כמה זמן ייקח הפרויקט?', 2));
children.push(
  rtlPara(
    'הערכה ריאלית: כ-10-12 חודשים מהיום הראשון ועד לעליה לאוויר. הנה השלבים העיקריים:'
  )
);
children.push(spacer(120));

children.push(
  simpleTable(
    ['שלב', 'משך', 'מה קורה'],
    [
      ['הכנה', '4 שבועות', 'רישיונות, ארגונים, הזדהות לאומית'],
      ['פיתוח תשתית', '4 שבועות', 'מודל נתונים, רכיבי בסיס'],
      ['פיתוח LWC', '10 שבועות', 'בניית כל רכיבי ה-UI'],
      ['פיתוח OmniScript', '8 שבועות', '6 טפסי הזמנה (במקביל)'],
      ['AI Agent', '3 שבועות', 'הקמת Agentforce עם 6 שפות'],
      ['אינטגרציות', '6 שבועות', 'תשלומים, GovMap, מרכבה, SMS'],
      ['בדיקות (QA)', '6 שבועות', 'פונקציונליות, ביצועים, אבטחה'],
      ['UAT', '3 שבועות', 'מפ"י בודקים בסביבת PreProd'],
      ['הדרכות', '2 שבועות', 'הכשרת צוות מפ"י לתחזוקה'],
      ['Go-Live', '1 שבוע', 'עליה לאוויר עם ניטור צמוד']
    ],
    [2500, 2000, 4860]
  )
);
children.push(pageBreak());

// ============= CHAPTER 3 =============
children.push(heading('פרק 3: רכיבי המערכת', 1));

children.push(heading('3.1 הארכיטקטורה - מבט על', 2));
children.push(
  rtlPara('הפורטל מורכב מ-3 שכבות עיקריות. כל שכבה אחראית לתפקיד אחר:')
);
children.push(spacer());

children.push(heading('שכבה 1: מה שהלקוח רואה (Frontend)', 3));
children.push(
  rtlPara(
    'זה החלק החיצוני שאזרחים רואים בדפדפן. בנוי מ-LWC (Lightning Web Components) - רכיבים קטנים שמרכיבים את הדף.'
  )
);
children.push(spacer());

children.push(heading('שכבה 2: לוגיקה עסקית (Backend)', 3));
children.push(
  rtlPara(
    'זה החלק שמטפל בלוגיקה - חישוב מחירים, יצירת הזמנות, שליחת מיילים. בנוי מ-Flows, Apex (קוד Salesforce), ו-Integration Procedures.'
  )
);
children.push(spacer());

children.push(heading('שכבה 3: נתונים (Database)', 3));
children.push(
  rtlPara(
    'זה החלק שאחראי לשמור את כל הנתונים - לקוחות, הזמנות, מוצרים, פניות. ב-Salesforce זה נקרא "אובייקטים" (Objects).'
  )
);
children.push(spacer());

children.push(heading('3.2 דיאגרמת המערכת המלאה', 2));
children.push(spacer(120));

children.push(codeBlock(`+--------------------------------------------+
|  LAYER 1: FRONTEND - מה שהלקוח רואה        |
+--------------------------------------------+
|                                            |
|  +----------------------------------+      |
|  |  News Ticker - שורת חדשות       |      |
|  +----------------------------------+      |
|  |  Header + Language Switcher      |      |
|  +----------------------------------+      |
|  |                                  |      |
|  |  Hero / Catalog / Order Form     |      |
|  |  (Custom LWC + FlexCards)        |      |
|  |                                  |      |
|  +----------------------------------+      |
|  |  Footer                          |      |
|  +----------------------------------+      |
|                                            |
|  AI Agent (Agentforce) - 🤖 ←-- floating   |
|                                            |
+--------------+-----------------------------+
               |
               | API Calls
               v
+--------------------------------------------+
|  LAYER 2: BACKEND - לוגיקה                 |
+--------------------------------------------+
|                                            |
|  Flows | Apex | OmniScript | BRE | DocGen  |
|                                            |
+--------------+-----------------------------+
               |
               | Read/Write
               v
+--------------------------------------------+
|  LAYER 3: DATABASE - נתונים                |
+--------------------------------------------+
|                                            |
|  Standard Objects:                         |
|    Account | Contact | Opportunity         |
|    Quote | Order | Case | Knowledge        |
|                                            |
|  Custom Objects (פיתוח מותאם):              |
|    News_Item | Service_Catalog             |
|    Map_Polygon | API_Call_Log              |
|                                            |
+--------------------------------------------+`, 'מבנה המערכת'));
children.push(spacer());

children.push(heading('3.3 רכיבים חיצוניים שמתחברים', 2));
children.push(
  rtlPara(
    'הפורטל לא יחיה לבד - הוא יתקשר עם 5 מערכות חיצוניות עיקריות:'
  )
);
children.push(spacer(120));

children.push(
  simpleTable(
    ['מערכת', 'תפקיד', 'פרוטוקול'],
    [
      ['הזדהות לאומית', 'אימות זהות אזרחים', 'SAML 2.0'],
      ['שרת תשלומים ממשלתי', 'גביית תשלומים', 'REST + Webhook'],
      ['GovMap', 'בחירת אזור על המפה', 'iframe + JS API'],
      ['מרכבה (ERP)', 'סנכרון חשבוניות', 'REST/SOAP'],
      ['ספק SMS (שמיר)', 'שליחת אישורים', 'REST API'],
      ['geo++ / CORS', 'הפעלת מנויי תחנות', 'REST API']
    ],
    [2500, 4000, 2860]
  )
);
children.push(pageBreak());

// ============= PART B - PREPARATIONS =============
children.push(heading('חלק ב - הכנות', 0));
children.push(spacer(400));
children.push(
  rtlPara(
    'בחלק הזה נעשה את כל ההכנות לפני שמתחילים לפתח. נרכוש רישיונות, נקים ארגון Salesforce, ונתקין את חבילות הבסיס.'
  )
);
children.push(pageBreak());

// ============= CHAPTER 4 =============
children.push(heading('פרק 4: רישיונות ועלויות', 1));

children.push(heading('4.1 מה זה רישיון Salesforce?', 2));
children.push(
  rtlPara(
    'Salesforce עובדת במודל מנוי - משלמים כל חודש (או שנה). כל סוג רישיון מאפשר דברים אחרים. בואו נכיר את הרישיונות שצריך:'
  )
);
children.push(spacer());

children.push(heading('4.2 רישיונות עיקריים שצריך לרכוש', 2));
children.push(spacer(120));

children.push(
  simpleTable(
    ['רישיון', 'מטרה', 'עלות לחודש (משוער)'],
    [
      ['Sales Cloud Enterprise', 'מערכת מכירות פנימית', '$150/יוזר'],
      ['Service Cloud Enterprise', 'ניהול שירות לקוחות', '$150/יוזר'],
      ['Experience Cloud', 'פורטל ללקוחות חיצוניים', '$5/login'],
      ['PSS Foundation', 'OmniScript, FlexCards, BRE', 'כלול'],
      ['Customer Community for PSS', 'משתמשים חיצוניים פעילים', '$5/יוזר'],
      ['Salesforce Shield', 'אבטחה והצפנה', '$1,500/חודש'],
      ['Agentforce', 'AI Agent חכם', '$2/conversation'],
      ['Translation Workbench', 'תרגום ל-6 שפות', 'כלול']
    ],
    [3000, 3800, 2560]
  )
);
children.push(spacer());

children.push(
  infoBox(
    'הערה חשובה',
    'המחירים הם כלליים ומשתנים לפי כמות ומשא ומתן. בהזמנה ממשלתית בישראל יש בדרך כלל הנחה משמעותית (20-40%). ההערכה הכוללת לשנה: בערך 1.2-2.5 מיליון ש"ח.',
    'FFF4E6',
    '💰'
  )
);
children.push(spacer());

children.push(heading('4.3 איך רוכשים?', 2));
children.push(numbered('פנייה לנציג Salesforce בישראל - דרך משרד התקשוב'));
children.push(numbered('הגדרת כמות משתמשים פנימיים (Sales/Service Cloud)'));
children.push(numbered('הגדרת כמות משתמשים חיצוניים צפויה (Community)'));
children.push(numbered('חתימה על הסכם רב-שנתי (בדרך כלל 3 שנים, נותן הנחה)'));
children.push(numbered('יצירת חשבון Production + Sandboxes'));
children.push(spacer());

children.push(heading('4.4 Sandboxes - מה זה ולמה?', 2));
children.push(
  rtlPara(
    'Sandbox זה "ארגון תאום" - העתק של ה-Production שלך לצורך פיתוח ובדיקות. בלי לפגוע במערכת החיה.'
  )
);
children.push(spacer());

children.push(heading('סוגי Sandboxes שצריך:', 3));
children.push(bullet('DEV - לפיתוח יומיומי (גודל קטן)'));
children.push(bullet('INT - בדיקות אינטגרציה (העתק חלקי)'));
children.push(bullet('UAT - בדיקות קבלה (העתק מלא)'));
children.push(bullet('STAGING - דמוי Production סופי'));
children.push(spacer());

children.push(
  infoBox(
    'דמיין את זה ככה',
    'יש לך מסעדה (Production). אבל אתה רוצה לנסות מתכון חדש. אתה לא ינסה במטבח של המסעדה - אתה תנסה במטבח ביתי (Sandbox). אם המתכון מצליח - תעביר אותו למסעדה.\n\nאותו דבר בקוד - תפתח ב-DEV, תבדוק ב-UAT, ורק כשהכל עובד - תעביר ל-Production.',
    'E2EFDA',
    '🍳'
  )
);
children.push(pageBreak());

// ============= CHAPTER 5 =============
children.push(heading('פרק 5: הקמת ארגון Salesforce', 1));

children.push(heading('5.1 איך נראה ארגון Salesforce?', 2));
children.push(
  rtlPara(
    'אחרי שרכשת רישיון, Salesforce ייצרו לך "ארגון" - שזה בעצם הסביבה הפרטית שלך. תקבל URL בסגנון: my-org-12345.lightning.force.com'
  )
);
children.push(spacer());

children.push(heading('5.2 התחברות ראשונה', 2));
children.push(numbered('פתח את האימייל שקיבלת מ-Salesforce'));
children.push(numbered('לחץ על "Verify Account" - תקבל כתובת'));
children.push(numbered('צור סיסמה חזקה'));
children.push(numbered('הגדר שאלת אבטחה'));
children.push(numbered('היכנס למסך הראשי - "Setup" (גלגל שיניים בפינה הימנית-עליונה)'));
children.push(spacer());

children.push(heading('5.3 הגדרות בסיסיות חשובות', 2));
children.push(spacer(120));

children.push(heading('הגדרת שפה ומיקום', 3));
children.push(
  codeBlock(`Setup -> Company Information ->
  Default Language: Hebrew
  Default Locale: Hebrew (Israel)
  Default Time Zone: (GMT+02:00) Israel Standard Time
  Currency: ILS (Israeli Shekel)`, 'הגדרות חברה')
);
children.push(spacer());

children.push(heading('הגדרת My Domain', 3));
children.push(
  rtlPara(
    'My Domain מאפשר לך URL מותאם אישית במקום ברירת המחדל. למשל: portal-mapi.lightning.force.com'
  )
);
children.push(
  codeBlock(`Setup -> My Domain -> Edit
  Subdomain: portal-mapi
  Routing Choice: Force users to use My Domain URL`, 'My Domain')
);
children.push(spacer());

children.push(heading('5.4 יצירת משתמשים פנימיים', 2));
children.push(
  rtlPara(
    'משתמשים פנימיים = עובדי מפ"י שיעבדו במערכת. כל אחד צריך פרופיל מתאים:'
  )
);
children.push(spacer(120));

children.push(
  simpleTable(
    ['תפקיד במפ"י', 'פרופיל Salesforce', 'מה הוא יראה'],
    [
      ['מנהל אגף', 'System Administrator', 'הכל'],
      ['נציג שירות', 'Service Agent', 'Cases + Knowledge'],
      ['איש מכירות', 'Sales User', 'Accounts + Opps + Quotes'],
      ['מנהל פורטל', 'Portal Manager (Custom)', 'CMS + Site Builder'],
      ['מודד פנימי', 'Surveyor (Custom)', 'Map polygons + Reports']
    ],
    [2800, 3000, 3560]
  )
);
children.push(spacer());

children.push(heading('5.5 פעולות שכדאי לעשות בהתחלה', 2));
children.push(bullet('הפעלת Lightning Experience (אם עוד לא פעיל)'));
children.push(bullet('הפעלת Multi-Currency (אם רלוונטי)'));
children.push(bullet('הפעלת Field History Tracking על אובייקטים קריטיים'));
children.push(bullet('הגדרת Email Templates בעברית'));
children.push(bullet('הגדרת אמינות (Trust Center) - לקבל התראות על תקלות'));
children.push(pageBreak());

// ============= CHAPTER 6 =============
children.push(heading('פרק 6: התקנת חבילות (PSS)', 1));

children.push(heading('6.1 מה זה Package?', 2));
children.push(
  rtlPara(
    'Package זה כמו "תוסף" או "אפליקציה" שאפשר להתקין בארגון. PSS היא חבילה רשמית של Salesforce.'
  )
);
children.push(spacer());

children.push(heading('6.2 התקנת PSS Foundation', 2));
children.push(spacer(120));
children.push(numbered('היכנס ל-AppExchange (אפשר ישירות מתוך Setup)'));
children.push(numbered('חפש: "Public Sector Solutions"'));
children.push(numbered('לחץ "Get It Now"'));
children.push(numbered('בחר "Install in Production" (או Sandbox לבדיקה)'));
children.push(numbered('סמן "Grant access to all users"'));
children.push(numbered('לחץ "Install" - תהליך לוקח 5-10 דקות'));
children.push(numbered('תקבל מייל אישור כשההתקנה הושלמה'));
children.push(spacer());

children.push(heading('6.3 בדיקה שההתקנה הצליחה', 2));
children.push(numbered('Setup -> Installed Packages'));
children.push(numbered('וודא שאתה רואה: "Public Sector Solutions Foundation"'));
children.push(numbered('סטטוס: "Active"'));
children.push(numbered('מספר רכיבים: יותר מ-200'));
children.push(spacer());

children.push(heading('6.4 התקנת חבילות נוספות', 2));
children.push(
  rtlPara('בנוסף ל-PSS, נצטרך להתקין עוד כמה חבילות שימושיות:')
);
children.push(spacer(120));

children.push(
  simpleTable(
    ['חבילה', 'מטרה'],
    [
      ['OmniStudio Foundation', 'OmniScript + FlexCards (חלק מ-PSS)'],
      ['DocGen Foundation', 'הפקת PDF מתבניות'],
      ['Integration Procedures', 'אינטגרציות No-Code'],
      ['Translation Workbench', 'תרגומים (כלול בליבה)'],
      ['Salesforce CMS', 'ניהול תוכן (כלול ב-Experience Cloud)']
    ],
    [3500, 5860]
  )
);
children.push(spacer());

children.push(
  infoBox(
    'הערה לפיתוח',
    'כל ההתקנות צריכות להיעשות קודם בסביבת DEV או UAT, ורק אחרי בדיקה - להעביר ל-Production. זה חלק מ-DevOps Best Practices.',
    'FFF4E6',
    '⚠️'
  )
);
children.push(pageBreak());

// ============= PART C - BUILDING =============
children.push(heading('חלק ג - בנייה', 0));
children.push(spacer(400));
children.push(
  rtlPara(
    'עכשיו מתחילים לבנות! בחלק הזה נקים את האתר ב-Experience Cloud, נבנה את מודל הנתונים, וניצור את כל הרכיבים שאזרחים יראו.'
  )
);
children.push(pageBreak());

// ============= CHAPTER 7 =============
children.push(heading('פרק 7: הקמת אתר ב-Experience Cloud', 1));

children.push(heading('7.1 מה זה Experience Cloud Site?', 2));
children.push(
  rtlPara(
    'Site (אתר) ב-Experience Cloud זה האתר האינטרנטי שלך. אתה יכול ליצור כמה שתרצה - למשל אתר ללקוחות פרטיים, אתר אחר לשותפים, וכו\'.'
  )
);
children.push(spacer());

children.push(heading('7.2 יצירת ה-Site', 2));
children.push(numbered('Setup -> Digital Experiences -> All Sites'));
children.push(numbered('לחץ "New"'));
children.push(numbered('בחר Template: "Build Your Own (LWR)"'));
children.push(numbered('שם: "MAPI Customer Portal"'));
children.push(numbered('URL: portal'));
children.push(numbered('לחץ "Create"'));
children.push(spacer());

children.push(
  infoBox(
    'למה LWR ולא Aura?',
    'יש 2 סוגים של Sites:\n\n1. Aura (הישן) - מבוסס תבניות קבועות, פחות גמיש\n2. LWR (Lightning Web Runtime) - חדש, מודרני, מהיר יותר, מאפשר עיצוב גמיש\n\nאנחנו צריכים LWR כי אנחנו רוצים את העיצוב המתקדם שראינו ב-POC.',
    LIGHT_BG,
    '🔧'
  )
);
children.push(spacer());

children.push(heading('7.3 הגדרת שפות באתר', 2));
children.push(numbered('Workspaces -> Administration -> Languages'));
children.push(numbered('Default Language: Hebrew'));
children.push(numbered('Add Languages: English, French, Spanish, Russian, Arabic'));
children.push(numbered('סמן "Right-to-left" עבור עברית וערבית'));
children.push(numbered('Save'));
children.push(spacer());

children.push(heading('7.4 חיבור Domain מותאם אישית', 2));
children.push(
  rtlPara(
    'אנחנו רוצים שהאתר ייפתח בכתובת: portal.mapi.gov.il'
  )
);
children.push(spacer(120));
children.push(numbered('Setup -> Custom URLs -> New Custom URL'));
children.push(numbered('Domain: portal.mapi.gov.il'));
children.push(numbered('Site: MAPI Customer Portal'));
children.push(numbered('בקשה ל-IT של מפ"י: ליצור DNS CNAME record שמצביע על Salesforce'));
children.push(numbered('המתנה ל-SSL Certificate (אוטומטי דרך Salesforce + Akamai)'));
children.push(spacer());

children.push(heading('7.5 הגדרת הזדהות', 2));
children.push(
  rtlPara(
    'באתר Experience Cloud יש 2 סוגי משתמשים:'
  )
);
children.push(spacer(120));

children.push(heading('משתמשים אנונימיים (Guest Users)', 3));
children.push(
  rtlPara('יכולים לראות את הקטלוג, להשתמש בחיפוש, לראות פרטי שירות. לא יכולים להזמין.')
);
children.push(spacer());

children.push(heading('משתמשים מזוהים (Authenticated)', 3));
children.push(
  rtlPara('אזרחים שהזדהו עם הזדהות לאומית. יכולים להזמין, לראות היסטוריה, לפתוח פניות.')
);
children.push(spacer());

children.push(heading('7.6 תצוגה לפני פרסום', 2));
children.push(
  rtlPara(
    'לפני שמפרסמים את האתר לציבור, אפשר לראות בתצוגה מקדימה (Preview):'
  )
);
children.push(spacer());
children.push(numbered('Experience Builder -> Preview (כפתור עין למעלה)'));
children.push(numbered('בחר Profile: "Guest User" (מה שאזרח יראה)'));
children.push(numbered('בדוק בגדלים שונים: Desktop, Tablet, Mobile'));
children.push(pageBreak());

// ============= CHAPTER 8 =============
children.push(heading('פרק 8: מודל הנתונים', 1));

children.push(heading('8.1 מה זה Object ב-Salesforce?', 2));
children.push(
  rtlPara(
    'Object (אובייקט) זה למעשה "טבלה" שמכילה נתונים. למשל - Object של "Account" שומר את כל החברות. Object של "Contact" שומר את אנשי הקשר.'
  )
);
children.push(spacer());

children.push(
  infoBox(
    'אנלוגיה מ-Excel',
    'אם אתה רגיל ל-Excel:\n• Object = Sheet (גליון)\n• Record = Row (שורה)\n• Field = Column (עמודה)\n\nההבדל: Salesforce חכמה יותר ממאה גליונות Excel ביחד - היא יודעת לקשר בין כל ה"גליונות".',
    LIGHT_BG,
    '📊'
  )
);
children.push(spacer());

children.push(heading('8.2 Standard Objects שנשתמש בהם', 2));
children.push(
  rtlPara(
    'Standard Objects = אובייקטים שכבר קיימים ב-Salesforce מהיום הראשון. לא צריך ליצור אותם.'
  )
);
children.push(spacer(120));

children.push(
  simpleTable(
    ['Object', 'מה הוא שומר', 'דוגמה'],
    [
      ['Account', 'לקוח (חברה, ארגון, או פרטי)', 'חברת BCD בע"מ'],
      ['Contact', 'איש קשר אצל לקוח', 'יוסי כהן, מנכ"ל'],
      ['Opportunity', 'הזדמנות מכירה', 'מכירת מנוי CORS שנתי'],
      ['Quote', 'הצעת מחיר', 'הצעה QT-2026-088'],
      ['Order', 'הזמנה', 'ORD-2026-145'],
      ['Case', 'פנייה לשירות', 'בעיה עם הזמנה'],
      ['Product2', 'מוצר/שירות', 'מפה בהתאמה אישית'],
      ['Knowledge', 'מאמרי ידע ו-FAQ', 'איך להזמין מפה?']
    ],
    [2000, 3500, 3860]
  )
);
children.push(spacer());

children.push(heading('8.3 Custom Objects שנפתח בעצמנו', 2));
children.push(
  rtlPara(
    'Custom Objects = אובייקטים מותאמים שיש לנו צורך מיוחד בהם. נצטרך ליצור כמה:'
  )
);
children.push(spacer(120));

children.push(
  simpleTable(
    ['Custom Object', 'מה הוא שומר'],
    [
      ['News_Item__c', 'פריטי שורת חדשות (מבצעים, חדשות)'],
      ['Service_Catalog_Item__c', 'הקטלוג המורחב של 14 השירותים'],
      ['Map_Polygon__c', 'אזורי מפה שלקוחות סימנו'],
      ['Portal_Subscription__c', 'מנויי CORS / WS פעילים'],
      ['API_Call_Log__c', 'לוג של כל קריאות API (לאבטחה)'],
      ['Survey_Inspector_Job__c', 'משימות מודד מבקר'],
      ['Translation__c', 'תרגומים מותאמים (אם לא ב-Translation Workbench)']
    ],
    [3500, 5860]
  )
);
children.push(spacer());

children.push(heading('8.4 איך יוצרים Custom Object?', 2));
children.push(numbered('Setup -> Object Manager -> Create -> Custom Object'));
children.push(numbered('Label: שם בעברית (יוצג למשתמש), למשל "פריט חדשות"'));
children.push(numbered('Plural Label: רבים, "פריטי חדשות"'));
children.push(numbered('Object Name: שם פנימי באנגלית, "News_Item"'));
children.push(numbered('Record Name: שם הפריט הראשי (Auto Number או Text)'));
children.push(numbered('סמן: Allow Reports, Allow Search'));
children.push(numbered('Save'));
children.push(spacer());

children.push(heading('8.5 הוספת שדות (Fields)', 2));
children.push(
  rtlPara('אחרי יצירת Object, צריך להוסיף שדות. למשל ל-News_Item__c נצטרך:')
);
children.push(spacer(120));

children.push(
  simpleTable(
    ['שם השדה', 'סוג', 'הסבר'],
    [
      ['Title__c', 'Text(255)', 'כותרת הפריט'],
      ['Type__c', 'Picklist', 'New/Promo/Update/Alert'],
      ['Icon__c', 'Text(50)', 'שם אייקון Material Symbols'],
      ['Href__c', 'URL', 'לאן הלינק מוביל'],
      ['Active__c', 'Checkbox', 'האם הפריט פעיל'],
      ['Start_Date__c', 'Date', 'מתי מתחיל להופיע'],
      ['End_Date__c', 'Date', 'מתי מפסיק להופיע'],
      ['Display_Order__c', 'Number(2,0)', 'סדר הופעה (1=ראשון)'],
      ['Title_EN__c', 'Text(255)', 'תרגום לאנגלית'],
      ['Title_FR__c', 'Text(255)', 'תרגום לצרפתית']
    ],
    [3000, 2500, 3860]
  )
);
children.push(pageBreak());

// ============= CHAPTER 9 =============
children.push(heading('פרק 9: בניית רכיבי UI (LWC)', 1));

children.push(heading('9.1 מה זה LWC?', 2));
children.push(
  rtlPara(
    'LWC (Lightning Web Component) = רכיב גרפי ב-Salesforce. כל "קופסה" שאתה רואה באתר היא בעצם LWC. למשל כפתור, כרטיס, טופס - כולם LWC.'
  )
);
children.push(spacer());

children.push(
  infoBox(
    'דוגמה',
    'באתר ה-POC שלנו יש 10+ LWC שונים:\n• Header (כותרת)\n• NewsTicker (שורת חדשות)\n• ServiceCard (כרטיס שירות)\n• QuoteRequestModal (חלון הצעת מחיר)\n• ועוד...\n\nכל אחד מהם הוא רכיב עצמאי שאפשר להשתמש בו במקומות שונים.',
    LIGHT_BG,
    '🧩'
  )
);
children.push(spacer());

children.push(heading('9.2 מבנה של LWC', 2));
children.push(
  rtlPara('כל LWC מורכב מ-3 קבצים:')
);
children.push(spacer(120));
children.push(bullet('myComponent.html - מה הרכיב מציג (HTML)'));
children.push(bullet('myComponent.js - מה הרכיב עושה (JavaScript)'));
children.push(bullet('myComponent.css - איך הרכיב נראה (CSS)'));
children.push(spacer());

children.push(heading('9.3 דוגמה: רכיב פשוט - כפתור', 2));
children.push(
  codeBlock(`<!-- mapiButton.html -->
<template>
    <button class="shine"
            onclick={handleClick}
            data-tooltip={tooltipText}>
        <span>{label}</span>
    </button>
</template>`, 'HTML של LWC')
);
children.push(spacer(100));

children.push(
  codeBlock(`// mapiButton.js
import { LightningElement, api } from 'lwc';

export default class MapiButton extends LightningElement {
    @api label = 'לחץ כאן';
    @api tooltipText = '';

    handleClick() {
        // משדר אירוע כשלוחצים
        this.dispatchEvent(new CustomEvent('buttonclick'));
    }
}`, 'JavaScript של LWC')
);
children.push(spacer(100));

children.push(
  codeBlock(`/* mapiButton.css */
button {
    background: var(--mapi-primary);
    color: white;
    padding: 12px 24px;
    border-radius: 999px;
    border: none;
    cursor: pointer;
    transition: all 0.3s;
}

button:hover {
    background: var(--mapi-secondary);
    transform: translateY(-2px);
}`, 'CSS של LWC')
);
children.push(spacer());

children.push(heading('9.4 רכיבי LWC שנפתח לפורטל', 2));
children.push(spacer(120));

children.push(
  simpleTable(
    ['שם הרכיב', 'תפקיד', 'מורכבות'],
    [
      ['mapiPortalHeader', 'כותרת עליונה עם לוגו וניווט', 'בינונית'],
      ['mapiNewsTicker', 'שורת חדשות נגללת', 'גבוהה'],
      ['mapiLanguageSwitcher', 'בחירת שפה', 'נמוכה'],
      ['mapiServiceCard', 'כרטיס שירות', 'נמוכה'],
      ['mapiQuoteRequestModal', 'חלון בקשת הצעת מחיר', 'גבוהה'],
      ['mapiSupportFormModal', 'חלון פנייה למוקד', 'בינונית'],
      ['mapiGovmapPicker', 'בחירת אזור על המפה', 'גבוהה מאוד'],
      ['mapiHero', 'באנר ראשי עם אפקטים', 'גבוהה'],
      ['mapiWowCounter', 'מספרים מונפשים', 'נמוכה'],
      ['mapiPortalFooter', 'תחתית האתר', 'נמוכה']
    ],
    [3500, 4500, 1360]
  )
);
children.push(spacer());

children.push(heading('9.5 איך יוצרים LWC ב-Salesforce?', 2));
children.push(
  rtlPara('פיתוח LWC נעשה ב-VS Code עם תוסף Salesforce Extension Pack:')
);
children.push(spacer());
children.push(numbered('הורד והתקן VS Code'));
children.push(numbered('התקן Salesforce Extension Pack'));
children.push(numbered('התקן Salesforce CLI'));
children.push(numbered('SFDX: Create Project (יוצר תיקיית פרויקט)'));
children.push(numbered('SFDX: Authorize an Org (מחבר לארגון שלך)'));
children.push(numbered('SFDX: Create Lightning Web Component'));
children.push(numbered('SFDX: Deploy Source to Org (מעלה את הקוד)'));
children.push(pageBreak());

// ============= CHAPTER 10 =============
children.push(heading('פרק 10: עיצוב ו-Design System', 1));

children.push(heading('10.1 מה זה Design System?', 2));
children.push(
  rtlPara(
    'Design System = מערכת עיצוב אחידה. במקום שכל מעצב יחליט לעצמו על צבעים וגופנים - יש "ספר חוקים" אחד שכל הרכיבים מצייתים לו.'
  )
);
children.push(spacer());

children.push(heading('10.2 פלטת הצבעים של מפ"י', 2));
children.push(spacer(120));

children.push(
  simpleTable(
    ['שם', 'קוד Hex', 'שימוש'],
    [
      ['Primary (כחול עמוק)', '#001D35', 'כותרות, כפתורים ראשיים, רקעים כהים'],
      ['Primary Container', '#1F4E79', 'גרסה בהירה יותר של הראשי'],
      ['Secondary (כחול בינוני)', '#0B61A1', 'קישורים, אייקונים, צבע משני'],
      ['Secondary Container', '#7CBAFF', 'הדגשות, badges'],
      ['Positive (ירוק)', '#548235', 'הצלחה, סטטוס פעיל'],
      ['Alert (צהוב)', '#BF8F00', 'אזהרות, מבצעים'],
      ['Error (אדום)', '#C00000', 'שגיאות, חירום'],
      ['Surface (אפור בהיר)', '#F8F9FB', 'רקע ראשי'],
      ['On-Surface (אפור כהה)', '#191C1E', 'טקסט ראשי']
    ],
    [3500, 2500, 3360]
  )
);
children.push(spacer());

children.push(heading('10.3 הגופנים', 2));
children.push(bullet('Public Sans - גופן ראשי לטקסט באנגלית'));
children.push(bullet('Heebo - גופן עברי מודרני'));
children.push(bullet('Material Symbols Outlined - אייקונים'));
children.push(spacer());

children.push(heading('10.4 הטמעה ב-Salesforce', 2));
children.push(
  rtlPara('יוצרים Static Resource עם CSS גלובלי וטוענים אותו בכל הרכיבים:')
);
children.push(spacer());

children.push(
  codeBlock(`/* MapiTheme.css - Static Resource */
:root {
    --mapi-primary: #001D35;
    --mapi-secondary: #0B61A1;
    --mapi-secondary-container: #7CBAFF;
    --mapi-positive-green: #548235;
    --mapi-alert-yellow: #BF8F00;
    --mapi-error-red: #C00000;
    --mapi-surface: #F8F9FB;
}

/* אפקט ברק על hover */
.shine {
    position: relative;
    overflow: hidden;
}

.shine::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg,
        transparent,
        rgba(255,255,255,0.5),
        transparent);
    transform: translateX(-150%) skewX(-20deg);
    transition: transform 0.85s;
}

.shine:hover::before {
    transform: translateX(150%) skewX(-20deg);
}`, 'CSS גלובלי')
);
children.push(spacer());

children.push(heading('10.5 אפקטי WOW', 2));
children.push(
  rtlPara(
    'בנוסף לעיצוב הבסיסי, יש לנו 6 אפקטים מתקדמים שמעניקים תחושה "וואו" לאתר:'
  )
);
children.push(spacer(120));
children.push(bullet('wow-mesh - רקע gradient שנע באנימציה'));
children.push(bullet('wow-particles - חלקיקים מרחפים'));
children.push(bullet('wow-aurora - "כדורי אור" מטושטשים'));
children.push(bullet('wow-tilt - הטיה תלת-ממדית בעת hover'));
children.push(bullet('wow-counter - ספירת מספרים מונפשת'));
children.push(bullet('shine - "ברק" שעובר על כפתורים'));
children.push(pageBreak());

// ============= CHAPTER 11 =============
children.push(heading('פרק 11: טפסים דינמיים (OmniScript)', 1));

children.push(heading('11.1 מה זה OmniScript?', 2));
children.push(
  rtlPara(
    'OmniScript זה כלי של Salesforce/PSS שמאפשר לבנות טפסים דינמיים מורכבים בלי לכתוב קוד. בונים אותו ב-drag and drop.'
  )
);
children.push(spacer());

children.push(
  infoBox(
    'דוגמה מ-POC',
    'הטופס שלנו "הזמנת מפה" יש בו 4 שלבים:\n1. פרטי הבקשה (גודל, אורתופוטו, אספקה)\n2. סימון אזור על GovMap\n3. סיכום והצעת מחיר\n4. תשלום\n\nכל זה ייבנה ב-OmniScript אחד.',
    LIGHT_BG,
    '📋'
  )
);
children.push(spacer());

children.push(heading('11.2 יצירת OmniScript ראשון', 2));
children.push(numbered('OmniStudio App -> OmniScripts -> New'));
children.push(numbered('Name: Order_CustomMap'));
children.push(numbered('Type: Form'));
children.push(numbered('SubType: Generic'));
children.push(numbered('Language: Hebrew'));
children.push(numbered('Save'));
children.push(spacer());

children.push(heading('11.3 הוספת שלבים (Steps)', 2));
children.push(
  rtlPara('שלב = "מסך" בטופס. גוררים שלב חדש מה-Palette:')
);
children.push(spacer());
children.push(numbered('גרור "Step" מהפלטה לקנבס'));
children.push(numbered('שנה את השם ל"Step 1 - פרטי הבקשה"'));
children.push(numbered('הוסף שדות פנימה (Picklist, Radio, Text)'));
children.push(numbered('הגדר ולידציות (מה חובה, מה לא)'));
children.push(spacer());

children.push(heading('11.4 חישוב מחיר אוטומטי (BRE)', 2));
children.push(
  rtlPara(
    'BRE = Business Rule Engine. מחשב מחיר אוטומטי לפי הפרמטרים שהמשתמש בחר.'
  )
);
children.push(spacer());

children.push(
  codeBlock(`Calculation Procedure: MAPI_CustomMap_PriceCalc

Inputs:
  - size (string): A4 | A3 | A2 | A1 | A0
  - withOrtho (boolean): true | false
  - delivery (string): digital | physical | both

Output:
{
  "basePrice": LOOKUP(Service_Pricing, size, withOrtho),
  "shipping": IF(delivery == "physical" || delivery == "both", 39, 0),
  "subtotal": basePrice + shipping,
  "vat": subtotal * 0.17,
  "total": subtotal + vat
}`, 'BRE - מנוע חישוב מחיר')
);
children.push(spacer());

children.push(heading('11.5 הצגת הצעת מחיר', 2));
children.push(
  rtlPara(
    'בשלב 3 של הטופס, מציגים ללקוח סיכום של ההזמנה + הצעת מחיר מפורטת:'
  )
);
children.push(spacer());

children.push(
  codeBlock(`Step 3 - Quote Review
  Display:
    - סיכום ההזמנה (קריאה מ-DataRaptor)
    - תצוגה מקדימה של האזור
    - טבלת מחירים (מ-BRE)

  Actions:
    - הורד הצעת מחיר PDF (DocGen)
    - שלח לעצמי במייל (Apex Action)
    - אישור והמשך לתשלום (Next Step)`, 'OmniScript Step Configuration')
);
children.push(pageBreak());

// ============= CHAPTER 12 =============
children.push(heading('פרק 12: שורת חדשות עם CMS', 1));

children.push(heading('12.1 מה זה CMS?', 2));
children.push(
  rtlPara(
    'CMS = Content Management System. במקרה שלנו - Salesforce CMS. זה כלי שמאפשר לצוות התוכן של מפ"י לעדכן את התכנים באתר בלי לקרוא למפתחים.'
  )
);
children.push(spacer());

children.push(heading('12.2 הגדרת Workspace', 2));
children.push(numbered('Setup -> CMS Workspaces -> New'));
children.push(numbered('Name: MAPI Portal Content'));
children.push(numbered('Channels: portal.mapi.gov.il'));
children.push(numbered('Default Language: Hebrew'));
children.push(numbered('Add Languages: en, fr, es, ru, ar'));
children.push(spacer());

children.push(heading('12.3 יצירת Content Type', 2));
children.push(
  rtlPara('Content Type מגדיר את המבנה של פריט תוכן. למשל News Item יכלול:')
);
children.push(spacer(120));

children.push(
  simpleTable(
    ['שדה', 'סוג', 'חובה?'],
    [
      ['Title', 'Rich Text (Multi-lang)', 'כן'],
      ['Type', 'Picklist (New/Promo/Update/Alert)', 'כן'],
      ['Icon', 'Text', 'כן'],
      ['Href', 'URL', 'כן'],
      ['Start Date', 'Date', 'לא'],
      ['End Date', 'Date', 'לא'],
      ['Display Order', 'Number', 'כן'],
      ['Active', 'Checkbox', 'כן']
    ],
    [3000, 4500, 1860]
  )
);
children.push(spacer());

children.push(heading('12.4 איך הצוות יצור תוכן חדש?', 2));
children.push(numbered('היכנס ל-CMS Workspace'));
children.push(numbered('Create Content -> News Item'));
children.push(numbered('מלא את הכותרת בעברית'));
children.push(numbered('סמן "Translate" - יפתח טאב לכל שפה'));
children.push(numbered('מלא תרגום ל-5 השפות הנוספות'));
children.push(numbered('הגדר תאריכי התחלה וסיום'));
children.push(numbered('Save Draft -> Review -> Publish'));
children.push(spacer());

children.push(
  infoBox(
    'יתרון משמעותי',
    'אחרי שהמערכת מותקנת, צוות התוכן של מפ"י יכול לעדכן חדשות באופן עצמאי - בלי לפנות לחברה הזוכה. זה חוסך זמן וכסף לאורך זמן.',
    'E2EFDA',
    '✅'
  )
);
children.push(pageBreak());

// ============= PART D - ADVANCED =============
children.push(heading('חלק ד - יכולות מתקדמות', 0));
children.push(spacer(400));
children.push(
  rtlPara(
    'בחלק הזה נטפל ביכולות המתקדמות שהופכות את הפורטל למשהו מיוחד: רב-לשוניות, AI Agent חכם, הזדהות לאומית ואינטגרציות.'
  )
);
children.push(pageBreak());

// ============= CHAPTER 13 =============
children.push(heading('פרק 13: תמיכה ב-6 שפות', 1));

children.push(heading('13.1 אסטרטגיה משולבת', 2));
children.push(
  rtlPara(
    'תמיכה ב-6 שפות (עברית, אנגלית, צרפתית, ספרדית, רוסית, ערבית) דורשת שילוב של מספר כלים:'
  )
);
children.push(spacer(120));

children.push(
  simpleTable(
    ['תוכן', 'כלי לתרגום'],
    [
      ['Field Labels (שמות שדות)', 'Translation Workbench'],
      ['Picklist Values (ערכי בחירה)', 'Translation Workbench'],
      ['Page Titles, Buttons (טקסטים סטטיים)', 'Custom Labels'],
      ['News Items, Articles (תוכן דינמי)', 'CMS Multi-language'],
      ['Knowledge Articles (FAQ)', 'Article per Language'],
      ['OmniScript Labels', 'Properties per Language']
    ],
    [4500, 4860]
  )
);
children.push(spacer());

children.push(heading('13.2 Translation Workbench - איך להפעיל', 2));
children.push(numbered('Setup -> Translation Workbench -> Translation Settings -> Enable'));
children.push(numbered('Setup -> Translation Languages -> Add Languages'));
children.push(numbered('בחר: English, French, Spanish, Russian, Arabic'));
children.push(numbered('Assign Translators - מי מורשה לתרגם'));
children.push(numbered('Setup -> Translate -> בחר Object/Field/Picklist'));
children.push(numbered('הזן תרגום לכל שפה'));
children.push(spacer());

children.push(heading('13.3 Custom Labels', 2));
children.push(
  rtlPara('שימוש בטקסטים ב-LWC עם תרגום אוטומטי:')
);
children.push(spacer());

children.push(
  codeBlock(`// myComponent.js
import { LightningElement } from 'lwc';
import HERO_TITLE from '@salesforce/label/c.MAPI_Hero_Title';
import HERO_CTA from '@salesforce/label/c.MAPI_Hero_CTA';

export default class MapiHero extends LightningElement {
    labels = { HERO_TITLE, HERO_CTA };
}`, 'JavaScript')
);
children.push(spacer(100));

children.push(
  codeBlock(`<!-- myComponent.html -->
<template>
    <h1>{labels.HERO_TITLE}</h1>
    <button>{labels.HERO_CTA}</button>
</template>`, 'HTML')
);
children.push(spacer());

children.push(heading('13.4 הגדרת Custom Label', 2));
children.push(numbered('Setup -> Custom Labels -> New'));
children.push(numbered('Name: MAPI_Hero_Title'));
children.push(numbered('Categories: MAPI_Portal'));
children.push(numbered('Value (Hebrew): העתיד של המידע הגיאוגרפי בידיים שלך'));
children.push(numbered('Save'));
children.push(numbered('כעת לחץ "New Local Translations" לכל שפה'));
children.push(spacer());

children.push(heading('13.5 RTL Layout', 2));
children.push(
  rtlPara(
    'עבור עברית וערבית, הטקסט זורם מימין לשמאל. Experience Cloud תומך בזה מובנה:'
  )
);
children.push(spacer());
children.push(numbered('Workspaces -> Administration -> Languages'));
children.push(numbered('סמן "Right-to-left" עבור עברית וערבית'));
children.push(numbered('Salesforce מטפל אוטומטית בכל ה-layout'));
children.push(pageBreak());

// ============= CHAPTER 14 =============
children.push(heading('פרק 14: AI Agent חכם (Agentforce)', 1));

children.push(heading('14.1 מה זה Agentforce?', 2));
children.push(
  rtlPara(
    'Agentforce זה מוצר חדש של Salesforce (יצא ב-2024) שמאפשר ליצור Agent חכם המבוסס על LLM (Large Language Model) - כמו ChatGPT, אבל מותאם לעסקים.'
  )
);
children.push(spacer());

children.push(
  infoBox(
    'הבדל מ-Chatbot רגיל',
    'Chatbot רגיל = מבוסס חוקים. "אם לקוח כותב X - תענה Y". מוגבל מאוד.\n\nAgentforce = מבוסס בינה מלאכותית. מבין שפה טבעית, יכול להבין הקשר, מסוגל לבצע פעולות בשם המשתמש.',
    LIGHT_BG,
    '🤖'
  )
);
children.push(spacer());

children.push(heading('14.2 מה ה-Agent יכול לעשות?', 2));
children.push(bullet('לענות על שאלות בעברית/אנגלית/ועוד 4 שפות'));
children.push(bullet('לחפש במאגר הידע (Knowledge Articles)'));
children.push(bullet('להציע מוצרים מתאימים מהקטלוג'));
children.push(bullet('להציג סטטוס הזמנה ספציפית של הלקוח'));
children.push(bullet('להתחיל תהליך הזמנה ולמלא טופס יחד עם הלקוח'));
children.push(bullet('להעביר לנציג אנושי אם השאלה מורכבת מדי'));
children.push(spacer());

children.push(heading('14.3 הקמת ה-Agent', 2));
children.push(numbered('Setup -> Agentforce Studio -> New Agent'));
children.push(numbered('Name: MAPI Customer Assistant'));
children.push(numbered('Type: Service Agent'));
children.push(numbered('Description: עוזר חכם ללקוחות מפ"י'));
children.push(numbered('Default Language: Hebrew'));
children.push(numbered('Additional Languages: en, fr, es, ru, ar'));
children.push(numbered('Save'));
children.push(spacer());

children.push(heading('14.4 הגדרת Topics (נושאים)', 2));
children.push(
  rtlPara(
    'Topic = נושא ש-Agent יודע לטפל בו. עבור מפ"י נצטרך לפחות 9 Topics:'
  )
);
children.push(spacer(120));

children.push(
  simpleTable(
    ['Topic', 'תיאור'],
    [
      ['Map_Ordering', 'הזמנת מפה (כל סוגי המפות)'],
      ['CORS_Subscription', 'מנוי תחנות קבע'],
      ['Surveyor_Service', 'שירותי מודד מבקר'],
      ['Order_Status', 'מצב הזמנה'],
      ['Payment_Help', 'עזרה בתשלום'],
      ['Delivery_Time', 'זמני אספקה'],
      ['Cancellation', 'ביטולים'],
      ['Refund', 'החזרים'],
      ['General_Greeting', 'ברכות ושיחה כללית']
    ],
    [3500, 5860]
  )
);
children.push(spacer());

children.push(heading('14.5 דוגמת Topic מלאה', 2));
children.push(spacer());

children.push(
  codeBlock(`Topic: Map_Ordering
Description: Customer wants to order a map

Sample Utterances:
  Hebrew:
    - "אני רוצה להזמין מפה"
    - "אפשר לקנות מפה?"
    - "מה זה מפה בהתאמה אישית?"
  English:
    - "I want to order a map"
    - "Can I buy a paper map?"
  French:
    - "Je veux commander une carte"
  Spanish, Russian, Arabic: ...

Actions:
  1. SearchMapCatalog (Apex Action)
  2. PresentMapOptions (Display Component)
  3. StartOmniScript_OrderCustomMap (if user agrees)

Knowledge Sources:
  - Articles tagged: "Map Ordering"
  - Service_Catalog_Item__c records where Category = 'maps'`, 'הגדרת Topic')
);
children.push(spacer());

children.push(heading('14.6 Apex Action - לדוגמה', 2));
children.push(
  rtlPara('Action = פעולה ש-Agent יכול לבצע ב-Salesforce. הנה דוגמה:')
);
children.push(spacer());

children.push(
  codeBlock(`public class MapiAgentActions {

    @InvocableMethod(
        label='Search Map Catalog'
        description='Search MAPI catalog by keywords'
    )
    public static List<SearchResult> searchCatalog(
        List<SearchRequest> reqs
    ) {
        List<SearchResult> results = new List<SearchResult>();
        for (SearchRequest req : reqs) {
            SearchResult r = new SearchResult();
            r.services = [
                SELECT Id, Name, Category__c,
                       PriceFrom__c, Description__c
                FROM Service_Catalog_Item__c
                WHERE Name LIKE :('%' + req.query + '%')
                  AND Active__c = TRUE
                LIMIT 5
            ];
            results.add(r);
        }
        return results;
    }

    public class SearchRequest {
        @InvocableVariable(required=true)
        public String query;

        @InvocableVariable
        public String language;
    }

    public class SearchResult {
        @InvocableVariable
        public List<Service_Catalog_Item__c> services;
    }
}`, 'Apex Action')
);
children.push(spacer());

children.push(heading('14.7 בדיקת ה-Agent', 2));
children.push(numbered('Agentforce Studio -> Conversation Preview'));
children.push(numbered('הקלד שאלה לדוגמה: "אני רוצה להזמין מפה"'));
children.push(numbered('ה-Agent ינסה להבין ולענות'));
children.push(numbered('בדוק שהוא קוטם את ה-Topic הנכון'));
children.push(numbered('בדוק שהפעולות מתבצעות'));
children.push(numbered('חזור על התהליך לכל שפה'));
children.push(pageBreak());

// ============= CHAPTER 15 =============
children.push(heading('פרק 15: הזדהות לאומית', 1));

children.push(heading('15.1 איך עובדת הזדהות לאומית?', 2));
children.push(
  rtlPara(
    'הזדהות לאומית = שירות של ממשלת ישראל שמאפשר לאזרחים להזדהות עם ת.ז. וסיסמה אחת לכל השירותים הממשלתיים. זה אותו הדבר כמו שאתה משתמש ב-gov.il.'
  )
);
children.push(spacer());

children.push(heading('15.2 פרוטוקול SAML 2.0', 2));
children.push(
  rtlPara(
    'הזדהות נעשית דרך פרוטוקול SAML 2.0. אזרח לוחץ "התחבר" בפורטל, מועבר לאתר הזדהות לאומית, מזין ת.ז. + סיסמה, ומחזיר לפורטל אישור (Assertion).'
  )
);
children.push(spacer());

children.push(
  codeBlock(`+-----------+        +------------+         +----------+
|   אזרח     | ----1--> |  פורטל מפ"י  | --------> | הזדהות    |
+-----------+        +------------+   2.    | לאומית   |
                                            +----------+
                          <-----3-----
                            SAML
                          Assertion
                            +
                          User Info`, 'SAML Flow')
);
children.push(spacer());

children.push(heading('15.3 הגדרה ב-Salesforce', 2));
children.push(numbered('Setup -> Single Sign-On Settings -> New'));
children.push(numbered('Name: GovIL_National_Identity'));
children.push(numbered('SAML Version: 2.0'));
children.push(numbered('Issuer: portal.mapi.gov.il'));
children.push(numbered('Identity Provider Certificate: [Upload .crt מ-רשות התקשוב]'));
children.push(numbered('Identity Provider Login URL: https://identity.gov.il/saml/idp'));
children.push(numbered('SAML Identity Type: Federation ID'));
children.push(numbered('Save'));
children.push(spacer());

children.push(heading('15.4 Just-In-Time Provisioning', 2));
children.push(
  rtlPara(
    'JIT = "יצירה בזמן אמת". כשלקוח חדש מזדהה - יוצרים לו אוטומטית User + Account + Contact:'
  )
);
children.push(spacer());

children.push(
  codeBlock(`global class GovIL_JIT_Handler
    implements Auth.SamlJitHandler {

    global User createUser(
        Id ssoProviderId,
        Id communityId,
        Id portalId,
        String federationId,  // = ת.ז.
        Map<String,String> attributes,
        String assertion
    ) {
        // יוצר Account חדש
        Account a = new Account(
            Name = attributes.get('FirstName') + ' '
                 + attributes.get('LastName')
        );
        insert a;

        // יוצר Contact חדש
        Contact c = new Contact(
            FirstName = attributes.get('FirstName'),
            LastName = attributes.get('LastName'),
            Email = attributes.get('Email'),
            AccountId = a.Id,
            National_ID__c = federationId
        );
        insert c;

        // יוצר User חדש
        User u = new User();
        u.FederationIdentifier = federationId;
        u.Email = attributes.get('Email');
        u.Username = federationId + '@portal.mapi.gov.il';
        u.Alias = federationId.left(8);
        u.LanguageLocaleKey = attributes.get('lang') ?? 'iw';
        u.LocaleSidKey = 'iw_IL';
        u.TimeZoneSidKey = 'Asia/Jerusalem';
        u.ProfileId = [SELECT Id FROM Profile
                       WHERE Name = 'Customer Community PSS'].Id;
        u.ContactId = c.Id;
        return u;
    }

    global void updateUser(...) {
        // עדכון של User קיים אם הוא חוזר
    }
}`, 'JIT Handler')
);
children.push(spacer());

children.push(
  infoBox(
    'תהליך תיאום',
    'חיבור להזדהות לאומית דורש תיאום מול 3 גופים:\n1. רשות התקשוב הממשלתית\n2. מערך הדיגיטל הלאומי\n3. יה"ב במפ"י עצמם\n\nתהליך התיאום לוקח 4-8 שבועות. כדאי להתחיל מוקדם.',
    'FFF4E6',
    '🤝'
  )
);
children.push(pageBreak());

// ============= CHAPTER 16 =============
children.push(heading('פרק 16: אינטגרציות עם מערכות חיצוניות', 1));

children.push(heading('16.1 Named Credentials', 2));
children.push(
  rtlPara(
    'Named Credential = "פרטי התחברות שמורים" למערכת חיצונית. במקום לאחסן סיסמאות בקוד, אתה שומר אותן ב-Named Credential ומשתמש בהן בבטחה.'
  )
);
children.push(spacer());

children.push(heading('16.2 מערכות שצריך לחבר', 2));
children.push(spacer(120));

children.push(
  simpleTable(
    ['מערכת', 'פרוטוקול', 'תדירות'],
    [
      ['Payment Gateway', 'REST + OAuth 2.0', 'בזמן הזמנה'],
      ['GovMap API', 'iframe + REST', 'בזמן בחירת אזור'],
      ['Merkava ERP', 'REST/SOAP', 'יומי + לפי דרישה'],
      ['Shamir SMS', 'REST', 'באירועים מסוימים'],
      ['geo++ CORS Server', 'REST', 'הפעלת מנויים'],
      ['National Identity', 'SAML 2.0', 'בזמן הזדהות']
    ],
    [3000, 3500, 2860]
  )
);
children.push(spacer());

children.push(heading('16.3 דוגמת אינטגרציה: שליחת SMS', 2));
children.push(
  rtlPara(
    'כשמסיימים הזמנה - שולחים SMS ללקוח. הנה הקוד:'
  )
);
children.push(spacer());

children.push(
  codeBlock(`public class MapiSmsService {

    @future(callout=true)
    public static void sendSms(
        String phoneNumber,
        String messageBody
    ) {
        HttpRequest req = new HttpRequest();
        req.setEndpoint('callout:Shamir_SMS/api/v2/send');
        req.setMethod('POST');
        req.setHeader('Content-Type', 'application/json');

        Map<String, Object> body = new Map<String, Object>{
            'to' => phoneNumber,
            'from' => 'MAPI',
            'message' => messageBody,
            'language' => 'he'
        };
        req.setBody(JSON.serialize(body));

        Http http = new Http();
        HttpResponse res = http.send(req);

        // לוג
        insert new SMS_Log__c(
            Recipient__c = phoneNumber,
            Status__c = res.getStatusCode() == 200
                ? 'Sent' : 'Failed',
            Response__c = res.getBody()
        );
    }
}`, 'אינטגרציית SMS')
);
children.push(spacer());

children.push(heading('16.4 Webhook לתשלום', 2));
children.push(
  rtlPara(
    'כששרת התשלומים מאשר תשלום - הוא שולח לנו "Webhook" (התראה אוטומטית). אנחנו צריכים לקלוט אותה:'
  )
);
children.push(spacer());

children.push(
  codeBlock(`@RestResource(urlMapping='/payment/webhook/*')
global class PaymentWebhookReceiver {

    @HttpPost
    global static void handlePayment() {
        // קריאת ה-Body מהבקשה
        String body = RestContext.request.requestBody.toString();
        Map<String,Object> payload = (Map<String,Object>)
            JSON.deserializeUntyped(body);

        // אימות חתימה דיגיטלית
        String sig = RestContext.request.headers.get('X-Signature');
        if (!verifySignature(body, sig)) {
            RestContext.response.statusCode = 401;
            return;
        }

        // יצירת Order
        Order o = new Order(
            AccountId = (Id) payload.get('accountId'),
            Status = 'Activated',
            EffectiveDate = Date.today()
        );
        insert o;

        // שליחת SMS אישור
        MapiSmsService.sendSms(
            (String) payload.get('phone'),
            'הזמנתך אושרה: ' + o.OrderNumber
        );

        RestContext.response.statusCode = 200;
    }
}`, 'Webhook לתשלום')
);
children.push(pageBreak());

// ============= PART E - FINAL =============
children.push(heading('חלק ה - סיום', 0));
children.push(spacer(400));
children.push(
  rtlPara(
    'הגענו לקו הסיום! בחלק הזה נדבר על בדיקות, עליה לאוויר, ותחזוקה שוטפת.'
  )
);
children.push(pageBreak());

// ============= CHAPTER 17 =============
children.push(heading('פרק 17: בדיקות', 1));

children.push(heading('17.1 סוגי בדיקות שצריך לעשות', 2));
children.push(spacer(120));

children.push(
  simpleTable(
    ['סוג בדיקה', 'מי בודק', 'מתי'],
    [
      ['Unit Tests (Apex)', 'מפתחים', 'כל commit'],
      ['LWC Jest Tests', 'מפתחים', 'כל commit'],
      ['Integration Tests', 'QA Engineer', 'שבועי'],
      ['Functional Tests', 'QA Engineer', 'לפני release'],
      ['Performance Tests', 'QA + DevOps', 'לפני UAT'],
      ['Security Tests', 'יה"ב + צוות חיצוני', 'לפני Go-Live'],
      ['Accessibility (WCAG)', 'מומחה נגישות', 'לפני UAT'],
      ['UAT', 'משתמשי מפ"י', 'לפני Go-Live']
    ],
    [3000, 3500, 2860]
  )
);
children.push(spacer());

children.push(heading('17.2 דוגמה: Unit Test ל-Apex', 2));
children.push(
  codeBlock(`@isTest
public class MapiAgentActionsTest {

    @isTest
    static void testSearchCatalog_findsResults() {
        // הכנה - יצירת נתונים לבדיקה
        Service_Catalog_Item__c svc = new Service_Catalog_Item__c(
            Name = 'מפה בהתאמה אישית',
            Category__c = 'maps',
            PriceFrom__c = 160,
            Active__c = true
        );
        insert svc;

        // ביצוע - קריאה לפונקציה
        MapiAgentActions.SearchRequest req =
            new MapiAgentActions.SearchRequest();
        req.query = 'מפה';

        Test.startTest();
        List<MapiAgentActions.SearchResult> results =
            MapiAgentActions.searchCatalog(
                new List<MapiAgentActions.SearchRequest>{req}
            );
        Test.stopTest();

        // בדיקות
        System.assertEquals(1, results.size());
        System.assertEquals(1, results[0].services.size());
        System.assertEquals(
            'מפה בהתאמה אישית',
            results[0].services[0].Name
        );
    }
}`, 'Apex Unit Test')
);
children.push(spacer());

children.push(heading('17.3 דרישת Code Coverage', 2));
children.push(
  rtlPara(
    'Salesforce דורשת שלפחות 75% מהקוד שלך מכוסה בבדיקות אוטומטיות. ההמלצה היא 85% ומעלה.'
  )
);
children.push(spacer());

children.push(
  infoBox(
    'איך בודקים Coverage?',
    'Setup -> Apex Test Execution -> Show More -> Code Coverage Indicator\n\nאם מספר הכיסוי נמוך מ-75% - לא תוכל לפרוס ל-Production!',
    LIGHT_BG,
    '📊'
  )
);
children.push(pageBreak());

// ============= CHAPTER 18 =============
children.push(heading('פרק 18: עליה לאוויר', 1));

children.push(heading('18.1 רשימת מטלות לפני Go-Live', 2));
children.push(spacer(120));

children.push(bullet('כל הבדיקות עברו בהצלחה'));
children.push(bullet('Code Coverage > 85%'));
children.push(bullet('UAT הושלם וקיבל אישור ממפ"י'));
children.push(bullet('תיעוד מלא: User Manual, Admin Manual, API Docs'));
children.push(bullet('הדרכה התקיימה לצוות מפ"י (TTT)'));
children.push(bullet('Backup & DR Plan מאושר'));
children.push(bullet('SLA חתום עם הספק'));
children.push(bullet('בדיקת אבטחה (Pen-Test) הושלמה'));
children.push(bullet('הצהרת נגישות פורסמה'));
children.push(bullet('ניטור (Event Monitoring) מופעל'));
children.push(spacer());

children.push(heading('18.2 תהליך Deployment', 2));
children.push(spacer(120));

children.push(
  codeBlock(`# שלב 1: Validation Deploy (בדיקה בלי לפרוס)
sfdx force:source:deploy \\
  --targetusername production \\
  --sourcepath force-app \\
  --testlevel RunLocalTests \\
  --checkonly

# שלב 2: אם השלב הראשון הצליח, פריסה אמיתית
sfdx force:source:deploy \\
  --targetusername production \\
  --sourcepath force-app \\
  --testlevel RunLocalTests

# שלב 3: בדיקת תוצאות
sfdx force:apex:test:run \\
  --targetusername production \\
  --codecoverage \\
  --resultformat human`, 'Deployment Commands')
);
children.push(spacer());

children.push(heading('18.3 Day of Go-Live', 2));
children.push(numbered('06:00 - תחילת deploy ל-Production (Maintenance Window)'));
children.push(numbered('08:00 - Smoke Tests: בדיקות פונקציונליות בסיסיות'));
children.push(numbered('09:00 - "פתיחת השער" - האתר נגיש לציבור'));
children.push(numbered('כל היום - ניטור צמוד + צוות תורן'));
children.push(numbered('16:00 - Daily Standup לסיכום היום הראשון'));
children.push(spacer());

children.push(
  infoBox(
    'הכנת תוכנית "אם משהו השתבש"',
    'תמיד צריך תוכנית גיבוי. אם משהו לא עובד:\n• Rollback Plan: איך חוזרים למצב הקודם?\n• War Room: חדר עם כל המפתחים זמינים\n• Communications Plan: איך מודיעים ללקוחות?\n• Hotline: טלפון 24/7 לתקלות חמורות',
    'FFE2D6',
    '🚨'
  )
);
children.push(pageBreak());

// ============= CHAPTER 19 =============
children.push(heading('פרק 19: תחזוקה שוטפת', 1));

children.push(heading('19.1 ניטור יומי', 2));
children.push(
  rtlPara(
    'אחרי שהאתר חי - צריך לעקוב אחרי הביצועים שלו ב-3 ערוצים:'
  )
);
children.push(spacer());

children.push(heading('Salesforce Trust', 3));
children.push(
  rtlPara('https://trust.salesforce.com - בודק שהשרתים של Salesforce עובדים תקין')
);
children.push(spacer());

children.push(heading('Event Monitoring (Shield)', 3));
children.push(
  rtlPara('מציג ניסיונות login כושלים, תשלומים, גישה לנתונים רגישים')
);
children.push(spacer());

children.push(heading('Custom Dashboards', 3));
children.push(
  rtlPara('דשבורד מותאם שמציג מספר הזמנות יומי, פניות חדשות, הצעות מחיר ממתינות')
);
children.push(spacer());

children.push(heading('19.2 עדכונים שוטפים', 2));
children.push(
  rtlPara(
    'Salesforce מוציאה 3 עדכונים גדולים בשנה (Spring, Summer, Winter Release). צריך להתכונן לכל אחד:'
  )
);
children.push(spacer());
children.push(numbered('קרא את ה-Release Notes כשהם יוצאים'));
children.push(numbered('בדוק שינויים בסביבת ה-Preview Sandbox'));
children.push(numbered('בדוק אם יש שינויים שמשפיעים על הקוד שלך'));
children.push(numbered('בצע התאמות הנדרשות'));
children.push(numbered('הפצה לפני שהעדכון נכנס ל-Production'));
children.push(spacer());

children.push(heading('19.3 פיתוח Features חדשים', 2));
children.push(
  rtlPara(
    'אחרי שהאתר חי, יהיו דרישות חדשות לפיתוח. תהליך עבודה מומלץ:'
  )
);
children.push(spacer(120));
children.push(numbered('דרישה מתקבלת ממפ"י (Product Owner)'));
children.push(numbered('אפיון מפורט (User Stories + Acceptance Criteria)'));
children.push(numbered('פיתוח ב-Feature Branch של Git'));
children.push(numbered('Code Review על ידי מפתח אחר'));
children.push(numbered('Merge ל-develop + פריסה ל-DEV'));
children.push(numbered('בדיקות QA'));
children.push(numbered('UAT ע"י מפ"י'));
children.push(numbered('Merge ל-main + פריסה ל-Production'));
children.push(pageBreak());

// ============= APPENDIX A =============
children.push(heading('נספח א - מילון מונחים', 1));
children.push(spacer(120));

const glossary = [
  ['Account', 'אובייקט Salesforce שמייצג חברה או ארגון לקוח'],
  ['Action', 'פעולה אוטומטית שמתבצעת בעקבות אירוע'],
  ['Agentforce', 'מוצר AI חדש של Salesforce ליצירת agents חכמים'],
  ['Apex', 'שפת התכנות של Salesforce (דומה ל-Java)'],
  ['API', 'ממשק שמאפשר תכנותי לגשת לנתונים ולפעולות'],
  ['BRE', 'Business Rule Engine - מנוע חישובים של PSS'],
  ['Case', 'אובייקט המייצג פנייה לשירות'],
  ['CMS', 'Content Management System - מערכת ניהול תוכן'],
  ['Connected App', 'הגדרה ב-Salesforce שמאפשרת חיבור של אפליקציה חיצונית'],
  ['Contact', 'אובייקט שמייצג איש קשר (אדם פרטי)'],
  ['CORS', 'Continuously Operating Reference Stations - תחנות קבע GNSS'],
  ['Custom Object', 'אובייקט מותאם שאתה יוצר (לא קיים מהיום הראשון)'],
  ['Dashboard', 'מסך עם גרפים ו-KPIs'],
  ['DocGen', 'כלי PSS להפקת PDF מתבניות'],
  ['Experience Cloud', 'מוצר Salesforce ליצירת אתרים ללקוחות חיצוניים'],
  ['Federation ID', 'מזהה ייחודי משותף בין Salesforce ומערכת חיצונית'],
  ['Field', 'שדה באובייקט (= עמודה בטבלה)'],
  ['FlexCard', 'רכיב PSS לתצוגת מידע מעוצב'],
  ['Flow', 'כלי Low-Code ליצירת אוטומציות'],
  ['JIT Provisioning', 'יצירת User אוטומטית בזמן הזדהות'],
  ['Knowledge Article', 'מאמר במאגר ידע (FAQ)'],
  ['LWC', 'Lightning Web Component - רכיב גרפי מודרני'],
  ['Lightning', 'הממשק החדש של Salesforce (לעומת Classic הישן)'],
  ['Lightning Design System (SLDS)', 'מערכת עיצוב סטנדרטית של Salesforce'],
  ['LWR', 'Lightning Web Runtime - הדור החדש של Experience Cloud'],
  ['Named Credential', 'פרטי התחברות שמורים למערכת חיצונית'],
  ['Object', 'טבלה ב-Salesforce'],
  ['OmniScript', 'כלי PSS לבניית טפסים דינמיים'],
  ['Opportunity', 'אובייקט המייצג הזדמנות מכירה'],
  ['Order', 'אובייקט המייצג הזמנה'],
  ['Package', 'חבילת תוכנה שמתקינים בארגון'],
  ['Permission Set', 'קבוצת הרשאות שאפשר להעניק למשתמש'],
  ['Production', 'ארגון Salesforce הראשי (החי)'],
  ['Profile', 'אוסף בסיסי של הרשאות למשתמש'],
  ['PSS', 'Public Sector Solutions - חבילה למגזר ציבורי'],
  ['Quote', 'אובייקט המייצג הצעת מחיר'],
  ['Record', 'שורה באובייקט (= רשומה)'],
  ['REST API', 'פרוטוקול תקשורת מבוסס HTTP/JSON'],
  ['SAML', 'פרוטוקול הזדהות SSO'],
  ['Sandbox', 'ארגון לבדיקות (לא Production)'],
  ['SFDX', 'Salesforce Developer Experience - כלים לפיתוח'],
  ['SOAP API', 'פרוטוקול תקשורת ישן יותר מ-REST'],
  ['SOQL', 'שפת השאילתות של Salesforce (דומה ל-SQL)'],
  ['SSO', 'Single Sign-On - הזדהות אחת לכמה מערכות'],
  ['Translation Workbench', 'כלי לתרגום Metadata'],
  ['Trigger', 'קוד Apex שרץ אוטומטית בעקבות פעולה על אובייקט'],
  ['User', 'אובייקט המייצג משתמש במערכת'],
  ['Validation Rule', 'חוק שבודק נתונים לפני שמירה'],
  ['Webhook', 'התראה אוטומטית ממערכת אחת לאחרת']
];

children.push(
  simpleTable(
    ['מונח', 'הסבר'],
    glossary,
    [2500, 6860]
  )
);
children.push(pageBreak());

// ============= APPENDIX B =============
children.push(heading('נספח ב - מקורות למידה נוספים', 1));

children.push(heading('Trailhead - הפלטפורמה הרשמית', 2));
children.push(
  rtlPara(
    'Trailhead היא פלטפורמה חינמית של Salesforce ללימוד עצמי. ממליצים בחום!'
  )
);
children.push(spacer());

children.push(
  rtlPara('URL: https://trailhead.salesforce.com')
);
children.push(spacer());

children.push(heading('Trails מומלצים למתחילים:', 3));
children.push(bullet('Salesforce Platform Basics'));
children.push(bullet('Build Your First App'));
children.push(bullet('Lightning Web Components Basics'));
children.push(bullet('Apex Basics & Database'));
children.push(bullet('Experience Cloud Basics'));
children.push(bullet('OmniStudio: Quick Look'));
children.push(spacer());

children.push(heading('הסמכות (Certifications)', 2));
children.push(
  rtlPara('כדאי לעבור הסמכה רשמית של Salesforce:')
);
children.push(spacer(120));

children.push(
  simpleTable(
    ['הסמכה', 'למי מתאים', 'משך הכנה'],
    [
      ['Salesforce Administrator', 'אדמיניסטרטור / מנהל פורטל', '2-3 חודשים'],
      ['Platform Developer I', 'מפתח LWC/Apex', '3-4 חודשים'],
      ['Platform Developer II', 'מפתח בכיר', '5-6 חודשים'],
      ['Experience Cloud Consultant', 'יועץ Experience Cloud', '3-4 חודשים'],
      ['Service Cloud Consultant', 'יועץ שירות לקוחות', '3-4 חודשים']
    ],
    [3500, 3500, 2360]
  )
);
children.push(spacer());

children.push(heading('ספרים מומלצים', 2));
children.push(bullet('"Salesforce Platform Developer Workbook" - Salesforce Press'));
children.push(bullet('"Mastering Lightning Web Components" - Aditya Naag'));
children.push(bullet('"Salesforce Apex Programming for Developers" - Packt'));
children.push(spacer());

children.push(heading('קהילות וקבוצות', 2));
children.push(bullet('Salesforce Stack Exchange - שאלות ותשובות מקצועיות'));
children.push(bullet('Salesforce Trailblazer Community - הקהילה הרשמית'));
children.push(bullet('Salesforce Israel User Group - הקהילה הישראלית'));
children.push(bullet('Reddit - r/salesforce'));
children.push(pageBreak());

// ============= APPENDIX C =============
children.push(heading('נספח ג - שאלות נפוצות', 1));

children.push(heading('שאלות כלליות', 2));
children.push(spacer());

children.push(heading('ש: כמה זמן ייקח להבין את Salesforce?', 3));
children.push(
  rtlPara(
    'ת: לרמת מתחיל - שבועיים של למידה ב-Trailhead. לרמת מקצועי - 3-6 חודשים של עבודה יומיומית. אל תפחד, זה ידידותי יותר מהרבה טכנולוגיות אחרות.'
  )
);
children.push(spacer());

children.push(heading('ש: האם צריך לדעת לתכנת כדי להתחיל?', 3));
children.push(
  rtlPara(
    'ת: לא בהכרח! Salesforce היא פלטפורמת "Low Code" - הרבה דברים אפשר לבנות עם Flow ו-OmniScript בלי לכתוב שורת קוד. אבל לרמה מתקדמת - תצטרך ללמוד Apex ו-LWC.'
  )
);
children.push(spacer());

children.push(heading('ש: כמה Sandbox מקבלים?', 3));
children.push(
  rtlPara(
    'ת: תלוי ברישיון. עם Enterprise Edition מקבלים 25 Developer Sandbox + 1 Full Sandbox. עם Unlimited - יותר.'
  )
);
children.push(spacer());

children.push(heading('ש: האם אפשר לעבור אחרי שהתחלנו לדבר אחר?', 3));
children.push(
  rtlPara(
    'ת: כן, אבל זה יקר וגוזל זמן. כדאי להחליט על Salesforce כצעד אסטרטגי לטווח של 5-10 שנים לפחות.'
  )
);
children.push(spacer());

children.push(heading('שאלות טכניות', 2));
children.push(spacer());

children.push(heading('ש: איך מגבים את הנתונים?', 3));
children.push(
  rtlPara(
    'ת: Salesforce עושה גיבוי יומי אוטומטי. בנוסף, אפשר לבקש Data Export שבועי (חינם) או יומי (בתשלום).'
  )
);
children.push(spacer());

children.push(heading('ש: האם הנתונים שמורים בישראל?', 3));
children.push(
  rtlPara(
    'ת: רוב הנתונים שמורים בענן AWS באירופה (פרנקפורט). יש אופציה לדרוש שמירה רק באזורים מסוימים אם נדרש מטעמי רגולציה.'
  )
);
children.push(spacer());

children.push(heading('ש: מה הגבולות של Salesforce?', 3));
children.push(
  rtlPara(
    'ת: יש "Governor Limits" - מגבלות על מספר השאילתות, גודל הנתונים, מספר ה-API Calls. בדרך כלל מספיק לפרויקטים גדולים, אבל צריך לתכנן את הקוד נכון.'
  )
);
children.push(spacer());

children.push(heading('שאלות עסקיות', 2));
children.push(spacer());

children.push(heading('ש: כמה זה יעלה בדיוק?', 3));
children.push(
  rtlPara(
    'ת: הערכה ראשונית: 1.2-2.5 מיליון ש"ח לשנה ברישיונות + עלות יישום חד-פעמית של בערך 1.5-3 מיליון ש"ח. המספרים תלויים בכמות משתמשים פעילים והיקף הפיתוח.'
  )
);
children.push(spacer());

children.push(heading('ש: כמה זמן ייקח הפרויקט מתחילה ועד סוף?', 3));
children.push(
  rtlPara(
    'ת: לפי הערכת מומחים: 10-12 חודשים מהיום הראשון ועד עליה לאוויר. שלוש חודשים נוספים לייצוב.'
  )
);
children.push(spacer());

children.push(heading('ש: האם נוכל לעדכן בעצמנו את התוכן?', 3));
children.push(
  rtlPara(
    'ת: כן! Salesforce CMS מאפשר לכם לעדכן חדשות, מבצעים, באנרים ומאמרי ידע בעצמכם. רק שינויים גדולים (כמו רכיבים חדשים) דורשים מפתח.'
  )
);
children.push(spacer());

children.push(heading('ש: מה קורה אם הספק הזוכה ייעלם?', 3));
children.push(
  rtlPara(
    'ת: בגלל שהקוד שייך לכם (לפי החוזה הממשלתי), תוכלו תמיד להעביר לספק אחר. הקוד ב-Git, הנתונים ב-Salesforce, התיעוד אצלכם. שום דבר לא "נעלם" עם הספק.'
  )
);
children.push(pageBreak());

// ============= CLOSING =============
children.push(spacer(400));
children.push(heading('סיום', 1));
children.push(spacer());
children.push(
  rtlPara(
    'הגעת לסוף המדריך - כל הכבוד! אם עברת את כל הפרקים, יש לך עכשיו מושג מצוין על מה הולך לקרות בפרויקט.'
  )
);
children.push(spacer());

children.push(
  infoBox(
    'הצעדים הבאים',
    '1. צפה ב-POC החי: https://mapi-customer-portal-poc.vercel.app\n2. הירשם ל-Trailhead והתחל ללמוד\n3. תאם פגישה עם ספק Salesforce בישראל\n4. הקם צוות פרויקט\n5. התחל מ-PoC ראשון על Sandbox - לפני התחייבות גדולה',
    'E2EFDA',
    '🚀'
  )
);
children.push(spacer());

children.push(
  rtlPara(
    'בהצלחה רבה! זהו פרויקט מרגש שיביא ערך עצום לאזרחי ישראל ולמרכז למיפוי ישראל.'
  )
);
children.push(spacer());
children.push(
  new Paragraph({
    bidirectional: true,
    alignment: AlignmentType.CENTER,
    spacing: { before: 480 },
    children: [
      new TextRun({
        text: '— סוף המסמך —',
        font: FONT,
        size: 24,
        bold: true,
        color: SECONDARY,
        italics: true,
        rightToLeft: true
      })
    ]
  })
);
children.push(spacer(200));
children.push(
  new Paragraph({
    bidirectional: true,
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({
        text: 'לשאלות נוספות: service@mapi.gov.il | *6274',
        font: FONT,
        size: 20,
        color: "606060",
        rightToLeft: true
      })
    ]
  })
);

// =============================================================
// Create document
// =============================================================
const doc = new Document({
  creator: 'MAPI Portal POC',
  title: 'מדריך יישום פורטל לקוחות מפ"י ב-Salesforce',
  description: 'מדריך מקיף למתחילים על יישום הפורטל ב-Salesforce Experience Cloud',
  styles: {
    default: {
      document: {
        run: { font: FONT, size: 22 }
      }
    },
    paragraphStyles: [
      {
        id: 'Title',
        name: 'Title',
        basedOn: 'Normal',
        next: 'Normal',
        quickFormat: true,
        run: { size: 48, bold: true, font: FONT, color: PRIMARY },
        paragraph: {
          spacing: { before: 240, after: 240 },
          alignment: AlignmentType.CENTER,
          outlineLevel: 0
        }
      },
      {
        id: 'Heading1',
        name: 'Heading 1',
        basedOn: 'Normal',
        next: 'Normal',
        quickFormat: true,
        run: { size: 36, bold: true, font: FONT, color: PRIMARY },
        paragraph: {
          spacing: { before: 360, after: 200 },
          outlineLevel: 0
        }
      },
      {
        id: 'Heading2',
        name: 'Heading 2',
        basedOn: 'Normal',
        next: 'Normal',
        quickFormat: true,
        run: { size: 28, bold: true, font: FONT, color: PRIMARY },
        paragraph: {
          spacing: { before: 280, after: 120 },
          outlineLevel: 1
        }
      },
      {
        id: 'Heading3',
        name: 'Heading 3',
        basedOn: 'Normal',
        next: 'Normal',
        quickFormat: true,
        run: { size: 24, bold: true, font: FONT, color: SECONDARY },
        paragraph: {
          spacing: { before: 200, after: 100 },
          outlineLevel: 2
        }
      }
    ]
  },
  numbering: {
    config: [
      {
        reference: 'rtl-bullets',
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: '•',
            alignment: AlignmentType.RIGHT,
            style: {
              paragraph: { indent: { right: 720, hanging: 360 } }
            }
          }
        ]
      },
      {
        reference: 'rtl-numbers',
        levels: [
          {
            level: 0,
            format: LevelFormat.DECIMAL,
            text: '%1.',
            alignment: AlignmentType.RIGHT,
            style: {
              paragraph: { indent: { right: 720, hanging: 360 } }
            }
          }
        ]
      }
    ]
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
        },
        bidi: true
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              bidirectional: true,
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: 'מדריך יישום פורטל מפ"י ב-Salesforce',
                  font: FONT,
                  size: 18,
                  color: "606060",
                  italics: true,
                  rightToLeft: true
                })
              ]
            })
          ]
        })
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: 'עמוד ',
                  font: FONT,
                  size: 18,
                  color: "606060"
                }),
                new TextRun({
                  children: [PageNumber.CURRENT],
                  font: FONT,
                  size: 18,
                  color: "606060"
                }),
                new TextRun({
                  text: ' | © 2026 המרכז למיפוי ישראל',
                  font: FONT,
                  size: 18,
                  color: "606060"
                })
              ]
            })
          ]
        })
      },
      children
    }
  ]
});

// Generate file
Packer.toBuffer(doc)
  .then((buffer) => {
    const outputPath = 'מדריך-יישום-Salesforce.docx';
    fs.writeFileSync(outputPath, buffer);
    console.log('Document created successfully!');
    console.log('File size:', Math.round(buffer.length / 1024), 'KB');
    console.log('Path:', outputPath);
  })
  .catch((err) => {
    console.error('Error:', err);
    process.exit(1);
  });
