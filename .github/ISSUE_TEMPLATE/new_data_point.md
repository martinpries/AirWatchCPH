---
name: 📊 New Data Point
about: Submit a new timeline entry for AirWatch CPH
title: '[DATA] Add new timeline entry: [TITLE]'
labels: ['data-submission', 'needs-review']
assignees: ''
---

## 📋 Data Point Information

> **Important**: Fill out the fields below exactly as shown. This will be converted to a YAML file automatically.

### Required Fields

**Title:**
<!-- Example: Copenhagen Airport Air Quality Assessment 2024 -->

**Date (YYYY-MM-DD):**
<!-- Example: 2024-03-15 -->

**Publisher:**
<!-- Example: Danish Environmental Protection Agency -->

**Author:**
<!-- Example: Dr. Maria Hansen -->

**Short Description:**
<!-- 1-2 sentences for timeline display -->

**Long Description:**
<!-- Detailed content/summary of the article, report, or statement -->

**Type:**
<!-- Select ONE: news, scientific, report, government, company, political, organization, expert, social -->

**Reference:**
<!-- Internal reference or document ID (optional - leave blank if none) -->

**Link:**
<!-- URL to the original source -->

---

## 📝 Example Format

Here's exactly how your data will look in the YAML file:

```yaml
title: "Copenhagen Airport Air Quality Assessment 2024"
date: "2024-03-15"
publisher: "Danish Environmental Protection Agency"
author: "Dr. Maria Hansen"
short_description: "Comprehensive study of air pollution levels around Copenhagen Airport showing increased NO2 concentrations."
long_description: "This detailed report analyzes air quality measurements taken around Københavns Lufthavn throughout 2024. Key findings include elevated nitrogen dioxide levels near runway areas, with concentrations exceeding WHO guidelines during peak traffic hours."
type: "scientific"
reference: "EPA-DK-2024-CPH-001"
link: "https://example.com/reports/cph-air-quality-2024"
```

---

## ✅ Checklist

- [ ] Title is descriptive and clear
- [ ] Date is in YYYY-MM-DD format
- [ ] Type is exactly one of: news, scientific, report, government, company, political, organization, expert, social
- [ ] Short description is 1-2 sentences
- [ ] Long description provides detailed context
- [ ] Source link is valid and accessible
- [ ] Content relates to air quality/pollution at Copenhagen Airport

---

**Note:** Your submission will be processed automatically to create a YAML file with the filename: `YYYY-MM-DD-descriptive-title.yaml` in the appropriate year folder.
