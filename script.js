window.addEventListener('load', function () {
    const loader = document.getElementById('loader');
    const content = document.getElementById('content');

    content.style.display = 'block';
    loader.classList.add('fade-out');

    setTimeout(function () {
        loader.style.display = 'none';
    }, 500);
});

document.addEventListener('DOMContentLoaded', () => {
    const translations = {
        fr: {
            nav_about: "À propos",
            nav_education: "Formation",
            hero_tagline: "Bienvenue sur mon portfolio",
            hero_title: "Actuellement étudiant en <span>réseaux</span> et <span>télécoms</span>, parcours <span>cybersécurité</span>, en <span>troisième</span> année.",
            hero_description: "Étant un grand passionné d'informatique. Mon rêve, depuis que je suis petit, est de travailler en cybersécurité. C'est pourquoi, je suis plus que motivé et je donnerai tout pour atteindre mon rêve.",
            hero_button: "Voir mes compétences",
            title_education: "Présentation de ma formation",
            title_bachelor: "BUT Réseaux et Télécoms, parcours Cybersécurité",
            title_master: "Mastère (MSc) Expert Cybersécurité Défensive / Offensive",
            description_bachelor: "Le Bachelor Universitaire de Technologie est une formation professionnalisante sur 3 ans. Il s'articule autour de l'acquisition de compétences validées par des projets concrets et des apprentissages critiques.",
            description_master: "Dans la continuité de mon BUT, je vais intégrer un Mastère spécialisé en Cybersécurité pour approfondir mon expertise actuelle. Pour ce faire, je suis actuellement à la recherche d'une alternance."
        },
        en: {
            nav_about: "About",
            nav_education: "Education",
            hero_tagline: "Welcome to my portfolio",
            hero_title: "Currently studying <span>networking</span> and <span>telecommunications</span>, in a <span>cybersecurity</span> speciality, in my <span>third</span> year.",
            hero_description: "Being a big computer enthusiast. My dream, since I was little, is to work in cybersecurity. That's why, I am more than motivated and I will give everything to achieve my dream.",
            hero_button: "See my skills",
            title_education: "Overview of my education",
            title_bachelor: "BUT Networks and Telecoms, Cybersecurity journey",
            title_master: "Master's degree (MSc) Expert Cybersecurity Defensive / Offensive",
            description_bachelor: "The University Bachelor of Technology is a professionalizing training over 3 years. It revolves around the acquisition of skills validated by concrete projects and critical learning.",
            description_master: "In continuation of my GOAL, I will join a specialized Master's degree in Cybersecurity to deepen my current expertise. To do this, I am currently looking for an apprenticeship."
        }
    };

    function setLanguage(language) {
        localStorage.setItem('preferredLanguage', language);
        const currentLangDiv = document.getElementById('current-lang');

        if (currentLangDiv) {
            let imgSrc = 'fr.png';
            let text = 'FR';
            if (language === 'en') { imgSrc = 'gb.png'; text = 'EN'; }
            currentLangDiv.innerHTML = `<img src="https://flagcdn.com/w20/${imgSrc}" alt="${text}"> ${text}`;
        }

        const elements = document.querySelectorAll('[data-i18n]');

        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');

            if (translations[language] && translations[language][key]) {
                element.innerHTML = translations[language][key];
            }
        });
    }

    const sectionsToReveal = document.querySelectorAll('.hidden-on-load');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('element-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    sectionsToReveal.forEach(section => {
        observer.observe(section);
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (href !== "#" && this.getAttribute('id') !== "mentions-link") {
                e.preventDefault();
                const target = document.querySelector(href);

                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    const modal = document.getElementById("modal-mentions");
    const btnMentions = document.getElementById("mentions-link");
    const spanClose = document.getElementsByClassName("close-modal")[0];

    if (btnMentions && modal && spanClose) {
        btnMentions.onclick = function (e) {
            e.preventDefault();
            modal.style.display = "block";
        }
        spanClose.onclick = function () {
            modal.style.display = "none";
        }
        window.onclick = function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        }
    }

    const savedLanguage = localStorage.getItem('preferredLanguage') || 'fr';
    setLanguage(savedLanguage);
    const langSwitcher = document.getElementById('current-lang');
    const langOptions = document.getElementById('lang-options');

    if (langSwitcher) {
        langSwitcher.addEventListener('click', function (e) {
            e.stopPropagation();
            langOptions.classList.toggle('select-hide');
        });
    }

    document.addEventListener('click', function (e) {
        if (langSwitcher && langOptions && !langSwitcher.contains(e.target) && !langOptions.contains(e.target)) {
            langOptions.classList.add('select-hide');
        }
    });

    if (langOptions) {
        const langDivs = langOptions.querySelectorAll('div');
        langDivs.forEach(div => {
            div.addEventListener('click', function () {
                const selectedLang = this.getAttribute('data-lang');
                setLanguage(selectedLang);
                langOptions.classList.add('select-hide');
            });
        });
    }
});