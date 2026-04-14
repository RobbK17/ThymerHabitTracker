# Thymer Habit Tracker

**Version 1.0.7** · Habit Tracker collection plugin for [Thymer](https://thymer.com) (collection plugin, not a global plugin).

Track habits from the journal sidebar: categories, streaks, numeric targets, stats, and daily logs stored in a **`HabitTracker`** collection.

---

### Features

- Habits panel on journal pages with checkable items and streak display
- Settings UI for categories and habits (archive, reorder, drag-and-drop, numeric targets)
- Category streaks aggregated from habits in each category
- Long-press on numeric habits for direct entry; tap to increment
- Stats view with 7d / 30d range (persisted), completion calendar, bar chart, category rates, and **Weekly activities** Markdown export (copy to clipboard, toast)
- Optional **`persist_habit_panel_state`** (collection **`custom`** or **`__config__`** record JSON, default **`true`**): **`true`** keeps expanded/collapsed, stats, and search when the journal day changes, and **hides** the header **date** + **prev/next** (`data-ht-hide-day-nav` + CSS); **`false`** collapses on journal date change, clears search, exits stats, and **shows** **date** + **prev/next**. String values **`"true"`** / **`"false"`** from JSON are accepted.
- Habit date follows the open journal day; stats calendar defaults to that month

### Data

- Config and daily completions live in collection records named **`__config__`** and **`log-YYYY-MM-DD`** (JSON in the **Data** field). See the file header in **`Habit Tracker.js`** for the exact JSON shapes.

### Known limitations

- Short delay when switching journal pages while the panel refreshes
- Possible lag updating the viewed day when changing dates quickly

### Changelog

**1.0.7** — **Stats · Weekly activities:** link on the **7d / 30d** row opens a **Markdown** report for the **Mon–Sun** week containing the journal day (or today): title `# Weekly activities - …`, **`##`** per weekday with completed habits, **`### Notes`** with per-day **notes** from the log (italic). **Copy Markdown** copies to the clipboard, shows a **toast** (“Copied to clipboard”) at the **upper-right**, and **closes** the report modal on success. **Journal panel state (`persist_habit_panel_state`):** read from plugin **`custom`** first, then the **`__config__`** record JSON (same key); boolean strings from JSON are coerced. Default **`true`**: on journal date change, **do not** reset the panel—keep expanded/collapsed, stats, and search—and **hide** the header **date** and **prev/next** (journal drives the day; `data-ht-hide-day-nav="1"` + CSS `!important` as backup). Set to **`false`**: on journal date change, **collapse** the habits panel, **clear search**, **exit stats**, and **show** **date** + **prev/next** for in-widget day navigation. **Header** visibility is applied in **`_syncSidebarHeaderCollapseUi`** (including after the sidebar shell is built and after **`_renderSidebar`**). **UI:** habits panel expand/collapse uses **chevron-down / chevron-up** instead of **+ / −**.

**1.0.6** — **Journal sidebar:** habits under each category use a **responsive multi-column layout** (CSS grid, row-major order): 1 column on narrow panels, 2 from ~260px, 3 from ~400px panel width—driven by **container queries** on the sidebar. Settings habit lists unchanged.

**1.0.5** — **Category labels in native dropdowns** (stats filter, settings habit category, importer mapping): show **only the category name**, not the Tabler icon’s text label prefixed to it (e.g. “Exercise” instead of “Trophy Exercise”). Icons remain visible where the UI renders HTML (sidebar headers, habit rows, etc.).

**1.0.4** — **Tabler Icons** across the sidebar, settings, stats, and importer (webfont `ti ti-*`). **Category icon** is chosen from a **dropdown** of curated Tabler icons with a live preview (stored in the existing `emoji` field as a slug; legacy emoji still supported). **Per-day notes**: collection **`notes`** field + `page_field_ids`, with a scrollable notes area under the habit list, persisted per journal date. **Performance:** sidebar uses **one** `getAllRecords` pass to build the log map and compute all category/habit streaks (instead of one full scan per streak badge).

**1.0.3** — **Panel refresh after saving settings:** `refreshAllPanels()` no longer skips the panel when the stats view is open; it re-renders stats or the habits sidebar as appropriate. The settings *Save* flow **awaits** that refresh so the async sidebar render completes—so the empty “Set up habits” message clears right after you create categories and habits, without reloading the app.

**1.0.2** — Settings: the “add habit” category dropdown and all habit-row category labels/dropdowns stay in sync when you add, rename, or reorder categories—no need to close the modal or reload.

**1.0.1** — Stats range defaults and persistence; habit calendar month aligned with the open journal date.

**1.0.0** — Initial release.

---

‼️ _Work in progress — suggestions and support very welcome._ ‼️
