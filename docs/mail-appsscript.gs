/**
 * מפ"י — פורטל לקוחות · שרת דואר (Google Apps Script Web App)
 * ------------------------------------------------------------------
 * מטרה: לאפשר לפורטל לשלוח מיילים אמיתיים דרך חשבון ה-Gmail של הארגון,
 * ללא שירות חיצוני נוסף. הפורטל שולח POST לכתובת ה-/exec של ה-Web App הזה,
 * והסקריפט שולח את המייל בפועל דרך MailApp (מהחשבון שאישר את הסקריפט).
 *
 * התקנה (חד-פעמי, ~2 דקות):
 *   1. היכנסו ל-https://script.google.com  →  New project.
 *   2. הדביקו את כל הקובץ הזה במקום קוד ברירת המחדל.
 *   3. Project Settings ⚙ → Script properties → Add property:
 *         שם:  MAIL_TOKEN     ערך: מחרוזת סוד כלשהי (למשל 32 תווים אקראיים)
 *   4. Deploy → New deployment → Type: Web app.
 *         Execute as: Me (החשבון שממנו יישלחו המיילים, למשל MapiComPortal@gmail.com)
 *         Who has access: Anyone
 *      אשרו את ההרשאות (Authorize) — כולל הרשאת שליחת מייל.
 *   5. העתיקו את כתובת ה-Web app (מסתיימת ב-/exec).
 *   6. ב-Vercel → Project → Settings → Environment Variables, הוסיפו:
 *         MAIL_WEBHOOK_URL   = כתובת ה-/exec מסעיף 5
 *         MAIL_WEBHOOK_TOKEN = אותו ערך של MAIL_TOKEN מסעיף 3
 *         SALES_EMAIL        = MapiComPortal@gmail.com   (יעד התראות המכירות)
 *      ואז Redeploy לפרודקשן.
 *
 * מגבלות Gmail: ~100 נמענים/יום בחשבון Gmail רגיל, ~1,500 ב-Google Workspace.
 * מספיק בקלות לפורטל POC.
 */

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents || '{}');

    // אימות סוד משותף — מונע שימוש לרעה בכתובת ה-Web App
    var expected = PropertiesService.getScriptProperties().getProperty('MAIL_TOKEN') || '';
    if (expected && body.token !== expected) {
      return _json({ ok: false, error: 'unauthorized' });
    }

    if (!body.to || !body.subject) {
      return _json({ ok: false, error: 'missing_fields' });
    }

    var options = {
      name: 'המרכז למיפוי ישראל — מפ"י',
      htmlBody: body.html || '',
    };
    if (body.replyTo) options.replyTo = body.replyTo;

    MailApp.sendEmail(
      body.to,
      body.subject,
      _stripHtml(body.html || ''),   // גרסת טקסט לנמענים ללא HTML
      options
    );

    return _json({ ok: true });
  } catch (err) {
    return _json({ ok: false, error: String(err) });
  }
}

// בדיקת חיים בדפדפן (GET) — כדי לוודא שה-Web App פרוס
function doGet() {
  return _json({ ok: true, service: 'mapi-portal-mail', ts: new Date().toISOString() });
}

function _json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function _stripHtml(html) {
  return String(html)
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
