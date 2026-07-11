---
title: 'Central Bank Involvement in Supervision (CBIS) Index'
author: Davide Romelli
date: '2026-07-10'
slug: cbis
design:
  spacing:
    padding: ["20px", "0", "20px", "0"]
---

<style>
.article-container{max-width:1340px!important}   /* widen the theme column on this page so the map + country list sit side by side */
.article-container h1{text-align:center;margin-bottom:2px}   /* centre the page title */
.cbisapp header{padding-top:4px}                            /* tighten the gap between title and subtitle */
@scope (.cbisapp) {

  :scope{
    --bg:#ffffff; --fg:#1a1f2b; --muted:#5b6472; --line:#e3e7ee; --panel:#f7f9fc;
    --accent:#b8542a; --shadow:0 1px 3px rgba(20,30,50,.08),0 8px 24px rgba(20,30,50,.06);
    /* CBIS ramp — greens (distinct from any water tone) */
    --c1:#edf8e9; --c2:#c7e9c0; --c3:#a1d99b; --c4:#74c476; --c5:#31a354; --c6:#006d2c;
  }
  @media (prefers-color-scheme: dark){
    :scope{ --bg:#0f1420; --fg:#e7ecf5; --muted:#9aa5b6; --line:#232b3b; --panel:#151c2b;
      --accent:#ff9e6e;
      --c1:#20402b; --c2:#2c6b40; --c3:#3a9257; --c4:#4cbf72; --c5:#74dd94; --c6:#a6f0bd; }
  }
  :scope *{box-sizing:border-box}
  :scope{margin:0;background:var(--bg);color:var(--fg);
    font:15px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif}
  a{color:var(--accent)}
  header{padding:22px 26px 8px;text-align:center}
  h1{font-size:22px;margin:0 0 3px;letter-spacing:-.01em}
  .sub{color:var(--muted);font-size:13.5px;max-width:70ch;margin:0 auto}
  body.embed h1,body.embed .sub{display:none}      /* embedded in a site page: it supplies the title */
  body.embed header{padding:14px 26px 4px}
  .wrap{display:grid;grid-template-columns:1fr 340px;gap:18px;padding:12px 26px 26px;align-items:start}
  @media (max-width:900px){.wrap{grid-template-columns:1fr}}
  .mapcard{position:relative;background:var(--panel);border:1px solid var(--line);
    border-radius:14px;box-shadow:var(--shadow);overflow:hidden}
  .yearhint{padding:11px 16px 0;font-size:12px;color:var(--muted)}
  .yearbar{display:flex;align-items:center;gap:12px;padding:9px 16px 11px;border-bottom:1px solid var(--line)}
  .playbtn{flex:0 0 auto;width:34px;height:34px;border-radius:50%;border:1px solid var(--accent);
    background:var(--accent);color:#fff;font-size:13px;cursor:pointer;display:flex;align-items:center;justify-content:center}
  .playbtn:hover{opacity:.9}
  .yearbar input[type=range]{flex:1;accent-color:var(--accent);cursor:pointer;height:4px}
  .yearlbl{flex:0 0 auto;font-variant-numeric:tabular-nums;font-weight:800;font-size:19px;
    min-width:3.4ch;text-align:right;letter-spacing:-.01em}
  svg{display:block;width:100%;height:auto}
  .ocean{fill:transparent;stroke:var(--line);stroke-width:.6}
  .hatchline{stroke:var(--muted);stroke-width:1;opacity:.55}
  .country{stroke:var(--bg);stroke-width:.4;cursor:pointer;transition:opacity .12s}
  .country.nodata{cursor:default}
  .country:hover{opacity:.78}
  .country.sel{stroke:var(--accent);stroke-width:1.6}
  .legendbar{display:flex;flex-wrap:wrap;align-items:center;gap:7px 16px;
    padding:10px 16px;border-top:1px solid var(--line)}
  .ltitle{font-size:11px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.04em;line-height:1.15}
  .ltitle small{display:block;font-weight:400;text-transform:none;letter-spacing:0;font-size:10px}
  .legitems{display:flex;flex-wrap:wrap;gap:6px 14px;align-items:center}
  .lrow{display:flex;align-items:center;gap:6px;white-space:nowrap;font-size:12px}
  .sw{width:14px;height:14px;border-radius:3px;flex:0 0 auto}
  .tip{position:fixed;pointer-events:none;background:var(--fg);color:var(--bg);
    padding:5px 9px;border-radius:7px;font-size:12.5px;opacity:0;transition:opacity .1s;z-index:9}
  aside{position:sticky;top:12px;display:flex;flex-direction:column;gap:12px}
  .box{background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:15px 16px;box-shadow:var(--shadow)}
  .search{width:100%;padding:9px 11px;border:1px solid var(--line);border-radius:9px;
    background:var(--bg);color:var(--fg);font-size:14px}
  .hits{list-style:none;margin:6px 0 0;padding:0;max-height:190px;overflow:auto}
  .hits li{padding:6px 8px;border-radius:7px;cursor:pointer;font-size:13.5px;display:flex;justify-content:space-between;gap:8px}
  .hits li:hover{background:var(--line)}
  .pill{font-size:11px;font-weight:700;color:#fff;border-radius:20px;padding:1px 8px;flex:0 0 auto}
  .picktitle{font-size:15px;font-weight:650;margin:0 0 2px}
  .pickdesc{color:var(--muted);font-size:13px;margin:0 0 10px}
  #panel[hidden]{display:none}
  #panel .cty{font-size:18px;font-weight:650;margin:0 0 2px}
  #panel .cbis{display:inline-flex;align-items:center;gap:8px;margin:6px 0 10px}
  #panel .score{font-size:26px;font-weight:800;color:#fff;border-radius:10px;padding:2px 12px;line-height:1.25}
  #panel .desc{color:var(--muted);font-size:13px}
  .sect{border-top:1px solid var(--line);padding-top:10px;margin-top:10px}
  .sect h4{margin:0 0 3px;font-size:11.5px;text-transform:uppercase;letter-spacing:.05em;color:var(--muted)}
  .sect .who{font-size:13.5px}
  .sect .meta{font-size:11.5px;color:var(--muted);margin-top:1px}
  .cbrow{display:inline-block;font-size:11px;font-weight:700;padding:0 6px;border-radius:5px;margin-top:3px}
  .yes{background:rgba(42,93,176,.15);color:var(--accent)}
  .no{background:var(--line);color:var(--muted)}
  .dl{display:flex;flex-wrap:wrap;gap:8px;margin-top:9px;justify-content:center}
  .dl a{font-size:12.5px;text-decoration:none;border:1px solid var(--line);border-radius:8px;
    padding:5px 10px;color:var(--fg);background:var(--bg)}
  .dl a:hover{border-color:var(--accent);color:var(--accent)}
  .hatchsw{background:repeating-linear-gradient(45deg,transparent,transparent 2px,var(--muted) 2px,var(--muted) 3px);opacity:.75}
  .downloads{padding:2px 26px 30px;text-align:center}
  .downloads h2{font-size:18px;margin:0 0 12px;letter-spacing:-.01em}
  .dgrid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
  @media(max-width:760px){.dgrid{grid-template-columns:1fr}}
  .dcard{background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:16px 20px;
    box-shadow:var(--shadow);width:fit-content;max-width:100%;margin:0 auto;text-align:center}
  .dcard h3{margin:0 0 4px;font-size:15px}
  .dcard h3 span{font-weight:400;color:var(--muted);font-size:12.5px;margin-left:6px}
  .dcard p{margin:0 0 12px;color:var(--muted);font-size:13px;line-height:1.45}
  .dcard .dl a{font-size:13.5px;padding:8px 15px;font-weight:600}
  .cred{margin-top:9px;display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;font-size:13.5px;color:var(--muted)}
  .cred a{font-weight:600}
  .upd{font-size:12.5px}
  .citebtn{border:1px solid var(--accent);color:var(--accent);background:var(--bg);border-radius:9px;
    padding:5px 12px;font-size:13px;font-weight:600;cursor:pointer;white-space:nowrap}
  .citebtn:hover{background:var(--accent);color:#fff}
  .modal{position:fixed;inset:0;background:rgba(10,15,25,.55);display:flex;align-items:center;
    justify-content:center;z-index:20;padding:20px}
  .modal[hidden]{display:none}
  .modalbox{background:var(--bg);border:1px solid var(--line);border-radius:14px;max-width:640px;
    width:100%;box-shadow:var(--shadow);padding:18px 20px 20px}
  .modalhd{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}
  .modalhd b{font-size:16px}
  .modalhd .x{border:none;background:none;font-size:20px;line-height:1;cursor:pointer;color:var(--muted)}
  .citeblock{margin:13px 0 0}
  .citelbl{display:flex;justify-content:space-between;align-items:center;font-size:11px;
    text-transform:uppercase;letter-spacing:.05em;color:var(--muted);margin-bottom:5px}
  .copy{font-size:11.5px;border:1px solid var(--line);border-radius:7px;padding:3px 10px;
    background:var(--bg);color:var(--fg);cursor:pointer}
  .copy:hover{border-color:var(--accent);color:var(--accent)}
  .citetext{background:var(--panel);border:1px solid var(--line);border-radius:9px;padding:10px 12px;
    font-size:13px;line-height:1.5;white-space:pre-wrap;overflow-x:auto;margin:0}
  pre.citetext{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px}
  .foot{color:var(--muted);font-size:12px;padding:0 26px 30px;max-width:80ch}
  code{background:var(--line);padding:1px 5px;border-radius:4px;font-size:12px}

}
</style>
<div class="cbisapp">
<header>
  
  <div class="sub">Who supervises banks, insurers and securities markets — and how much of it sits inside the central bank —
  for 161 jurisdictions, 1996–2025. Updated July 2026.</div>
  <div class="cred">Based on
    <a href="https://www.sciencedirect.com/science/article/abs/pii/S0176268016301380" target="_blank" rel="noopener">Masciandaro &amp; Romelli (2018)</a>
    <button id="citeBtn" class="citebtn">❝ Cite</button>
  </div>
</header>
<section class="downloads">
  <div class="dcard">
    <h3>Download the data <span>full panel · country × year, 1996–2025</span></h3>
    <div class="dl">
      <a href="/cbis-map/cbis_panel.xlsx" download>Excel</a>
      <a href="/cbis-map/cbis_panel.dta" download>Stata</a>
      <a href="/cbis-map/cbis_panel.csv" download>CSV</a>
      <a href="/cbis-map/cbis_panel.rds" download>R</a>
    </div>
  </div>
</section>
<div class="wrap">
  <div class="mapcard">
    <div class="yearhint">Drag the year slider or press ▶ to watch the evolution</div>
    <div class="yearbar">
      <button id="play" class="playbtn" aria-label="Play through the years">▶</button>
      <input id="year" type="range" min="1996" max="2025" value="2025" step="1" aria-label="Year">
      <output id="yearlbl" class="yearlbl">2025</output>
    </div>
    <svg id="map" viewBox="0 0 960 500" preserveAspectRatio="xMidYMid meet"></svg>
    <div class="legendbar">
      <span class="ltitle">CBIS Index<small>Masciandaro &amp; Romelli (2018)</small></span>
      <div id="leg" class="legitems"></div>
    </div>
  </div>
  <aside>
    <div class="box">
      <div class="picktitle">Select a country</div>
      <div class="pickdesc">Click the map or use search to see the supervisory architecture and CBIS score.</div>
      <input id="q" class="search" placeholder="Search a country…" autocomplete="off">
      <ul id="hits" class="hits"></ul>
    </div>
    <div class="box" id="panel" hidden></div>
  </aside>
</div>
<div class="modal" id="citeModal" hidden>
  <div class="modalbox">
    <div class="modalhd"><b>Cite this dataset</b><button class="x" id="citeClose" aria-label="Close">✕</button></div>
    <div class="citeblock">
      <div class="citelbl">Reference <button class="copy" data-t="ref">Copy</button></div>
      <div class="citetext" id="citeRef">Masciandaro, D., &amp; Romelli, D. (2018). Central bankers as supervisors: Do crises matter? <i>European Journal of Political Economy</i>, 52, 120–140. https://doi.org/10.1016/j.ejpoleco.2017.04.008</div>
    </div>
    <div class="citeblock">
      <div class="citelbl">BibTeX <button class="copy" data-t="bib">Copy</button></div>
      <pre class="citetext" id="citeBib">@article{masciandaro2018central,
  title   = {Central bankers as supervisors: Do crises matter?},
  author  = {Masciandaro, Donato and Romelli, Davide},
  journal = {European Journal of Political Economy},
  volume  = {52},
  pages   = {120--140},
  year    = {2018},
  doi     = {10.1016/j.ejpoleco.2017.04.008}
}</pre>
    </div>
  </div>
</div>
<div class="tip" id="tip"></div>
</div>
<script src="/cbis-map/cbis.embed.js"></script>
