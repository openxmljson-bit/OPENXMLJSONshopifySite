# Shopify CLI — setup & push guide

For this theme (`OPENXMLJSONshopifySite`) and store **xawbkz-gc.myshopify.com**.
Run all commands in your Mac's **Terminal**.

---

## 1. Install the CLI (one time)

**Option A — Homebrew (recommended on Mac):**

```bash
brew tap shopify/shopify && brew install shopify-cli
```

> The `brew tap shopify/shopify` part is required — without it Homebrew can't
> find the formula and the install fails. If `brew` itself is "command not
> found", install Homebrew first from https://brew.sh, then run the line above.

**Option B — npm** (needs Node.js 18+; check with `node -v`):

```bash
npm install -g @shopify/cli@latest
```

Verify it installed:

```bash
shopify version
```

---

## 2. Go to your theme folder

```bash
cd ~/Documents/Projects/OPENXMLJSONshopifySite
```

---

## 3. Log in (one time)

The first `shopify theme` command opens your browser to log in and pick the store.
To log in explicitly:

```bash
shopify theme list --store xawbkz-gc.myshopify.com
```

Approve access in the browser. After that you stay logged in.

---

## 4. Preview changes safely (recommended before pushing)

Runs a local dev server with a live preview URL; edits sync as you save:

```bash
shopify theme dev --store xawbkz-gc.myshopify.com
```

Open the printed `http://127.0.0.1:9292` URL. Press `Ctrl+C` to stop.

---

## 5. Push your changes to Shopify

**Safest — push to a new unpublished theme, review, then publish in admin:**

```bash
shopify theme push --unpublished --theme "OpenXmlJson dev"
```

Then in admin: Online Store → Themes → find it → Preview → **Publish** when happy.

**Push into an existing theme (pick from a list):**

```bash
shopify theme push
```

**Push straight to the LIVE theme (careful — overwrites live files):**

```bash
shopify theme push --live
```

---

## Notes for this theme

- **Pull first if you edited in the Customizer online.** The theme editor writes
  changes to Shopify. Before pushing, pull them down so you don't overwrite them:
  ```bash
  shopify theme pull --live
  ```
- The `OPENXMLJSONshopify-theme.zip` in this folder is ignored by CLI — you no
  longer need the manual zip-upload workflow once CLI is set up.
- Customer accounts: this store uses **new customer accounts**, which are hosted by
  Shopify and can't be themed via these files. The `templates/customers/*` files
  only apply if you were on classic accounts.
- Pages (pricing, about, contact, etc.) must exist in Online Store → Pages with the
  matching template assigned for their URLs to work.

---

## Typical day-to-day loop

```bash
cd ~/Documents/Projects/OPENXMLJSONshopifySite
shopify theme dev --store xawbkz-gc.myshopify.com   # preview while editing
# ...make edits...
shopify theme push --live                           # publish when ready
```
