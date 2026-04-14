/**
 * HabitTracker — Standalone CollectionPlugin
 * @version 1.1.0
 */

// ─── CSS ─────────────────────────────────────────────────────────────────────
const HT_CSS = `
  .ht-sidebar {
    display: block;
    width: 100%;
    margin: 0 0 16px 0;
    container-type: inline-size;
    container-name: ht-sidebar;
    background: rgba(30, 28, 36, 0.65);
    backdrop-filter: blur(18px) saturate(1.4);
    -webkit-backdrop-filter: blur(18px) saturate(1.4);
    border: 1px solid rgba(255, 255, 255, 0.09);
    border-radius: 12px;
    overflow: hidden;
    font-family: var(--font-family, sans-serif);
    font-size: 13px;
    color: #e8e0d0;
  }
  .ht-sidebar.ht-collapsed .ht-sidebar-body { display: none; }
  .ht-sidebar-header {
    display: flex;
    align-items: center;
    padding: 10px 14px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.07);
    gap: 8px;
    min-height: 40px;
  }
  .ht-toggle-btn {
    background: none; border: none; cursor: pointer; color: #8a7e6a;
    padding: 0 2px; font-size: 15px; font-weight: 600; line-height: 1;
    flex-shrink: 0; transition: color 0.1s; min-width: 16px; text-align: center;
  }
  .ht-toggle-btn:hover { color: #e8e0d0; }
  .ht-nav-btn {
    background: none; border: none; cursor: pointer; color: #8a7e6a;
    font-size: 16px; line-height: 1; padding: 0 3px; border-radius: 4px;
    flex-shrink: 0; transition: color 0.1s;
  }
  .ht-nav-btn:hover { color: #e8e0d0; background: rgba(255,255,255,0.07); }
  .ht-sidebar-title {
    font-weight: 700; font-size: 13px; color: #e8e0d0; white-space: nowrap;
    flex: 1; display: inline-flex; align-items: center; gap: 5px;
  }
  .ht-sidebar .ti, .ht-stats-view .ti, .ht-modal .ti {
    font-size: 1.1em; vertical-align: -0.12em; line-height: 1; flex-shrink: 0;
  }
  .ht-empty-icon .ti { font-size: 28px; opacity: 0.85; vertical-align: middle; }
  .ht-stats-btn .ti, .ht-nav-btn .ti { font-size: 17px; }
  .ht-toggle-btn .ti { font-size: 15px; }
  .ht-category-caret .ti { font-size: 9px; color: #8a7e6a; }
  .ht-category-status .ti { font-size: 13px; }
  .ht-streak-badge .ti { font-size: 11px; opacity: 0.9; }
  .ht-habit-check .ti { font-size: 14px; color: #4caf50; }
  .ht-habit-ring-label .ti { font-size: 11px; display: block; margin-top: 1px; }
  .ht-modal-close .ti { font-size: 16px; }
  .ht-modal-title .ti { font-size: 17px; vertical-align: -0.18em; margin-right: 2px; }
  .ht-btn .ti { font-size: 14px; margin-right: 0.25em; vertical-align: -0.18em; }
  .ht-item-sub .ti { font-size: 10px; vertical-align: -0.12em; opacity: 0.95; }
  .ht-modal-body .ti { vertical-align: middle; }
  .ht-date-label { font-size: 12px; color: #8a7e6a; white-space: nowrap; flex-shrink: 0; }
  .ht-sidebar[data-ht-hide-day-nav="1"] .ht-date-label,
  .ht-sidebar[data-ht-hide-day-nav="1"] .ht-day-nav-prev,
  .ht-sidebar[data-ht-hide-day-nav="1"] .ht-day-nav-next { display: none !important; }
  .ht-sidebar.ht-collapsed .ht-sidebar-header { border-bottom: none; }
  .ht-sidebar-body { padding: 8px 0 12px; }
  .ht-sidebar-cats { transition: opacity 0.1s ease; }
  .ht-sidebar-cats.ht-fading { opacity: 0; }
  .ht-stats-content { transition: opacity 0.12s ease; }
  .ht-stats-content.ht-fading { opacity: 0; }
  .ht-progress { margin: 4px 14px 8px; height: 2px; background: rgba(255,255,255,0.08); border-radius: 2px; overflow: hidden; }
  .ht-progress-fill { height: 100%; background: #4caf50; border-radius: 2px; transition: width 0.35s ease; }
  .ht-notes-wrap { margin: 10px 14px 4px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.07); }
  .ht-notes-label { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: #8a7e6a; margin-bottom: 6px; }
  .ht-notes-input {
    display: block; width: 100%; box-sizing: border-box; min-height: 2.8em; max-height: 120px;
    overflow-y: auto; resize: vertical; font-family: inherit; font-size: 12px; line-height: 1.35;
    color: #e8e0d0; background: rgba(0,0,0,0.25); border: 1px solid rgba(255,255,255,0.1);
    border-radius: 6px; padding: 6px 8px; margin: 0;
  }
  .ht-notes-input::placeholder { color: rgba(138,126,106,0.75); }
  .ht-notes-input:focus { outline: none; border-color: rgba(124,106,247,0.45); background: rgba(0,0,0,0.32); }
  .ht-category { margin: 0 0 1px 0; }
  .ht-category-header {
    display: flex; align-items: center; gap: 6px; padding: 5px 10px;
    cursor: pointer; border-radius: 5px; margin: 0 4px; user-select: none; transition: background 0.1s;
  }
  .ht-category-header:hover { background: rgba(255,255,255,0.06); }
  .ht-category-caret { font-size: 8px; color: #8a7e6a; width: 10px; flex-shrink: 0; transition: transform 0.15s; }
  .ht-category-caret.open { transform: rotate(90deg); }
  .ht-category-emoji { font-size: 13px; }
  .ht-category-name { font-weight: 600; font-size: 12px; color: #e8e0d0; flex: 1; letter-spacing: 0.01em; }
  .ht-cat-done { color: #4caf50; font-size: 11px; }
  .ht-cat-pending { color: rgba(255,255,255,0.2); font-size: 11px; }
  .ht-streak-badge { font-size: 10px; color: #8a7e6a; background: rgba(255,255,255,0.06); border-radius: 10px; padding: 1px 5px; white-space: nowrap; border: 1px solid rgba(255,255,255,0.07); }
  .ht-category-habits { padding: 1px 4px 5px 22px; display: grid; gap: 4px 6px; grid-template-columns: 1fr; align-items: start; }
  .ht-category-habits .ht-habit { min-width: 0; }
  @container ht-sidebar (min-width: 260px) { .ht-category-habits { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  @container ht-sidebar (min-width: 400px) { .ht-category-habits { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
  .ht-category-habits.ht-hidden { display: none; }
  .ht-habit { display: flex; align-items: center; gap: 8px; padding: 4px 8px; border-radius: 4px; cursor: pointer; transition: background 0.1s; }
  .ht-habit:hover { background: rgba(255,255,255,0.05); }
  .ht-habit-check { width: 16px; height: 16px; border: 1.5px solid rgba(255,255,255,0.2); border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; transition: all 0.15s; font-size: 9px; color: transparent; }
  .ht-habit.ht-done .ht-habit-check { background: rgba(76,175,80,0.18); border-color: #4caf50; color: #4caf50; }
  .ht-habit-name { flex: 1; color: #e8e0d0; font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .ht-habit.ht-done .ht-habit-name { color: #8a7e6a; text-decoration: line-through; text-decoration-color: rgba(138,126,106,0.5); }
  .ht-habit-streak { font-size: 10px; color: #8a7e6a; white-space: nowrap; }
  .ht-habit-streak.hot { color: #ff9800; }
  .ht-empty { padding: 24px 14px; text-align: center; color: #8a7e6a; font-size: 12px; line-height: 1.7; }
  .ht-empty-icon { font-size: 22px; margin-bottom: 8px; opacity: 0.7; }
  .ht-setup-btn { margin-top: 10px; padding: 5px 14px; background: rgba(124,106,247,0.25); color: #c4b8ff; border: 1px solid rgba(124,106,247,0.4); border-radius: 6px; cursor: pointer; font-size: 12px; transition: background 0.15s; }
  .ht-setup-btn:hover { background: rgba(124,106,247,0.38); }
  .ht-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.55); backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px); z-index: 9999; display: flex; align-items: center; justify-content: center; }
  .ht-modal { background: rgba(28,26,34,0.92); backdrop-filter: blur(24px) saturate(1.5); -webkit-backdrop-filter: blur(24px) saturate(1.5); border: 1px solid rgba(255,255,255,0.10); border-radius: 12px; width: 520px; max-width: 96vw; max-height: 82vh; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 24px 64px rgba(0,0,0,0.6); color: #e8e0d0; }
  .ht-modal-header { display: flex; align-items: center; padding: 16px 20px; border-bottom: 1px solid rgba(255,255,255,0.07); flex-shrink: 0; }
  .ht-modal-title { font-weight: 700; font-size: 14px; flex: 1; color: #e8e0d0; }
  .ht-modal-close { background: none; border: none; cursor: pointer; color: #8a7e6a; font-size: 16px; padding: 2px 6px; border-radius: 4px; }
  .ht-modal-close:hover { background: rgba(255,255,255,0.07); color: #e8e0d0; }
  .ht-modal-body { overflow-y: auto; padding: 16px 20px; flex: 1; }
  .ht-weekly-report-pre { margin: 0; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 11px; line-height: 1.45; color: #e8e0d0; white-space: pre-wrap; word-break: break-word; }
  .ht-modal-footer { padding: 12px 20px; border-top: 1px solid rgba(255,255,255,0.07); display: flex; justify-content: flex-end; gap: 8px; flex-shrink: 0; }
  .ht-toast { position: fixed; top: 16px; right: 16px; left: auto; transform: translateX(12px); opacity: 0; transition: opacity 0.2s ease, transform 0.2s ease; z-index: 100050; padding: 10px 18px; border-radius: 8px; background: rgba(36,34,44,0.96); border: 1px solid rgba(255,255,255,0.12); color: #e8e0d0; font-size: 13px; box-shadow: 0 8px 28px rgba(0,0,0,0.45); pointer-events: none; max-width: min(320px, calc(100vw - 32px)); text-align: right; }
  .ht-toast.ht-toast-visible { opacity: 1; transform: translateX(0); }
  .ht-btn { padding: 6px 14px; border-radius: 6px; border: none; cursor: pointer; font-size: 13px; font-weight: 500; transition: opacity 0.15s, background 0.15s; }
  .ht-btn-primary { background: rgba(124,106,247,0.85); color: #fff; }
  .ht-btn-primary:hover { background: rgba(124,106,247,1); }
  .ht-btn-secondary { background: rgba(255,255,255,0.07); color: #e8e0d0; border: 1px solid rgba(255,255,255,0.10); }
  .ht-btn-secondary:hover { background: rgba(255,255,255,0.12); }
  .ht-btn-danger { background: rgba(218,54,51,0.12); color: #f07070; border: 1px solid rgba(218,54,51,0.25); }
  .ht-btn-danger:hover { background: rgba(218,54,51,0.22); }
  .ht-btn-sm { padding: 3px 8px; font-size: 11px; }
  .ht-section-title { font-weight: 600; font-size: 11px; color: #8a7e6a; letter-spacing: 0.07em; text-transform: uppercase; margin: 16px 0 8px; }
  .ht-section-title:first-child { margin-top: 0; }
  .ht-cat-item, .ht-habit-item { display: flex; align-items: center; gap: 8px; padding: 6px 8px; border-radius: 6px; margin-bottom: 4px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06); }
  .ht-item-emoji { font-size: 15px; width: 24px; min-width: 24px; text-align: center; flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; }
  .ht-item-emoji .ti { font-size: 16px; }
  .ht-item-left { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 1px; }
  .ht-item-name { font-size: 13px; color: #e8e0d0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .ht-item-sub { font-size: 11px; color: #8a7e6a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .ht-item-actions { display: flex; align-items: center; gap: 4px; flex-shrink: 0; }
  .ht-add-row { display: flex; gap: 6px; margin-top: 8px; flex-wrap: wrap; align-items: center; }
  .ht-icon-select { flex: 0 0 auto; min-width: 148px; max-width: 200px; padding: 5px 8px; font-size: 12px; }
  .ht-cat-glyph-inline { display: inline-flex; align-items: center; vertical-align: middle; margin-right: 4px; }
  .ht-cat-glyph-inline .ti { font-size: 1em; }
  .ht-category-emoji .ti { font-size: 14px; }
  .ht-emoji-inline { font-size: 1.1em; line-height: 1; }
  .ht-icon-preview { display: inline-flex; align-items: center; justify-content: center; min-width: 26px; flex-shrink: 0; color: #c4a882; }
  .ht-icon-preview .ti { font-size: 18px; }
  .ht-input { flex: 1; min-width: 0; padding: 5px 10px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 6px; color: #e8e0d0; font-size: 13px; outline: none; transition: border-color 0.15s; }
  .ht-input:focus { border-color: rgba(124,106,247,0.7); }
  .ht-input::placeholder { color: #8a7e6a; }
  .ht-select { padding: 5px 8px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 6px; color: #e8e0d0; font-size: 13px; outline: none; cursor: pointer; }
  .ht-select option { background: #1c1a22; }
  .ht-divider { height: 1px; background: rgba(255,255,255,0.07); margin: 14px 0; }
  .ht-habit-ring { position: relative; width: 22px; height: 22px; flex-shrink: 0; }
  .ht-habit-ring svg { position: absolute; top: 0; left: 0; transform: rotate(-90deg); }
  .ht-habit-ring-bg { fill: none; stroke: rgba(255,255,255,0.12); stroke-width: 2.5; }
  .ht-habit-ring-fill { fill: none; stroke: #4caf50; stroke-width: 2.5; stroke-linecap: round; transition: stroke-dashoffset 0.3s ease; }
  .ht-habit-ring-label { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 7px; font-weight: 700; color: #e8e0d0; line-height: 1; }
  .ht-habit.ht-done .ht-habit-ring-fill { stroke: #4caf50; }
  .ht-habit.ht-done .ht-habit-ring-label { color: #4caf50; }
  .ht-habit-num-row { display: flex; align-items: center; gap: 4px; flex-shrink: 0; }
  .ht-num-btn { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); border-radius: 4px; color: #e8e0d0; font-size: 13px; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; transition: background 0.1s; padding: 0; line-height: 1; }
  .ht-num-btn:hover { background: rgba(255,255,255,0.15); }
  .ht-num-val { font-size: 11px; color: #e8e0d0; min-width: 28px; text-align: center; cursor: pointer; }
  .ht-num-val.at-target { color: #4caf50; font-weight: 700; }
  .ht-num-input { width: 44px; padding: 2px 4px; background: rgba(255,255,255,0.1); border: 1px solid rgba(124,106,247,0.6); border-radius: 4px; color: #e8e0d0; font-size: 12px; text-align: center; outline: none; }
  @keyframes ht-burst { 0% { transform: scale(1); opacity: 1; } 40% { transform: scale(1.35); opacity: 0.9; } 100% { transform: scale(1); opacity: 1; } }
  @keyframes ht-particle { 0% { transform: translate(0,0) scale(1); opacity: 1; } 100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; } }
  .ht-celebrating { animation: ht-burst 0.35s ease-out; }
  .ht-particle { position: absolute; width: 5px; height: 5px; border-radius: 50%; pointer-events: none; animation: ht-particle 0.5s ease-out forwards; }
  .ht-stats-view { padding: 12px 14px 20px; }
  .ht-stats-range { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 14px; }
  .ht-stats-range-left { display: flex; gap: 4px; flex-wrap: wrap; }
  .ht-weekly-report-link { font-size: 11px; font-weight: 600; color: #c4b8ff; text-decoration: none; white-space: nowrap; cursor: pointer; padding: 3px 2px; flex-shrink: 0; }
  .ht-weekly-report-link:hover { text-decoration: underline; color: #e8e0d0; }
  .ht-range-btn { padding: 3px 10px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.12); background: none; color: #8a7e6a; font-size: 11px; cursor: pointer; transition: all 0.15s; }
  .ht-range-btn.active, .ht-range-btn:hover { background: rgba(124,106,247,0.2); border-color: rgba(124,106,247,0.5); color: #c4b8ff; }
  .ht-stats-select { width: 100%; padding: 6px 10px; margin-bottom: 14px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 8px; color: #e8e0d0; font-size: 12px; outline: none; cursor: pointer; }
  .ht-stats-select option { background: #1c1a22; }
  .ht-stat-cards { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-bottom: 14px; }
  .ht-stat-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; padding: 10px 12px; }
  .ht-stat-label { font-size: 10px; color: #8a7e6a; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.05em; }
  .ht-stat-value { font-size: 22px; font-weight: 700; color: #e8e0d0; line-height: 1; }
  .ht-stat-unit { font-size: 11px; color: #8a7e6a; margin-top: 2px; }
  .ht-stat-card.accent .ht-stat-value { color: #4caf50; }
  .ht-stat-card.fire .ht-stat-value { color: #ff9800; }
  .ht-stats-section { margin-bottom: 16px; }
  .ht-stats-section-title { font-size: 11px; font-weight: 600; color: #8a7e6a; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 8px; }
  .ht-cal-strip { display: flex; gap: 4px; justify-content: space-between; }
  .ht-cal-strip-col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; }
  .ht-cal-strip-col.today .ht-cal-strip-dow { color: #c4b8ff; font-weight: 700; }
  .ht-cal-strip-dow { font-size: 10px; color: #8a7e6a; }
  .ht-cal-strip-circle { width: 32px; height: 32px; border-radius: 50%; background: rgba(255,255,255,0.07); border: 1.5px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 600; color: #8a7e6a; transition: all 0.15s; cursor: pointer; }
  .ht-cal-strip-circle:hover { transform: scale(1.1); background: rgba(255,255,255,0.12); }
  .ht-cal-strip-circle.done:hover { background: rgba(76,175,80,0.4) !important; }
  .ht-cal-strip-circle.done { background: rgba(76,175,80,0.25); border-color: #4caf50; color: #4caf50; }
  .ht-cal-strip-circle.partial { background: rgba(124,106,247,0.15); border-color: rgba(124,106,247,0.4); color: #c4b8ff; }
  .ht-cal-strip-date { font-size: 10px; color: #8a7e6a; }
  .ht-cal-strip-col.today .ht-cal-strip-date { color: #c4b8ff; }
  .ht-cal-month-view { }
  .ht-cal-month-nav { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
  .ht-cal-nav-btn { background: none; border: none; cursor: pointer; color: #8a7e6a; font-size: 18px; padding: 0 6px; border-radius: 4px; line-height: 1; transition: color 0.1s; }
  .ht-cal-nav-btn:hover { color: #e8e0d0; }
  .ht-cal-month-title { font-size: 13px; font-weight: 600; color: #e8e0d0; }
  .ht-cal-dow-row { display: grid; grid-template-columns: repeat(7, 1fr); margin-bottom: 4px; }
  .ht-cal-dow-header { font-size: 10px; color: #8a7e6a; text-align: center; padding: 2px 0; }
  .ht-cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 5px; }
  .ht-cal-day { aspect-ratio: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; border-radius: 50%; background: rgba(255,255,255,0.05); cursor: pointer; position: relative; transition: background 0.15s, transform 0.1s; max-width: 42px; max-height: 42px; margin: 0 auto; width: 100%; }
  .ht-cal-day:hover:not(.empty):not(.out-of-range) { transform: scale(1.08); background: rgba(255,255,255,0.1); }
  .ht-cal-day.clickable-done:hover { background: rgba(76,175,80,0.35) !important; }
  .ht-cal-day.out-of-range { background: rgba(255,255,255,0.02); opacity: 0.4; }
  .ht-cal-day.empty { background: none; }
  .ht-cal-day.done { background: rgba(76,175,80,0.2); border: 1.5px solid rgba(76,175,80,0.5); }
  .ht-cal-day.partial { background: rgba(124,106,247,0.12); border: 1.5px solid rgba(124,106,247,0.3); }
  .ht-cal-day.today { border: 1.5px solid rgba(196,184,255,0.6) !important; }
  .ht-cal-day-num { font-size: 11px; color: #e8e0d0; font-weight: 500; line-height: 1; }
  .ht-cal-day.out-of-range .ht-cal-day-num { color: #8a7e6a; }
  .ht-cal-day.today .ht-cal-day-num { color: #c4b8ff; }
  .ht-cal-day-dot { width: 4px; height: 4px; border-radius: 50%; margin-top: 3px; flex-shrink: 0; }
  .ht-cal-day.done .ht-cal-day-dot { background: #4caf50; }
  .ht-cal-day.partial .ht-cal-day-dot { background: rgba(124,106,247,0.6); }
  .ht-cal-day-dot:empty { display: none; }
  .ht-cal-day-val { font-size: 8px; color: #8a7e6a; line-height: 1; margin-top: 1px; }
  .ht-cal-day.done .ht-cal-day-val { color: #4caf50; }
  .ht-cal-day.partial .ht-cal-day-val { color: rgba(124,106,247,0.8); }
  .ht-barchart-wrap { position: relative; overflow: visible; }
  .ht-barchart { position: relative; height: 72px; display: flex; align-items: flex-end; gap: 2px; overflow: visible; margin-right: 30px; }
  .ht-bar-wrap { flex: 1; display: flex; align-items: flex-end; height: 100%; }
  .ht-bar { width: 100%; border-radius: 2px 2px 0 0; background: rgba(124,106,247,0.6); min-height: 2px; transition: height 0.3s ease; }
  .ht-bar.done { background: rgba(76,175,80,0.7); }
  .ht-bar-wrap { position: relative; }
  .ht-bar-wrap:hover .ht-bar-tooltip { opacity: 1; transform: translateX(-50%) translateY(0); }
  .ht-bar-tooltip { position: absolute; bottom: calc(100% + 4px); left: 50%; transform: translateX(-50%) translateY(4px); background: rgba(28,26,34,0.95); border: 1px solid rgba(255,255,255,0.15); color: #e8e0d0; font-size: 10px; font-weight: 600; padding: 2px 6px; border-radius: 4px; white-space: nowrap; pointer-events: none; opacity: 0; transition: opacity 0.15s, transform 0.15s; z-index: 10; }
  .ht-barchart-labels { display: flex; gap: 2px; margin-top: 3px; }
  .ht-bar-label-wrap { flex: 1; display: flex; justify-content: center; }
  .ht-bar-label { font-size: 8px; color: #8a7e6a; line-height: 1; }
  .ht-target-line { position: absolute; left: 0; right: 0; height: 1px; background: rgba(255,200,0,0.5); pointer-events: none; }
  .ht-target-label { position: absolute; right: -28px; font-size: 8px; color: rgba(255,200,0,0.85); line-height: 1; text-align: left; transform: translateY(-1px); }
  .ht-cat-rate-row { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
  .ht-cat-rate-name { font-size: 12px; color: #e8e0d0; flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .ht-cat-rate-bar-wrap { width: 80px; height: 6px; background: rgba(255,255,255,0.08); border-radius: 3px; flex-shrink: 0; overflow: hidden; }
  .ht-cat-rate-bar { height: 100%; border-radius: 3px; background: #4caf50; transition: width 0.3s; }
  .ht-cat-rate-pct { font-size: 11px; color: #8a7e6a; width: 32px; text-align: right; flex-shrink: 0; }
  .ht-search-wrap { flex:1; display:none; align-items:center; gap:4px; }
  .ht-stats-btn { background: none; border: none; cursor: pointer; color: #8a7e6a; font-size: 14px; padding: 2px 6px; border-radius: 6px; flex-shrink: 0; transition: all 0.15s; line-height: 1; }
  .ht-stats-btn:hover { color: #e8e0d0; background: rgba(255,255,255,0.07); }
  .ht-stats-btn.active { color: #e8e0d0; font-size: 16px; font-weight: 700; background: rgba(255,255,255,0.07); }
  .ht-drag-handle { color: #8a7e6a; font-size: 13px; cursor: grab; padding: 0 4px 0 2px; flex-shrink: 0; opacity: 0.5; transition: opacity 0.1s; user-select: none; line-height: 1; }
  .ht-habit-cb { width:14px;height:14px;flex-shrink:0;cursor:pointer;accent-color:#7c6af7; }
  .ht-habit-item.ht-selected { background:rgba(124,106,247,0.12) !important; border-color:rgba(124,106,247,0.3) !important; }
  .ht-bulk-bar { display:flex;align-items:center;gap:8px;padding:8px 12px; background:rgba(124,106,247,0.15);border:1px solid rgba(124,106,247,0.3); border-radius:8px;margin:4px 0;font-size:12px;color:#c4b8ff; position:sticky;top:0;z-index:2;flex-wrap:wrap; }
  .ht-habit-item:hover .ht-drag-handle, .ht-cat-item:hover .ht-drag-handle { opacity: 1; }
  .ht-drag-handle:active { cursor: grabbing; }
  .ht-habit-item.ht-dragging, .ht-cat-item.ht-dragging { opacity: 0.35; background: rgba(255,255,255,0.08); }
  .ht-habit-item.ht-drag-over, .ht-cat-item.ht-drag-over { border-color: rgba(124,106,247,0.6); background: rgba(124,106,247,0.08); }
`;

// ─── Helpers ─────────────────────────────────────────────────────────────────
function htSleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function htToday() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function htDaysBefore(dateStr, n) {
  const d = new Date(dateStr + 'T12:00:00');
  d.setDate(d.getDate() - n);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function htDaysAfter(dateStr, n) {
  const d = new Date(dateStr + 'T12:00:00');
  d.setDate(d.getDate() + n);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function htMondayOfWeek(dateStr) {
  const d = new Date(dateStr + 'T12:00:00');
  const dow = d.getDay();
  const mondayOffset = (dow + 6) % 7;
  return htDaysBefore(dateStr, mondayOffset);
}

function htEsc(str) {
  return String(str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function htShowToast(message) {
  const t = document.createElement('div');
  t.className = 'ht-toast';
  t.textContent = message;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add('ht-toast-visible'));
  setTimeout(() => {
    t.classList.remove('ht-toast-visible');
    setTimeout(() => t.remove(), 220);
  }, 2200);
}

function htIcon(name, extraClass = '') {
  const n = String(name || '').trim();
  if (!n || !/^[a-z][a-z0-9-]*$/.test(n)) return '';
  const ex = extraClass ? ' ' + extraClass : '';
  return `<i class="ti ti-${n}${ex}" aria-hidden="true"></i>`;
}

const HT_CATEGORY_ICONS = [
  { slug: 'folder', label: 'Folder' }, { slug: 'flame', label: 'Flame' },
  { slug: 'heart', label: 'Heart' }, { slug: 'star', label: 'Star' },
  { slug: 'bolt', label: 'Bolt' }, { slug: 'moon', label: 'Moon' },
  { slug: 'sun', label: 'Sun' }, { slug: 'droplet', label: 'Droplet' },
  { slug: 'coffee', label: 'Coffee' }, { slug: 'book', label: 'Book' },
  { slug: 'barbell', label: 'Barbell' }, { slug: 'music', label: 'Music' },
  { slug: 'bike', label: 'Bike' }, { slug: 'run', label: 'Run' },
  { slug: 'pill', label: 'Pill' }, { slug: 'brush', label: 'Brush' },
  { slug: 'home', label: 'Home' }, { slug: 'briefcase', label: 'Briefcase' },
  { slug: 'plane', label: 'Plane' }, { slug: 'tree', label: 'Tree' },
  { slug: 'leaf', label: 'Leaf' }, { slug: 'apple', label: 'Apple' },
  { slug: 'carrot', label: 'Carrot' }, { slug: 'trophy', label: 'Trophy' },
  { slug: 'puzzle', label: 'Puzzle' }, { slug: 'gift', label: 'Gift' },
  { slug: 'flag', label: 'Flag' }, { slug: 'bookmark', label: 'Bookmark' },
  { slug: 'compass', label: 'Compass' }, { slug: 'brain', label: 'Brain' },
  { slug: 'plant', label: 'Plant' }, { slug: 'dog', label: 'Dog' },
  { slug: 'cat', label: 'Cat' }, { slug: 'tools', label: 'Tools' },
  { slug: 'palette', label: 'Palette' }, { slug: 'users', label: 'People' },
  { slug: 'chart-line', label: 'Chart' }, { slug: 'device-mobile', label: 'Phone' },
  { slug: 'zzz', label: 'Sleep' }, { slug: 'sparkles', label: 'Sparkles' },
  { slug: 'infinity', label: 'Infinity' }, { slug: 'pray', label: 'Pray' },
  { slug: 'mountain', label: 'Mountain' }, { slug: 'beach', label: 'Beach' },
  { slug: 'snowflake', label: 'Snowflake' },
];

function htCategoryGlyphHtml(raw) {
  const s = String(raw ?? '').trim();
  if (!s) return htIcon('folder');
  if (/^[a-z][a-z0-9-]*$/.test(s) && s.length < 48) return htIcon(s);
  return `<span class="ht-emoji-inline">${htEsc(s)}</span>`;
}

function htFillIconSelect(selectEl, currentValue) {
  const cur = String(currentValue ?? '').trim();
  const slugSet = new Set(HT_CATEGORY_ICONS.map(x => x.slug));
  selectEl.innerHTML = '';
  for (const { slug, label } of HT_CATEGORY_ICONS) {
    const o = document.createElement('option');
    o.value = slug; o.textContent = label;
    selectEl.appendChild(o);
  }
  if (cur && !slugSet.has(cur)) {
    const o = document.createElement('option');
    o.value = cur; o.textContent = `Other: ${cur}`;
    selectEl.insertBefore(o, selectEl.firstChild);
  }
  selectEl.value = cur || 'folder';
}

function htBindIconPreview(selectEl, previewEl) {
  const sync = () => { previewEl.innerHTML = htCategoryGlyphHtml(selectEl.value); };
  selectEl.addEventListener('change', sync);
  sync();
}

function htGenId() {
  return Math.random().toString(36).slice(2, 10);
}

// ─── Plugin ───────────────────────────────────────────────────────────────────
class Plugin extends CollectionPlugin {

  async onLoad() {
    this._panelStates = new Map();
    this._eventIds = [];
    this._collapsed = localStorage.getItem('ht_sidebar_collapsed') === 'true';
    this._catCollapsed = JSON.parse(localStorage.getItem('ht_cat_collapsed') || '{}');
    this._config = null;
    this._collection = null;

    this.ui.injectCSS(HT_CSS);

    this._cmdSettings = this.ui.addCommandPaletteCommand({ label: 'HabitTracker: Manage Habits & Categories', icon: 'ti-settings', onSelected: () => this.openSettings() });
    this._cmdRefresh = this.ui.addCommandPaletteCommand({ label: 'HabitTracker: Refresh Panel', icon: 'ti-refresh', onSelected: () => this.refreshAllPanels() });
    this._cmdCleanup = this.ui.addCommandPaletteCommand({ label: 'HabitTracker: Delete empty log records', icon: 'ti-trash', onSelected: () => this._cleanEmptyLogs() });

    await this._loadCollection();
    await this._loadConfig();

    this._eventIds.push(this.events.on('panel.navigated', (ev) => this._onPanelChanged(ev.panel)));
    this._eventIds.push(this.events.on('panel.focused',   (ev) => this._onPanelChanged(ev.panel)));
    this._eventIds.push(this.events.on('panel.closed',    (ev) => this._onPanelClosed(ev.panel)));

    const panel = this.ui.getActivePanel();
    if (panel) this._onPanelChanged(panel);
    setTimeout(() => { const p = this.ui.getActivePanel(); if (p) this._onPanelChanged(p); }, 300);
  }

  onUnload() {
    for (const id of this._eventIds || []) { try { this.events.off(id); } catch(e) {} }
    this._eventIds = [];
    this._cmdSettings?.remove?.();
    this._cmdRefresh?.remove?.();
    this._cmdCleanup?.remove?.();
    for (const [, state] of (this._panelStates || [])) { this._disposeState(state); }
    this._panelStates?.clear?.();
  }

  // ── Collection & Config ──────────────────────────────────────────────────

  _coercePersistHabitPanelState(val) {
    if (val === false || val === 'false' || val === 0 || val === '0') return false;
    if (val === true || val === 'true' || val === 1 || val === '1') return true;
    return undefined;
  }

  _shouldPersistHabitPanelState() {
    const fromPlugin = this._coercePersistHabitPanelState(this.getConfiguration?.()?.custom?.persist_habit_panel_state);
    if (fromPlugin !== undefined) return fromPlugin;
    const fromRecord = this._coercePersistHabitPanelState(this._config?.persist_habit_panel_state);
    if (fromRecord !== undefined) return fromRecord;
    return true;
  }

  _syncSidebarHeaderCollapseUi(state, sidebarRoot) {
    const sidebar = sidebarRoot || state.sidebarEl;
    if (!sidebar) return;
    const collapsed = sidebar.classList.contains('ht-collapsed');
    const header = sidebar.querySelector('.ht-sidebar-header');
    if (!header) return;
    const navs = header.querySelectorAll('.ht-nav-btn');
    const prevBtn = navs[0], nextBtn = navs[1], searchBtn = navs[2];
    const dateEl = sidebar.querySelector('.ht-date-label');
    const statsBtn = sidebar.querySelector('.ht-stats-btn');
    const searchWrap = [...header.children].find(el => el.querySelector?.('.ht-input'));
    const searchOpen = !!(searchWrap && searchWrap.style.display === 'flex');
    const bodyForMode = state.bodyEl || sidebar.querySelector('.ht-sidebar-body');
    const inStats = bodyForMode?.dataset?.mode === 'stats';
    const persist = this._shouldPersistHabitPanelState();
    sidebar.dataset.htHideDayNav = persist ? '1' : '0';

    if (collapsed) {
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
      if (dateEl) dateEl.style.display = 'none';
      if (statsBtn) statsBtn.style.display = 'none';
      if (searchBtn) searchBtn.style.display = 'none';
      if (searchWrap) searchWrap.style.display = 'none';
      return;
    }
    if (statsBtn) statsBtn.style.display = '';
    if (searchBtn) searchBtn.style.display = searchOpen ? 'none' : '';
    if (searchWrap) searchWrap.style.display = searchOpen ? 'flex' : 'none';
    if (inStats) {
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
      if (dateEl) dateEl.style.display = 'none';
      return;
    }
    if (persist) {
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
      if (dateEl) dateEl.style.display = 'none';
      return;
    }
    if (dateEl) dateEl.style.display = '';
    if (prevBtn) prevBtn.style.display = '';
    if (nextBtn) nextBtn.style.display = '';
  }

  _setHabitPanelCollapsed(collapsed) {
    this._collapsed = !!collapsed;
    localStorage.setItem('ht_sidebar_collapsed', String(this._collapsed));
    for (const st of (this._panelStates || new Map()).values()) {
      if (!st.sidebarEl) continue;
      st.sidebarEl.classList.toggle('ht-collapsed', this._collapsed);
      const btn = st.sidebarEl.querySelector('.ht-toggle-btn');
      if (btn) { btn.innerHTML = this._collapsed ? htIcon('chevron-down') : htIcon('chevron-up'); btn.title = this._collapsed ? 'Expand habits' : 'Collapse habits'; }
      this._syncSidebarHeaderCollapseUi(st);
    }
  }

  _exitStatsMode(state) {
    const body = state.bodyEl, sidebar = state.sidebarEl;
    if (!body || !sidebar || body.dataset.mode !== 'stats') return;
    body.dataset.mode = 'habits';
    const statsBtn = sidebar.querySelector('.ht-stats-btn');
    if (statsBtn) { statsBtn.innerHTML = htIcon('chart-bar'); statsBtn.title = 'View stats'; statsBtn.classList.remove('active'); }
    this._syncSidebarHeaderCollapseUi(state);
    void this._renderSidebar(state);
  }

  _resetHabitPanelForJournalDateChange(state) {
    state._searchQuery = '';
    this._exitStatsMode(state);
    this._setHabitPanelCollapsed(true);
  }

  async _loadCollection() {
    try {
      const collections = await this.data.getAllCollections();
      this._collection = collections.find(c => c.getName() === 'HabitTracker');
      if (!this._collection) console.warn('[HabitTracker] Collection not found');
    } catch(e) { console.error('[HabitTracker] Error loading collection:', e); }
  }

  async _loadConfig() {
    if (!this._collection) return;
    try {
      const records = await this._collection.getAllRecords();
      const configRecord = records.find(r => r.getName() === '__config__');
      if (configRecord) {
        const raw = configRecord.prop('data')?.get?.() || configRecord.text?.('data') || '';
        if (raw) this._config = JSON.parse(raw);
      }
      if (!this._config) this._config = { categories: [], habits: [] };
    } catch(e) { console.error('[HabitTracker] Error loading config:', e); this._config = { categories: [], habits: [] }; }
  }

  async _saveConfig() {
    if (!this._collection) return;
    try {
      const records = await this._collection.getAllRecords();
      let configRecord = records.find(r => r.getName() === '__config__');
      if (!configRecord) {
        const guid = this._collection.createRecord('__config__');
        await htSleep(200);
        const updated = await this._collection.getAllRecords();
        configRecord = updated.find(r => r.guid === guid);
      }
      if (configRecord) {
        const typeProp = configRecord.prop('record_type');
        if (typeProp) typeProp.set('config');
        const dataProp = configRecord.prop('data');
        if (dataProp) dataProp.set(JSON.stringify(this._config));
      }
    } catch(e) { console.error('[HabitTracker] Error saving config:', e); }
  }

  _readDataProp(r) {
    return r.text?.('data') || r.prop('data')?.text?.() || r.prop('data')?.get?.() || '';
  }

  _readNotesProp(r) {
    if (!r) return '';
    const t = r.text?.('notes') || r.prop?.('notes')?.text?.() || r.prop?.('notes')?.get?.();
    return t == null ? '' : String(t);
  }

  _writeNotesProp(rec, text) {
    if (!rec) return;
    try { rec.prop?.('notes')?.set?.(text == null ? '' : String(text)); } catch(e) {}
  }

  async _loadLog(dateStr) {
    const empty = () => ({ date: dateStr, completions: {}, categoryDone: {}, notes: '' });
    if (!this._collection) return empty();
    try {
      const records = await this._collection.getAllRecords();
      const logRecords = records.filter(r => r.getName() === `log-${dateStr}`);
      if (logRecords.length === 0) return empty();
      const merged = empty();
      for (const r of logRecords) {
        const raw = this._readDataProp(r);
        if (raw) {
          try {
            const d = JSON.parse(raw);
            Object.assign(merged.completions, d.completions || {});
            Object.assign(merged.categoryDone, d.categoryDone || {});
            if (d.notes != null && String(d.notes) !== '') merged.notes = String(d.notes);
          } catch(e) {}
        }
        const propNotes = this._readNotesProp(r);
        if (propNotes) merged.notes = propNotes;
      }
      return merged;
    } catch(e) {}
    return empty();
  }

  _buildLogsByDateMap(records) {
    const logsByDate = new Map();
    for (const r of records) {
      const name = r.getName() || '';
      if (!name.startsWith('log-')) continue;
      const raw = this._readDataProp(r);
      if (!raw) continue;
      let data;
      try { data = JSON.parse(raw); } catch(e) { continue; }
      if (!data.date) continue;
      const key = data.date;
      if (!logsByDate.has(key)) logsByDate.set(key, { completions: {}, categoryDone: {}, notes: '' });
      const ex = logsByDate.get(key);
      Object.assign(ex.completions, data.completions || {});
      Object.assign(ex.categoryDone, data.categoryDone || {});
      if (data.notes != null && String(data.notes) !== '') ex.notes = String(data.notes);
      const propNotes = this._readNotesProp(r);
      if (propNotes) ex.notes = propNotes;
    }
    return logsByDate;
  }

  _getLogForDateFromMap(logsByDate, dateStr) {
    const empty = () => ({ date: dateStr, completions: {}, categoryDone: {}, notes: '' });
    const e = logsByDate.get(dateStr);
    if (!e) return empty();
    return { date: dateStr, completions: { ...e.completions }, categoryDone: { ...e.categoryDone }, notes: e.notes || '' };
  }

  _categoryStreakFromMap(catId, refDate, logsByDate, cat) {
    let streak = 0, d = htDaysBefore(refDate || htToday(), 1);
    for (let i = 0; i < 3650; i++) {
      const log = logsByDate.get(d);
      if (log && log.categoryDone && log.categoryDone[catId]) { streak++; d = htDaysBefore(d, 1); }
      else if (cat?.seedDate && d >= cat.seedDate && !log) { streak++; d = htDaysBefore(d, 1); }
      else break;
    }
    return streak;
  }

  _habitStreakFromMap(habitId, refDate, logsByDate, habit) {
    let streak = 0, d = htDaysBefore(refDate || htToday(), 1);
    for (let i = 0; i < 3650; i++) {
      const log = logsByDate.get(d);
      if (log && log.completions && log.completions[habitId]) { streak++; d = htDaysBefore(d, 1); }
      else if (habit?.seedDate && d >= habit.seedDate && !log) { streak++; d = htDaysBefore(d, 1); }
      else break;
    }
    return streak;
  }

  async _saveLog(dateStr, logData) {
    if (!this._collection) return;
    try {
      const records = await this._collection.getAllRecords();
      if (logData.notes == null) logData.notes = '';
      const json = JSON.stringify(logData);
      const notesStr = String(logData.notes);
      const allForDate = records.filter(r => r.getName() === `log-${dateStr}`);
      for (const r of allForDate) {
        const raw = this._readDataProp(r);
        if (raw) { r.prop('data')?.set(json); this._writeNotesProp(r, notesStr); return; }
      }
      const guid = this._collection.createRecord(`log-${dateStr}`);
      await htSleep(200);
      const updated = await this._collection.getAllRecords();
      const newRec = updated.find(r => r.guid === guid);
      if (!newRec) { console.warn('[HT] saveLog: record not found', dateStr); return; }
      try { newRec.prop('record_type')?.setChoice('Log'); } catch(e) {}
      newRec.prop('data')?.set(json);
      this._writeNotesProp(newRec, notesStr);
    } catch(e) { console.error('[HabitTracker] Error saving log:', e); }
  }

  // ── Panel mounting ───────────────────────────────────────────────────────

  _onPanelChanged(panel) {
    const panelId = panel?.getId?.();
    if (!panelId) return;
    const panelEl = panel?.getElement?.();
    if (!panelEl) return;
    const nav = panel?.getNavigation?.();
    const navType = nav?.type || '';
    if (navType === 'custom' || navType === 'custom_panel') return;
    const record = panel?.getActiveRecord?.();
    if (!record) return;
    const journalDetails = record.getJournalDetails?.();
    if (!journalDetails) return;

    let journalDateStr = htToday();
    const recordGuid = record.guid || '';
    const dateMatch = recordGuid.match(/(\d{4})(\d{2})(\d{2})$/);
    if (dateMatch) journalDateStr = `${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}`;

    let state = this._panelStates.get(panelId);
    if (!state) {
      state = { panelId, panel, sidebarEl: null, bodyEl: null, observer: null, dateStr: journalDateStr, isJournalPanel: true, renderTimer: null };
      this._panelStates.set(panelId, state);
    } else {
      const prevDateStr = state.dateStr;
      state.dateStr = journalDateStr;
      state.isJournalPanel = true;
      if (prevDateStr !== journalDateStr && !this._shouldPersistHabitPanelState()) {
        this._resetHabitPanelForJournalDateChange(state);
      }
    }

    this._mountSidebar(panel, state);
    if (state.bodyEl?.dataset?.mode !== 'stats') {
      if (state.renderTimer) clearTimeout(state.renderTimer);
      state.renderTimer = setTimeout(() => { state.renderTimer = null; this._renderSidebar(state); }, 50);
    }
  }

  _onPanelClosed(panel) {
    const panelId = panel?.getId?.();
    if (!panelId) return;
    const state = this._panelStates.get(panelId);
    if (state) this._disposeState(state);
    this._panelStates.delete(panelId);
  }

  _disposeState(state) {
    if (state.renderTimer) clearTimeout(state.renderTimer);
    state.renderTimer = null;
    state.observer?.disconnect?.();
    state.observer = null;
    try { state.sidebarEl?.remove?.(); } catch(e) {}
    state.sidebarEl = null;
    state.bodyEl = null;
  }

  _mountSidebar(panel, state) {
    const panelEl = panel?.getElement?.();
    if (!panelEl) return;
    const container = this._findContainer(panelEl);
    if (!container) return;
    container.querySelectorAll('.ht-sidebar').forEach(el => { if (el !== state.sidebarEl) el.remove(); });
    if (!state.sidebarEl || !state.sidebarEl.isConnected) {
      state.sidebarEl?.remove?.();
      state.sidebarEl = this._buildSidebarShell(state);
      state.bodyEl = state.sidebarEl.querySelector('.ht-sidebar-body');
      this._syncSidebarHeaderCollapseUi(state);
    }
    const firstChild = container.firstChild;
    if (firstChild !== state.sidebarEl) container.insertBefore(state.sidebarEl, firstChild);
    if (!state.observer) {
      state.observer = new MutationObserver(() => {
        if (!state.sidebarEl || state.sidebarEl.isConnected) return;
        if (state._remountScheduled) return;
        state._remountScheduled = true;
        setTimeout(() => {
          state._remountScheduled = false;
          if (state.sidebarEl?.isConnected) return;
          this._mountSidebar(panel, state);
          if (state.bodyEl?.dataset?.mode !== 'stats') this._renderSidebar(state);
        }, 80);
      });
      state.observer.observe(container, { childList: true });
    }
  }

  _findContainer(panelEl) {
    if (!panelEl) return null;
    for (const sel of ['.page-content', '.editor-wrapper', '.editor-panel', '#editor']) {
      if (panelEl.matches?.(sel)) return panelEl;
      const child = panelEl.querySelector?.(sel);
      if (child) return child;
    }
    return null;
  }

  _buildSidebarShell(state) {
    if (!state.dateStr) state.dateStr = htToday();
    const sidebar = document.createElement('div');
    sidebar.className = 'ht-sidebar' + (this._collapsed ? ' ht-collapsed' : '');
    const header = document.createElement('div');
    header.className = 'ht-sidebar-header';

    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'ht-toggle-btn';
    toggleBtn.title = this._collapsed ? 'Expand habits' : 'Collapse habits';
    toggleBtn.innerHTML = this._collapsed ? htIcon('chevron-down') : htIcon('chevron-up');
    toggleBtn.addEventListener('click', () => this._toggleCollapse());

    const titleEl = document.createElement('span');
    titleEl.className = 'ht-sidebar-title';
    titleEl.innerHTML = `${htIcon('flame')} Habits`;

    const prevBtn = document.createElement('button');
    prevBtn.className = 'ht-nav-btn ht-day-nav-prev';
    prevBtn.innerHTML = htIcon('chevron-left');
    prevBtn.title = 'Previous day';

    const dateEl = document.createElement('span');
    dateEl.className = 'ht-date-label';

    const nextBtn = document.createElement('button');
    nextBtn.className = 'ht-nav-btn ht-day-nav-next';
    nextBtn.innerHTML = htIcon('chevron-right');
    nextBtn.title = 'Next day';

    const updateDateDisplay = () => {
      const isToday = state.dateStr === htToday();
      const d = new Date(state.dateStr + 'T12:00:00');
      if (isToday) { dateEl.textContent = 'Today'; dateEl.style.color = '#e8e0d0'; }
      else { dateEl.textContent = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }); dateEl.style.color = '#c4a882'; }
      nextBtn.style.opacity = isToday ? '0.25' : '1';
      nextBtn.style.pointerEvents = isToday ? 'none' : '';
    };

    prevBtn.addEventListener('click', () => { state.dateStr = htDaysBefore(state.dateStr, 1); updateDateDisplay(); this._renderSidebar(state); });
    nextBtn.addEventListener('click', () => { if (state.dateStr >= htToday()) return; state.dateStr = htDaysAfter(state.dateStr, 1); updateDateDisplay(); this._renderSidebar(state); });
    updateDateDisplay();

    const statsBtn = document.createElement('button');
    statsBtn.className = 'ht-stats-btn';
    statsBtn.innerHTML = htIcon('chart-bar');
    statsBtn.title = 'View stats';

    const enterStats = () => {
      body.dataset.mode = 'stats';
      statsBtn.innerHTML = htIcon('arrow-left'); statsBtn.title = 'Back to habits'; statsBtn.classList.add('active');
      this._syncSidebarHeaderCollapseUi(state);
      this._renderStats(state, body);
    };
    const exitStats = () => {
      body.dataset.mode = 'habits';
      statsBtn.innerHTML = htIcon('chart-bar'); statsBtn.title = 'View stats'; statsBtn.classList.remove('active');
      void this._renderSidebar(state).then(() => this._syncSidebarHeaderCollapseUi(state));
    };
    statsBtn.addEventListener('click', () => { if (body.dataset.mode === 'stats') exitStats(); else enterStats(); });

    const searchBtn = document.createElement('button');
    searchBtn.className = 'ht-nav-btn'; searchBtn.innerHTML = htIcon('search'); searchBtn.title = 'Search habits'; searchBtn.style.fontSize = '12px';

    const searchWrap = document.createElement('div');
    searchWrap.style.cssText = 'display:none;flex:1;align-items:center;gap:4px;';
    const searchInput = document.createElement('input');
    searchInput.className = 'ht-input'; searchInput.placeholder = 'Search habits…';
    searchInput.style.cssText = 'flex:1;height:22px;font-size:11px;padding:2px 6px;';
    const searchClose = document.createElement('button');
    searchClose.className = 'ht-nav-btn'; searchClose.innerHTML = htIcon('x'); searchClose.style.fontSize = '10px';
    searchWrap.appendChild(searchInput); searchWrap.appendChild(searchClose);

    let searchOpen = false;
    const openSearch = () => { searchOpen = true; searchWrap.style.display = 'flex'; searchBtn.style.display = 'none'; searchInput.value = ''; searchInput.focus(); state._searchQuery = ''; void this._renderSidebar(state).then(() => this._syncSidebarHeaderCollapseUi(state)); };
    const closeSearch = () => { searchOpen = false; searchWrap.style.display = 'none'; searchBtn.style.display = ''; state._searchQuery = ''; void this._renderSidebar(state).then(() => this._syncSidebarHeaderCollapseUi(state)); };
    searchBtn.addEventListener('click', openSearch);
    searchClose.addEventListener('click', closeSearch);
    let searchDebounce = null;
    searchInput.addEventListener('input', () => {
      state._searchQuery = searchInput.value.trim().toLowerCase();
      clearTimeout(searchDebounce);
      if (!state._searchQuery) this._renderSidebar(state);
      else searchDebounce = setTimeout(() => this._renderSidebar(state), 120);
    });
    searchInput.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSearch(); });

    header.appendChild(toggleBtn); header.appendChild(titleEl);
    header.appendChild(prevBtn); header.appendChild(dateEl); header.appendChild(nextBtn);
    header.appendChild(statsBtn); header.appendChild(searchBtn); header.appendChild(searchWrap);

    const body = document.createElement('div');
    body.className = 'ht-sidebar-body';
    sidebar.appendChild(header); sidebar.appendChild(body);
    this._syncSidebarHeaderCollapseUi(state, sidebar);
    return sidebar;
  }

  _toggleCollapse() {
    this._collapsed = !this._collapsed;
    localStorage.setItem('ht_sidebar_collapsed', String(this._collapsed));
    for (const [, state] of (this._panelStates || [])) {
      if (!state.sidebarEl) continue;
      state.sidebarEl.classList.toggle('ht-collapsed', this._collapsed);
      const btn = state.sidebarEl.querySelector('.ht-toggle-btn');
      if (btn) { btn.innerHTML = this._collapsed ? htIcon('chevron-down') : htIcon('chevron-up'); btn.title = this._collapsed ? 'Expand habits' : 'Collapse habits'; }
      this._syncSidebarHeaderCollapseUi(state);
    }
  }

  // ── Render sidebar ───────────────────────────────────────────────────────

  _inStatsMode(state) { return state.bodyEl?.dataset?.mode === 'stats'; }

  _getStatsRangeDays(state) {
    const stored = parseInt(localStorage.getItem('ht_stats_range'), 10);
    if (stored === 7 || stored === 30) return stored;
    const mem = state.statsRange === 90 ? 30 : state.statsRange;
    if (mem === 7 || mem === 30) return mem;
    return this._collapsed ? 30 : 7;
  }

  _persistStatsRangeDays(state, days) {
    state.statsRange = days;
    localStorage.setItem('ht_stats_range', String(days));
  }

  _renderNotesSection(body, log, dateStr, state, token) {
    const stale = () => state._renderToken !== token || this._inStatsMode(state);
    body.querySelector('.ht-notes-wrap')?.remove();
    const wrap = document.createElement('div');
    wrap.className = 'ht-notes-wrap';
    const label = document.createElement('div');
    label.className = 'ht-notes-label'; label.textContent = 'Notes';
    const ta = document.createElement('textarea');
    ta.className = 'ht-notes-input'; ta.rows = 2; ta.placeholder = 'Notes for this day…';
    ta.value = log.notes || ''; ta.setAttribute('spellcheck', 'true');
    const flush = async () => {
      if (stale()) return;
      clearTimeout(state._notesSaveTimer);
      const text = ta.value;
      const fresh = await this._loadLog(dateStr);
      if (stale()) return;
      fresh.notes = text;
      await this._saveLog(dateStr, fresh);
    };
    ta.addEventListener('input', () => { clearTimeout(state._notesSaveTimer); state._notesSaveTimer = setTimeout(() => { void flush(); }, 450); });
    ta.addEventListener('blur', () => { void flush(); });
    wrap.appendChild(label); wrap.appendChild(ta); body.appendChild(wrap);
  }

  async _renderSidebar(state) {
    const body = state.bodyEl;
    if (!body || this._inStatsMode(state)) return;
    const token = (state._renderToken || 0) + 1;
    state._renderToken = token;
    const stale = () => state._renderToken !== token || this._inStatsMode(state);
    const config = this._config;

    if (!config || config.categories.length === 0) {
      if (stale()) return;
      const dateStrEmpty = state.dateStr || htToday();
      const recordsEmpty = this._collection ? await this._collection.getAllRecords() : [];
      if (stale()) return;
      const logEmpty = this._getLogForDateFromMap(this._buildLogsByDateMap(recordsEmpty), dateStrEmpty);
      body.innerHTML = '';
      const emptyDiv = document.createElement('div');
      emptyDiv.className = 'ht-empty';
      emptyDiv.innerHTML = `<div class="ht-empty-icon">${htIcon('plant')}</div><div>No habits yet.</div><div style="margin-top:4px;font-size:11px;">Open settings to add categories and habits.</div><button class="ht-setup-btn" data-action="open-settings">Set up habits</button>`;
      emptyDiv.querySelector('[data-action="open-settings"]')?.addEventListener('click', () => this.openSettings());
      body.appendChild(emptyDiv);
      this._renderNotesSection(body, logEmpty, dateStrEmpty, state, token);
      this._syncSidebarHeaderCollapseUi(state);
      return;
    }

    const dateStr = state.dateStr || htToday();
    const records = this._collection ? await this._collection.getAllRecords() : [];
    if (stale()) return;
    const logsByDate = this._buildLogsByDateMap(records);
    const log = this._getLogForDateFromMap(logsByDate, dateStr);

    const allHabits = config.habits.filter(h => !h.archived);
    const doneCount = allHabits.filter(h => { const v = log.completions[h.id]; if (!v) return false; if ((h.target||0) > 0) return typeof v === 'number' ? v >= h.target : false; return true; }).length;
    const pct = allHabits.length > 0 ? Math.round((doneCount / allHabits.length) * 100) : 0;

    if (body.querySelector('.ht-stats-view')) body.innerHTML = '';
    let progressWrap = body.querySelector('.ht-progress');
    if (!progressWrap) {
      progressWrap = document.createElement('div');
      progressWrap.className = 'ht-progress';
      progressWrap.innerHTML = `<div class="ht-progress-fill" style="width:${pct}%"></div>`;
      body.insertBefore(progressWrap, body.firstChild);
    } else {
      const fill = progressWrap.querySelector('.ht-progress-fill');
      if (fill) fill.style.width = pct + '%';
    }

    const fragment = document.createDocumentFragment();
    const sortedCats = [...config.categories].sort((a,b) => (a.order||0)-(b.order||0));
    for (const cat of sortedCats) {
      const habitsInCat = config.habits.filter(h => h.categoryId === cat.id && !h.archived).sort((a,b) => (a.order||0)-(b.order||0));
      const query = state._searchQuery || '';
      const visibleHabits = query ? habitsInCat.filter(h => h.name.toLowerCase().includes(query)) : habitsInCat;
      if (visibleHabits.length === 0) continue;

      const anyDone = habitsInCat.some(h => { const v = log.completions[h.id]; if (!v) return false; if ((h.target||0) > 0) return typeof v === 'number' ? v >= h.target : false; return true; });
      const streak = this._categoryStreakFromMap(cat.id, undefined, logsByDate, cat);
      const isOpen = !this._catCollapsed[cat.id];

      const catEl = document.createElement('div');
      catEl.className = 'ht-category';
      const catHeader = document.createElement('div');
      catHeader.className = 'ht-category-header';
      catHeader.innerHTML = `
        <span class="ht-category-caret ${isOpen ? 'open' : ''}">${htIcon('chevron-right')}</span>
        <span class="ht-category-emoji">${htCategoryGlyphHtml(cat.emoji)}</span>
        <span class="ht-category-name">${htEsc(cat.name)}</span>
        <span class="ht-category-status ${anyDone ? 'ht-cat-done' : 'ht-cat-pending'}">${anyDone ? htIcon('circle-check') : htIcon('circle')}</span>
        ${streak > 0 ? `<span class="ht-streak-badge">${htIcon('flame')}${streak}d</span>` : ''}
      `;
      catHeader.addEventListener('click', () => this._toggleCategory(cat.id, state));

      const habitsEl = document.createElement('div');
      habitsEl.className = 'ht-category-habits' + ((isOpen || query) ? '' : ' ht-hidden');
      habitsEl.dataset.catId = cat.id;

      for (const habit of visibleHabits) {
        const rawVal = log.completions[habit.id];
        const hasTarget = (habit.target || 0) > 0;
        const currentVal = typeof rawVal === 'number' ? rawVal : (rawVal ? 1 : 0);
        const isDone = hasTarget ? currentVal >= habit.target : !!rawVal;
        const hStreak = this._habitStreakFromMap(habit.id, undefined, logsByDate, habit);

        const habitEl = document.createElement('div');
        habitEl.className = 'ht-habit' + (isDone ? ' ht-done' : '');
        habitEl.dataset.habitId = habit.id;

        let indicatorHTML = '';
        if (hasTarget) {
          const r = 8, circ = 2 * Math.PI * r, dash = circ * Math.min(1, currentVal / habit.target);
          const lbl = currentVal >= habit.target ? htIcon('check') : `${currentVal}`;
          indicatorHTML = `<div class="ht-habit-ring"><svg width="22" height="22" viewBox="0 0 22 22"><circle class="ht-habit-ring-bg" cx="11" cy="11" r="${r}"/><circle class="ht-habit-ring-fill" cx="11" cy="11" r="${r}" stroke-dasharray="${circ}" stroke-dashoffset="${circ - dash}"/></svg><div class="ht-habit-ring-label">${lbl}</div></div>`;
        } else {
          indicatorHTML = `<div class="ht-habit-check">${isDone ? htIcon('check') : ''}</div>`;
        }

        const unitLabel = habit.unit ? htEsc(habit.unit) : '';
        const targetLabel = hasTarget ? `<span style="font-size:10px;color:#8a7e6a;margin-left:2px;">${currentVal}/${habit.target}${unitLabel ? ' ' + unitLabel : ''}</span>` : '';
        const streakHTML = hStreak > 0 ? `<span class="ht-habit-streak ${hStreak >= 7 ? 'hot' : ''}">${htIcon('flame')}${hStreak}d</span>` : '';
        habitEl.innerHTML = `${indicatorHTML}<span class="ht-habit-name">${htEsc(habit.name)}${targetLabel}</span>${streakHTML}`;

        let longPressTimer = null, didLongPress = false, pressStartX = 0, pressStartY = 0, pressDownTime = 0;
        const startPress = (e) => { didLongPress = false; pressDownTime = Date.now(); pressStartX = e.clientX || e.touches?.[0]?.clientX || 0; pressStartY = e.clientY || e.touches?.[0]?.clientY || 0; if (hasTarget) { longPressTimer = setTimeout(() => { didLongPress = true; clearTimeout(longPressTimer); this._showNumericInput(habitEl, habit, cat.id, log, dateStr, state); }, 800); } };
        const cancelPress = () => { clearTimeout(longPressTimer); longPressTimer = null; };
        const checkMove = (e) => { const x = e.clientX || e.touches?.[0]?.clientX || 0, y = e.clientY || e.touches?.[0]?.clientY || 0; if (Math.abs(x - pressStartX) > (e.touches ? 12 : 8) || Math.abs(y - pressStartY) > (e.touches ? 12 : 8)) cancelPress(); };
        habitEl.addEventListener('mousedown', startPress);
        habitEl.addEventListener('touchstart', startPress, { passive: true });
        habitEl.addEventListener('mousemove', checkMove);
        habitEl.addEventListener('touchmove', checkMove, { passive: true });
        habitEl.addEventListener('mouseup', () => { if (Date.now() - pressDownTime < 600) cancelPress(); });
        habitEl.addEventListener('mouseleave', cancelPress);
        habitEl.addEventListener('touchend', (e) => { if (didLongPress) e.preventDefault(); if (Date.now() - pressDownTime < 600) cancelPress(); }, { passive: false });
        habitEl.addEventListener('click', (e) => { if (didLongPress) { didLongPress = false; return; } if (habitEl.querySelector('.ht-num-input')) return; this._tapHabit(habit, cat.id, log, dateStr, state, habitEl, isDone); });
        habitsEl.appendChild(habitEl);
      }

      catEl.appendChild(catHeader); catEl.appendChild(habitsEl); fragment.appendChild(catEl);
    }

    if (stale()) return;
    let catsWrap = body.querySelector('.ht-sidebar-cats');
    if (!catsWrap) { catsWrap = document.createElement('div'); catsWrap.className = 'ht-sidebar-cats'; body.appendChild(catsWrap); }
    catsWrap.replaceChildren(fragment);
    this._renderNotesSection(body, log, dateStr, state, token);
    this._syncSidebarHeaderCollapseUi(state);
  }

  _toggleCategory(catId, state) {
    this._catCollapsed[catId] = !this._catCollapsed[catId];
    localStorage.setItem('ht_cat_collapsed', JSON.stringify(this._catCollapsed));
    const body = state.bodyEl;
    if (!body) return;
    const habitsEl = body.querySelector(`[data-cat-id="${catId}"]`);
    const catHeader = habitsEl?.previousElementSibling;
    const caret = catHeader?.querySelector('.ht-category-caret');
    const isOpen = !this._catCollapsed[catId];
    habitsEl?.classList.toggle('ht-hidden', !isOpen);
    caret?.classList.toggle('open', isOpen);
  }

  async _tapHabit(habit, catId, log, dateStr, state, habitEl, wasDone) {
    const freshLog = await this._loadLog(dateStr);
    log = freshLog;
    const hasTarget = (habit.target || 0) > 0;
    const currentVal = typeof log.completions[habit.id] === 'number' ? log.completions[habit.id] : (log.completions[habit.id] ? 1 : 0);
    let newVal, nowDone = false;

    if (hasTarget) {
      if (currentVal >= habit.target) { newVal = 0; nowDone = false; }
      else { newVal = currentVal + 1; nowDone = newVal >= habit.target; if (nowDone) this._celebrate(habitEl); }
      log.completions[habit.id] = newVal > 0 ? newVal : undefined;
      if (newVal === 0) delete log.completions[habit.id];
    } else {
      if (log.completions[habit.id]) { delete log.completions[habit.id]; nowDone = false; }
      else { log.completions[habit.id] = true; nowDone = true; this._celebrate(habitEl); }
    }

    const habitsInCat = (this._config?.habits || []).filter(h => h.categoryId === catId && !h.archived);
    const anyDone = habitsInCat.some(h => { const v = log.completions[h.id]; if (!v) return false; if (h.target > 0) return typeof v === 'number' ? v >= h.target : false; return true; });
    if (anyDone) log.categoryDone[catId] = true; else delete log.categoryDone[catId];
    await this._saveLog(dateStr, log);
    await this._patchHabitEl(habitEl, habit, log, dateStr, catId, state);
  }

  async _patchHabitEl(habitEl, habit, log, dateStr, catId, state) {
    if (!habitEl || !habitEl.isConnected) { await this._renderSidebar(state); return; }
    const hasTarget = (habit.target || 0) > 0;
    const rawVal = log.completions[habit.id];
    const currentVal = typeof rawVal === 'number' ? rawVal : (rawVal ? 1 : 0);
    const isDone = hasTarget ? currentVal >= habit.target : !!rawVal;
    habitEl.classList.toggle('ht-done', isDone);
    if (hasTarget) {
      const r = 8, circ = 2 * Math.PI * r;
      const fill = habitEl.querySelector('.ht-habit-ring-fill');
      const label = habitEl.querySelector('.ht-habit-ring-label');
      if (fill) fill.style.strokeDashoffset = circ - circ * Math.min(1, currentVal / habit.target);
      if (label) label.innerHTML = isDone ? htIcon('check') : String(currentVal);
      const nameEl = habitEl.querySelector('.ht-habit-name');
      if (nameEl) { const existing = nameEl.querySelector('span'); if (existing) existing.textContent = `${currentVal}/${habit.target}${habit.unit ? ' ' + habit.unit : ''}`; }
    } else {
      const check = habitEl.querySelector('.ht-habit-check');
      if (check) check.innerHTML = isDone ? htIcon('check') : '';
    }
    const habitsEl = habitEl.closest('.ht-category-habits');
    const catHeader = habitsEl?.previousElementSibling;
    if (catHeader) {
      const statusEl = catHeader.querySelector('.ht-category-status');
      const catDone = !!(log.categoryDone[catId]);
      if (statusEl) { statusEl.className = `ht-category-status ${catDone ? 'ht-cat-done' : 'ht-cat-pending'}`; statusEl.innerHTML = catDone ? htIcon('circle-check') : htIcon('circle'); }
    }
    const body = state.bodyEl;
    if (body) {
      const allHabits = (this._config?.habits || []).filter(h => !h.archived);
      const doneCount = allHabits.filter(h => { const v = log.completions[h.id]; if (!v) return false; if ((h.target||0) > 0) return typeof v === 'number' ? v >= h.target : false; return true; }).length;
      const pct = allHabits.length > 0 ? Math.round((doneCount / allHabits.length) * 100) : 0;
      const fill = body.querySelector('.ht-progress-fill');
      if (fill) fill.style.width = pct + '%';
    }
  }

  async _showNumericInput(habitEl, habit, catId, log, dateStr, state) {
    if (habitEl.querySelector('.ht-num-input')) return;
    const nameEl = habitEl.querySelector('.ht-habit-name');
    if (!nameEl) return;
    const freshLog = await this._loadLog(dateStr);
    log = freshLog;
    const currentVal = typeof log.completions[habit.id] === 'number' ? log.completions[habit.id] : 0;
    const wrap = document.createElement('span');
    wrap.style.cssText = 'display:inline-flex;align-items:center;gap:3px;margin-left:6px;';
    const input = document.createElement('input');
    input.type = 'number'; input.className = 'ht-num-input'; input.value = currentVal; input.min = 0; input.max = 9999;
    const okBtn = document.createElement('button');
    okBtn.className = 'ht-num-btn'; okBtn.innerHTML = htIcon('check');
    okBtn.style.background = 'rgba(76,175,80,0.2)'; okBtn.style.borderColor = '#4caf50'; okBtn.style.color = '#4caf50';
    const commit = async () => {
      wrap.remove();
      const newVal = Math.max(0, parseInt(input.value) || 0);
      if (newVal === 0) delete log.completions[habit.id]; else log.completions[habit.id] = newVal;
      if (newVal >= habit.target) this._celebrate(habitEl);
      const habitsInCat = (this._config?.habits || []).filter(h => h.categoryId === catId && !h.archived);
      const anyDone = habitsInCat.some(h => { const v = log.completions[h.id]; if (!v) return false; if (h.target > 0) return typeof v === 'number' ? v >= h.target : false; return true; });
      if (anyDone) log.categoryDone[catId] = true; else delete log.categoryDone[catId];
      await this._saveLog(dateStr, log);
      await this._patchHabitEl(habitEl, habit, log, dateStr, catId, state);
    };
    okBtn.addEventListener('click', (e) => { e.stopPropagation(); commit(); });
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') commit(); if (e.key === 'Escape') wrap.remove(); e.stopPropagation(); });
    input.addEventListener('click', (e) => e.stopPropagation());
    wrap.appendChild(input); wrap.appendChild(okBtn); nameEl.appendChild(wrap);
    input.focus(); input.select();
  }

  _celebrate(el) {
    if (!el) return;
    el.classList.remove('ht-celebrating');
    void el.offsetWidth;
    el.classList.add('ht-celebrating');
    const colors = ['#4caf50','#8bc34a','#c6ff00','#ffeb3b','#ff9800'];
    const rect = el.getBoundingClientRect();
    const parentRect = el.offsetParent?.getBoundingClientRect() || rect;
    for (let i = 0; i < 7; i++) {
      const p = document.createElement('div');
      p.className = 'ht-particle';
      const angle = (i / 7) * 2 * Math.PI, dist = 18 + Math.random() * 12;
      p.style.setProperty('--tx', `${Math.cos(angle) * dist}px`);
      p.style.setProperty('--ty', `${Math.sin(angle) * dist}px`);
      p.style.background = colors[i % colors.length];
      p.style.left = `${rect.left - parentRect.left + rect.width / 2 - 2.5}px`;
      p.style.top = `${rect.top - parentRect.top + rect.height / 2 - 2.5}px`;
      el.offsetParent?.appendChild(p);
      setTimeout(() => p.remove(), 520);
    }
    setTimeout(() => el.classList.remove('ht-celebrating'), 400);
  }

  // ── Stats View ─────────────────────────────────────────────────────────

  async _renderStats(state, body) {
    body.dataset.mode = 'stats';
    body.innerHTML = '';
    const wrap = document.createElement('div');
    wrap.className = 'ht-stats-view';
    body.appendChild(wrap);

    const config = this._config || { categories: [], habits: [] };
    let rangeDays = this._getStatsRangeDays(state);
    const storedRangeOk = (() => { const s = parseInt(localStorage.getItem('ht_stats_range'), 10); return s === 7 || s === 30; })();
    if (!storedRangeOk) this._persistStatsRangeDays(state, rangeDays);
    let selectedId = state.statsSelected || '__overall__';

    // Week offset for 7d navigation: 0 = current week, -1 = last week, etc.
    let statsWeekOffset = state.statsWeekOffset || 0;
    // Calendar month for 30d report — initialises from journal date each stats session
    const _calAnchor = new Date((state.dateStr || htToday()) + 'T12:00:00');
    let statsCalYear = state.statsCalYear ?? _calAnchor.getFullYear();
    let statsCalMonth = state.statsCalMonth ?? _calAnchor.getMonth();

    const buildSelect = () => {
      const sel = document.createElement('select');
      sel.className = 'ht-stats-select';
      const opt0 = document.createElement('option');
      opt0.value = '__overall__'; opt0.textContent = 'Overall';
      sel.appendChild(opt0);
      for (const cat of config.categories) {
        const o = document.createElement('option');
        o.value = 'cat:' + cat.id; o.textContent = `${cat.name} (category)`;
        sel.appendChild(o);
        for (const h of config.habits.filter(h2 => h2.categoryId === cat.id && !h2.archived)) {
          const oh = document.createElement('option');
          oh.value = 'habit:' + h.id; oh.textContent = `  · ${h.name}`;
          sel.appendChild(oh);
        }
      }
      sel.value = selectedId;
      sel.addEventListener('change', () => { selectedId = sel.value; state.statsSelected = selectedId; renderContent(); });
      return sel;
    };

    // ── Range buttons ──
    const rangeRow = document.createElement('div');
    rangeRow.className = 'ht-stats-range';
    const rangeLeft = document.createElement('div');
    rangeLeft.className = 'ht-stats-range-left';
    for (const [label, days] of [['7d', 7], ['30d', 30]]) {
      const btn = document.createElement('button');
      btn.className = 'ht-range-btn' + (rangeDays === days ? ' active' : '');
      btn.textContent = label;
      btn.addEventListener('click', () => {
        rangeDays = days;
        this._persistStatsRangeDays(state, days);
        rangeRow.querySelectorAll('.ht-range-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        syncReportLink();
        renderContent();
      });
      rangeLeft.appendChild(btn);
    }
    rangeRow.appendChild(rangeLeft);

    // ── Report link (mode-aware) ──
    const reportLink = document.createElement('a');
    reportLink.href = '#';
    reportLink.className = 'ht-weekly-report-link';
    reportLink.addEventListener('click', (e) => {
      e.preventDefault();
      if (rangeDays === 30) {
        void this._openMonthlyActivitiesReport(state, statsCalYear, statsCalMonth);
      } else {
        void this._openWeeklyActivitiesReport(state);
      }
    });
    rangeRow.appendChild(reportLink);
    wrap.appendChild(rangeRow);

    const syncReportLink = () => {
      if (rangeDays === 30) {
        const d = new Date(statsCalYear, statsCalMonth, 1);
        reportLink.textContent = d.toLocaleDateString('en-US', { month: 'long' }) + ' activities';
      } else {
        reportLink.textContent = 'Weekly activities';
      }
    };

    syncReportLink();

    wrap.appendChild(buildSelect());

    const contentEl = document.createElement('div');
    contentEl.className = 'ht-stats-content';
    wrap.appendChild(contentEl);

    // ── Stats cell helpers ──
    const patchCell = (el, isDone, isPartial, label) => {
      el.classList.toggle('done', isDone);
      el.classList.toggle('partial', isPartial && !isDone);
      const valEl = el.querySelector('.ht-cal-day-val');
      if (valEl) {
        if (label != null && label > 0) { valEl.textContent = label; valEl.style.display = ''; }
        else { valEl.textContent = ''; valEl.style.display = 'none'; }
      } else if (label != null && label > 0 && el.querySelector('.ht-cal-day-num')) {
        const newVal = document.createElement('div');
        newVal.className = 'ht-cal-day-val'; newVal.textContent = label;
        el.appendChild(newVal);
      }
    };

    const applyLogChange = async (dateStr, log, el, hId, cId) => {
      const h = hId ? config.habits.find(x => x.id === hId) : null;
      const affectedCatIds = hId && h ? [h.categoryId] : cId ? [cId] : config.categories.map(c => c.id);
      for (const catId of affectedCatIds) {
        const habitsInCat = config.habits.filter(x => x.categoryId === catId && !x.archived);
        const anyDone = habitsInCat.some(x => { const v2 = log.completions[x.id]; if (!v2) return false; if ((x.target||0) > 0) return typeof v2 === 'number' ? v2 >= x.target : false; return true; });
        if (anyDone) log.categoryDone[catId] = true; else delete log.categoryDone[catId];
      }
      await this._saveLog(dateStr, log);
      const isHabitSel = !!hId && !!h, isCatSel = !!cId;
      let isDone = false, isPartial = false, valLabel = null;
      if (isHabitSel) { const v = log.completions[hId]; const num = typeof v === 'number' ? v : (v ? 1 : 0); isDone = (h.target||0) > 0 ? num >= h.target : !!v; isPartial = !isDone && num > 0; valLabel = (h.target||0) > 0 && num > 0 ? num : null; }
      else if (isCatSel) { isDone = !!log.categoryDone[cId]; }
      else { const allActive = config.habits.filter(x => !x.archived); const doneCount = allActive.filter(x => { const v = log.completions[x.id]; if (!v) return false; return (x.target||0) > 0 ? (typeof v === 'number' ? v >= x.target : false) : true; }).length; isDone = doneCount === allActive.length; isPartial = !isDone && doneCount > 0; }
      patchCell(el, isDone, isPartial, valLabel);
      if (isDone) this._celebrate(el);
    };

    const showStatsNumericInput = (el, dateStr, h) => {
      if (el.querySelector('.ht-num-input')) return;
      const hId = h.id;
      const wrap = document.createElement('div');
      wrap.style.cssText = 'position:absolute;bottom:calc(100% + 6px);left:50%;transform:translateX(-50%);display:flex;gap:4px;align-items:center;background:rgba(28,26,34,0.95);border:1px solid rgba(255,255,255,0.15);border-radius:8px;padding:4px 6px;z-index:100;white-space:nowrap;';
      const input = document.createElement('input');
      input.type = 'number'; input.className = 'ht-num-input'; input.style.cssText = 'width:44px;'; input.min = 0; input.max = 9999;
      const okBtn = document.createElement('button');
      okBtn.className = 'ht-num-btn'; okBtn.innerHTML = htIcon('check'); okBtn.style.cssText = 'background:rgba(76,175,80,0.2);border-color:#4caf50;color:#4caf50;';
      const commit = async () => { wrap.remove(); const newVal = Math.max(0, parseInt(input.value) || 0); const log = await this._loadLog(dateStr); if (newVal === 0) delete log.completions[hId]; else log.completions[hId] = newVal; await applyLogChange(dateStr, log, el, hId, null); };
      okBtn.addEventListener('click', (e) => { e.stopPropagation(); commit(); });
      input.addEventListener('keydown', (e) => { if (e.key === 'Enter') commit(); if (e.key === 'Escape') wrap.remove(); e.stopPropagation(); });
      input.addEventListener('click', (e) => e.stopPropagation());
      wrap.appendChild(input); wrap.appendChild(okBtn);
      el.style.position = 'relative'; el.style.overflow = 'visible'; el.appendChild(wrap);
      setTimeout(() => { input.focus(); input.select(); }, 10);
      const outside = (e) => { if (!wrap.contains(e.target)) { wrap.remove(); document.removeEventListener('click', outside); } };
      setTimeout(() => document.addEventListener('click', outside), 50);
    };

    const wireCircle = (el, dateStr, currentV) => {
      const isCatSel = selectedId.startsWith('cat:'), isHabitSel = selectedId.startsWith('habit:');
      const hId = isHabitSel ? selectedId.slice(6) : null, cId = isCatSel ? selectedId.slice(4) : null;
      const h = hId ? config.habits.find(x => x.id === hId) : null;
      const isNumeric = h && (h.target||0) > 0;
      let longTimer = null, didLong = false, startX = 0, startY = 0, pressDownTime = 0;
      el.addEventListener('mousedown', (e) => { didLong = false; startX = e.clientX; startY = e.clientY; pressDownTime = Date.now(); if (isNumeric) { longTimer = setTimeout(() => { didLong = true; showStatsNumericInput(el, dateStr, h); }, 800); } });
      el.addEventListener('mouseup', () => { if (Date.now() - pressDownTime < 600) clearTimeout(longTimer); });
      el.addEventListener('mousemove', (e) => { if (Math.abs(e.clientX - startX) > 8 || Math.abs(e.clientY - startY) > 8) clearTimeout(longTimer); });
      el.addEventListener('mouseleave', () => clearTimeout(longTimer));
      el.addEventListener('click', async (e) => {
        e.stopPropagation();
        if (didLong) { didLong = false; return; }
        if (el.querySelector('.ht-num-input')) return;
        const log = await this._loadLog(dateStr);
        if (isHabitSel && h) {
          if (isNumeric) { const cur = typeof log.completions[hId] === 'number' ? log.completions[hId] : 0; if (cur >= h.target) delete log.completions[hId]; else log.completions[hId] = cur + 1; }
          else { if (log.completions[hId]) delete log.completions[hId]; else log.completions[hId] = true; }
          await applyLogChange(dateStr, log, el, hId, null);
        } else if (isCatSel && cId) {
          if (log.categoryDone[cId]) delete log.categoryDone[cId]; else log.categoryDone[cId] = true;
          await this._saveLog(dateStr, log); patchCell(el, !!log.categoryDone[cId], false, null); if (log.categoryDone[cId]) this._celebrate(el);
        } else {
          const allActive = config.habits.filter(x => !x.archived);
          const allDone = allActive.every(x => log.completions[x.id]);
          if (allDone) { allActive.forEach(x => delete log.completions[x.id]); config.categories.forEach(c => delete log.categoryDone[c.id]); }
          else { allActive.forEach(x => { log.completions[x.id] = (x.target||0) > 0 ? x.target : true; }); config.categories.forEach(c => { log.categoryDone[c.id] = true; }); }
          await this._saveLog(dateStr, log); patchCell(el, !allDone, false, null); if (!allDone) this._celebrate(el);
        }
      });
    };

    const renderContent = async () => {
      if (!contentEl.isConnected) return;
      contentEl.innerHTML = '';

      const records = await this._collection?.getAllRecords() || [];
      const logsByDate = this._buildLogsByDateMap(records);

      // Build date range — 7d anchors to the journal week + offset, 30d stays rolling
      const today = htToday();
      const dates = [];
      if (rangeDays === 7) {
        const anchor = htMondayOfWeek(state.dateStr || today);
        const monday = htDaysAfter(anchor, statsWeekOffset * 7);
        for (let i = 0; i < 7; i++) dates.push(htDaysAfter(monday, i));
      } else {
        for (let i = rangeDays - 1; i >= 0; i--) dates.push(htDaysBefore(today, i));
      }

      const allLogDates = new Set(logsByDate.keys());
      const isCat = selectedId.startsWith('cat:'), isHabit = selectedId.startsWith('habit:'), isOverall = selectedId === '__overall__';
      const catId = isCat ? selectedId.slice(4) : null, habitId = isHabit ? selectedId.slice(6) : null;
      const habit = habitId ? config.habits.find(h => h.id === habitId) : null;
      const activeHabits = config.habits.filter(h => !h.archived);

      const getVal = (dateStr) => {
        const log = logsByDate.get(dateStr);
        if (!log) return null;
        if (isOverall) { const done = activeHabits.filter(h => { const cv = log.completions?.[h.id]; if (!cv) return false; return (h.target||0) > 0 ? (typeof cv === 'number' ? cv >= h.target : false) : true; }).length; return { val: done, max: activeHabits.length, done: done === activeHabits.length }; }
        if (isCat) return { val: log.categoryDone?.[catId] ? 1 : 0, max: 1, done: !!log.categoryDone?.[catId] };
        if (isHabit && habit) { const hv = log.completions?.[habit.id]; const num = typeof hv === 'number' ? hv : (hv ? 1 : 0); const target = habit.target || 0; return { val: num, max: target || 1, done: target > 0 ? num >= target : !!hv }; }
        return null;
      };

      const dayVals = dates.map(d => getVal(d));
      const allDates = [...allLogDates].sort();
      const allDoneDays = allDates.filter(d => getVal(d)?.done).length;
      const completionRate = allDates.length > 0 ? Math.round((allDoneDays / allDates.length) * 100) : 0;
      const rateLabel = `${allDoneDays}/${allDates.length} days`;
      let totalVal = 0;
      allDates.forEach(d => { const log = logsByDate.get(d); if (log && isHabit && habit) { const hv = log.completions?.[habit.id]; totalVal += typeof hv === 'number' ? hv : (hv ? 1 : 0); } });

      let bestStreak = 0, cur = 0;
      for (let i = 0; i < allDates.length; i++) {
        const v = getVal(allDates[i]);
        if (v?.done) {
          if (i > 0) { const diff = Math.round((new Date(allDates[i]+'T12:00:00') - new Date(allDates[i-1]+'T12:00:00')) / 86400000); cur = diff === 1 ? cur + 1 : 1; } else { cur = 1; }
          if (cur > bestStreak) bestStreak = cur;
        } else { cur = 0; }
      }

      let streak = 0, checkDate = htDaysBefore(today, 1);
      const todayVal = getVal(today);
      if (todayVal?.done) { streak = 1; checkDate = htDaysBefore(today, 1); }
      for (let i = 0; i < 3650; i++) { const v = getVal(checkDate); if (v?.done) { streak++; checkDate = htDaysBefore(checkDate, 1); } else break; }

      contentEl.innerHTML = '';
      const cards = document.createElement('div');
      cards.className = 'ht-stat-cards';
      const makeCard = (label, value, unit, cls) => { const c = document.createElement('div'); c.className = 'ht-stat-card' + (cls ? ' ' + cls : ''); c.innerHTML = `<div class="ht-stat-label">${label}</div><div class="ht-stat-value">${value}</div><div class="ht-stat-unit">${unit}</div>`; return c; };
      cards.appendChild(makeCard('Streak', streak, 'days', streak > 0 ? 'fire' : ''));
      cards.appendChild(makeCard('Best', bestStreak, 'days', bestStreak > 0 ? 'accent' : ''));
      cards.appendChild(makeCard('Rate', completionRate + '%', rateLabel, ''));
      if (isHabit && habit?.target > 0) cards.appendChild(makeCard('Total', totalVal, habit.unit || 'total', 'accent'));
      contentEl.appendChild(cards);

      const calSection = document.createElement('div');
      calSection.className = 'ht-stats-section';
      calSection.innerHTML = '<div class="ht-stats-section-title">Completion Calendar</div>';

      if (rangeDays === 7) {
        const wAnchor = htMondayOfWeek(state.dateStr || today);
        const wMon = htDaysAfter(wAnchor, statsWeekOffset * 7);
        const wSun = htDaysAfter(wMon, 6);
        const wd0 = new Date(wMon + 'T12:00:00');
        const wd6 = new Date(wSun + 'T12:00:00');
        const nav = document.createElement('div');
        nav.className = 'ht-cal-month-nav';
        const weekPrevBtn = document.createElement('button');
        weekPrevBtn.className = 'ht-cal-nav-btn';
        weekPrevBtn.innerHTML = htIcon('chevron-left');
        weekPrevBtn.title = 'Previous week';
        const weekLabelEl = document.createElement('span');
        weekLabelEl.className = 'ht-cal-month-title';
        if (statsWeekOffset === 0) weekLabelEl.textContent = 'This week';
        else if (statsWeekOffset === -1) weekLabelEl.textContent = 'Last week';
        else weekLabelEl.textContent = wd0.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' – ' + wd6.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const weekNextBtn = document.createElement('button');
        weekNextBtn.className = 'ht-cal-nav-btn';
        weekNextBtn.innerHTML = htIcon('chevron-right');
        weekNextBtn.title = 'Next week';
        weekNextBtn.style.opacity = statsWeekOffset >= 0 ? '0.3' : '1';
        weekNextBtn.style.pointerEvents = statsWeekOffset >= 0 ? 'none' : '';
        weekPrevBtn.addEventListener('click', () => {
          statsWeekOffset--;
          state.statsWeekOffset = statsWeekOffset;
          renderContent();
        });
        weekNextBtn.addEventListener('click', () => {
          if (statsWeekOffset >= 0) return;
          statsWeekOffset++;
          state.statsWeekOffset = statsWeekOffset;
          renderContent();
        });
        nav.appendChild(weekPrevBtn); nav.appendChild(weekLabelEl); nav.appendChild(weekNextBtn);
        calSection.appendChild(nav);

        const strip = document.createElement('div');
        strip.className = 'ht-cal-strip';
        const DOW = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        dates.forEach((d, i) => {
          const v = dayVals[i], dt = new Date(d + 'T12:00:00'), isToday = d === today;
          const col = document.createElement('div');
          col.className = 'ht-cal-strip-col' + (isToday ? ' today' : '');
          const dayName = document.createElement('div'); dayName.className = 'ht-cal-strip-dow'; dayName.textContent = DOW[dt.getDay()];
          const circle = document.createElement('div');
          circle.className = 'ht-cal-strip-circle' + (v?.done ? ' done' : (v && v.val > 0 ? ' partial' : ''));
          const dateNum = document.createElement('div'); dateNum.className = 'ht-cal-strip-date'; dateNum.textContent = dt.getDate();
          if (isHabit && habit?.target > 0 && v?.val > 0) { circle.textContent = v.val; circle.classList.add('has-val'); }
          circle.title = d + (v?.val != null ? ': ' + v.val : '');
          wireCircle(circle, d, v);
          col.appendChild(dayName); col.appendChild(circle); col.appendChild(dateNum); strip.appendChild(col);
        });
        calSection.appendChild(strip);
      } else {
        // Uses statsCalYear/statsCalMonth from outer scope so month nav and report link stay in sync
        const renderMonth = (year, month) => {
          calSection.querySelector('.ht-cal-month-view')?.remove();
          const mv = document.createElement('div');
          mv.className = 'ht-cal-month-view';
          const nav = document.createElement('div'); nav.className = 'ht-cal-month-nav';
          const prevMo = document.createElement('button'); prevMo.className = 'ht-cal-nav-btn'; prevMo.innerHTML = htIcon('chevron-left');
          const monthTitle = document.createElement('span'); monthTitle.className = 'ht-cal-month-title';
          monthTitle.textContent = new Date(year, month, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
          const nextMo = document.createElement('button'); nextMo.className = 'ht-cal-nav-btn'; nextMo.innerHTML = htIcon('chevron-right');
          prevMo.addEventListener('click', () => {
            statsCalMonth--; if (statsCalMonth < 0) { statsCalMonth = 11; statsCalYear--; }
            state.statsCalYear = statsCalYear; state.statsCalMonth = statsCalMonth;
            syncReportLink(); renderMonth(statsCalYear, statsCalMonth);
          });
          nextMo.addEventListener('click', () => {
            statsCalMonth++; if (statsCalMonth > 11) { statsCalMonth = 0; statsCalYear++; }
            state.statsCalYear = statsCalYear; state.statsCalMonth = statsCalMonth;
            syncReportLink(); renderMonth(statsCalYear, statsCalMonth);
          });
          nav.appendChild(prevMo); nav.appendChild(monthTitle); nav.appendChild(nextMo); mv.appendChild(nav);

          const dowRow = document.createElement('div'); dowRow.className = 'ht-cal-dow-row';
          for (const d of ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']) { const h = document.createElement('div'); h.className = 'ht-cal-dow-header'; h.textContent = d; dowRow.appendChild(h); }
          mv.appendChild(dowRow);

          const firstDay = new Date(year, month, 1), lastDay = new Date(year, month + 1, 0), startDow = firstDay.getDay();
          const grid = document.createElement('div'); grid.className = 'ht-cal-grid';
          for (let p = 0; p < startDow; p++) { const empty = document.createElement('div'); empty.className = 'ht-cal-day empty'; grid.appendChild(empty); }

          for (let day = 1; day <= lastDay.getDate(); day++) {
            const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
            const idx = dates.indexOf(dateStr), v = idx >= 0 ? dayVals[idx] : null, isToday = dateStr === today;
            const inRange = idx >= 0 || allLogDates.has(dateStr);
            let cellV = v;
            if (!cellV && allLogDates.has(dateStr)) {
              const log = logsByDate.get(dateStr);
              if (log) {
                if (isOverall) { const done = activeHabits.filter(h => { const cv = log.completions?.[h.id]; if (!cv) return false; if ((h.target||0) > 0) return typeof cv === 'number' ? cv >= h.target : false; return true; }).length; cellV = { val: done, max: activeHabits.length, done: done === activeHabits.length }; }
                else if (isCat) { cellV = { val: log.categoryDone?.[catId] ? 1 : 0, max: 1, done: !!log.categoryDone?.[catId] }; }
                else if (isHabit && habit) { const hv = log.completions?.[habit.id]; const num = typeof hv === 'number' ? hv : (hv ? 1 : 0); const target = habit.target || 0; cellV = { val: num, max: target || 1, done: target > 0 ? num >= target : !!hv }; }
              }
            }
            const cell = document.createElement('div');
            cell.className = 'ht-cal-day' + (isToday ? ' today' : '') + (!inRange ? ' out-of-range' : '') + (cellV?.done ? ' done' : (cellV && cellV.val > 0 ? ' partial' : ''));
            const num = document.createElement('div'); num.className = 'ht-cal-day-num'; num.textContent = day;
            const dot = document.createElement('div'); dot.className = 'ht-cal-day-dot';
            cell.appendChild(num); cell.appendChild(dot);
            if (isHabit && habit?.target > 0 && cellV?.val > 0) { const valEl = document.createElement('div'); valEl.className = 'ht-cal-day-val'; valEl.textContent = cellV.val; cell.appendChild(valEl); }
            cell.title = dateStr + (cellV?.val != null ? ': ' + cellV.val : '');
            if (inRange) wireCircle(cell, dateStr, cellV);
            grid.appendChild(cell);
          }
          mv.appendChild(grid); calSection.appendChild(mv);
        };

        renderMonth(statsCalYear, statsCalMonth);
      }
      contentEl.appendChild(calSection);

      // ── Bar chart ──
      const chartSection = document.createElement('div');
      chartSection.className = 'ht-stats-section';
      chartSection.innerHTML = '<div class="ht-stats-section-title">Daily Progress</div>';
      const chartEl = document.createElement('div'); chartEl.className = 'ht-barchart';
      const chartDates = dates.slice(-Math.min(30, dates.length)), chartVals = dayVals.slice(-chartDates.length);
      const maxVal = Math.max(1, ...chartVals.map(v => v?.val || 0));
      const target = (isHabit && habit?.target > 0) ? habit.target : (isOverall ? activeHabits.length : 1);
      if (target > 0 && maxVal > 0) {
        const targetPct = Math.min(100, (target / Math.max(maxVal, target)) * 100);
        const line = document.createElement('div'); line.className = 'ht-target-line'; line.style.bottom = targetPct + '%';
        const tLabel = document.createElement('div'); tLabel.className = 'ht-target-label'; tLabel.style.bottom = targetPct + '%'; tLabel.textContent = target;
        chartEl.appendChild(line); chartEl.appendChild(tLabel);
      }
      const labelsEl = document.createElement('div'); labelsEl.className = 'ht-barchart-labels';
      const labelInterval = Math.ceil(chartDates.length / 6);
      chartDates.forEach((d, i) => {
        const v = chartVals[i];
        const barWrap = document.createElement('div'); barWrap.className = 'ht-bar-wrap';
        const bar = document.createElement('div'); bar.className = 'ht-bar' + (v?.done ? ' done' : '');
        bar.style.height = (v ? Math.max(2, Math.round((v.val / Math.max(maxVal, target)) * 100)) : 0) + '%';
        barWrap.appendChild(bar);
        if (v?.val > 0) { const tooltip = document.createElement('div'); tooltip.className = 'ht-bar-tooltip'; tooltip.textContent = v.val + (habit?.unit ? ' ' + habit.unit : ''); barWrap.appendChild(tooltip); }
        chartEl.appendChild(barWrap);
        const lblWrap = document.createElement('div'); lblWrap.className = 'ht-bar-label-wrap';
        if (i % labelInterval === 0) { const lbl = document.createElement('div'); lbl.className = 'ht-bar-label'; lbl.textContent = new Date(d + 'T12:00:00').getDate(); lblWrap.appendChild(lbl); }
        labelsEl.appendChild(lblWrap);
      });
      const barchartWrap = document.createElement('div'); barchartWrap.className = 'ht-barchart-wrap';
      barchartWrap.appendChild(chartEl); barchartWrap.appendChild(labelsEl); chartSection.appendChild(barchartWrap);
      contentEl.appendChild(chartSection);

      if (isOverall) {
        const rateSection = document.createElement('div'); rateSection.className = 'ht-stats-section';
        rateSection.innerHTML = '<div class="ht-stats-section-title">Category Completion Rate</div>';
        for (const c of config.categories) {
          const habitsInCat = activeHabits.filter(h => h.categoryId === c.id);
          if (habitsInCat.length === 0) continue;
          const catDoneDays = dates.filter(d => { const log = logsByDate.get(d); return log?.categoryDone?.[c.id]; }).length;
          const rate = dates.length > 0 ? Math.round((catDoneDays / dates.length) * 100) : 0;
          const row = document.createElement('div'); row.className = 'ht-cat-rate-row';
          row.innerHTML = `<span class="ht-cat-rate-name"><span class="ht-cat-glyph-inline">${htCategoryGlyphHtml(c.emoji)}</span>${htEsc(c.name)}</span><div class="ht-cat-rate-bar-wrap"><div class="ht-cat-rate-bar" style="width:${rate}%"></div></div><span class="ht-cat-rate-pct">${rate}%</span>`;
          rateSection.appendChild(row);
        }
        contentEl.appendChild(rateSection);
      }
    };

    await renderContent();
  }

  async refreshAllPanels() {
    for (const [, state] of (this._panelStates || [])) {
      if (!state.bodyEl) continue;
      try {
        if (state.bodyEl.dataset?.mode === 'stats') await this._renderStats(state, state.bodyEl);
        else await this._renderSidebar(state);
      } catch(e) { console.error('[HabitTracker] refreshAllPanels:', e); }
    }
  }

  // ── Reports ───────────────────────────────────────────────────────────────

  async _openWeeklyActivitiesReport(state) {
    document.querySelector('.ht-modal-overlay')?.remove();
    const refDate = state?.dateStr || htToday();
    const monday = htDaysAfter(htMondayOfWeek(refDate), (state.statsWeekOffset || 0) * 7);
    const weekDates = [];
    for (let i = 0; i < 7; i++) weekDates.push(htDaysAfter(monday, i));

    const records = this._collection ? await this._collection.getAllRecords() : [];
    const logsByDate = this._buildLogsByDateMap(records);
    const activeHabits = (this._config?.habits || []).filter(h => !h.archived).sort((a,b) => (a.order||0)-(b.order||0));
    const dayLabels = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    const isDone = (log, h) => { const cv = log?.completions?.[h.id]; if (!cv) return false; return (h.target||0) > 0 ? (typeof cv === 'number' ? cv >= h.target : false) : true; };

    const d0 = new Date(weekDates[0] + 'T12:00:00'), d6 = new Date(weekDates[6] + 'T12:00:00');
    const rangeStr = `${d0.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} - ${d6.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}`;
    const lines = [`# Weekly activities - ${rangeStr}`, ''];

    for (let i = 0; i < 7; i++) {
      const ds = weekDates[i], log = logsByDate.get(ds);
      const pretty = new Date(ds + 'T12:00:00').toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });
      lines.push(`## ${dayLabels[i]} — ${pretty}`, '');
      const doneNames = activeHabits.filter(h => isDone(log, h)).map(h => String(h.name || '').replace(/\n/g, ' ').trim());
      if (doneNames.length === 0) lines.push('*No activities completed.*');
      else doneNames.forEach(n => lines.push(`- ${n}`));
      const dayNotes = log?.notes != null ? String(log.notes).trim() : '';
      if (dayNotes) {
        lines.push('', '### Notes', '');
        dayNotes.split('\n').forEach(nl => lines.push(nl === '' ? '' : `*${nl.replace(/\*/g, '\\*')}*`));
      }
      lines.push('');
    }

    const markdown = lines.join('\n');
    this._showReportModal(`Weekly activities — ${rangeStr}`, markdown);
  }

  async _openMonthlyActivitiesReport(state, year, month) {
    document.querySelector('.ht-modal-overlay')?.remove();
    const records = this._collection ? await this._collection.getAllRecords() : [];
    const logsByDate = this._buildLogsByDateMap(records);
    const activeHabits = (this._config?.habits || []).filter(h => !h.archived).sort((a,b) => (a.order||0)-(b.order||0));
    const monthName = new Date(year, month, 1).toLocaleDateString('en-US', { month: 'long' });
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const isDone = (log, h) => { const cv = log?.completions?.[h.id]; if (!cv) return false; return (h.target||0) > 0 ? (typeof cv === 'number' ? cv >= h.target : false) : true; };

    const lines = [`# ${monthName} activities`, ''];
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
      const log = logsByDate.get(dateStr);
      const doneHabits = activeHabits.filter(h => isDone(log, h));
      const dayNotes = log?.notes ? String(log.notes).trim() : '';
      if (doneHabits.length === 0 && !dayNotes) continue;
      const pretty = new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
      lines.push(`## ${pretty}`, '');
      doneHabits.forEach(h => lines.push(`- ${String(h.name || '').replace(/\n/g, ' ').trim()}`));
      if (dayNotes) {
        lines.push('', '### Notes', '');
        dayNotes.split('\n').forEach(nl => lines.push(nl === '' ? '' : `*${nl.replace(/\*/g, '\\*')}*`));
      }
      lines.push('');
    }

    const markdown = lines.join('\n');
    this._showReportModal(`${monthName} activities`, markdown);
  }

  _showReportModal(title, markdown) {
    const overlay = document.createElement('div');
    overlay.className = 'ht-modal-overlay';
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
    const modal = document.createElement('div');
    modal.className = 'ht-modal';
    modal.style.maxWidth = '520px';
    modal.innerHTML = `
      <div class="ht-modal-header">
        <span class="ht-modal-title">${htIcon('file-text')} ${htEsc(title)}</span>
        <button class="ht-modal-close" title="Close">${htIcon('x')}</button>
      </div>
      <div class="ht-modal-body"><pre class="ht-weekly-report-pre"></pre></div>
      <div class="ht-modal-footer" style="display:flex;gap:8px;justify-content:flex-end;align-items:center;">
        <button type="button" class="ht-btn ht-btn-secondary ht-btn-sm" data-action="copy-md">${htIcon('copy')} Copy Markdown</button>
      </div>
    `;
    modal.querySelector('.ht-weekly-report-pre').textContent = markdown;
    const close = () => overlay.remove();
    modal.querySelector('.ht-modal-close').addEventListener('click', close);
    modal.querySelector('[data-action="copy-md"]').addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(markdown); htShowToast('Copied to clipboard'); close(); }
      catch(e) { htShowToast('Could not copy'); }
    });
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
  }

  // ── Settings UI ──────────────────────────────────────────────────────────

  openSettings() {
    document.querySelector('.ht-modal-overlay')?.remove();
    const overlay = document.createElement('div');
    overlay.className = 'ht-modal-overlay';
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
    const modal = document.createElement('div');
    modal.className = 'ht-modal';
    const draft = JSON.parse(JSON.stringify(this._config));
    modal.innerHTML = `
      <div class="ht-modal-header">
        <span class="ht-modal-title">${htIcon('flame')} HabitTracker — Manage Habits</span>
        <button class="ht-modal-close" title="Close">${htIcon('x')}</button>
      </div>
      <div class="ht-modal-body" id="ht-settings-body"></div>
      <div class="ht-modal-footer">
        <button class="ht-btn ht-btn-secondary" data-action="cancel">Cancel</button>
        <button class="ht-btn ht-btn-primary" data-action="save">Save</button>
      </div>
    `;
    modal.querySelector('.ht-modal-close').addEventListener('click', () => overlay.remove());
    modal.querySelector('[data-action="cancel"]').addEventListener('click', () => overlay.remove());
    modal.querySelector('[data-action="save"]').addEventListener('click', async () => {
      this._config = draft; await this._saveConfig(); overlay.remove(); await this.refreshAllPanels();
      this.ui.addToaster({ title: 'HabitTracker', message: 'Habits saved!', dismissible: true, autoDestroyTime: 2000 });
    });
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    this._renderSettings(modal.querySelector('#ht-settings-body'), draft);
  }

  _renderSettings(container, draft) {
    container.innerHTML = '';
    let refreshCatSelect = () => {};

    // ── Categories ──
    const catTitle = document.createElement('div'); catTitle.className = 'ht-section-title'; catTitle.textContent = 'Categories'; container.appendChild(catTitle);
    const catList = document.createElement('div'); catList.id = 'ht-cat-list'; container.appendChild(catList);
    let catDragSrcId = null;

    const renderCats = () => {
      catList.innerHTML = '';
      const sorted = [...draft.categories].sort((a,b) => (a.order||0)-(b.order||0));
      for (const cat of sorted) {
        const item = document.createElement('div');
        item.className = 'ht-cat-item'; item.draggable = false; item.dataset.catId = cat.id;
        item.innerHTML = `<span class="ht-drag-handle" title="Drag to reorder">${htIcon('grip-vertical')}</span><span class="ht-item-emoji">${htCategoryGlyphHtml(cat.emoji)}</span><span class="ht-item-left"><span class="ht-item-name">${htEsc(cat.name)}</span></span><div class="ht-item-actions"><button class="ht-btn ht-btn-secondary ht-btn-sm" data-action="edit-cat" data-id="${cat.id}" title="Edit">${htIcon('pencil')}</button><button class="ht-btn ht-btn-danger ht-btn-sm" data-action="del-cat" data-id="${cat.id}" title="Delete">${htIcon('trash')}</button></div>`;
        const catHandle = item.querySelector('.ht-drag-handle');
        if (catHandle) { catHandle.addEventListener('mousedown', () => { item.draggable = true; }); catHandle.addEventListener('mouseup', () => { item.draggable = false; }); }
        item.addEventListener('dragstart', (e) => { if (!item.draggable) { e.preventDefault(); return; } catDragSrcId = cat.id; item.classList.add('ht-dragging'); e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', cat.id); });
        item.addEventListener('dragend', () => { item.draggable = false; item.classList.remove('ht-dragging'); catList.querySelectorAll('.ht-drag-over').forEach(el => el.classList.remove('ht-drag-over')); });
        item.addEventListener('dragover', (e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; if (catDragSrcId !== cat.id) item.classList.add('ht-drag-over'); });
        item.addEventListener('dragleave', () => { item.classList.remove('ht-drag-over'); });
        item.addEventListener('drop', (e) => {
          e.preventDefault(); e.stopPropagation(); item.classList.remove('ht-drag-over');
          if (!catDragSrcId || catDragSrcId === cat.id) return;
          const srcCat = draft.categories.find(c => c.id === catDragSrcId);
          if (!srcCat) return;
          const sortedCats = [...draft.categories].sort((a,b) => (a.order||0)-(b.order||0));
          const srcIdx = sortedCats.findIndex(c => c.id === catDragSrcId), dstIdx = sortedCats.findIndex(c => c.id === cat.id);
          if (srcIdx < 0 || dstIdx < 0) return;
          sortedCats.splice(srcIdx, 1); sortedCats.splice(dstIdx, 0, srcCat); sortedCats.forEach((c, i) => { c.order = i; });
          catDragSrcId = null; renderCats(); renderHabits();
        });
        item.querySelector('[data-action="edit-cat"]').addEventListener('click', (e) => {
          e.stopPropagation();
          const leftEl = item.querySelector('.ht-item-left'), actionsEl = item.querySelector('.ht-item-actions'), emojiEl = item.querySelector('.ht-item-emoji');
          leftEl.style.display = 'none'; actionsEl.style.display = 'none'; emojiEl.style.display = 'none';
          const editForm = document.createElement('div'); editForm.style.cssText = 'display:flex;flex:1;gap:6px;align-items:center;flex-wrap:wrap;';
          const iconSelect = document.createElement('select'); iconSelect.className = 'ht-input ht-icon-select'; iconSelect.style.cssText = 'flex-shrink:0;'; htFillIconSelect(iconSelect, cat.emoji);
          const iconPreview = document.createElement('span'); iconPreview.className = 'ht-icon-preview'; htBindIconPreview(iconSelect, iconPreview);
          const nameInput = document.createElement('input'); nameInput.className = 'ht-input'; nameInput.value = cat.name; nameInput.style.cssText = 'flex:1;min-width:80px;';
          const saveBtn = document.createElement('button'); saveBtn.className = 'ht-btn ht-btn-primary ht-btn-sm'; saveBtn.textContent = 'Save';
          const cancelBtn = document.createElement('button'); cancelBtn.className = 'ht-btn ht-btn-secondary ht-btn-sm'; cancelBtn.textContent = 'Cancel';
          const finish = () => { editForm.remove(); leftEl.style.display = ''; actionsEl.style.display = ''; emojiEl.style.display = ''; };
          saveBtn.addEventListener('click', () => { const newName = nameInput.value.trim(); if (!newName) return; cat.emoji = iconSelect.value || 'folder'; cat.name = newName; finish(); renderCats(); renderHabits(); });
          cancelBtn.addEventListener('click', finish);
          nameInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') saveBtn.click(); if (e.key === 'Escape') cancelBtn.click(); });
          editForm.appendChild(iconSelect); editForm.appendChild(iconPreview); editForm.appendChild(nameInput); editForm.appendChild(saveBtn); editForm.appendChild(cancelBtn);
          item.insertBefore(editForm, actionsEl); nameInput.focus(); nameInput.select();
        });
        item.querySelector('[data-action="del-cat"]').addEventListener('click', () => {
          if (!confirm(`Delete category "${cat.name}"? Habits in this category will also be removed.`)) return;
          const idx = draft.categories.findIndex(c => c.id === cat.id); if (idx >= 0) draft.categories.splice(idx, 1);
          draft.habits = draft.habits.filter(h => h.categoryId !== cat.id); renderCats(); renderHabits();
        });
        catList.appendChild(item);
      }
      refreshCatSelect();
    };
    renderCats();

    const addCatRow = document.createElement('div'); addCatRow.className = 'ht-add-row';
    const newCatIconSel = document.createElement('select'); newCatIconSel.className = 'ht-input ht-icon-select'; htFillIconSelect(newCatIconSel, 'folder');
    const newCatIconPrev = document.createElement('span'); newCatIconPrev.className = 'ht-icon-preview'; htBindIconPreview(newCatIconSel, newCatIconPrev);
    const newCatName = document.createElement('input'); newCatName.className = 'ht-input'; newCatName.placeholder = 'Category name';
    const newCatBtn = document.createElement('button'); newCatBtn.className = 'ht-btn ht-btn-primary ht-btn-sm'; newCatBtn.textContent = 'Add';
    addCatRow.appendChild(newCatIconSel); addCatRow.appendChild(newCatIconPrev); addCatRow.appendChild(newCatName); addCatRow.appendChild(newCatBtn);
    newCatBtn.addEventListener('click', () => { const emoji = newCatIconSel.value || 'folder', name = newCatName.value.trim(); if (!name) return; draft.categories.push({ id: htGenId(), name, emoji, order: draft.categories.length }); htFillIconSelect(newCatIconSel, 'folder'); newCatIconSel.dispatchEvent(new Event('change')); newCatName.value = ''; renderCats(); renderHabits(); });
    newCatName.addEventListener('keydown', (e) => { if (e.key === 'Enter') newCatBtn.click(); });
    container.appendChild(addCatRow);

    const div = document.createElement('div'); div.className = 'ht-divider'; container.appendChild(div);

    // ── Habits ──
    const habitTitle = document.createElement('div'); habitTitle.className = 'ht-section-title'; habitTitle.textContent = 'Active Habits'; container.appendChild(habitTitle);
    const selected = new Set();
    const bulkBar = document.createElement('div'); bulkBar.className = 'ht-bulk-bar'; bulkBar.style.display = 'none';
    bulkBar.innerHTML = `<span id="ht-bulk-count" style="flex:1;font-weight:600;"></span><button class="ht-btn ht-btn-danger ht-btn-sm" id="ht-bulk-delete">${htIcon('trash')} Delete selected</button><button class="ht-btn ht-btn-secondary ht-btn-sm" id="ht-bulk-archive">${htIcon('package')} Archive selected</button><button class="ht-btn ht-btn-secondary ht-btn-sm" id="ht-bulk-clear">${htIcon('x')} Deselect all</button>`;
    container.appendChild(bulkBar);
    const updateBulkBar = () => { bulkBar.style.display = selected.size > 0 ? 'flex' : 'none'; const el = bulkBar.querySelector('#ht-bulk-count'); if (el) el.textContent = `${selected.size} habit${selected.size === 1 ? '' : 's'} selected`; };
    bulkBar.querySelector('#ht-bulk-clear').addEventListener('click', () => { selected.clear(); updateBulkBar(); renderHabits(); renderArchive(); });
    bulkBar.querySelector('#ht-bulk-delete').addEventListener('click', () => { if (!confirm(`Permanently delete ${selected.size} habit(s)?\n\nThis cannot be undone.`)) return; draft.habits = draft.habits.filter(h => !selected.has(h.id)); selected.clear(); updateBulkBar(); renderHabits(); renderArchive(); });
    bulkBar.querySelector('#ht-bulk-archive').addEventListener('click', () => { draft.habits.filter(h => selected.has(h.id)).forEach(h => { h.archived = true; }); selected.clear(); updateBulkBar(); renderHabits(); renderArchive(); });

    const habitList = document.createElement('div'); habitList.id = 'ht-habit-list'; container.appendChild(habitList);
    const archiveTitle = document.createElement('div'); archiveTitle.className = 'ht-section-title ht-archive-title'; archiveTitle.style.cssText = 'margin-top:20px;cursor:pointer;display:flex;align-items:center;gap:6px;'; container.appendChild(archiveTitle);
    const archiveList = document.createElement('div'); archiveList.id = 'ht-archive-list'; container.appendChild(archiveList);
    let archiveOpen = false;

    const renderArchive = () => {
      const archived = draft.habits.filter(h => h.archived);
      archiveTitle.innerHTML = `<span style="flex:1;display:inline-flex;align-items:center;gap:6px;">${htIcon('package')} Archived (${archived.length})</span><span style="font-size:10px;opacity:0.6">${archiveOpen ? `${htIcon('chevron-up')} hide` : `${htIcon('chevron-down')} show`}</span>`;
      archiveList.style.display = archiveOpen ? '' : 'none'; archiveList.innerHTML = '';
      if (archived.length === 0) { archiveList.innerHTML = '<div style="font-size:12px;color:#8a7e6a;padding:6px 0 2px;">No archived habits.</div>'; return; }
      for (const habit of archived) {
        const cat = draft.categories.find(c => c.id === habit.categoryId);
        const item = document.createElement('div'); item.className = 'ht-habit-item'; item.style.opacity = '0.6';
        if (selected.has(habit.id)) { item.classList.add('ht-selected'); item.style.opacity = '1'; }
        item.innerHTML = `<input type="checkbox" class="ht-habit-cb" ${selected.has(habit.id) ? 'checked' : ''} title="Select"><div class="ht-item-left"><span class="ht-item-name" style="color:#8a7e6a;text-decoration:line-through">${htEsc(habit.name)}</span><span class="ht-item-sub"><span class="ht-cat-glyph-inline">${htCategoryGlyphHtml(cat?.emoji)}</span> ${htEsc(cat?.name || 'Unknown')}</span></div><div class="ht-item-actions"><button class="ht-btn ht-btn-secondary ht-btn-sm" data-action="unarchive-habit" data-id="${habit.id}" title="Restore">${htIcon('arrow-back-up')} Restore</button><button class="ht-btn ht-btn-danger ht-btn-sm" data-action="del-habit" data-id="${habit.id}" title="Delete permanently">${htIcon('trash')}</button></div>`;
        item.querySelector('.ht-habit-cb').addEventListener('change', (e) => { if (e.target.checked) selected.add(habit.id); else selected.delete(habit.id); item.classList.toggle('ht-selected', e.target.checked); item.style.opacity = e.target.checked ? '1' : '0.6'; updateBulkBar(); });
        item.querySelector('[data-action="unarchive-habit"]').addEventListener('click', () => { habit.archived = false; renderHabits(); renderArchive(); });
        item.querySelector('[data-action="del-habit"]').addEventListener('click', () => { if (!confirm(`Permanently delete "${habit.name}"? This cannot be undone.`)) return; const idx = draft.habits.findIndex(h => h.id === habit.id); if (idx >= 0) draft.habits.splice(idx, 1); renderArchive(); });
        archiveList.appendChild(item);
      }
    };
    archiveTitle.addEventListener('click', () => { archiveOpen = !archiveOpen; renderArchive(); });

    // drag state for habits
    let habitDragSrcId = null, habitDragAbove = false;
    const habitDropIndicator = document.createElement('div');
    habitDropIndicator.style.cssText = 'height:2px;background:rgba(124,106,247,0.85);border-radius:2px;margin:0 8px;display:none;pointer-events:none;';
    const hideHabitIndicator = () => { habitDropIndicator.style.display = 'none'; habitDropIndicator.remove(); };

    const renderHabits = () => {
      habitList.innerHTML = '';
      const active = draft.habits.filter(h => !h.archived);
      const sorted = [...active].sort((a,b) => {
        const aCat = draft.categories.findIndex(c => c.id === a.categoryId), bCat = draft.categories.findIndex(c => c.id === b.categoryId);
        if (aCat !== bCat) return aCat - bCat;
        return (a.order||0) - (b.order||0);
      });
      for (const habit of sorted) {
        const cat = draft.categories.find(c => c.id === habit.categoryId);
        const item = document.createElement('div');
        item.className = 'ht-habit-item'; item.dataset.habitId = habit.id;
        const seedHint = habit.seedDate ? `<span style="font-size:10px;color:#c4a882;margin-left:4px;" title="Streak seeded from ${habit.seedDate}">${htIcon('flame')} since ${habit.seedDate}</span>` : '';
        const targetHint = habit.target > 0 ? ` · ${htIcon('target')} ${habit.target}${habit.unit ? ' ' + habit.unit : ''}` : '';
        if (selected.has(habit.id)) item.classList.add('ht-selected');
        item.innerHTML = `<input type="checkbox" class="ht-habit-cb" ${selected.has(habit.id) ? 'checked' : ''} title="Select"><span class="ht-drag-handle" title="Drag to reorder">${htIcon('grip-vertical')}</span><div class="ht-item-left"><span class="ht-item-name">${htEsc(habit.name)}${seedHint}</span><span class="ht-item-sub"><span class="ht-cat-glyph-inline">${htCategoryGlyphHtml(cat?.emoji)}</span> ${htEsc(cat?.name || 'Unknown')}${targetHint}</span></div><div class="ht-item-actions"><button class="ht-btn ht-btn-secondary ht-btn-sm" data-action="edit-habit" data-id="${habit.id}" title="Edit">${htIcon('pencil')}</button><button class="ht-btn ht-btn-secondary ht-btn-sm" data-action="archive-habit" data-id="${habit.id}" title="Archive">${htIcon('package')}</button><button class="ht-btn ht-btn-danger ht-btn-sm" data-action="del-habit" data-id="${habit.id}" title="Delete">${htIcon('trash')}</button></div>`;
        item.querySelector('.ht-habit-cb').addEventListener('change', (e) => { if (e.target.checked) selected.add(habit.id); else selected.delete(habit.id); item.classList.toggle('ht-selected', e.target.checked); updateBulkBar(); });

        // ── Pointer-based drag ──
        const habitHandle = item.querySelector('.ht-drag-handle');
        if (habitHandle) {
          habitHandle.addEventListener('pointerdown', (e) => {
            if (e.pointerType === 'mouse' && e.button !== 0) return;
            e.preventDefault(); e.stopPropagation();
            let moved = false, ghost = null, dropTargetId = null, dropAbove = false;
            const startY = e.clientY, initRect = item.getBoundingClientRect();

            const onMove = (ev) => {
              if (!moved) {
                if (Math.abs(ev.clientY - startY) < 5) return;
                moved = true; habitDragSrcId = habit.id; item.classList.add('ht-dragging');
                ghost = document.createElement('div');
                ghost.style.cssText = ['position:fixed', `left:${initRect.left}px`, `top:${initRect.top}px`, `width:${initRect.width}px`, 'opacity:0.85', 'pointer-events:none', 'z-index:10000', 'border:1px solid rgba(124,106,247,0.6)', 'border-radius:6px', 'background:rgba(28,26,34,0.96)', 'padding:6px 10px', 'font-size:12px', 'color:#e8e0d0', 'box-shadow:0 4px 20px rgba(0,0,0,0.5)', 'white-space:nowrap', 'overflow:hidden', 'text-overflow:ellipsis'].join(';');
                ghost.textContent = habit.name;
                document.body.appendChild(ghost);
              }
              if (!ghost) return;
              ghost.style.top = `${initRect.top + (ev.clientY - startY)}px`;
              ghost.style.visibility = 'hidden';
              const el = document.elementFromPoint(ev.clientX, ev.clientY);
              ghost.style.visibility = '';
              const targetEl = el?.closest?.('[data-habit-id]');
              if (targetEl && targetEl !== item && habitList.contains(targetEl)) {
                dropTargetId = targetEl.dataset.habitId;
                const tRect = targetEl.getBoundingClientRect();
                dropAbove = ev.clientY < tRect.top + tRect.height / 2;
                habitList.insertBefore(habitDropIndicator, dropAbove ? targetEl : targetEl.nextSibling);
                habitDropIndicator.style.display = '';
              } else { dropTargetId = null; hideHabitIndicator(); }
            };

            const onUp = () => {
              document.removeEventListener('pointermove', onMove);
              document.removeEventListener('pointerup', onUp);
              ghost?.remove(); item.classList.remove('ht-dragging'); hideHabitIndicator();
              const srcId = habitDragSrcId; habitDragSrcId = null;
              if (!moved || !dropTargetId || !srcId || srcId === dropTargetId) return;
              const srcHabit = draft.habits.find(h => h.id === srcId), dstHabit = draft.habits.find(h => h.id === dropTargetId);
              if (!srcHabit || !dstHabit) return;
              const activeList = draft.habits.filter(h => !h.archived).sort((a,b) => { const aC = draft.categories.findIndex(c => c.id === a.categoryId), bC = draft.categories.findIndex(c => c.id === b.categoryId); if (aC !== bC) return aC - bC; return (a.order||0)-(b.order||0); });
              const srcIdx = activeList.findIndex(h => h.id === srcId), dstIdx = activeList.findIndex(h => h.id === dropTargetId);
              if (srcIdx < 0 || dstIdx < 0) return;
              srcHabit.categoryId = dstHabit.categoryId;
              const adj = srcIdx < dstIdx ? dstIdx - 1 : dstIdx;
              activeList.splice(srcIdx, 1);
              activeList.splice(Math.max(0, Math.min(activeList.length, dropAbove ? adj : adj + 1)), 0, srcHabit);
              const orderByCat = new Map();
              for (const h of activeList) { if (!orderByCat.has(h.categoryId)) orderByCat.set(h.categoryId, 0); h.order = orderByCat.get(h.categoryId); orderByCat.set(h.categoryId, h.order + 1); }
              renderHabits();
            };

            document.addEventListener('pointermove', onMove);
            document.addEventListener('pointerup', onUp);
          });
        }

        item.querySelector('[data-action="edit-habit"]').addEventListener('click', (e) => {
          e.stopPropagation();
          const leftEl = item.querySelector('.ht-item-left'), actionsEl = item.querySelector('.ht-item-actions');
          leftEl.style.display = 'none'; actionsEl.style.display = 'none';
          const editForm = document.createElement('div'); editForm.style.cssText = 'display:flex;flex:1;gap:6px;align-items:center;flex-wrap:wrap;';
          const nameInput = document.createElement('input'); nameInput.className = 'ht-input'; nameInput.value = habit.name; nameInput.style.cssText = 'flex:1;min-width:80px;';
          const catSel = document.createElement('select'); catSel.className = 'ht-select';
          for (const c of draft.categories) { const o = document.createElement('option'); o.value = c.id; o.textContent = c.name || ''; if (c.id === habit.categoryId) o.selected = true; catSel.appendChild(o); }
          const seedRow = document.createElement('div'); seedRow.style.cssText = 'display:flex;align-items:center;gap:6px;width:100%;margin-top:4px;flex-wrap:wrap;';
          const seedLabel = document.createElement('span'); seedLabel.style.cssText = 'font-size:11px;color:#8a7e6a;white-space:nowrap;'; seedLabel.innerHTML = `${htIcon('flame')} Streak since:`;
          const seedInput = document.createElement('input'); seedInput.type = 'date'; seedInput.className = 'ht-input'; seedInput.style.cssText = 'flex:1;min-width:120px;'; seedInput.value = habit.seedDate || ''; seedInput.title = 'Set this to bring over an existing streak from another app';
          const clearSeedBtn = document.createElement('button'); clearSeedBtn.className = 'ht-btn ht-btn-secondary ht-btn-sm'; clearSeedBtn.innerHTML = `${htIcon('x')} Clear`; clearSeedBtn.addEventListener('click', () => { seedInput.value = ''; });
          seedRow.appendChild(seedLabel); seedRow.appendChild(seedInput); seedRow.appendChild(clearSeedBtn);
          const saveBtn = document.createElement('button'); saveBtn.className = 'ht-btn ht-btn-primary ht-btn-sm'; saveBtn.textContent = 'Save';
          const cancelBtn = document.createElement('button'); cancelBtn.className = 'ht-btn ht-btn-secondary ht-btn-sm'; cancelBtn.textContent = 'Cancel';
          const finish = () => { editForm.remove(); leftEl.style.display = ''; actionsEl.style.display = ''; };
          const targetRow = document.createElement('div'); targetRow.style.cssText = 'display:flex;align-items:center;gap:6px;width:100%;margin-top:4px;flex-wrap:wrap;';
          const targetLabel = document.createElement('span'); targetLabel.style.cssText = 'font-size:11px;color:#8a7e6a;white-space:nowrap;'; targetLabel.innerHTML = `${htIcon('target')} Daily target:`;
          const targetInput = document.createElement('input'); targetInput.type = 'number'; targetInput.className = 'ht-input'; targetInput.style.cssText = 'width:60px;flex-shrink:0;'; targetInput.placeholder = '—'; targetInput.min = 0; targetInput.value = habit.target > 0 ? habit.target : ''; targetInput.title = 'Set a number target (e.g. 10 pushups). Leave blank for a simple checkbox.';
          const unitInput = document.createElement('input'); unitInput.className = 'ht-input'; unitInput.style.cssText = 'flex:1;min-width:60px;'; unitInput.placeholder = 'unit (e.g. mins, reps)'; unitInput.value = habit.unit || '';
          const clearTargetBtn = document.createElement('button'); clearTargetBtn.className = 'ht-btn ht-btn-secondary ht-btn-sm'; clearTargetBtn.innerHTML = htIcon('x'); clearTargetBtn.title = 'Clear target (back to checkbox)'; clearTargetBtn.addEventListener('click', () => { targetInput.value = ''; unitInput.value = ''; });
          targetRow.appendChild(targetLabel); targetRow.appendChild(targetInput); targetRow.appendChild(unitInput); targetRow.appendChild(clearTargetBtn);
          saveBtn.addEventListener('click', (e) => { e.stopPropagation(); const newName = nameInput.value.trim(); if (!newName) return; habit.name = newName; habit.categoryId = catSel.value; habit.seedDate = seedInput.value || null; const rawTarget = targetInput.value.trim(); const tVal = rawTarget === '' ? 0 : parseInt(rawTarget, 10); habit.target = (Number.isInteger(tVal) && tVal > 0) ? tVal : 0; habit.unit = unitInput.value.trim() || null; finish(); renderHabits(); });
          cancelBtn.addEventListener('click', (e) => { e.stopPropagation(); finish(); });
          editForm.addEventListener('click', (e) => e.stopPropagation());
          [nameInput, targetInput, unitInput].forEach(inp => inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') saveBtn.click(); if (e.key === 'Escape') cancelBtn.click(); }));
          editForm.appendChild(nameInput); editForm.appendChild(catSel); editForm.appendChild(saveBtn); editForm.appendChild(cancelBtn); editForm.appendChild(targetRow); editForm.appendChild(seedRow);
          item.insertBefore(editForm, actionsEl); nameInput.focus(); nameInput.select();
        });
        item.querySelector('[data-action="archive-habit"]').addEventListener('click', () => { habit.archived = true; renderHabits(); renderArchive(); });
        item.querySelector('[data-action="del-habit"]').addEventListener('click', () => { if (!confirm(`Permanently delete "${habit.name}"? This cannot be undone.\n\nTip: use Archive instead to keep your history.`)) return; const idx = draft.habits.findIndex(h => h.id === habit.id); if (idx >= 0) draft.habits.splice(idx, 1); renderHabits(); renderArchive(); });
        habitList.appendChild(item);
      }
      if (sorted.length === 0) habitList.innerHTML = '<div style="font-size:12px;color:#8a7e6a;padding:8px 0;">No active habits. Add one below.</div>';
      renderArchive();
    };
    renderHabits();

    const addHabitRow = document.createElement('div'); addHabitRow.className = 'ht-add-row';
    const catSelect = document.createElement('select'); catSelect.className = 'ht-select'; catSelect.id = 'ht-new-habit-cat';
    refreshCatSelect = () => {
      catSelect.innerHTML = '';
      if (draft.categories.length === 0) { const opt = document.createElement('option'); opt.value = ''; opt.textContent = '(add a category first)'; catSelect.appendChild(opt); }
      else { for (const cat of draft.categories) { const opt = document.createElement('option'); opt.value = cat.id; opt.textContent = cat.name || ''; catSelect.appendChild(opt); } }
    };
    refreshCatSelect();
    const habitNameInput = document.createElement('input'); habitNameInput.className = 'ht-input'; habitNameInput.placeholder = 'Habit name (e.g. Read)';
    const addHabitBtn = document.createElement('button'); addHabitBtn.className = 'ht-btn ht-btn-primary ht-btn-sm'; addHabitBtn.textContent = 'Add';
    addHabitBtn.addEventListener('click', () => { const name = habitNameInput.value.trim(), catId = catSelect.value; if (!name || !catId) return; draft.habits.push({ id: htGenId(), name, categoryId: catId, order: draft.habits.filter(h=>h.categoryId===catId).length }); habitNameInput.value = ''; renderHabits(); });
    habitNameInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') addHabitBtn.click(); });
    addHabitRow.appendChild(catSelect); addHabitRow.appendChild(habitNameInput); addHabitRow.appendChild(addHabitBtn);
    container.appendChild(addHabitRow);
  }

  async _cleanEmptyLogs() {
    if (!this._collection) return;
    const records = await this._collection.getAllRecords();
    const toDelete = [];
    for (const r of records) {
      const name = r.getName?.() || ''; if (!name.startsWith('log-')) continue;
      try {
        const raw = this._readDataProp(r); if (!raw) { toDelete.push(r); continue; }
        const d = JSON.parse(raw);
        const hasCompletions = d.completions && Object.keys(d.completions).length > 0, hasCatDone = d.categoryDone && Object.keys(d.categoryDone).length > 0, hasNotesInJson = d.notes != null && String(d.notes).trim() !== '', hasNotesProp = String(this._readNotesProp(r) || '').trim() !== '';
        if (!hasCompletions && !hasCatDone && !hasNotesInJson && !hasNotesProp) toDelete.push(r);
      } catch(e) { toDelete.push(r); }
    }
    if (toDelete.length === 0) { this.ui.addToaster({ title: 'No empty log records found', autoDestroyTime: 3000 }); return; }
    if (!confirm(`Delete ${toDelete.length} empty log records?`)) return;
    this.ui.addToaster({ title: `Deleting ${toDelete.length} empty records…`, autoDestroyTime: 3000 });
    for (const r of toDelete) { try { await r.delete?.(); } catch(e) { try { r.prop('data')?.set?.('{"date":"","completions":{},"categoryDone":{}}'); } catch(e2) {} } await htSleep(30); }
    this.ui.addToaster({ title: `Deleted ${toDelete.length} empty log records`, autoDestroyTime: 4000 });
    this.refreshAllPanels();
  }


}