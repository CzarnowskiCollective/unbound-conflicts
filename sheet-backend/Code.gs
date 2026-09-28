/** UNBOUND 2027 conflicts - Google Sheet backend.
 * 1. Create a Google Sheet (any name).
 * 2. Extensions > Apps Script, replace Code.gs with this file, Save.
 * 3. Deploy > New deployment > Web app:
 *      Execute as: Me
 *      Who has access: Anyone
 *    Copy the /exec URL.
 * 4. Open the published page, paste the URL into "Team sheet sync" > Connect.
 */
var SHEET = 'People';

function sheet_() {
  var ss = SpreadsheetApp.getActive();
  var sh = ss.getSheetByName(SHEET);
  if (!sh) { sh = ss.insertSheet(SHEET); sh.appendRow(['Name', 'Slots', 'Updated']); }
  return sh;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  var sh = sheet_();
  var rows = sh.getDataRange().getValues();
  var people = [];
  for (var i = 1; i < rows.length; i++) {
    var n = String(rows[i][0] || '').trim();
    if (!n) continue;
    people.push({ n: n, k: String(rows[i][1] || '').split(',').filter(String), updated: rows[i][2] || null });
  }
  return json_({ people: people });
}

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents || '{}');
    var n = String(body.n || '').trim();
    if (!n) return json_({ ok: false, error: 'name required' });
    var k = (body.k || []).join(',');
    var sh = sheet_();
    var rows = sh.getDataRange().getValues();
    for (var i = 1; i < rows.length; i++) {
      if (String(rows[i][0] || '').trim() === n) {
        sh.getRange(i + 1, 2, 1, 2).setValues([[k, new Date()]]);
        return json_({ ok: true });
      }
    }
    sh.appendRow([n, k, new Date()]);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}
