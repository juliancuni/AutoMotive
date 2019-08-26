
const Home = {
    text: 'Home',
    link: '/home',
    icon: 'icon-home'
};

const Autorizime = {
    text: 'Autorizime',
    link: '/autorizime',
    icon: 'fas fa-user-check',
    submenu: [
        {
            text: 'Përdorues',
            link: '/autorizime/perdorues',
        }
    ]
};

const Ndermarrje = {
    text: 'Ndërmarrja',
    link: '/ndermarrja',
    icon: 'far fa-building',
};

const headingMain = {
    text: 'Main Navigation',
    heading: true
};

export const menu = [
    headingMain,
    Home,
    Autorizime,
    Ndermarrje
];
