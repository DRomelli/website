(function () {
  "use strict";
  var METRIC = ["submission_to_first_decision", "decision_after_review",
                "submission_to_acceptance", "acceptance_to_online"];
  var COLS = [
    { k: "rank", t: "RePEc #", num: true },
    { k: "name", t: "Journal", num: false },
    { k: "publisher", t: "Publisher", num: false },
    { k: "impact_factor", t: "Impact factor", num: true },
    { k: "submission_to_first_decision", t: "Sub → 1st decision", num: true },
    { k: "submission_to_acceptance", t: "Sub → acceptance", num: true }
  ];
  var PUB = { red: "Elsevier", anr: "Annual Reviews", cem: "Taylor & Francis",
              pal: "Palgrave Macmillan", sae: "SAGE Publishing", bpj: "De Gruyter",
              tpr: "MIT Press" };
  var ALL = [], sortK = "rank", sortDir = 1;
  var root = document.getElementById("ji");
  if (!root) return;
  var q = root.querySelector("#ji-q"), pub = root.querySelector("#ji-pub"),
      td = root.querySelector("#ji-td"), tb = root.querySelector("#ji-tb"),
      hr = root.querySelector("#ji-hr"), cnt = root.querySelector("#ji-count");

  function pubName(j) { return PUB[j.publisher] || j.publisher; }
  function val(j, k) {
    if (k === "impact_factor") return j.impact_factor ? j.impact_factor.value : null;
    if (METRIC.indexOf(k) >= 0) return j.metrics[k] ? j.metrics[k].value : null;
    if (k === "publisher") return pubName(j);
    return j[k];
  }
  function cell(j, k) {
    var m = '<span class="ji-muted">—</span>';
    if (k === "impact_factor") return j.impact_factor ? j.impact_factor.raw : m;
    if (METRIC.indexOf(k) >= 0) return j.metrics[k] ? j.metrics[k].value : m;
    if (k === "publisher") return pubName(j);
    if (k === "name") {
      var url = j.source_url || j.repec_url;
      return url ? '<a class="ji-jn" href="' + url + '" target="_blank" rel="noopener">' + j.name + "</a>" : j.name;
    }
    return j[k];
  }
  function hasTL(j) { return METRIC.some(function (k) { return j.metrics[k]; }); }

  function head() {
    hr.innerHTML = COLS.map(function (c) {
      var a = c.k === sortK ? (sortDir === 1 ? " ▲" : " ▼") : "";
      return '<th class="' + (c.num ? "n" : "") + '" data-k="' + c.k + '">' + c.t + a + "</th>";
    }).join("");
    Array.prototype.forEach.call(hr.children, function (th) {
      th.onclick = function () {
        var k = th.getAttribute("data-k");
        if (k === sortK) sortDir *= -1; else { sortK = k; sortDir = 1; }
        render();
      };
    });
  }
  function render() {
    var term = q.value.trim().toLowerCase(), pv = pub.value, only = td.checked;
    var rows = ALL.filter(function (j) {
      if (pv && pubName(j) !== pv) return false;
      if (only && !hasTL(j)) return false;
      if (term && (j.name + " " + pubName(j)).toLowerCase().indexOf(term) < 0) return false;
      return true;
    }).sort(function (a, b) {
      var x = val(a, sortK), y = val(b, sortK);
      if (x == null && y == null) return a.rank - b.rank;
      if (x == null) return 1; if (y == null) return -1;
      if (typeof x === "number") return (x - y) * sortDir;
      return String(x).localeCompare(String(y)) * sortDir;
    });
    tb.innerHTML = rows.map(function (j) {
      return "<tr>" + COLS.map(function (c) {
        return '<td class="' + (c.num ? "n" : "") + '">' + cell(j, c.k) + "</td>";
      }).join("") + "</tr>";
    }).join("");
    cnt.textContent = rows.length + " of " + ALL.length + " journals";
    head();
  }
  function init() {
    var ps = ALL.map(pubName).filter(function (v, i, a) { return a.indexOf(v) === i; }).sort();
    pub.innerHTML = '<option value="">All publishers</option>' +
      ps.map(function (p) { return "<option>" + p + "</option>"; }).join("");
    q.oninput = render; pub.onchange = render; td.onchange = render;
    render();
  }
  fetch("registry.json").then(function (r) { return r.json(); })
    .then(function (d) { ALL = d; init(); })
    .catch(function () { root.querySelector("#ji-count").textContent = "Could not load data."; });
})();
