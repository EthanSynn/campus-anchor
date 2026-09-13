/*
 * Asset Registry runtime adapter.
 *
 * The registry is the only lookup layer UI components should use for visual
 * assets. External files can be added later without changing page markup.
 */
(function () {
  const registry = {
    "character.male.master": {
      asset_id: "character.male.master",
      role: "master-character",
      path: "assets/characters/male/master/male-ai-master-v1.0.0.png",
      version: "1.0.0",
      status: "approved"
    },
    "character.female.master": {
      asset_id: "character.female.master",
      role: "master-character",
      path: "assets/characters/female/master/female-ai-master-v1.0.0.png",
      version: "1.0.0",
      status: "approved"
    }
  };

  function get(assetId) {
    return registry[assetId] || null;
  }

  function renderAvatar(element) {
    const persona = element.dataset.persona || "male";
    const asset = get(`character.${persona}.master`);
    element.dataset.assetId = asset ? asset.asset_id : "unknown";
    element.dataset.assetStatus = asset ? asset.status : "missing";
    element.setAttribute("aria-label", `${persona === "female" ? "Female" : "Male"} AI visual persona`);
    if (asset && asset.status === "approved") {
      element.innerHTML = `<img class="avatar-image" src="${asset.path}" alt="${persona === "female" ? "女" : "男"} AI 形象" /><span class="online"></span>`;
      const view = document.querySelector("#view-ai");
      const mainContent = document.querySelector(".main-content");
      if (view) view.style.setProperty("--ai-background-image", `url("${asset.path}")`);
      if (mainContent) mainContent.style.setProperty("--ai-background-image", `url("${asset.path}")`);
      return;
    }
    element.innerHTML = '<span class="avatar large avatar-placeholder">锚</span><span class="online"></span>';
  }

  window.AssetRegistry = { get, renderAvatar };
})();
