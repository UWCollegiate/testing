window.appReady.then(() => {
    let restrictionsContainer = document.getElementById("restrictionsContainer");
    restrictionsContainer.innerHTML = "";
    let courses = JSON.parse(localStorage.courses);

    for (let key in courses) {
        let restrictionsButtons = document.createElement("div");
        restrictionsButtons.classList.add("restrictionsButtons");
        for (let i = 0; i < 9; i++) {
            let button = document.createElement("button");
            button.innerHTML = (i+1).toString();

            if (courses[key].slots[i]) {
                if (courses[key].restrictions[i]) button.classList.add("active");

                button.addEventListener('click', () => {
                    if (button.classList.contains("active")) {
                        let temp = JSON.parse(localStorage.courses);
                        temp[key].restrictions[i] = false;
                        localStorage.courses = JSON.stringify(temp);
                        button.classList.remove("active");
                    }
                    else {
                        let temp = JSON.parse(localStorage.courses);
                        temp[key].restrictions[i] = true;
                        localStorage.courses = JSON.stringify(temp);
                        button.classList.add("active");
                    }
                });
            }
            else button.classList.add("none");

            restrictionsButtons.appendChild(button);
        }

        let restrictionsCourse = document.createElement("div");
        restrictionsCourse.classList.add("restrictionsCourse");
        restrictionsCourse.innerHTML = `<span>${key}</span>`;

        restrictionsCourse.appendChild(restrictionsButtons);
        restrictionsContainer.appendChild(restrictionsCourse);
    }

    let restrictionsButtons = document.createElement("div");
    restrictionsButtons.classList.add("restrictionsButtons");
    let spareRestrictions = JSON.parse(localStorage.spareRestrictions);

    for (let i = 0; i < 9; i++) {
        let button = document.createElement("button");
        button.innerHTML = (i+1).toString();

        if (spareRestrictions[i]) button.classList.add("active");

        button.addEventListener('click', () => {
            if (button.classList.contains("active")) {
                let temp = JSON.parse(localStorage.spareRestrictions);
                temp[i] = false;
                localStorage.spareRestrictions = JSON.stringify(temp);
                button.classList.remove("active");
            }
            else {
                let temp = JSON.parse(localStorage.spareRestrictions);
                temp[i] = true;
                localStorage.spareRestrictions = JSON.stringify(temp);
                button.classList.add("active");
            }
        });

        restrictionsButtons.appendChild(button);
    }

    let restrictionsCourse = document.createElement("div");
    restrictionsCourse.classList.add("restrictionsCourse");
    restrictionsCourse.innerHTML = "<span>---Spare---</span>";

    restrictionsCourse.appendChild(restrictionsButtons);
    restrictionsContainer.appendChild(restrictionsCourse);
});
