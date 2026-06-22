/* ---------------------------------------------------------
   1. MENU BURGER (mobile)
   On clique sur le bouton "burger" -> la liste de liens
   s'affiche ou se cache (classe "open" ajoutée/retirée).
   --------------------------------------------------------- */
const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');

burger.addEventListener('click', function () {
    navLinks.classList.toggle('open');
});

// Si on clique sur un lien du menu mobile, on referme le menu
navLinks.querySelectorAll('a').forEach(function (lien) {
    lien.addEventListener('click', function () {
        navLinks.classList.remove('open');
    });
});


/* ---------------------------------------------------------
   2. DÉFILEMENT FLUIDE (smooth scroll) sur les liens de nav
   Au lieu d'un saut brutal vers la section, on glisse
   doucement jusqu'à elle.
   --------------------------------------------------------- */
const liensAncres = document.querySelectorAll('a[href^="#"]');

liensAncres.forEach(function (lien) {
    lien.addEventListener('click', function (event) {
        const cibleId = lien.getAttribute('href');
        const cible = document.querySelector(cibleId);

        // Si la cible existe bien sur la page, on empêche le saut
        // par défaut et on scrolle nous-mêmes en douceur.
        if (cible) {
            event.preventDefault();
            cible.scrollIntoView({ behavior: 'smooth' });
        }
    });
});


/* ---------------------------------------------------------
   3. POP-UP "MENU COMPLET"
   On affiche/cache la fenêtre modale en ajoutant/retirant
   la classe "show" (qui passe display:none à display:flex
   dans le CSS).
   --------------------------------------------------------- */
const btnMenuComplet = document.getElementById('btn-menu-complet');
const popupMenu = document.getElementById('popup-menu');
const fermerPopup = document.getElementById('fermer-popup');

btnMenuComplet.addEventListener('click', function () {
    popupMenu.classList.add('show');
});

fermerPopup.addEventListener('click', function () {
    popupMenu.classList.remove('show');
});

// Bonus : fermer la pop-up si on clique en dehors de son contenu
popupMenu.addEventListener('click', function (event) {
    if (event.target === popupMenu) {
        popupMenu.classList.remove('show');
    }
});


/* ---------------------------------------------------------
   4. SLIDER DE TÉMOIGNAGES
   On affiche un seul témoignage à la fois (classe "active"),
   et on passe au suivant automatiquement toutes les 5 secondes.
   Des petits points en bas permettent aussi de choisir
   un témoignage manuellement.
   --------------------------------------------------------- */
const slides = document.querySelectorAll('#slider-temoignages .slide');
const conteneurDots = document.getElementById('slider-dots');
let indexActuel = 0;

// On crée dynamiquement un point (bouton) par slide
slides.forEach(function (slide, index) {
    const point = document.createElement('button');
    point.classList.add('dot');
    if (index === 0) point.classList.add('active');

    point.addEventListener('click', function () {
        afficherSlide(index);
    });

    conteneurDots.appendChild(point);
});

const dots = conteneurDots.querySelectorAll('.dot');

// Fonction qui affiche la slide demandée et cache les autres
function afficherSlide(index) {
    slides.forEach(function (slide) {
        slide.classList.remove('active');
    });
    dots.forEach(function (dot) {
        dot.classList.remove('active');
    });

    slides[index].classList.add('active');
    dots[index].classList.add('active');
    indexActuel = index;
}

// Défilement automatique toutes les 5 secondes
setInterval(function () {
    const indexSuivant = (indexActuel + 1) % slides.length; // % = modulo, revient à 0 à la fin
    afficherSlide(indexSuivant);
}, 5000);


/* ---------------------------------------------------------
   5. FORMULAIRE DE RÉSERVATION
   On intercepte l'envoi du formulaire (qui rechargerait
   normalement la page) pour afficher un message de
   confirmation à la place.
   --------------------------------------------------------- */
const formReservation = document.getElementById('form-reservation');
const messageReservation = document.getElementById('message-reservation');

formReservation.addEventListener('submit', function (event) {
    event.preventDefault(); // empêche le rechargement de la page

    // Ici, dans un vrai projet, tu enverrais les données
    // à un serveur (fetch / API). Pour l'instant on simule
    // juste une confirmation visuelle.
    messageReservation.textContent = 'Merci ! Votre demande de réservation a bien été envoyée.';
    messageReservation.classList.add('succes');
    messageReservation.classList.remove('erreur');

    formReservation.reset(); // vide le formulaire
});


/* ---------------------------------------------------------
   6. FORMULAIRE DE CONTACT
   Même principe que pour la réservation.
   --------------------------------------------------------- */
const formContact = document.getElementById('form-contact');
const messageContact = document.getElementById('message-contact');

formContact.addEventListener('submit', function (event) {
    event.preventDefault();

    messageContact.textContent = 'Merci, votre message a bien été envoyé !';
    messageContact.classList.add('succes');
    messageContact.classList.remove('erreur');

    formContact.reset();
});