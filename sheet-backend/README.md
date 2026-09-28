# Team sheet sync (optional shared backend)

By default this page is peer-to-peer: entries live in each browser and travel
via "Copy my link". The optional sheet sync makes one shared team view.

## Setup (one time, ~3 minutes)

1. Create a Google Sheet in the Czarnowski Google Workspace (any name, e.g.
   "UNBOUND 2027 conflicts").
2. In the sheet: **Extensions > Apps Script**. Replace the contents of
   `Code.gs` with `sheet-backend/Code.gs` from this repo. Save.
3. **Deploy > New deployment > Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Authorize when prompted, then copy the **/exec** URL.
4. Open the published page, scroll to **Team sheet sync**, paste the /exec
   URL, click **Connect**.

## Behavior

- Your name + conflicts upsert to the sheet ~1s after each edit (one row per
  person; last write wins per person).
- Everyone else's rows load on page open and merge into Team view.
- "Copy my link" still works as an offline snapshot/backup path.
- Disconnect clears the endpoint for your browser only.
