(function () {
  var track = document.getElementById("it-track");
  if (!track) return;
  var carousel = track.closest(".it-carousel");
  var prev = carousel.querySelector(".it-arrow.prev");
  var next = carousel.querySelector(".it-arrow.next");
  var index = 0;

  function cardStep() {
    var card = track.querySelector(".it-card");
    if (!card) return 0;
    var style = getComputedStyle(track);
    var gap = parseFloat(style.columnGap || style.gap || 0) || 0;
    return card.getBoundingClientRect().width + gap;
  }
  function visibleCount() {
    var step = cardStep();
    if (!step) return 1;
    return Math.max(1, Math.floor(track.parentElement.getBoundingClientRect().width / step));
  }
  function maxIndex() {
    return Math.max(0, track.children.length - visibleCount());
  }
  function centerOffset() {
    var step = cardStep();
    if (!step) return 0;
    var vCount = visibleCount();
    var viewportW = track.parentElement.getBoundingClientRect().width;
    return Math.max(0, (viewportW - vCount * step) / 2);
  }
  function update() {
    var step = cardStep();
    var offset = centerOffset();
    track.style.transform = "translateX(" + (offset - index * step) + "px)";
  }
  function go(dir) {
    var max = maxIndex();
    index += dir;
    if (index > max) index = 0;
    if (index < 0) index = max;
    update();
  }
  prev.addEventListener("click", function () {
    go(-1);
  });
  next.addEventListener("click", function () {
    go(1);
  });
  window.addEventListener("resize", update);

  // Swipe support
  var startX = null;
  track.addEventListener(
    "touchstart",
    function (e) {
      startX = e.touches[0].clientX;
    },
    { passive: true },
  );
  track.addEventListener("touchend", function (e) {
    if (startX === null) return;
    var dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    startX = null;
  });

  // Ensure autoplay starts
  track.querySelectorAll("video").forEach(function (v) {
    v.muted = true;
    var p = v.play();
    if (p && p.catch) p.catch(function () {});
  });

  // Center the initial view
  update();
})();

const productShapes = {
  trace: `<svg viewBox="0 0 180 230" fill="none" aria-hidden="true"><rect x="82" y="16" width="24" height="138" rx="12" fill="#667b68"/><rect x="87" y="22" width="14" height="124" rx="7" fill="#2b2924" opacity=".2"/><circle cx="94" cy="86" r="8" fill="#f7f1e9" stroke="#2b2924" stroke-width="2"/><path d="M96 150 C108 170 122 181 146 185" stroke="#667b68" stroke-width="18" stroke-linecap="round"/><rect x="28" y="174" width="122" height="24" rx="12" fill="#2b2924"/><rect x="38" y="181" width="102" height="10" rx="5" fill="#7a9dc2" opacity=".7"/><circle cx="54" cy="205" r="8" fill="#ad6580"/><circle cx="130" cy="205" r="8" fill="#ad6580"/></svg>`,
  glide: `<svg viewBox="0 0 180 230" fill="none" aria-hidden="true"><rect x="74" y="18" width="34" height="154" rx="17" fill="#2b2924"/><rect x="79" y="28" width="24" height="54" rx="12" fill="#a3b899"/><path d="M90 88 C56 122 52 150 74 178" stroke="#7a9dc2" stroke-width="12" stroke-linecap="round"/><rect x="46" y="164" width="92" height="34" rx="17" fill="#667b68"/><rect x="30" y="189" width="126" height="16" rx="8" fill="#2b2924"/><path d="M64 198 C76 212 104 212 118 198" stroke="#f8d3c5" stroke-width="5" stroke-linecap="round"/></svg>`,
  swift: `<svg viewBox="0 0 180 230" fill="none" aria-hidden="true"><rect x="66" y="94" width="48" height="104" rx="16" fill="#667b68"/><rect x="72" y="102" width="36" height="86" rx="12" fill="#f7f1e9" opacity=".35"/><ellipse cx="90" cy="88" rx="54" ry="22" fill="#2b2924"/><ellipse cx="90" cy="82" rx="44" ry="14" fill="#a3b899"/><circle cx="72" cy="82" r="4" fill="#f7f1e9"/><circle cx="90" cy="78" r="5" fill="#f7f1e9"/><circle cx="108" cy="82" r="4" fill="#f7f1e9"/><path d="M70 58 C56 40 70 28 62 14" stroke="#7a9dc2" stroke-width="4" stroke-linecap="round"/><path d="M92 52 C84 36 98 24 90 10" stroke="#7a9dc2" stroke-width="4" stroke-linecap="round"/><path d="M112 58 C126 40 112 28 120 14" stroke="#7a9dc2" stroke-width="4" stroke-linecap="round"/><circle cx="90" cy="174" r="11" fill="#2b2924"/></svg>`,
  pivot: `<svg viewBox="0 0 180 230" fill="none" aria-hidden="true"><circle cx="90" cy="82" r="62" fill="#f7f1e9" stroke="#667b68" stroke-width="5"/><circle cx="90" cy="82" r="38" fill="#dde6d5"/><g transform="translate(90 82)"><ellipse cx="0" cy="-28" rx="12" ry="26" fill="#667b68"/><ellipse cx="0" cy="-28" rx="12" ry="26" fill="#667b68" transform="rotate(120)"/><ellipse cx="0" cy="-28" rx="12" ry="26" fill="#667b68" transform="rotate(240)"/><circle cx="0" cy="0" r="11" fill="#2b2924"/></g><rect x="86" y="142" width="8" height="62" rx="4" fill="#2b2924"/><ellipse cx="90" cy="206" rx="36" ry="10" fill="#ad6580" opacity=".55"/></svg>`,
  nimbus: `<svg viewBox="0 0 180 230" fill="none" aria-hidden="true"><circle cx="90" cy="76" r="50" fill="#dde6d5" stroke="#7a9dc2" stroke-width="5"/><path d="M70 72 C74 48 106 48 110 72 C124 72 132 84 126 98 C120 112 62 112 54 98 C48 84 56 72 70 72Z" fill="#7a9dc2" opacity=".82"/><path d="M72 124 C66 138 78 144 72 158" stroke="#7a9dc2" stroke-width="4" stroke-linecap="round"/><path d="M90 126 C84 142 96 148 90 164" stroke="#7a9dc2" stroke-width="4" stroke-linecap="round"/><path d="M108 124 C102 138 114 144 108 158" stroke="#7a9dc2" stroke-width="4" stroke-linecap="round"/><rect x="84" y="132" width="12" height="70" rx="6" fill="#667b68"/><ellipse cx="90" cy="207" rx="32" ry="9" fill="#2b2924"/></svg>`,
  dawn: `<svg viewBox="0 0 180 230" fill="none" aria-hidden="true"><path d="M90 28 L48 128 H132L90 28Z" fill="#ad6580" opacity=".28"/><path d="M90 36 L58 122 H122L90 36Z" fill="#f8d3c5"/><ellipse cx="90" cy="123" rx="34" ry="10" fill="#ad6580" opacity=".62"/><circle cx="90" cy="46" r="16" fill="#fceee9" stroke="#ad6580" stroke-width="4"/><rect x="86" y="134" width="8" height="72" rx="4" fill="#2b2924"/><ellipse cx="90" cy="208" rx="38" ry="10" fill="#667b68"/></svg>`,
};

const assetUrls = {
  hero: "assets/Hero_lineup.png",
  bldc: "assets/BLDC.png",
  vacuum: "assets/Vacuum_lifestyle.png",
  glide: "assets/glide-cordless-vacuum.png",
  icy: "assets/IF.png",
  mist: "assets/Mist_fan.png",
  steamer: "assets/poise-steamer.png",
  poise: "assets/poise-steamer.png",
  silentVacuum: "assets/SVC.png",
  li1: "assets/LI_1.png",
};

const products = [
  {
    id: "bldc-fan",
    family: "Thyme Air",
    category: "air",
    name: "Orbit",
    price: "₹14,799",
    badge: "Standing Fan",
    copy: "Air circulation that feels settled beside furniture.",
    featureText: "Air circulation that feels settled beside furniture.",
    image: assetUrls.bldc,
    storyImage: assetUrls.bldc,
    heroImage: assetUrls.bldc,
    positioning: "Air circulation designed for the room.",
    subheading:
      "A floor fan shaped to live comfortably beside sofas, reading corners and everyday seating zones.",
    specs: [
      ["Format", "BLDC floor fan"],
      ["Placement", "Living room + bedroom"],
      ["Focus", "Wide room airflow"],
    ],
    featureBlocks: [
      ["Multipurpose fan", "Detaches from floor stand into tabletop fan"],
      ["Wide oscillation", "Air circulation that reaches every corner"],
      ["5 speed settings", "Variations of airflow control"],
      ["Mood lighting", "Ambient, adjustable ring light"],
      ["Sturdy support", "Weighted base for stability at all head angles"],
    ],
    gallery: [assetUrls.bldc, assetUrls.li1, assetUrls.hero],
    specifications: [
      ["Motor", "BLDC airflow system"],
      ["Body", "Charcoal finish"],
      ["Placement", "Floor standing"],
      ["Use case", "Whole-room circulation"],
      ["Control style", "Integrated physical controls"],
    ],
    care: [
      "Dust the grille and control column weekly with a dry microfiber cloth.",
      "Keep the base clear so the fan can remain stable on rugs and hard floors.",
      "Wipe down the housing before seasonal storage or room moves.",
    ],
    related: ["mist-fan", "icy-fan", "silent-vacuum-cleaner"],
  },
  {
    id: "mist-fan",
    family: "Thyme Air",
    category: "air",
    name: "Cloud",
    price: "₹2,899",
    badge: "Handheld Mist Fan",
    copy: "Cooling that stays close.",
    featureText: "Cooling that stays close.",
    image: assetUrls.mist,
    storyImage: assetUrls.mist,
    heroImage: assetUrls.mist,
    positioning: "Cooling that stays close.",
    subheading:
      "A compact mist fan designed for reading corners, workspaces, bedside tables, and the quiet moments in between.",
    specs: [
      ["Format", "Portable mist fan"],
      ["Placement", "Tabletop + balcony"],
      ["Focus", "Direct comfort cooling"],
    ],
    featureBlocks: [
      [
        "Mist-assisted cooling",
        "A fine cooling mist helps create a more comfortable personal space on warmer days.",
      ],
      [
        "Compact footprint",
        "Perfectly sized for desks, side tables, reading corners, and other everyday surfaces.",
      ],
      ["At-a-glance status", "Battery information remains visible while the fan is in use."],
      [
        "Moves with you",
        "Easy to carry on your work commute, across rooms, in a concert line, and much more.",
      ],
    ],
    gallery: [assetUrls.mist, assetUrls.hero, assetUrls.bldc],
    specifications: [
      ["Cooling", "Mist + airflow"],
      ["Body", "Portable vertical cylinder"],
      ["Use case", "Focused cooling"],
      ["Display", "Battery percentage readout"],
      ["Placement", "Desktop or side table"],
    ],
    care: [
      "Empty and dry the water chamber after regular use.",
      "Wipe the clear front ring to keep the mist path visible.",
      "Store upright in a dry place when moving between rooms.",
    ],
    related: ["icy-fan", "bldc-fan", "garment-steamer"],
  },
  {
    id: "icy-fan",
    family: "Thyme Air",
    category: "air",
    name: "Igloo",
    price: "₹2,499",
    badge: "Handheld Ice-touch Fan",
    copy: "Cooling that is always within reach.",
    featureText: "Cooling that is always within reach.",
    image: assetUrls.icy,
    storyImage: assetUrls.icy,
    heroImage: assetUrls.icy,
    positioning: "Cooling that is always within reach.",
    subheading:
      "A compact airflow solution for desks, reading corners, jogging trails, hot afternoons, and routines where comfort supports concentration.",
    specs: [
      ["Format", "Compact personal fan"],
      ["Placement", "Desk + study"],
      ["Focus", "Close-range cooling"],
    ],
    featureBlocks: [
      ["Focused comfort", "Cooling designed for personal spaces."],
      ["Effortless adjustment", "Intuitive tactile controls, flexible neck that moves with you."],
      ["Multipurpose airflow", "Variety of modes to adapt to changing conditions."],
      ["Easy to carry", "A compact form that fits naturally into everyday environments."],
    ],
    gallery: [assetUrls.icy, assetUrls.mist, assetUrls.li1],
    specifications: [
      ["Use case", "Desk + bedside cooling"],
      ["Control", "Wheel + mode button"],
      ["Display", "Battery percentage display"],
      ["Body", "Handheld vertical format"],
      ["Placement", "Portable tabletop"],
    ],
    care: [
      "Keep the outlet clear of dust with a soft dry brush.",
      "Recharge before long storage so the display remains accurate.",
      "Wipe the body after use near open windows or direct sunlight.",
    ],
    related: ["mist-fan", "bldc-fan", "garment-steamer"],
  },
  {
    id: "vacuum-cleaner",
    family: "Thyme Clean",
    category: "clean",
    name: "Glide",
    price: "₹17,999",
    badge: "Cordless Vacuum",
    copy: "Powerful cleaning. Designed to disappear into the room.",
    featureText: "Powerful cleaning. Designed to disappear into the room.",
    image: assetUrls.glide,
    storyImage: assetUrls.glide,
    heroImage: assetUrls.glide,
    positioning: "A cleaner home, with less friction.",
    subheading:
      "A cordless cleaning system that is designed for easy access, remains visible, and ready for everyday use.",
    specs: [
      ["Format", "Cordless vacuum cleaner"],
      ["Placement", "Wall dock + living room"],
      ["Focus", "Powerful daily cleaning"],
    ],
    featureBlocks: [
      [
        "Self-standing dock",
        "Keeps Glide charged, upright, and within easy reach between cleaning sessions.",
      ],
      ["Multi-surface roller", "Glides smoothly across hard floors, rugs, and mattresses."],
      ["Balanced handling", "Ergonomic operation that makes your cleaning experience comfortable."],
      [
        "Transparent dust chamber",
        "See when it's time to empty, clean, or maintain. All without guesswork.",
      ],
      ["Clear display", "Essential information remains visible while cleaning."],
    ],
    gallery: [assetUrls.glide, assetUrls.silentVacuum, assetUrls.hero],
    specifications: [
      ["Storage", "Wall-mounted dock"],
      ["Head", "Roller floor head"],
      ["Display", "Integrated control display"],
      ["Chamber", "Visible dust chamber"],
      ["Use case", "Whole-home daily cleaning"],
    ],
    care: [
      "Empty the dust chamber after heavy cleaning days.",
      "Check the roller head regularly for hair and thread build-up.",
      "Keep the dock area clean so the vacuum remains ready to store visibly.",
    ],
    related: ["silent-vacuum-cleaner", "garment-steamer", "bldc-fan"],
  },
  {
    id: "silent-vacuum-cleaner",
    family: "Thyme Clean",
    category: "clean",
    name: "Trace",
    price: "₹37,999",
    badge: "Silent Cleaner",
    copy: "Cleaning tools that deserve to stay in sight.",
    featureText: "Cleaning tools that deserve to stay in sight.",
    image: assetUrls.silentVacuum,
    storyImage: assetUrls.silentVacuum,
    heroImage: assetUrls.silentVacuum,
    positioning: "Cleaning without becoming the loudest thing in the house.",
    subheading:
      "Designed for the crumbs, dust, and everyday traces of living that need a quick and silent solution.",
    specs: [
      ["Format", "Silent vacuum cleaner"],
      ["Placement", "Docked upright"],
      ["Focus", "Low-disruption cleaning"],
    ],
    featureBlocks: [
      ["Charging base", "A stable dock that keeps it upright, charged, and ready between uses."],
      [
        "Patented performance",
        "Powered by over 800 patented pieces of technology. Runs on a BLDC motor.",
      ],
      [
        "Easy operation",
        "Filters dirty water from dry components. Easy to monitor water chambers for clean and waste water.",
      ],
      ["Self-contained storage", "Everything needed for routine cleaning stays together."],
    ],
    gallery: [assetUrls.silentVacuum, assetUrls.vacuum, assetUrls.hero],
    specifications: [
      ["Storage", "Docking base"],
      ["Accessories", "Integrated base storage"],
      ["Body", "Charcoal upright silhouette"],
      ["Placement", "Living room or corridor edge"],
      ["Use case", "Routine visible cleaning"],
    ],
    care: [
      "Return tools to the base after use so the footprint stays calm.",
      "Clean the chamber and intake on a regular weekly rhythm.",
      "Wipe the body and dock to keep the finish visually settled in shared rooms.",
    ],
    related: ["vacuum-cleaner", "bldc-fan", "garment-steamer"],
  },
  {
    id: "garment-steamer",
    family: "Thyme Steam",
    category: "steam",
    name: "Poise",
    price: "₹3,799",
    badge: "Garment Steamer",
    copy: "Steam care designed around everyday routines.",
    featureText:
      "Steam care, simplified. A compact steamer for quick refreshes, last-minute touchups, and garments that deserve a little extra care.",
    image: assetUrls.poise,
    storyImage: assetUrls.poise,
    heroImage: assetUrls.poise,
    positioning: "A morning routine with fewer steps.",
    subheading:
      "Designed to simplify your routine — ready in moments, easy to keep nearby, and built to cut the time between choosing an outfit and heading out the door.",
    specs: [
      ["Format", "Handheld steamer"],
      ["Placement", "Wardrobe + bedroom"],
      ["Focus", "Quick garment refresh"],
    ],
    featureBlocks: [
      [
        "Everyday ready",
        "Built for the moments when an outfit needs a little attention before leaving home.",
      ],
      [
        "Clear performance",
        "Visible steam that makes the process feel straightforward and controlled.",
      ],
      ["Simple operation", "A transparent water tank that removes the guesswork from refilling."],
      ["Made to move", "Compact enough to carry on the go."],
    ],
    gallery: [assetUrls.poise, assetUrls.hero, assetUrls.mist],
    specifications: [
      ["Use case", "Daily garment care"],
      ["Body", "Handheld vertical form"],
      ["Water tank", "Visible lower chamber"],
      ["Placement", "Wardrobe or dresser top"],
      ["Output", "Direct garment steam"],
    ],
    care: [
      "Empty the tank after use to keep the body clear and ready for the next day.",
      "Wipe the steam plate once cool.",
      "Store upright on a stable surface near the wardrobe routine.",
    ],
    related: ["icy-fan", "mist-fan", "silent-vacuum-cleaner"],
  },
];

const productIndex = Object.fromEntries(products.map((product) => [product.id, product]));

const modes = {
  quiet: {
    title: "Quiet pass",
    copy: "For dust at the edge of the day. Low acoustic presence, steady suction, and a cleanable roller assembly that opens with a clear touchpoint.",
    db: 38,
    width: "34%",
    note: "Target: softer than a normal conversation.",
  },
  standard: {
    title: "Daily clean",
    copy: "For food crumbs, hair and the daily evidence of living. Standard mode keeps pickup consistent for quick, ordinary resets.",
    db: 48,
    width: "52%",
    note: "Target: practical daily power with controlled sound.",
  },
  power: {
    title: "Deep clean",
    copy: "For carpet edges, couch corners and the places that pretend they are clean. Long press engages higher suction with clearer battery tradeoffs.",
    db: 58,
    width: "74%",
    note: "Target: more power, clearly framed as a short-use mode.",
  },
};

const storyScenes = {
  "vacuum-cleaner": {
    image: assetUrls.vacuum,
    specs: [
      ["Use", "Visible storage"],
      ["Role", "Clean"],
      ["Focus", "Quiet care"],
    ],
  },
  "garment-steamer": {
    image: assetUrls.poise,
    specs: [
      ["Use", "Daily reset"],
      ["Role", "Steam"],
      ["Focus", "Morning routine"],
    ],
  },
  "bldc-fan": {
    image: assetUrls.bldc,
    specs: [
      ["Use", "Room airflow"],
      ["Role", "Air"],
      ["Focus", "Calm circulation"],
    ],
  },
  "mist-fan": {
    image: assetUrls.mist,
    specs: [
      ["Use", "Direct cooling"],
      ["Role", "Mist"],
      ["Focus", "Seated comfort"],
    ],
  },
  "silent-vacuum-cleaner": {
    image: assetUrls.silentVacuum,
    specs: [
      ["Use", "Visible dock"],
      ["Role", "Clean"],
      ["Focus", "Lower disruption"],
    ],
  },
  "icy-fan": {
    image: assetUrls.icy,
    specs: [
      ["Use", "Desk cooling"],
      ["Role", "Air"],
      ["Focus", "Focused spaces"],
    ],
  },
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderProductDetail(product) {
  const relatedProducts = (product.related || []).map((id) => productIndex[id]).filter(Boolean);
  return `
    <div class="product-detail">
      <section class="product-hero">
        <div class="modal-hero-media">
          <img src="${product.heroImage}" alt="${escapeHtml(product.name)} lifestyle view" loading="eager">

        </div>
        <div class="modal-hero-copy">
          <p class="eyebrow">${escapeHtml(product.family)}</p>
          <h2 id="modal-title">${escapeHtml(product.name)}</h2>
          <p class="positioning-statement">${escapeHtml(product.positioning)}</p>
          ${product.subheading ? `<p class="product-subheading">${escapeHtml(product.subheading)}</p>` : ""}

          <button class="button modal-add-cart" type="button" data-product-id="${product.id}">Add to Cart</button>
        </div>
      </section>
      <section>
        <h3 class="product-section-title">Feature overview</h3>
        <div class="feature-grid">
          ${product.featureBlocks
            .map(
              ([title, copy]) => `
            <article class="feature-block">
              <h4>${escapeHtml(title)}</h4>
              <p>${escapeHtml(copy)}</p>
            </article>
          `,
            )
            .join("")}
        </div>
      </section>
      <section>
        <h3 class="product-section-title">Lifestyle gallery</h3>
        <div class="gallery-grid">
          ${product.gallery
            .map(
              (image, index) => `
            <div class="gallery-card"><img src="${image}" alt="${escapeHtml(product.name)} gallery image ${index + 1}" loading="lazy"></div>
          `,
            )
            .join("")}
        </div>
      </section>
      <section>
        <h3 class="product-section-title">Specifications</h3>
        <table class="spec-table">
          <tbody>
            ${product.specifications
              .map(
                ([label, value]) => `
              <tr><th scope="row">${escapeHtml(label)}</th><td>${escapeHtml(value)}</td></tr>
            `,
              )
              .join("")}
          </tbody>
        </table>
      </section>
      <section>
        <h3 class="product-section-title">Care &amp; maintenance</h3>
        <ul class="care-list">
          ${product.care.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </section>
      <section>
        <h3 class="product-section-title">Related products</h3>
        <div class="related-grid">
          ${relatedProducts
            .map(
              (related) => `
            <article class="related-card">
              <div class="gallery-card" style="min-height:180px;margin-bottom:14px;"><img src="${related.image}" alt="${escapeHtml(related.name)} related product image" loading="lazy"></div>
              <h4>${escapeHtml(related.name)}</h4>
              <p>${escapeHtml(related.copy)}</p>
              <button class="button secondary related-link" type="button" data-product="${related.id}">Learn More</button>
            </article>
          `,
            )
            .join("")}
        </div>
      </section>
    </div>
  `;
}

function renderProducts(filter = "all") {
  const grid = document.getElementById("product-grid");
  const visible =
    filter === "all" ? products : products.filter((product) => product.category === filter);
  grid.innerHTML = visible
    .map(
      (product) => `
    <article class="product-card reveal" data-category="${product.category}" data-product="${product.id}" tabindex="0" role="button" aria-label="Open ${escapeHtml(product.name)} details">
      <div class="product-media">
        <span class="product-chip">${escapeHtml(product.badge)}</span>
        <img src="${product.image}" alt="${escapeHtml(product.name)}" loading="lazy">
        <div class="product-feature">${escapeHtml(product.featureText)}</div>
      </div>
      <div class="product-body">
        <p class="product-kicker">${escapeHtml(product.family)}</p>
        <div class="product-title-row">
          <h3>${escapeHtml(product.name)}</h3>
          <button class="product-arrow" type="button" data-product="${product.id}" aria-label="View ${escapeHtml(product.name)} details"><span>View Details</span> <span aria-hidden="true">&rarr;</span></button>
        </div>
        <p>${escapeHtml(product.copy)}</p>
        <div class="product-actions">
          <span class="product-price" aria-label="Price">${escapeHtml(product.price || "")}</span>
          <button class="wishlist" type="button" aria-label="Add ${escapeHtml(product.name)} to cart">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="20" r="1.4"/><circle cx="17" cy="20" r="1.4"/><path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L21 8H6"/></svg>
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </article>
  `,
    )
    .join("");
  requestScrollUpdate();
}

function openProduct(productId) {
  const product = productIndex[productId];
  if (!product) return;
  document.getElementById("modal-content").innerHTML = renderProductDetail(product);
  document.getElementById("product-modal").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeProduct() {
  document.getElementById("product-modal").classList.remove("open");
  document.body.style.overflow = "";
}

function setMode(modeName) {
  const mode = modes[modeName];
  if (!mode) return;
  const title = document.getElementById("mode-title");
  const copy = document.getElementById("mode-copy");
  const value = document.getElementById("meter-value");
  const fill = document.getElementById("meter-fill");
  const note = document.getElementById("meter-note");
  if (!title || !copy || !value || !fill || !note) return;
  title.textContent = mode.title;
  copy.textContent = mode.copy;
  value.textContent = mode.db;
  fill.style.width = mode.width;
  note.textContent = mode.note;
}

function setStory(storyName) {
  const story = storyScenes[storyName];
  if (!story) return;
  const product = document.getElementById("story-product");
  const photo = document.getElementById("story-photo");
  if (!product || !photo) return;
  const specALabel = document.getElementById("story-spec-a-label");
  const specA = document.getElementById("story-spec-a");
  const specBLabel = document.getElementById("story-spec-b-label");
  const specB = document.getElementById("story-spec-b");
  const specCLabel = document.getElementById("story-spec-c-label");
  const specC = document.getElementById("story-spec-c");
  if (!specALabel || !specA || !specBLabel || !specB || !specCLabel || !specC) return;
  product.style.opacity = "0";
  product.style.transform = "translateY(10px) scale(.98)";
  window.setTimeout(() => {
    product.innerHTML = `<img src="${story.image}" alt="" loading="lazy">`;
    product.style.opacity = "1";
    product.style.transform = "translateY(0) scale(1)";
  }, 120);
  photo.src = story.image;
  specALabel.textContent = story.specs[0][0];
  specA.textContent = story.specs[0][1];
  specBLabel.textContent = story.specs[1][0];
  specB.textContent = story.specs[1][1];
  specCLabel.textContent = story.specs[2][0];
  specC.textContent = story.specs[2][1];
}

function updateCountdown() {
  /* countdown removed */
}

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let storyObserver;
let scrollTicking = false;

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function easeOutCubic(value) {
  return 1 - Math.pow(1 - value, 3);
}

function easeInOutCubic(value) {
  return value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

// Mixed sequence: product showcase → editorial page-break → next product …
// Each break uses a contrasting palette chosen against the surrounding lifestyle imagery.
// Continuous product flow — each product is separated only by a thin
// full-width divider rendered at the top of the panel. No full-screen
// editorial breaks, so users keep scroll momentum between products.
const journeySequence = [
  { type: "product", id: "vacuum-cleaner", barBg: "#2b2924", barInk: "#f3ede3" },
  { type: "product", id: "garment-steamer", barBg: "#e9e1cf", barInk: "#2b2924" },
  { type: "product", id: "mist-fan", barBg: "#1f2a2a", barInk: "#eef0ec" },
  { type: "product", id: "bldc-fan", barBg: "#6a6b4f", barInk: "#f3ede3" },
];
const journeyOrder = journeySequence.filter((s) => s.type === "product").map((s) => s.id);

function renderJourney() {
  const stack = document.getElementById("journey-stack");
  if (!stack) return;
  stack.innerHTML = journeySequence
    .map((entry) => {
      if (entry.type === "break") {
        return `
        <article class="journey-panel journey-break" data-type="break"
          style="background:${entry.bg};color:${entry.ink};">
          <div class="journey-break-inner">
            <span class="journey-break-chapter" style="color:${entry.accent}">${escapeHtml(entry.chapter)}</span>
            <h3 class="journey-break-title">${escapeHtml(entry.title)}</h3>
            <p class="journey-break-note">${escapeHtml(entry.note)}</p>
            <span class="journey-break-rule" style="background:${entry.accent}"></span>
          </div>
        </article>`;
      }
      const product = productIndex[entry.id];
      if (!product) return "";
      const img = product.heroImage || product.image;
      const benefits = (product.featureBlocks || [])
        .slice(0, 3)
        .map((block) => `<li>${escapeHtml(block[0])}</li>`)
        .join("");
      const barBg = entry.barBg || "#2b2924";
      const barInk = entry.barInk || "#f3ede3";
      return `
      <article class="journey-panel" data-type="product" data-name="${escapeHtml(product.name)}" data-bg="${img}">
        <div class="journey-bar" style="background:${barBg};color:${barInk};border-bottom-color:${barInk}1f;">
          <span class="journey-bar-name">${escapeHtml(product.name)}</span>
          <span class="journey-bar-meta">${escapeHtml(product.family || "")}</span>
        </div>
        <div class="journey-grid">
          <div class="journey-media"><div class="journey-media-bg" style="background-image:url('${img}')"></div><img src="${img}" alt="${escapeHtml(product.name)}" loading="lazy"></div>
          <div class="journey-glass">
            <p class="journey-family">${escapeHtml(product.family)}</p>
            <h3 class="journey-name">${escapeHtml(product.name)}</h3>
            <p class="journey-desc">${escapeHtml(product.subheading || product.copy)}</p>
            <ul class="journey-benefits">${benefits}</ul>
            <div class="journey-cta"><button class="button" type="button" data-product="${product.id}">Explore ${escapeHtml(product.name)}</button></div>
          </div>
        </div>
      </article>`;
    })
    .join("");

  const bars = document.getElementById("journey-bars");
  if (bars) bars.innerHTML = "";
}

function isMobileJourney() {
  return window.matchMedia("(max-width: 860px)").matches;
}

function layoutJourney() {
  const section = document.querySelector(".journey");
  if (!section) return;
  const panels = section.querySelectorAll(".journey-panel");
  const n = panels.length || 1;
  if (reducedMotion.matches || isMobileJourney()) {
    section.style.height = "auto";
    return;
  }
  const head = section.querySelector(".journey-head-wrap");
  const headH = head ? head.offsetHeight : 0;
  section.style.height = headH + n * window.innerHeight * 1.15 + "px";
}

let _journeyActiveIdx = -1;
let _journeyBgToggle = false;
function updateJourneyMarkers(idx, panels) {
  if (idx === _journeyActiveIdx) return;
  _journeyActiveIdx = idx;
  const top = document.getElementById("journey-marker-top-text");
  const bot = document.getElementById("journey-marker-bottom-text");
  const current = panels[idx];
  const next = panels[idx + 1];
  if (top) top.textContent = current ? current.dataset.name : "";
  if (bot) bot.textContent = next ? next.dataset.name : "Discover the collection";

  // Cross-fade the fixed full-viewport background to the active product image.
  const wrap = document.getElementById("journey-fixed-bg");
  if (wrap && current && current.dataset.bg) {
    const layers = wrap.querySelectorAll(".journey-fixed-bg-layer");
    if (layers.length === 2) {
      _journeyBgToggle = !_journeyBgToggle;
      const incoming = layers[_journeyBgToggle ? 0 : 1];
      const outgoing = layers[_journeyBgToggle ? 1 : 0];
      incoming.style.backgroundImage = `url('${current.dataset.bg}')`;
      requestAnimationFrame(() => {
        incoming.style.opacity = "1";
        outgoing.style.opacity = "0";
      });
    }
  }
}

function updateJourney() {
  const section = document.querySelector(".journey");
  if (!section) return;
  const panels = section.querySelectorAll(".journey-panel");
  const n = panels.length;
  if (!n) return;
  if (reducedMotion.matches || isMobileJourney()) {
    panels.forEach((panel) => {
      panel.style.transform = "";
      panel.style.visibility = "";
    });
    updateJourneyMarkers(0, panels);
    return;
  }
  const rect = section.getBoundingClientRect();
  const total = Math.max(1, section.offsetHeight - window.innerHeight);
  const raw = clamp(-rect.top / total) * (n - 1);
  const activeIdx = Math.min(n - 1, Math.floor(raw));
  // Stacked deck: each product sits ON TOP of the next. The current
  // panel slides upward (off-screen) to UNCOVER the next product that
  // was already waiting underneath it.
  panels.forEach((panel, i) => {
    let ty = 0;
    if (i < n - 1) {
      const d = raw - i; // 0 → 1 as panel i is uncovered away
      if (d <= 0) ty = 0;
      else if (d >= 1) ty = -100;
      else ty = -easeInOutCubic(d) * 100;
    }
    panel.style.transform = `translate3d(0, ${ty.toFixed(2)}%, 0)`;
    panel.style.zIndex = String(n - i); // earlier panels sit on top
    panel.style.visibility = "visible";
  });
  const shownIdx = Math.min(n - 1, Math.round(raw));
  updateJourneyMarkers(shownIdx, panels);
}

function updateHeroIntro() {
  const stage = document.querySelector(".hero-stage");
  const introLogo = document.getElementById("intro-logo");
  const navLogo = document.querySelector(".brand-anchor .logo img");
  const heroCopy = document.querySelector(".hero-copy");
  const navLinks = document.querySelector(".nav-links");
  const cartAnchor = document.querySelector(".cart-anchor");
  if (!stage || !introLogo || !navLogo) return;

  if (reducedMotion.matches) {
    document.body.classList.add("intro-docked");
    introLogo.style.display = "none";
    if (heroCopy) {
      heroCopy.style.opacity = "1";
      heroCopy.style.transform = "none";
    }
    if (navLinks) navLinks.style.opacity = "1";
    if (cartAnchor) cartAnchor.style.opacity = "1";
    return;
  }

  const end = navLogo.getBoundingClientRect();
  const rect = stage.getBoundingClientRect();
  const total = Math.max(1, stage.offsetHeight - window.innerHeight);
  const p = clamp(-rect.top / total);
  // On mobile, give the logo a longer, slower journey upward and start the
  // hero copy reveal earlier so the headline is fully visible when users
  // first encounter it.
  const mobile = window.innerWidth <= 860;
  // Logo morph completes by DOCK, then locks. Hero content overlaps slightly for seamless feel.
  const DOCK = mobile ? 0.78 : 0.52;
  const morphP = clamp(p / DOCK);
  const e = easeInOutCubic(morphP);

  const bigScaleFactor = mobile ? 0.2 : 0.46;
  const bigScaleByH = (window.innerHeight * bigScaleFactor) / Math.max(1, end.height);
  // Also cap by viewport width so wide logos don't overflow on phones.
  const maxLogoW = window.innerWidth * (mobile ? 0.72 : 0.7);
  const bigScaleByW = maxLogoW / Math.max(1, end.width);
  const bigScale = Math.max(1.2, Math.min(bigScaleByH, bigScaleByW));
  const scale = lerp(bigScale, 1, e);
  const navCenterX = end.left + end.width / 2;
  const navCenterY = end.top + end.height / 2;
  const tx = lerp(window.innerWidth / 2 - navCenterX, 0, e);
  const ty = lerp(window.innerHeight / 2 - navCenterY, 0, e);

  introLogo.style.left = end.left + "px";
  introLogo.style.top = end.top + "px";
  introLogo.style.width = end.width + "px";
  introLogo.style.height = end.height + "px";
  introLogo.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;

  // Sync dock + all hero/nav reveal at the same moment for an intentional staged entry.
  const dockThreshold = mobile ? 0.82 : 0.88;
  const docked = morphP >= dockThreshold;
  document.body.classList.toggle("intro-docked", docked);

  // Nav, cart and hero copy all reveal together — no awkward gap.
  // On mobile we start the reveal earlier and stretch it so copy is fully
  // visible before the user scrolls further.
  const revealStart = mobile ? 0.86 : 0.86;
  const revealRange = mobile ? 0.16 : 0.14;
  const reveal = easeOutCubic(clamp((morphP - revealStart) / revealRange));
  if (navLinks) navLinks.style.opacity = reveal.toFixed(3);
  if (cartAnchor) cartAnchor.style.opacity = reveal.toFixed(3);
  if (heroCopy) {
    heroCopy.style.opacity = reveal.toFixed(3);
    heroCopy.style.transform = `translateY(${((1 - reveal) * (mobile ? 18 : 32)).toFixed(2)}px)`;
  }
}

let _marqueeOffset = null;
function updateMarquee() {
  const track = document.getElementById("marquee-track");
  if (!track) return;
  const sec = document.getElementById("marquee-bridge");
  if (!sec) return;
  const rect = sec.getBoundingClientRect();
  const vh = window.innerHeight;
  const vw = window.innerWidth;
  // The section itself is short (~120px). Drive horizontal movement from a
  // wide scroll window centered on when the section reaches the viewport
  // middle, so the headline travels slowly and deliberately as the user
  // scrolls past — roughly half the previous speed.
  const sectionCenter = rect.top + rect.height / 2;
  const window_ = vh * 2.4; // larger window => slower travel
  const raw = clamp((vh / 2 + window_ / 2 - sectionCenter) / window_);
  const distance = Math.max(0, track.scrollWidth - vw);
  const startX = vw * 1;
  const endX = -distance - vw * 1.5;
  const targetOffset = lerp(startX, endX, easeInOutCubic(raw));
  // Heavy inertia: smooth toward target so it feels weighted, not snappy.
  if (_marqueeOffset === null) _marqueeOffset = targetOffset;
  _marqueeOffset += (targetOffset - _marqueeOffset) * 0.08;
  track.style.transform = `translate3d(${_marqueeOffset.toFixed(2)}px, 0, 0)`;
}

function updateConstellation() {
  const orbit = document.getElementById("constellation-orbit");
  const section = document.getElementById("constellation");
  if (!orbit || !section) return;

  const items = orbit.querySelectorAll(".constellation-item");
  if (!items.length) return;

  const rect = section.getBoundingClientRect();
  const total = Math.max(1, section.offsetHeight - window.innerHeight);
  const p = clamp(-rect.top / total);
  const eased = easeInOutCubic(p);

  const isMobile = window.innerWidth <= 860;

  // 1. Desktop positions (Untouched)
  const desktopPositions = [
    { x: -370, y: -200, rot: -15 },
    { x: 350, y: -200, rot: 12 },
    { x: -500, y: 80, rot: -5 },
    { x: 520, y: 70, rot: 5 },
    { x: -250, y: 280, rot: 8 },
    { x: 280, y: 270, rot: -18 },
  ];

  // 2. Mobile positions (Carving out a safe zone for the text)
  const mobilePositions = [
    { x: -100, y: -300, rot: -12 }, // Top Left
    { x: 100, y: -240, rot: 15 }, // Top Right
    { x: -120, y: -130, rot: -5 }, // Mid-Top Left (Dodging text)
    { x: 120, y: 160, rot: 8 }, // Mid-Bottom Right (Dodging text)
    { x: -100, y: 270, rot: 10 }, // Bottom Left
    { x: 90, y: 340, rot: -14 }, // Bottom Right
  ];

  const manualPositions = isMobile ? mobilePositions : desktopPositions;
  const spread = 1;

  items.forEach((el, i) => {
    const target = manualPositions[i] || { x: 0, y: 0, rot: 0 };
    const x = target.x * eased * spread;
    const y = target.y * eased * spread;
    const startRot = i % 2 === 0 ? -10 : 10;
    const rot = lerp(startRot, target.rot, eased);
    const scale = lerp(0.6, isMobile ? 1.0 : 1.5, eased);
    const opFloor = isMobile ? 0.35 : 0;
    const op = lerp(opFloor, 1, Math.min(1, eased * 1.6));

    el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(${rot.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
    el.style.opacity = op.toFixed(3);
    el.style.zIndex = String(10 + i);
  });
}

// Animated footer wordmark: dynamically sized "thyme" letters that
// enter L→R when the footer enters the viewport and exit R→L on leave.
// Global tracking for the animation states
let _wmInited = false;
let _wmLetters = [];
let _wmAnims = [];
let _wmState = "hidden"; // Tracks 'hidden', 'visible', or 'exiting'

function fitWordmark() {
  // The wordmark is now a single SVG with an intrinsic aspect ratio,
  // so the browser sizes the height automatically from width. No-op
  // retained for compatibility with existing callers.
}

const ENTER_STAGGER = 55;
const EXIT_STAGGER = 55; // Match enter stagger for a perfect mirror

// The bouncy enter keyframes
function getEnterKeyframes() {
  return [
    { transform: "translateY(110%)", opacity: 0, offset: 0 },
    { transform: "translateY(-35%)", opacity: 1, offset: 0.45 },
    { transform: "translateY(12%)", opacity: 1, offset: 0.65 },
    { transform: "translateY(-7%)", opacity: 1, offset: 0.8 },
    { transform: "translateY(0%)", opacity: 1, offset: 1 },
  ];
}

// Exact reverse of the enter keyframes
function getExitKeyframes() {
  return [
    { transform: "translateY(0%)", opacity: 1, offset: 0 },
    { transform: "translateY(-7%)", opacity: 1, offset: 0.2 },
    { transform: "translateY(12%)", opacity: 1, offset: 0.35 },
    { transform: "translateY(-35%)", opacity: 1, offset: 0.55 },
    { transform: "translateY(110%)", opacity: 0, offset: 1 },
  ];
}

function playWordmark(direction) {
  const text = document.getElementById("wm-text");
  if (!text) return;

  if (_wmLetters.length === 0) {
    _wmLetters = Array.from(text.querySelectorAll(".wm-letter"));
    _wmAnims = new Array(_wmLetters.length).fill(null);
  }

  if (_wmLetters.length === 0) return;

  _wmLetters.forEach((el, i) => {
    if (_wmAnims[i]) {
      _wmAnims[i].cancel();
    }

    if (reducedMotion.matches) {
      el.style.opacity = direction === "in" ? "1" : "0";
      el.style.transform = direction === "in" ? "translateY(0)" : "translateY(110%)";
      return;
    }

    if (direction === "in") {
      const delay = i * ENTER_STAGGER;
      _wmAnims[i] = el.animate(getEnterKeyframes(), {
        duration: 520,
        delay: delay,
        easing: "linear",
        fill: "forwards",
      });
    } else if (direction === "out") {
      // Reverse stagger right-to-left
      const reverseIdx = _wmLetters.length - 1 - i;
      const delay = reverseIdx * EXIT_STAGGER;

      _wmAnims[i] = el.animate(getExitKeyframes(), {
        duration: 520, // Match enter duration
        delay: delay,
        easing: "linear", // Match linear easing so keyframes handle the curve
        fill: "forwards",
      });

      // Ensure elements stay hidden after exit finishes
      _wmAnims[i].onfinish = () => {
        el.style.transform = "translateY(110%)";
        el.style.opacity = "0";
      };
    }
  });
}

// The new custom scroll logic
function checkWordmarkScroll() {
  const wrap = document.getElementById("wm-wrapper");
  if (!wrap) return;

  const r = wrap.getBoundingClientRect();
  const vh = window.innerHeight;

  // Enter trigger: 1/2 (50%) of the text height is visible
  const enterPoint = r.top + r.height * 0.5;

  // Exit trigger: 3/4 (75%) of the text height gets pushed below viewport
  const exitPoint = r.top + r.height * 0.5;

  if ((_wmState === "hidden" || _wmState === "exiting") && enterPoint < vh) {
    _wmState = "visible";
    playWordmark("in");
  } else if (_wmState === "visible" && exitPoint > vh) {
    _wmState = "exiting";
    playWordmark("out");

    // Reset to hidden once the longest animation completes
    setTimeout(() => {
      if (_wmState === "exiting") _wmState = "hidden";
    }, 1000);
  }
}

function updateFooterThyme() {
  if (_wmInited) return;
  const wrap = document.getElementById("wm-wrapper");
  if (!wrap) return;
  _wmInited = true;

  fitWordmark();
  window.addEventListener("resize", fitWordmark);

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(fitWordmark).catch(() => {});
  }

  // Use standard scroll listener instead of IO for precise control
  window.addEventListener("scroll", checkWordmarkScroll, { passive: true });
  checkWordmarkScroll(); // Run immediately on load
}

function updateRevealMotion() {
  const items = document.querySelectorAll(".reveal");
  if (reducedMotion.matches) {
    items.forEach((item) => {
      item.style.opacity = "1";
      item.style.transform = "none";
    });
    return;
  }

  const viewport = window.innerHeight;
  items.forEach((item, index) => {
    const rect = item.getBoundingClientRect();
    const stagger = Math.min(120, (index % 4) * 34);
    const start = viewport * 0.96 + stagger;
    const end = viewport * 0.28;
    const progress = clamp((start - rect.top) / (start - end));
    const eased = easeOutCubic(progress);
    const y = (1 - eased) * 48;
    const scale = 0.965 + eased * 0.035;
    item.style.opacity = eased.toFixed(3);
    item.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;
  });
}

function observeStories() {
  if (storyObserver) return;
  storyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        document.querySelectorAll(".story-step").forEach((step) => step.classList.remove("active"));
        entry.target.classList.add("active");
        setStory(entry.target.dataset.story);
      });
    },
    { rootMargin: "-28% 0px -38% 0px", threshold: 0.1 },
  );
  document.querySelectorAll(".story-step").forEach((step) => storyObserver.observe(step));
}

function updateSceneMotion() {
  if (reducedMotion.matches) return;
  const experienceImage = document.querySelector(".experience-stage > img");

  if (experienceImage) {
    const rect = experienceImage.getBoundingClientRect();
    const progress = clamp((window.innerHeight - rect.top) / (window.innerHeight + rect.height));
    experienceImage.style.transform = `scale(${(1.08 - progress * 0.06).toFixed(4)})`;
  }
}

function updateScrollEffects() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const progress = max > 0 ? (window.scrollY / max) * 100 : 0;
  document.getElementById("scroll-progress-bar").style.width = `${progress}%`;
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll("[data-parallax]").forEach((item) => {
      const rect = item.getBoundingClientRect();
      const strength = Number(item.dataset.parallax || 0);
      const shift = (rect.top - window.innerHeight / 2) * strength;
      item.style.transform = `translateY(${shift}px)`;
    });
  }
  updateRevealMotion();
  updateSceneMotion();
  updateHeroIntro();
  updateJourney();
  updateMarquee();
  updateConstellation();
  updateFooterThyme();
}

function requestScrollUpdate() {
  if (scrollTicking) return;
  scrollTicking = true;
  requestAnimationFrame(() => {
    updateScrollEffects();
    scrollTicking = false;
  });
}

document.addEventListener("click", (event) => {
  const filterButton = event.target.closest(".filter-button");
  if (filterButton) {
    document.querySelectorAll(".filter-button").forEach((button) => {
      button.classList.remove("active");
      button.setAttribute("aria-pressed", "false");
    });
    filterButton.classList.add("active");
    filterButton.setAttribute("aria-pressed", "true");
    renderProducts(filterButton.dataset.filter);
  }

  const productButton = event.target.closest("[data-product]");
  if (productButton) openProduct(productButton.dataset.product);

  const wish = event.target.closest(".wishlist");
  if (wish) {
    event.stopPropagation();
    wish.classList.toggle("is-saved");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeProduct();
  if (
    (event.key === "Enter" || event.key === " ") &&
    event.target.matches('[role="button"][data-product]')
  ) {
    event.preventDefault();
    openProduct(event.target.dataset.product);
  }
});

document.getElementById("modal-close").addEventListener("click", closeProduct);
document.getElementById("product-modal").addEventListener("click", (event) => {
  if (event.target.id === "product-modal") closeProduct();
});
document.getElementById("modal-content").addEventListener("click", (event) => {
  const addBtn = event.target.closest(".modal-add-cart");
  if (!addBtn) return;
  addBtn.classList.add("is-added");
  addBtn.textContent = "Added to Cart";
  setTimeout(() => {
    addBtn.classList.remove("is-added");
    addBtn.textContent = "Add to Cart";
  }, 1800);
});

document.getElementById("menu-toggle").addEventListener("click", () => {
  const panel = document.getElementById("mobile-panel");
  const open = panel.classList.toggle("open");
  document.getElementById("menu-toggle").setAttribute("aria-expanded", String(open));
});
document.querySelectorAll(".mobile-panel a").forEach((link) => {
  link.addEventListener("click", () => {
    document.getElementById("mobile-panel").classList.remove("open");
    document.getElementById("menu-toggle").setAttribute("aria-expanded", "false");
  });
});

document.getElementById("signup-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.getElementById("email");
  const note = document.getElementById("form-note");
  if (!email.checkValidity()) {
    note.textContent = "Add a valid email and we will keep this civilized.";
    email.focus();
    return;
  }
  note.textContent = "Thank you — we will keep you posted with thoughtful updates from Thyme.";
  email.value = "";
});

document.getElementById("footer-thyme-news").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const email = form.querySelector('input[type="email"]');
  const button = form.querySelector("button");
  if (!email || !button || !email.checkValidity()) {
    email?.focus();
    return;
  }

  email.value = "";
  button.textContent = "Thanks";
  window.setTimeout(() => {
    button.textContent = "Join";
  }, 2200);
});

window.addEventListener(
  "scroll",
  () => {
    document.getElementById("site-header").classList.toggle("scrolled", window.scrollY > 30);
    requestScrollUpdate();
  },
  { passive: true },
);

function renderConstellation() {
  const orbit = document.getElementById("constellation-orbit");
  if (!orbit) return;
  const ids = [
    "bldc-fan",
    "mist-fan",
    "icy-fan",
    "vacuum-cleaner",
    "silent-vacuum-cleaner",
    "garment-steamer",
  ];
  orbit.innerHTML = ids
    .map((id) => {
      const p = productIndex[id];
      if (!p) return "";
      return `<div class="constellation-item"><img src="${p.image}" alt="${escapeHtml(p.name)}" loading="lazy"><div class="label">${escapeHtml(p.name)}</div></div>`;
    })
    .join("");
  // Section needs scroll height for orbit animation
  const section = document.getElementById("constellation");
  if (section) {
    const isMobile = window.innerWidth <= 860;
    section.style.height = window.innerHeight * (isMobile ? 2.4 : 2.2) + "px";
  }
}

renderProducts();
renderJourney();
renderConstellation();
renderNavDropdownProducts();
initNavDropdowns();
document.body.classList.add("intro-ready");
layoutJourney();
initJourneyMobileReveal();

function initJourneyMobileReveal() {
  if (!("IntersectionObserver" in window)) return;
  const mq = window.matchMedia("(max-width: 860px)");
  const panels = document.querySelectorAll(".journey-panel[data-type='product']");
  if (!panels.length) return;
  let observer = null;
  const attach = () => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    if (!mq.matches) {
      panels.forEach((p) => p.classList.remove("is-revealed"));
      return;
    }
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.35) {
            entry.target.classList.add("is-revealed");
          }
        });
      },
      { threshold: [0, 0.2, 0.35, 0.6], rootMargin: "0px 0px -10% 0px" },
    );
    panels.forEach((p) => observer.observe(p));
  };
  attach();
  mq.addEventListener ? mq.addEventListener("change", attach) : mq.addListener(attach);
}

function renderNavDropdownProducts() {
  const wrap = document.getElementById("nav-dd-products");
  if (!wrap) return;
  const categories = [
    {
      brand: "Thyme Air",
      type: "Fans",
      desc: "Silent, powerful, made to move.",
      img: assetUrls.bldc,
    },
    {
      brand: "Thyme Clean",
      type: "Vacuums",
      desc: "For real floors, real spills, real life.",
      img: assetUrls.vacuum,
    },
    {
      brand: "Thyme Steam",
      type: "Steamers",
      desc: "Gentle on delicates. Relentless on wrinkles.",
      img: assetUrls.steamer,
    },
    {
      brand: "Thyme Lumen",
      type: "Lamps",
      desc: "Every corner deserves its spotlight.",
      img: assetUrls.li1,
    },
  ];
  wrap.innerHTML = categories
    .map(
      (c) => `
    <a class="nav-dd-product" href="#range">
      <div class="thumb" style="background-image:url('${c.img}')"></div>
      <div class="cat-line">
        <span class="cat-brand">${escapeHtml(c.brand)}</span>
        <span class="cat-type">| ${escapeHtml(c.type)}</span>
      </div>
      <div class="cat-desc">${escapeHtml(c.desc)}</div>
    </a>
  `,
    )
    .join("");
}

function initNavDropdowns() {
  const items = document.querySelectorAll(".nav-item");
  const isTouch = window.matchMedia("(hover: none)").matches;
  items.forEach((item) => {
    const trigger = item.querySelector(":scope > a");
    if (!trigger) return;
    if (isTouch) {
      trigger.addEventListener("click", (e) => {
        if (!item.classList.contains("open")) {
          e.preventDefault();
          items.forEach((i) => i.classList.remove("open"));
          item.classList.add("open");
          trigger.setAttribute("aria-expanded", "true");
        } else {
          item.classList.remove("open");
          trigger.setAttribute("aria-expanded", "false");
        }
      });
    }
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav-item")) {
      items.forEach((i) => {
        i.classList.remove("open");
        const a = i.querySelector(":scope > a");
        if (a) a.setAttribute("aria-expanded", "false");
      });
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") items.forEach((i) => i.classList.remove("open"));
  });
}
updateScrollEffects();
window.addEventListener("resize", () => {
  layoutJourney();
  renderConstellation();
  requestScrollUpdate();
});
window.addEventListener("load", () => {
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  if (!window.location.hash) window.scrollTo({ top: 0, left: 0 });
  requestScrollUpdate();
});

// Lifestyle carousel — page-flip transition
(function () {
  const root = document.querySelector("[data-lifestyle-carousel]");
  if (!root) return;
  const slides = Array.from(root.querySelectorAll(".slides .slide"));
  if (slides.length < 2) return;

  const dots = Array.from(root.querySelectorAll(".lifestyle-dots button"));

  let idx = 0,
    timer = null,
    animating = false;
  const INTERVAL = 4000;
  const FLIP_MS = 840;

  const go = (n) => {
    const next = ((n % slides.length) + slides.length) % slides.length;
    if (next === idx || animating) return;
    animating = true;

    const outgoing = slides[idx];
    const incoming = slides[next];

    dots.forEach((d, i) => d.classList.toggle("is-active", i === next));

    // Prep incoming at +92deg (off-screen behind the fold), no transition.
    incoming.classList.remove("is-active");
    incoming.classList.add("is-prep-in");
    // Force reflow so the prep transform is committed before we animate.
    void incoming.offsetWidth;

    // Start outgoing fold-out (center pivot, rotates to -92deg).
    outgoing.classList.remove("is-active");
    outgoing.classList.add("is-flipping-out");

    // Swap incoming from prep -> animated transition to 0deg.
    incoming.classList.remove("is-prep-in");
    incoming.classList.add("is-flipping-in");

    const cleanup = () => {
      outgoing.classList.remove("is-flipping-out");
      incoming.classList.remove("is-flipping-in");
      incoming.classList.add("is-active");
      idx = next;
      animating = false;
    };
    window.setTimeout(cleanup, FLIP_MS + 40);
  };

  const start = () => {
    stop();
    timer = window.setInterval(() => go(idx + 1), INTERVAL);
  };
  const stop = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  };

  root.querySelector(".lifestyle-nav.prev").addEventListener("click", () => {
    go(idx - 1);
    start();
  });
  root.querySelector(".lifestyle-nav.next").addEventListener("click", () => {
    go(idx + 1);
    start();
  });

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      go(i);
      start();
    });
  });

  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", start);
  start();
})();

/* Dynamic contrast-aware nav coloring */
(function navContrast() {
  const nav = document.querySelector(".nav-links");
  const header = document.getElementById("site-header");
  if (!nav || !header) return;

  let raf = null;

  const parseRGB = (str) => {
    const m = str && str.match(/\d+(\.\d+)?/g);
    if (!m || m.length < 3) return null;
    return [Number(m[0]), Number(m[1]), Number(m[2]), m[3] !== undefined ? Number(m[3]) : 1];
  };

  const sampleBgLuminance = (el) => {
    // 1. Explicitly check if the nav is over a known dark image section
    // This prevents the browser from reading the image as "transparent"
    if (el.closest(".hero, .lifestyle-story, .about-band, .lookbook, .signup")) {
      return 40; // Force dark mode detection
    }

    // 2. Fallback: Check computed CSS background color for other dynamic elements
    let cur = el;
    while (cur && cur !== document.documentElement) {
      const cs = getComputedStyle(cur);
      const rgba = parseRGB(cs.backgroundColor);
      if (rgba && rgba[3] > 0.05) {
        return 0.299 * rgba[0] + 0.587 * rgba[1] + 0.114 * rgba[2];
      }
      cur = cur.parentElement;
    }
    return 240; // Default to light
  };

  const detect = () => {
    raf = null;
    // Target dead center of the sticky nav
    const x = window.innerWidth / 2;
    const y = header.getBoundingClientRect().top + 20;

    // Temporarily disable pointer events on headers so we can see the page beneath
    const blockers = document.querySelectorAll(
      ".site-header, .nav, .nav-links, .brand-anchor, .cart-anchor",
    );
    const stored = [];
    blockers.forEach((b) => {
      stored.push({ el: b, pe: b.style.pointerEvents });
      b.style.pointerEvents = "none";
    });

    const el = document.elementFromPoint(x, y);

    // Restore pointer events instantly
    stored.forEach((item) => {
      item.el.style.pointerEvents = item.pe;
    });

    if (!el) return;
    const lum = sampleBgLuminance(el);

    document.body.classList.toggle("nav-on-dark", lum < 140);
  };

  const schedule = () => {
    if (raf == null) raf = requestAnimationFrame(detect);
  };
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  window.addEventListener("load", schedule);
  schedule();
})();
