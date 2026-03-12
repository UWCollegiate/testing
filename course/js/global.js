async function loadVer() {
    let res = await fetch(window.assetUrl("data/version.txt"), { cache: "no-store" });
    return (await res.text()).trim();
}

function resetLocalData(version) {
    localStorage.clear();
    localStorage.version = version;
    localStorage.courses = JSON.stringify({});
    localStorage.spareRestrictions = JSON.stringify(Array(9).fill(true));
    localStorage.replacing = JSON.stringify(null);
    localStorage.versionOverride = JSON.stringify(false);
}

function ensureLocalData(version) {
    if (localStorage.version === undefined) localStorage.version = version;
    if (localStorage.courses === undefined) localStorage.courses = JSON.stringify({});
    if (localStorage.spareRestrictions === undefined) localStorage.spareRestrictions = JSON.stringify(Array(9).fill(true));
    if (localStorage.replacing === undefined) localStorage.replacing = JSON.stringify(null);
    if (localStorage.versionOverride === undefined) localStorage.versionOverride = JSON.stringify(false);
}

async function initData() {
    let version = await loadVer();
    let versionOverride = JSON.parse(localStorage.versionOverride ?? "false");
    let hadVersion = localStorage.version !== undefined;

    if (!hadVersion) {
        resetLocalData(version);
        return version;
    }

    ensureLocalData(localStorage.version);

    if (localStorage.version !== version && !versionOverride) {
        console.log("replacing localStorage with default");
        resetLocalData(version);
        location.href = "index.html";
        return version;
    }

    return localStorage.version;
}

window.appReady = initData();

document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.key === "`") {
        if (JSON.parse(localStorage.versionOverride ?? "false")) {
            localStorage.versionOverride = JSON.stringify(false);
            alert("version override turned off");
            window.appReady = initData();
        }
        else {
            localStorage.versionOverride = JSON.stringify(true);
            localStorage.version = prompt("input the new version:");
            alert(`version override turned on, testing version ${localStorage.version}`);
        }
    }
});
