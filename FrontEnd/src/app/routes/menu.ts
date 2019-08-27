
const Home = {
    text: 'Home',
    link: '/home',
    icon: 'icon-home'
};

const Autorizime = {
    text: 'Autorizime',
    link: '/autorizime',
    icon: 'fa fa-ban',
    submenu: [
        {
            text: 'Përdorues',
            link: '/autorizime/perdorues',
        },
        {
            text: 'ACL',
            link: '/autorizime/acl',
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
