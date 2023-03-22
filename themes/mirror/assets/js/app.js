const App = {
  $: {
    navbarLinkContainer: document.querySelector("#nav-links"),
    hamburgerButton: document.querySelector(".hamburger-toggle-button"),
    page: document.querySelector("html"),
    listViewToggleButton: document.querySelector("#list-view-toggle-button"),
    listViewImage: document.querySelector("#list-view-image"),
    stepsContainerGrid: document.querySelector("#steps-container-grid"),
    stepsContainerList: document.querySelector("#steps-container-list"),
    hamburgerIsOpen: false,
    currentListView: "grid",
  },
  init() {
    App.$.hamburgerButton.addEventListener("click", App.toggleHamburgerMenu);
    App.$.page.addEventListener("mousedown", App.clickOffMenu);
    App.$.page.addEventListener("touchstart", App.clickOffMenu, {
      passive: false,
    });
    App.$.listViewToggleButton.addEventListener("click", App.toggleListView);
  },
  toggleListView() {
    // update images in button
    if (App.$.currentListView === "grid") {
      App.$.currentListView = "list";
      App.$.listViewImage.src = "/mirror-docs/list-view.svg";
    } else {
      App.$.currentListView = "grid";
      App.$.listViewImage.src = "/mirror-docs/grid-view.svg";
    }
    // toggle visibility
    App.$.stepsContainerGrid.classList.toggle("dn");
    App.$.stepsContainerList.classList.toggle("dn");

    // update list view pref cookie
    // cookie name, cookie path, cookie age (1 yr)
    document.cookie = `mirrorDocsViewType=${App.$.currentListView}; path=/; max-age=2630000`;
  },
  initCookies() {
    const cookies = document.cookie.split("=");
    const viewTypeIndex = cookies.indexOf("mirrorDocsViewType");

    if (viewTypeIndex === -1) {
      App.$.currentListView = "grid";
    } else {
      App.$.currentListView = cookies[viewTypeIndex + 1];
    }

    if (App.$.currentListView === "grid") {
      App.$.stepsContainerGrid.classList.remove("dn");
      App.$.stepsContainerList.classList.add("dn");
    } else {
      App.$.stepsContainerGrid.classList.add("dn");
      App.$.stepsContainerList.classList.remove("dn");
    }

    App.$.listViewImage.src = `/mirror-docs/${App.$.currentListView}-view.svg`;
  },
  toggleHamburgerMenu() {
    // add dropdown menu visibility
    App.$.navbarLinkContainer.classList.toggle("active");
    // change colors of hamburger button
    App.$.hamburgerButton.classList.toggle("hamburger-toggle-button-open");
    // toggle state
    App.$.hamburgerIsOpen = !App.$.hamburgerIsOpen;
  },
  clickOffMenu(event) {
    if (
      App.$.hamburgerIsOpen &&
      !event.target.classList.contains("navbar-item") &&
      event.target.id !== "hamburger-toggle-button"
    ) {
      event.preventDefault();
      App.toggleHamburgerMenu();
    }
  },
};

try {
  App.init();
  App.initCookies();
} catch (e) {
  // TODO make this scripy only active on list pages
  console.log("not a script page!");
}
