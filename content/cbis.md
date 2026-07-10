---
title: 'Central Bank Involvement in Supervision (CBIS) Index'
author: Davide Romelli
date: '2026-07-10'
slug: cbis
design:
  spacing:
    padding: ["20px", "0", "20px", "0"]
---

<iframe id="cbisframe" src="/cbis-map/?embed=1" title="Central Bank Involvement in Supervision — interactive map" style="width:100%;border:0;display:block;min-height:700px" scrolling="no" loading="lazy"></iframe>
<script>
(function(){
  var f = document.getElementById('cbisframe');
  function fit(){ try { var h = f.contentWindow.document.body.scrollHeight; if (h > 200) f.style.height = (h + 24) + 'px'; } catch(e){} }
  f.addEventListener('load', function(){ fit(); setTimeout(fit, 300); setTimeout(fit, 1200); });
  window.addEventListener('resize', fit);
  setInterval(fit, 1500);
})();
</script>
