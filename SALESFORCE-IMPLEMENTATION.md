# מדריך יישום פורטל לקוחות מפ"י ב-Salesforce Experience Cloud

> **מסמך זה מסביר כיצד להעביר את ה-POC של פורטל הלקוחות (Next.js) לפלטפורמת Salesforce Experience Cloud, כולל העיצוב המודרני וה-AI Agent.**

**גרסה:** 1.0
**תאריך:** מאי 2026
**מבוסס על:** אפיון פרק 12 + POC הקיים (https://mapi-customer-portal-poc.vercel.app)

---

## 📋 תוכן עניינים

1. [סקירת הארכיטקטורה](#1-סקירת-הארכיטקטורה)
2. [רישוי ומוצרים נדרשים](#2-רישוי-ומוצרים-נדרשים)
3. [שלבי הקמה](#3-שלבי-הקמה)
4. [מודל נתונים](#4-מודל-נתונים)
5. [רכיבי UI - מ-React ל-LWC](#5-רכיבי-ui---מ-react-ל-lwc)
6. [Design System - הטמעה ב-Lightning](#6-design-system---הטמעה-ב-lightning)
7. [OmniScript - טפסי הזמנה דינמיים](#7-omniscript---טפסי-הזמנה-דינמיים)
8. [שורת חדשות - Salesforce CMS](#8-שורת-חדשות---salesforce-cms)
9. [תמיכה רב-לשונית](#9-תמיכה-רב-לשונית)
10. [AI Agent - Agentforce / Einstein Bot](#10-ai-agent---agentforce--einstein-bot)
11. [הזדהות לאומית - SAML 2.0](#11-הזדהות-לאומית---saml-20)
12. [אינטגרציות חיצוניות](#12-אינטגרציות-חיצוניות)
13. [Pipeline + סביבות](#13-pipeline--סביבות)
14. [Checklist יישום](#14-checklist-יישום)

---

## 1. סקירת הארכיטקטורה

```
┌──────────────────────────────────────────────────────────────────┐
│                    Experience Cloud Site                          │
│                     (portal.mapi.gov.il)                          │
├──────────────────────────────────────────────────────────────────┤
│  Theme Layout (Lightning Theme)                                   │
│  ├─ News Ticker (Custom LWC) ◄─── CMS Content / Apex             │
│  ├─ Header (Custom LWC)                                           │
│  │   ├─ LanguageSwitcher (Custom LWC)                             │
│  │   ├─ NavMenu (Standard)                                        │
│  │   └─ SupportButton → SupportFormModal                          │
│  ├─ Main Content (per page)                                       │
│  │   ├─ Hero with WOW effects (Custom LWC)                        │
│  │   ├─ FlexCards (PSS) - Services Grid                           │
│  │   ├─ OmniScript - Order Form                                   │
│  │   └─ Knowledge Articles - FAQ                                  │
│  ├─ Footer (Custom LWC)                                           │
│  └─ AI Agent (Agentforce/Einstein) ◄── Floating                   │
├──────────────────────────────────────────────────────────────────┤
│  Salesforce Core                                                  │
│  ├─ Sales Cloud (Account, Contact, Opportunity, Quote, Order)     │
│  ├─ Service Cloud (Case)                                          │
│  ├─ PSS Industries Foundation (BRE, OmniScript, FlexCards)        │
│  └─ Identity (National Identity SSO via SAML 2.0)                 │
├──────────────────────────────────────────────────────────────────┤
│  External Systems                                                 │
│  ├─ National Identity Provider (gov.il SAML)                      │
│  ├─ Payment Gateway (REST + Webhook)                              │
│  ├─ GovMap (iframe + JS API)                                      │
│  ├─ Merkava ERP (REST)                                            │
│  └─ SMS Provider (Shamir / REST)                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## 2. רישוי ומוצרים נדרשים

| מוצר Salesforce | מטרה | אישור נדרש |
|---|---|---|
| **Sales Cloud Enterprise/Unlimited** | מנוע מכירות, Opportunities, Quotes | ✅ פנימי |
| **Service Cloud** | Case Management, Knowledge Base | ✅ פנימי |
| **Experience Cloud** | Customer-facing portal | ✅ ליישום |
| **PSS (Public Sector Solutions)** | OmniScript, FlexCards, BRE, DocGen | ✅ ליישום |
| **Customer Community for PSS** | רישיון משתמש חיצוני (כלול ב-PSS) | ✅ |
| **External Identity License** | משתמשים שזקוקים רק להזדהות | ✅ אופציונלי |
| **Agentforce Service Agent** | AI Agent מתקדם | ✅ מומלץ |
| **Einstein Bot** | חלופה ל-Agentforce (זול יותר) | ✅ |
| **Salesforce Shield** | הצפנה במנוחה, Event Monitoring | ✅ קריטי |
| **Translation Workbench** | תרגומי Metadata (כלול) | ✅ |
| **Salesforce CMS** | ניהול שורת חדשות, באנרים, תוכן | ✅ ליישום |
| **Multi-language Site** | תמיכה ב-6 שפות | ✅ |

**עלות משוערת לשנה:** ~₪1.2-2.5M (תלוי במספר משתמשים פעילים)

---

## 3. שלבי הקמה

### שלב 1: הקמת Experience Cloud Site

```
Setup → Digital Experiences → All Sites → New
↓
Template: Build Your Own (LWR) - מומלץ למודרניות מקסימלית
Site Name: MAPI Customer Portal
URL: portal.mapi.gov.il
↓
Workspaces → Administration → Languages
  - Default: Hebrew (he)
  - Available: en, fr, es, ru, ar
  - Enable Right-to-Left: ✓ (he, ar)
↓
Workspaces → Builder → Apply Custom Theme
```

### שלב 2: My Domain & DNS

```
Setup → My Domain → portal.mapi.gov.il
DNS: CNAME record מ-portal.mapi.gov.il ל-Salesforce
SSL: אוטומטי דרך Salesforce + Akamai CDN
```

### שלב 3: התקנת PSS

```bash
# התקנת PSS Foundation Package
1. AppExchange → Public Sector Solutions
2. Install in Production: ✓
3. Grant access to: Site Guest User, All Users
```

### שלב 4: Connected Apps

```
Setup → App Manager → New Connected App
- Name: GovIL Identity SSO
- SAML Enabled: ✓
- Entity ID: portal.mapi.gov.il
- ACS URL: https://login.salesforce.com/services/auth/sso/...
```

---

## 4. מודל נתונים

### Custom Objects נדרשים

| אובייקט | תיאור | שדות עיקריים |
|---|---|---|
| `News_Item__c` | פריטי שורת חדשות | Type, Icon, Title (Multi-lang), Href, Active, Display_Order |
| `Service_Catalog_Item__c` | קטלוג שירותים | Name (Multi-lang), Category, Price, In_Scope__c, External_URL |
| `Map_Polygon__c` | אזורי מפה לטפסי הזמנה | GeoJSON, Area_Sqkm, Related_Order |
| `Translation__c` | תרגומים custom (לא Translation Workbench) | Key, Lang, Value |
| `Portal_Subscription__c` | מנויי CORS/WS | Status, Start_Date, End_Date, Plan |
| `API_Call_Log__c` | לוג קריאות API (אבטחה) | Endpoint, Status, Timestamp, User |
| `Survey_Inspector_Job__c` | משימות מודד מבקר | Number_of_Parcels, Status, Cost |

### Standard Objects בשימוש

- **Account** - לקוח (אזרח/חברה/ארגון)
- **Contact** - איש קשר
- **Opportunity** - הזדמנות מכירה (מטופס OmniScript)
- **Quote** - הצעת מחיר (מהמודאל "שלח הצעת מחיר")
- **Order** + **OrderItem** - הזמנה
- **Payment_Transaction__c** (PSS) - תשלום
- **Case** - פנייה לשירות
- **Knowledge__kav** - מאמרי FAQ

### Sharing Model

```apex
// Sharing Rule - לקוח רואה רק את ה-Account שלו
trigger PortalAccountSharing on User (after insert) {
    List<AccountShare> shares = new List<AccountShare>();
    for (User u : Trigger.new) {
        if (u.AccountId != null && u.Profile.UserLicense.Name.contains('Customer Community')) {
            shares.add(new AccountShare(
                AccountId = u.AccountId,
                UserOrGroupId = u.Id,
                AccountAccessLevel = 'Read',
                OpportunityAccessLevel = 'Read',
                CaseAccessLevel = 'Edit'
            ));
        }
    }
    insert shares;
}
```

---

## 5. רכיבי UI - מ-React ל-LWC

המיפוי הבא ממיר את הרכיבים מה-POC ל-Lightning Web Components:

| POC (React/Next.js) | LWC ב-Salesforce | סוג |
|---|---|---|
| `components/Header.tsx` | `mapiPortalHeader` | Custom LWC |
| `components/Footer.tsx` | `mapiPortalFooter` | Custom LWC |
| `components/NewsTicker.tsx` | `mapiNewsTicker` | Custom LWC + CMS |
| `components/ServiceCard.tsx` | `mapiServiceCard` או FlexCard | FlexCard מומלץ |
| `components/QuoteRequestModal.tsx` | `mapiQuoteRequestModal` | Custom LWC |
| `components/SupportFormModal.tsx` | OmniScript → Case | OmniScript |
| `components/AIAssistant.tsx` | Agentforce Component | Built-in |
| `components/LanguageSwitcher.tsx` | `mapiLanguageSwitcher` | Custom LWC |
| `components/WowCounter.tsx` | `mapiWowCounter` | Custom LWC |
| `app/page.tsx` (Home) | Home Page Builder | Experience Builder |
| `app/catalog/page.tsx` | Catalog Page + FlexCards | Hybrid |
| `app/order/[slug]/page.tsx` | OmniScript Container | OmniScript |
| `app/dashboard/page.tsx` | Dashboard with Standard Components | Mixed |

### דוגמת LWC: News Ticker

**`lwc/mapiNewsTicker/mapiNewsTicker.js`:**

```javascript
import { LightningElement, wire } from 'lwc';
import getActiveNews from '@salesforce/apex/MapiNewsService.getActiveNews';
import USER_LANGUAGE from '@salesforce/i18n/lang';

export default class MapiNewsTicker extends LightningElement {
    news = [];
    paused = false;
    error;

    @wire(getActiveNews, { lang: USER_LANGUAGE })
    wiredNews({ data, error }) {
        if (data) {
            this.news = data;
        } else if (error) {
            this.error = error;
        }
    }

    handleMouseEnter() { this.paused = true; }
    handleMouseLeave() { this.paused = false; }

    get marqueeStyle() {
        return this.paused ? 'animation-play-state: paused' : 'animation-play-state: running';
    }
}
```

**`lwc/mapiNewsTicker/mapiNewsTicker.html`:**

```html
<template>
    <div role="region" aria-label="News" class="news-ticker">
        <div class="container">
            <span class="label">
                <lightning-icon icon-name="utility:announcement" size="x-small"></lightning-icon>
                <span>חדשות</span>
            </span>
            <div class="marquee-wrap"
                 onmouseenter={handleMouseEnter}
                 onmouseleave={handleMouseLeave}>
                <div class="marquee" style={marqueeStyle}>
                    <template for:each={news} for:item="item">
                        <a key={item.Id} href={item.Href__c} class="news-item shine">
                            <span class={item.badgeClass}>{item.badgeLabel}</span>
                            <lightning-icon icon-name={item.Icon__c} size="x-small"></lightning-icon>
                            <span>{item.Title__c}</span>
                        </a>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
```

**`classes/MapiNewsService.cls`:**

```apex
public with sharing class MapiNewsService {
    @AuraEnabled(cacheable=true)
    public static List<News_Item__c> getActiveNews(String lang) {
        // Use multi-language fields or related Translation__c records
        return [
            SELECT Id, Type__c, Icon__c, Title__c, Href__c,
                   Display_Order__c, Badge_Label__c
            FROM News_Item__c
            WHERE Active__c = TRUE
              AND Start_Date__c <= TODAY
              AND End_Date__c >= TODAY
            ORDER BY Display_Order__c ASC, CreatedDate DESC
            LIMIT 20
        ];
    }
}
```

### דוגמת LWC: Quote Request Modal

```javascript
// lwc/mapiQuoteRequestModal/mapiQuoteRequestModal.js
import { LightningElement, api } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import QUOTE_OBJECT from '@salesforce/schema/Quote';

export default class MapiQuoteRequestModal extends LightningElement {
    @api service;
    @api open = false;
    submitted = false;
    formData = {
        firstName: '', lastName: '', email: '',
        organization: '', businessId: '', notes: ''
    };

    handleSubmit() {
        const fields = {
            FirstName__c: this.formData.firstName,
            LastName__c: this.formData.lastName,
            Email__c: this.formData.email,
            Account_Name__c: this.formData.organization,
            Business_ID__c: this.formData.businessId,
            Service__c: this.service.Id,
            Notes__c: this.formData.notes,
            Status: 'Draft'
        };
        createRecord({ apiName: 'Quote', fields })
            .then(() => {
                this.submitted = true;
                this.dispatchEvent(new ShowToastEvent({
                    title: 'הבקשה נשלחה',
                    message: 'נציג יחזור אליך בהקדם',
                    variant: 'success'
                }));
            })
            .catch(error => console.error(error));
    }

    closeModal() {
        this.open = false;
        this.dispatchEvent(new CustomEvent('close'));
    }
}
```

---

## 6. Design System - הטמעה ב-Lightning

### CSS Custom Properties

צריך לטעון את כל הצבעים והגופנים של ה-POC. ב-LWC, יוצרים static resource:

**`staticresources/MapiTheme.css`:**

```css
:root {
    --mapi-primary: #001d35;
    --mapi-primary-container: #1f4e79;
    --mapi-secondary: #0b61a1;
    --mapi-secondary-container: #7cbaff;
    --mapi-positive-green: #548235;
    --mapi-alert-yellow: #bf8f00;
    --mapi-error-red: #c00000;
    --mapi-surface: #f8f9fb;
    --mapi-on-surface: #191c1e;
}

/* Override Lightning Design System defaults */
.slds-button_brand {
    background: var(--mapi-primary);
    border-color: var(--mapi-primary);
}

.slds-button_brand:hover {
    background: var(--mapi-secondary);
}

/* WOW Effects */
.wow-mesh {
    background: radial-gradient(circle at 20% 30%, rgba(11, 97, 161, 0.45), transparent 45%),
                radial-gradient(circle at 80% 60%, rgba(124, 186, 255, 0.35), transparent 50%),
                radial-gradient(circle at 50% 90%, rgba(31, 78, 121, 0.55), transparent 55%),
                var(--mapi-primary);
    animation: mesh-shift 22s ease-in-out infinite alternate;
}

@keyframes mesh-shift {
    0% { background-position: 0% 0%, 100% 100%, 50% 50%; }
    100% { background-position: 100% 100%, 0% 0%, 0% 100%; }
}

/* Shine effect on all controls */
.shine {
    position: relative;
    overflow: hidden;
}

.shine::before {
    content: "";
    position: absolute;
    inset: 0;
    transform: translateX(-150%) skewX(-20deg);
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
    transition: transform 0.85s cubic-bezier(0.22, 1, 0.36, 1);
    pointer-events: none;
    z-index: 2;
}

.shine:hover::before {
    transform: translateX(150%) skewX(-20deg);
}
```

### טעינת ה-Theme

```javascript
// lwc/mapiThemeLoader/mapiThemeLoader.js
import { LightningElement } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import MapiTheme from '@salesforce/resourceUrl/MapiTheme';

export default class MapiThemeLoader extends LightningElement {
    connectedCallback() {
        loadStyle(this, MapiTheme + '/MapiTheme.css');
    }
}
```

### Theme Layout

```
Experience Builder → Settings → Theme
- Color Scheme: Custom (Mapi)
- Image Sets: Mapi Logo (mapi-logo.svg)
- Font: Public Sans + Heebo
- Branding: גוון כחול עמוק (#001d35) כצבע ראשי
```

---

## 7. OmniScript - טפסי הזמנה דינמיים

### יצירת OmniScript "Order Custom Map"

```
Setup → OmniStudio → OmniScripts → New
Name: Order_CustomMap
Type: Form
Sub-Type: Generic
Language: Hebrew (with translation overlays per language)
```

### מבנה השלבים (matching POC):

1. **Step 1: Order Details**
   - Picklist: Map Size (A4-A0) - מבוסס על Service_Catalog_Item__c
   - Radio: Include Orthophoto (Yes/No)
   - Radio: Delivery Method (Digital/Physical/Both)
   - Textarea: Purpose (optional)

2. **Step 2: GovMap Polygon**
   - Custom LWC: `mapiGovmapPicker` - iframe + postMessage API
   - Hidden field: GeoJSON Polygon
   - Calculated field: Area_Sqkm
   - Validation: Polygon must be within Israel bounds

3. **Step 3: Quote Review (BRE)**
   - DataRaptor: Read service prices
   - Calculation Procedure (BRE):
     ```
     base_price = Service.PriceFrom
     if includeOrthophoto then base_price += service.OrthoPremium
     if delivery == 'physical' then total = base_price + 39
     if delivery == 'both' then total = base_price + 39
     return { base, shipping, vat: total * 0.17, total }
     ```
   - Display: Price Breakdown FlexCard
   - DocGen: Generate PDF Quote

4. **Step 4: Payment**
   - Integration Procedure: Redirect to government payment gateway
   - Webhook URL receiver: Apex REST Resource

### BRE Calculation Procedure

```
Name: MAPI_CustomMap_PriceCalc
Output:
{
  "basePrice": {{lookup(Service__c, size, orthophoto)}},
  "shipping": {{conditional(delivery, "physical", 39, 0)}},
  "vat": {{(basePrice + shipping) * 0.17}},
  "total": {{basePrice + shipping}}
}
```

### Integration Procedure: Submit Order

```yaml
Name: MAPI_SubmitOrder
Steps:
  1. Create_Account_If_Not_Exists
  2. Create_Opportunity (Stage: 'Pricing')
  3. Create_Quote (linked to Opp)
  4. Generate_PDF (DocGen template: MAPI_Quote_Template)
  5. Create_Map_Polygon__c
  6. Send_Email_With_Quote
  7. Return: { quoteId, orderId, paymentUrl }
```

---

## 8. שורת חדשות - Salesforce CMS

### יצירת CMS Workspace

```
Setup → CMS Workspaces → New
Name: MAPI Portal Content
Channels: portal.mapi.gov.il
Default Language: Hebrew
Languages: he, en, fr, es, ru, ar
```

### Content Type: News Item

```
Setup → CMS → Content Types → New
Name: News_Item
Fields:
  - Type (Picklist: New/Promo/Update/Alert)
  - Icon (Text - Material Symbols name)
  - Title (Multi-language Rich Text)
  - Href (URL)
  - Start_Date / End_Date
  - Display_Order (Number)
  - Active (Checkbox)
```

### Workflow לעריכת חדשות

צוות התוכן של מפ"י נכנס ל-CMS Workspace, יוצר News Item חדש בעברית, ומתרגם ל-5 השפות הנוספות. אישור פרסום על ידי Content Manager. הפריט מופיע ב-NewsTicker LWC אוטומטית.

---

## 9. תמיכה רב-לשונית

### גישה משולבת:

| תוכן | כלי | תהליך |
|---|---|---|
| Metadata (Field Labels, Picklist Values) | Translation Workbench | Setup → Translation Workbench |
| Custom Object Labels | Custom Label per language | Setup → Custom Labels |
| CMS Content (חדשות, באנרים) | CMS Multi-language | UI ב-CMS Workspace |
| OmniScript Labels | OmniScript Multi-language | Per OmniScript Property |
| Knowledge Articles (FAQ) | Knowledge Multi-language | One Article per language |
| LWC Text | @salesforce/label imports | Static Resources |

### דוגמה: LWC עם תרגום

```javascript
// lwc/mapiHero/mapiHero.js
import { LightningElement } from 'lwc';
import HERO_TITLE from '@salesforce/label/c.MAPI_Hero_Title';
import HERO_CTA from '@salesforce/label/c.MAPI_Hero_CTA';

export default class MapiHero extends LightningElement {
    labels = { HERO_TITLE, HERO_CTA };
}
```

ב-Setup → Custom Labels:
```
MAPI_Hero_Title:
  - Hebrew: העתיד של המידע הגיאוגרפי בידיים שלך
  - English: The future of geographic data in your hands
  - French: L'avenir des données géographiques entre vos mains
  - Spanish: El futuro de la información geográfica
  - Russian: Будущее географических данных
  - Arabic: مستقبل المعلومات الجغرافية
```

### Language Switcher LWC

```javascript
// lwc/mapiLanguageSwitcher/mapiLanguageSwitcher.js
import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import USER_LANGUAGE from '@salesforce/i18n/lang';

const LANGUAGES = [
    { code: 'he', label: 'עברית', flag: '🇮🇱', dir: 'rtl' },
    { code: 'en', label: 'English', flag: '🇬🇧', dir: 'ltr' },
    { code: 'fr', label: 'Français', flag: '🇫🇷', dir: 'ltr' },
    { code: 'es', label: 'Español', flag: '🇪🇸', dir: 'ltr' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺', dir: 'ltr' },
    { code: 'ar', label: 'العربية', flag: '🇸🇦', dir: 'rtl' }
];

export default class MapiLanguageSwitcher extends NavigationMixin(LightningElement) {
    open = false;
    languages = LANGUAGES;
    current = USER_LANGUAGE;

    toggleOpen() { this.open = !this.open; }

    handleLanguageChange(event) {
        const newLang = event.target.dataset.lang;
        // Update user preference in Salesforce
        window.location.search = `?lang=${newLang}`;
        // Or use Apex to update user.LanguageLocaleKey
    }
}
```

---

## 10. AI Agent - Agentforce / Einstein Bot

### גישה מומלצת: Agentforce Service Agent

**מדוע Agentforce על פני Einstein Bot:**
- מבוסס LLM (Atlas Reasoning Engine)
- מבין שפה טבעית בכל 6 השפות
- יכול לבצע פעולות (Actions) בשם המשתמש
- אינטגרציה מובנית עם Knowledge Base

### שלבי הקמה:

#### 1. הקמת ה-Agent

```
Setup → Agentforce Studio → New Agent
Name: MAPI Customer Assistant
Type: Service Agent
Topics: Map Ordering, CORS, Surveyor, Order Status, Payment, FAQ
```

#### 2. הגדרת Topics (נושאים)

לכל אינטנט יוצרים Topic:

```yaml
Topic: Map_Ordering
Description: Customer wants to order a map
Sample Utterances (in 6 languages):
  - he: "אני רוצה להזמין מפה"
  - en: "I want to order a map"
  - fr: "Je veux commander une carte"
  - es: "Quiero pedir un mapa"
  - ru: "Я хочу заказать карту"
  - ar: "أريد طلب خريطة"
Actions:
  - SearchMapCatalog (Flow)
  - StartOmniScript_OrderCustomMap
  - ProvideQuote
```

#### 3. Apex Actions עבור ה-Agent

```apex
public class MapiAgentActions {

    @InvocableMethod(
        label='Search Map Catalog'
        description='Search MAPI catalog by criteria'
    )
    public static List<SearchResult> searchCatalog(List<SearchRequest> reqs) {
        List<SearchResult> results = new List<SearchResult>();
        for (SearchRequest req : reqs) {
            SearchResult r = new SearchResult();
            r.services = [
                SELECT Id, Name, Category__c, PriceFrom__c, Description__c
                FROM Service_Catalog_Item__c
                WHERE Name LIKE :('%' + req.query + '%')
                LIMIT 5
            ];
            results.add(r);
        }
        return results;
    }

    public class SearchRequest {
        @InvocableVariable(required=true) public String query;
        @InvocableVariable public String language;
    }

    public class SearchResult {
        @InvocableVariable public List<Service_Catalog_Item__c> services;
    }
}
```

#### 4. Knowledge Base Integration

```
Setup → Service Setup → Knowledge → Articles
Create FAQ articles in all 6 languages.
Tag with: Map, CORS, Surveyor, Payment, Order
Publish to: Portal Channel
```

ה-Agent מסוגל לחפש ולציטט תשובות ממאמרי Knowledge אוטומטית.

#### 5. Conversation Component

```html
<!-- lwc/mapiAgentChat/mapiAgentChat.html -->
<template>
    <!-- Floating button -->
    <button class="ai-btn shine" onclick={openChat}>
        <lightning-icon icon-name="custom:custom109" size="medium"></lightning-icon>
        <span class="pulse-dot"></span>
    </button>

    <!-- Use Agentforce embedded component -->
    <template if:true={isOpen}>
        <c-agentforce-messaging
            agent-id={agentId}
            user-language={userLang}
            onclose={closeChat}>
        </c-agentforce-messaging>
    </template>
</template>
```

#### 6. Einstein Bot כחלופה (ללא LLM)

אם תקציב מצומצם, ניתן להקים Einstein Bot עם:
- **Intent Definitions** - דומה ל-`INTENTS` במסייע ה-POC
- **Dialogs** - שאלות-תשובות מובנות
- **Entity Recognition** - לזיהוי שמות מוצרים
- **Handoff to Agent** - העברה לנציג אנושי

### השוואה: Agentforce vs Einstein Bot

| תכונה | Agentforce | Einstein Bot |
|---|---|---|
| מבוסס LLM | ✅ Atlas | ❌ Rule-based |
| הבנת שפה טבעית | ✅ מעולה | 🟡 בינונית |
| תמיכה 6 שפות | ✅ מובנה | 🟡 דורש הגדרה ידנית |
| ביצוע פעולות | ✅ Actions | 🟡 Flows |
| מחיר/חודש | ₪₪₪₪ | ₪₪ |
| זמן יישום | 2-3 שבועות | 1-2 שבועות |
| **המלצה לפרויקט מפ"י** | ✅ | 🔄 שלב א' |

---

## 11. הזדהות לאומית - SAML 2.0

```
Setup → Single Sign-On Settings → New
Provider: Federation ID
Identity Provider: gov.il National Identity
SAML Version: 2.0
Entity ID: portal.mapi.gov.il
Identity Provider Login URL: https://identity.gov.il/saml/idp
Identity Provider Certificate: [Upload .crt]
SAML Identity Type: Assertion contains User's Federation ID
SAML Identity Location: Federation ID in NameIdentifier
```

### Just-In-Time Provisioning

```apex
global class GovIL_JIT_Handler implements Auth.SamlJitHandler {

    global User createUser(Id samlSsoProviderId, Id communityId,
                           Id portalId, String federationIdentifier,
                           Map<String,String> attributes, String assertion) {
        User u = new User();
        u.FederationIdentifier = federationIdentifier;
        u.FirstName = attributes.get('FirstName');
        u.LastName = attributes.get('LastName');
        u.Email = attributes.get('Email');
        u.Username = federationIdentifier + '@mapi.portal.com';
        u.Alias = federationIdentifier.left(8);
        u.LanguageLocaleKey = attributes.get('preferredLang') ?? 'iw';
        u.LocaleSidKey = 'iw_IL';
        u.TimeZoneSidKey = 'Asia/Jerusalem';
        u.ProfileId = [SELECT Id FROM Profile WHERE Name = 'Customer Community PSS'].Id;

        // Create related Account + Contact
        Account a = new Account(Name = u.FirstName + ' ' + u.LastName);
        insert a;
        Contact c = new Contact(
            FirstName = u.FirstName,
            LastName = u.LastName,
            Email = u.Email,
            AccountId = a.Id,
            National_ID__c = federationIdentifier
        );
        insert c;
        u.ContactId = c.Id;

        return u;
    }

    global void updateUser(Id userId, Id samlSsoProviderId, Id communityId,
                           Id portalId, String federationIdentifier,
                           Map<String,String> attributes, String assertion) {
        User u = [SELECT Id, FirstName, LastName, Email FROM User WHERE Id = :userId];
        u.FirstName = attributes.get('FirstName');
        u.LastName = attributes.get('LastName');
        u.Email = attributes.get('Email');
        update u;
    }
}
```

---

## 12. אינטגרציות חיצוניות

### Named Credentials

| Named Credential | יעד | פרוטוקול |
|---|---|---|
| `GovIL_Payment_Gateway` | שרת תשלומים | REST + OAuth 2.0 |
| `GovMap_API` | GovMap | REST |
| `Merkava_ERP` | מערכת מרכבה | SOAP/REST |
| `Shamir_SMS` | ספק SMS | REST |
| `geo_plus_plus` | שרת CORS | REST |

### דוגמה: שליחת SMS דרך Shamir

```apex
public class MapiSmsService {

    @future(callout=true)
    public static void sendSms(String phoneNumber, String messageBody) {
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

        // Log
        insert new SMS_Log__c(
            Recipient__c = phoneNumber,
            Status__c = res.getStatusCode() == 200 ? 'Sent' : 'Failed',
            Response__c = res.getBody()
        );
    }
}
```

### Webhook receiver לאישור תשלום

```apex
@RestResource(urlMapping='/payment/webhook/*')
global class PaymentWebhookReceiver {

    @HttpPost
    global static void handlePayment() {
        RestRequest req = RestContext.request;
        Map<String, Object> payload = (Map<String, Object>) JSON.deserializeUntyped(req.requestBody.toString());

        // Verify signature
        if (!verifySignature(payload, req.headers.get('X-Signature'))) {
            RestContext.response.statusCode = 401;
            return;
        }

        // Find related Quote
        Id quoteId = (Id) payload.get('quoteId');
        Quote q = [SELECT Id, Status, OpportunityId FROM Quote WHERE Id = :quoteId];

        // Create Order
        Order o = new Order(
            AccountId = q.AccountId,
            Quote__c = q.Id,
            Status = 'Activated',
            EffectiveDate = Date.today()
        );
        insert o;

        // Create Payment Transaction
        Payment_Transaction__c pt = new Payment_Transaction__c(
            Order__c = o.Id,
            Amount__c = (Decimal) payload.get('amount'),
            Status__c = 'Captured',
            External_ID__c = (String) payload.get('transactionId')
        );
        insert pt;

        // Send confirmation
        MapiSmsService.sendSms(o.Customer_Phone__c, 'הזמנתך אושרה: ' + o.OrderNumber);

        RestContext.response.statusCode = 200;
    }

    private static Boolean verifySignature(Map<String, Object> payload, String signature) {
        // HMAC-SHA256 verification
        // ...
        return true;
    }
}
```

---

## 13. Pipeline + סביבות

### מבנה Sandboxes

```
Production (PROD)
   ↑
UAT (Full Sandbox) ─── User Acceptance Testing
   ↑
INT (Partial Sandbox) ─── Integration Testing
   ↑
DEV (Developer Sandbox) ─── Development
   ↑
Scratch Orgs ─── Feature Branches
```

### Git Flow

```
main (= Production)
├── release/* (= UAT)
├── develop (= INT)
└── feature/* (= DEV/Scratch)
```

### SFDX deployment commands

```bash
# Deploy to UAT
sf project deploy start \
  --target-org uat-org \
  --source-dir force-app/main/default \
  --test-level RunLocalTests

# Run tests
sf apex run test \
  --target-org dev-org \
  --test-level RunLocalTests \
  --code-coverage \
  --result-format human

# Validate before production
sf project deploy validate \
  --target-org production \
  --source-dir force-app \
  --tests RunLocalTests
```

### CI/CD: GitHub Actions

```yaml
# .github/workflows/sf-deploy.yml
name: Salesforce Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: salesforcecli/github-action-sfdx@latest
      - name: Authenticate
        run: sf org login sfdx-url --sfdx-url-file ${{ secrets.SFDX_AUTH_URL }}
      - name: Deploy
        run: sf project deploy start --test-level RunLocalTests
```

---

## 14. Checklist יישום

### שלב הקמה (Foundation - 4 שבועות)

- [ ] רכישת רישיונות (Experience Cloud + PSS + Shield + Agentforce)
- [ ] הקמת Sandboxes (DEV, INT, UAT)
- [ ] התקנת PSS Foundation Package
- [ ] התקנת CMS Workspace
- [ ] הקמת My Domain (portal.mapi.gov.il)
- [ ] הקמת Experience Cloud Site
- [ ] הקמת SAML SSO לחיבור National Identity
- [ ] הגדרת 6 שפות + RTL

### מודל נתונים (2 שבועות)

- [ ] יצירת Custom Objects (News_Item__c, Service_Catalog_Item__c, וכו')
- [ ] הגדרת Field-Level Security
- [ ] הגדרת Sharing Sets ו-Sharing Rules
- [ ] הפעלת Field Audit Trail (Shield)
- [ ] הגדרת Platform Encryption לשדות רגישים

### LWC Development (8-10 שבועות)

- [ ] mapiPortalHeader + LanguageSwitcher
- [ ] mapiPortalFooter
- [ ] mapiNewsTicker (עם CMS integration)
- [ ] mapiServiceCard / FlexCards
- [ ] mapiQuoteRequestModal
- [ ] mapiSupportFormModal → OmniScript
- [ ] mapiGovmapPicker (iframe embed)
- [ ] mapiWowCounter
- [ ] mapiHero (with WOW effects)

### OmniScripts (6-8 שבועות במקביל)

- [ ] Order_CustomMap
- [ ] Order_CORS_Subscription
- [ ] Order_AerialPhotos
- [ ] Order_Surveyor (אפיון מורכב)
- [ ] Quote_Request
- [ ] Support_Case_Submission

### AI Agent (2-3 שבועות)

- [ ] הקמת Agentforce Service Agent
- [ ] הגדרת 9 Topics (Map Order, CORS, Surveyor, וכו')
- [ ] תרגום Topics + Utterances ל-6 שפות
- [ ] יצירת Apex Actions (SearchCatalog, GetOrderStatus, וכו')
- [ ] יצירת Knowledge Articles בעברית + תרגום
- [ ] Embedded Messaging Component

### בדיקות (4-6 שבועות)

- [ ] Unit Tests (Apex - מינ' 85% coverage)
- [ ] Integration Tests (Postman/SoapUI)
- [ ] LWC Tests (Jest)
- [ ] OmniScript Tests
- [ ] Penetration Testing (אבטחה)
- [ ] Performance Testing (1,000+ משתמשים בו-זמנית)
- [ ] Accessibility Audit (WCAG 2.1 AA)
- [ ] UAT עם משתמשים אמיתיים של מפ"י

### Go-Live (2 שבועות)

- [ ] Production Deployment
- [ ] Smoke Tests
- [ ] Monitoring Setup (Event Monitoring, Splunk integration)
- [ ] DR Plan
- [ ] Training (TTT) למנהלי הפורטל ולעובדי השירות

---

## 📎 נספחים

### א. POC כ-reference

ה-POC הפועל כעת ב-Vercel משמש כ-reference מלא לעיצוב, התנהגות, ו-UX:
- **URL חי:** https://mapi-customer-portal-poc.vercel.app
- **קוד מקור:** `C:/Users/imark/Desktop/מסמכי פרויקט שיווק ומכירות/פורטל לקוחות`
- **תיעוד:** README.md בפרויקט

### ב. שעות יישום משוערות

| חבילה | שעות | משבועות |
|---|---|---|
| Foundation Setup | 160h | 4 |
| Data Model | 80h | 2 |
| LWC Components | 400h | 10 |
| OmniScripts (6) | 320h | 8 |
| Design System (CSS) | 80h | 2 |
| AI Agent | 120h | 3 |
| Translations (6 lang) | 100h | 2.5 |
| Integrations (5+) | 240h | 6 |
| Testing | 240h | 6 |
| **סה"כ** | **1,740h** | **~43 שבועות עבודה** |

### ג. צוות מומלץ

- 1 × Solution Architect (חצי משרה)
- 2 × Salesforce Developers (משרה מלאה)
- 1 × Senior LWC Developer (משרה מלאה)
- 1 × QA Engineer (חצי משרה)
- 1 × UX Designer (חודש בתחילה)
- 1 × Project Manager (חצי משרה)

### ד. סיכונים וצעדי הפחתה

| סיכון | חומרה | הפחתה |
|---|---|---|
| חיבור National Identity מורכב | גבוהה | תיאום מוקדם עם רשות התקשוב |
| תרגומי איכות ל-6 שפות | בינונית | שימוש בשירות תרגום מקצועי |
| Performance עם 1,000+ משתמשים | בינונית | Load testing מוקדם + Cacheable Apex |
| Agentforce בעברית | בינונית | חלופה: Einstein Bot בשלב א' |
| תאימות מסך לטאבלט/iOS | נמוכה | POC כבר מאומת |

---

**הסוף.**

לשאלות ופירוט נוסף: **service@mapi.gov.il** או דרך הצ'אט החכם בפורטל.
