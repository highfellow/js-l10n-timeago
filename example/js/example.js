// script to generate example <time> elements in the document.

requirejs(["timeago", "l10n", "l10n-browser"], function(timeago, l10n, l10nBrowser) {
  $(function() {
    var l = l10n.get;
    var lang;

    function relDateString(millis) {
      var curDate = new Date();
      var relDate = new Date(curDate.getTime() - millis);
      return relDate.toISOString();
    }

    function makeTimeElt(mins) {
      return '<time class="timeago" dateTime="' + 
        relDateString(mins * 60000) + '"></time>';
    }

    function renderLocale() {
      var localeDiv = $("<div>").appendTo($("#content"));
      localeDiv.append("<h2>" + l('langHeader') + "</h2>");
      localeDiv.append("<p>" + l('rolloverMessage') + "</p>");
      var table = $("<table>").appendTo(localeDiv);
      table.append("<thead><tr><th>" + l('unit') + "</th><th>" + l('unitMinutes') + "</th><th>" + l('now') + "</th><th>+ 1</th><th>+ 1.5</th><th>" + l('next') + " -1.5</th><th>" + l('next') + " -0.5</th></tr><thead>");
      var tbody = $("<tbody>").appendTo(table);
      var l10nUnits = $.fn.timeago.defaults.l10nUnits;
      var unit = 0;
      while (unit < l10nUnits.length) {
        var l10nUnit = l10nUnits[unit];
        var unitMillis = l10nUnit.minutes * 60000;
        var rowStr = '<tr><td>' + l('unit' + l10nUnit.l10nUnit) + '</td><td>' + l10nUnit.minutes + '</td><td>';
        if (unit === 0) rowStr += makeTimeElt(0);
        var mins = (unit === 0) ? 0 : l10nUnit.minutes - (l10nUnits[unit - 1].baseMinutes * 0.5) - 1;
        rowStr += '</td><td>' + makeTimeElt(mins) + '</td>';
        mins = (unit !== l10nUnits.length - 1) ? (l10nUnit.baseMinutes * 1.5) - 1: (l10nUnit.minutes * 1.5) - 1;
        rowStr += '<td>' + makeTimeElt(mins) + '</td>';
        if (unit < l10nUnits.length - 1) {
          rowStr += '<td>' + makeTimeElt((l10nUnits[unit].base[0] - 1.5) * (l10nUnits[unit + 1].minutes / l10nUnits[unit].base[0]) - 1) + '</td>';
          rowStr += '<td>' + makeTimeElt((l10nUnits[unit].base[0] - 0.5) * (l10nUnits[unit + 1].minutes / l10nUnits[unit].base[0]) - 1) + '</td>';
        } else {
          rowStr += '<td></td><td></td>';
        }
        rowStr += '</tr>';
        tbody.append($(rowStr));
        unit++;
      }
    }
    
    if (typeof(navigator.browserLanguage) !== 'undefined') {
      // handle IE.
      lang = navigator.browserLanguage;
    } else {
      // everyone else
      lang = navigator.language;
    }
    l10n.setAdapter(l10nBrowser, {baseURL: "locales/"});
    l10n.loadResource('data.properties', lang , function() {
      renderLocale();
      $('body').timeago();
    });
      
  });
});

