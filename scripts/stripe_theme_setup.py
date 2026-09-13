"""Create the Stripe products, prices and Payment Links for the Classic &
Modern theme licences, and print the links to paste into products.html.

Safe to re-run: products are found by their `lookup` metadata, so running it
twice does not create duplicates. Run against the sandbox first; when the
live account is ready, run it again with `--live` and the same script does
the same thing there.

    python scripts/stripe_theme_setup.py            # sandbox / test mode
    python scripts/stripe_theme_setup.py --live     # live mode

Uses the Stripe CLI (`stripe`) for authentication, so no key is stored here.
Windows note: MSYS_NO_PATHCONV stops Git Bash mangling the /v1/... paths.
"""

import json
import os
import subprocess
import sys

# Stripe is merchant of record on this account (Managed Payments), so every
# product must carry a tax code: downloadable software, personal or business.
PERSONAL, BUSINESS = "txcd_10202000", "txcd_10202003"

TIERS = [
    ("personal",   "Classic & Modern — Personal licence",   3900, PERSONAL,
     "Use the theme on one website of your own. Full source and documentation."),
    ("commercial", "Classic & Modern — Commercial licence", 9900, BUSINESS,
     "Use the theme on websites you build for paying clients. Unlimited projects."),
    ("extended",   "Classic & Modern — Extended licence",   29900, BUSINESS,
     "Include the theme inside a product you sell on."),
]

# Where Stripe sends the buyer after paying. The Pages Function behind this
# page checks the session is paid before it hands over the zip.
THANKS_URL = "https://smoald.com/templates-thanks?session_id={CHECKOUT_SESSION_ID}"

LIVE = "--live" in sys.argv


def stripe(*args):
    env = dict(os.environ, MSYS_NO_PATHCONV="1")
    cmd = ["stripe", *args]
    if LIVE:
        # Live writes prompt "are you sure?"; --confirm answers it so the
        # output is JSON rather than a question.
        cmd += ["--live", "--confirm"]
    # encoding="utf-8": the CLI prints UTF-8, and without this Windows
    # decodes it as cp1252 and the em-dash in the product names is mangled.
    out = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", env=env)
    if out.returncode != 0:
        raise SystemExit(f"stripe {' '.join(args)}\n{out.stderr or out.stdout}")
    try:
        data = json.loads(out.stdout)
    except json.JSONDecodeError:
        raise SystemExit(f"stripe {' '.join(args)} did not return JSON:\n{out.stdout}\n{out.stderr}")
    if "error" in data:
        raise SystemExit(f"stripe {' '.join(args)}\n{json.dumps(data['error'], indent=2)}")
    return data


def find_product(lookup):
    """By metadata first; failing that by name, so products made by hand in
    the dashboard get adopted (and stamped) rather than duplicated."""
    res = stripe("get", "/v1/products", "-d", "active=true", "-d", "limit=100")
    for p in res["data"]:
        if p["metadata"].get("lookup") == lookup:
            return p
    for p in res["data"]:
        name = p["name"].lower()
        # No dash in the test: the dashboard name has an em-dash that some
        # consoles mangle, and "classic" + "<tier> licence" is enough.
        if name.startswith("classic") and f"{lookup} licence" in name:
            return stripe("post", f"/v1/products/{p['id']}",
                          "-d", f"metadata[lookup]={lookup}",
                          "-d", "metadata[product]=classic-modern-theme")
    return None


def retire_old(product_ids, keep_prices):
    """Deactivate any other live link or price for these products, so the
    old price cannot still be bought through a link someone bookmarked."""
    res = stripe("get", "/v1/payment_links", "-d", "active=true", "-d", "limit=100")
    for link in res["data"]:
        items = stripe("get", f"/v1/payment_links/{link['id']}/line_items")
        prices = {li["price"]["id"] for li in items["data"]}
        products = {li["price"]["product"] for li in items["data"]}
        if products & product_ids and not prices & keep_prices:
            stripe("post", f"/v1/payment_links/{link['id']}", "-d", "active=false")
            print(f"retired link  {link['id']}  {link['url']}")
    for pid in product_ids:
        for price in stripe("get", "/v1/prices", "-d", f"product={pid}", "-d", "active=true")["data"]:
            if price["id"] not in keep_prices:
                stripe("post", f"/v1/prices/{price['id']}", "-d", "active=false")
                print(f"retired price {price['id']}  £{price['unit_amount']/100:.2f}")


def find_price(product_id, amount):
    res = stripe("get", "/v1/prices", "-d", f"product={product_id}", "-d", "active=true")
    for p in res["data"]:
        if p["unit_amount"] == amount and p["currency"] == "gbp":
            return p
    return None


def find_link(price_id):
    res = stripe("get", "/v1/payment_links", "-d", "active=true", "-d", "limit=100")
    for link in res["data"]:
        items = stripe("get", f"/v1/payment_links/{link['id']}/line_items")
        if any(li["price"]["id"] == price_id for li in items["data"]):
            return link
    return None


def main():
    mode = "LIVE" if LIVE else "test"
    acct = stripe("get", "/v1/account")
    print(f"account {acct['id']} ({acct['settings']['dashboard']['display_name']}), {mode} mode\n")

    links, product_ids, keep_prices = {}, set(), set()
    for lookup, name, amount, tax_code, desc in TIERS:
        product = find_product(lookup) or stripe(
            "post", "/v1/products",
            "-d", f"name={name}", "-d", f"description={desc}", "-d", f"tax_code={tax_code}",
            "-d", f"metadata[lookup]={lookup}", "-d", "metadata[product]=classic-modern-theme",
        )
        if product.get("tax_code") != tax_code:
            product = stripe("post", f"/v1/products/{product['id']}", "-d", f"tax_code={tax_code}")
        price = find_price(product["id"], amount) or stripe(
            "post", "/v1/prices",
            "-d", f"product={product['id']}", "-d", "currency=gbp",
            "-d", f"unit_amount={amount}", "-d", "tax_behavior=inclusive",
        )
        # The product's default price must move to the new one before the
        # old price can be archived; Stripe refuses to archive a default.
        if product.get("default_price") != price["id"]:
            product = stripe("post", f"/v1/products/{product['id']}", "-d", f"default_price={price['id']}")
        link = find_link(price["id"]) or stripe(
            "post", "/v1/payment_links",
            "-d", f"line_items[0][price]={price['id']}", "-d", "line_items[0][quantity]=1",
            "-d", f"metadata[tier]={lookup}", "-d", "metadata[product]=classic-modern-theme",
        )
        # Whether new or adopted, the link must send the buyer to the download
        # page — an adopted one may still end on a "I'll email you" message.
        redirect = link.get("after_completion", {}).get("redirect", {}).get("url")
        if redirect != THANKS_URL or link.get("metadata", {}).get("product") != "classic-modern-theme":
            link = stripe(
                "post", f"/v1/payment_links/{link['id']}",
                "-d", "after_completion[type]=redirect",
                "-d", f"after_completion[redirect][url]={THANKS_URL}",
                "-d", f"metadata[tier]={lookup}", "-d", "metadata[product]=classic-modern-theme",
            )
        if "url" not in link:
            raise SystemExit(json.dumps(link, indent=2))
        links[lookup] = link["url"]
        product_ids.add(product["id"])
        keep_prices.add(price["id"])
        print(f"{lookup:<11} £{amount/100:>6.2f}  {product['id']}  {price['id']}\n            {link['url']}")

    print()
    retire_old(product_ids, keep_prices)
    print("\nPaste into products.html:")
    print(json.dumps(links, indent=2))


if __name__ == "__main__":
    main()
