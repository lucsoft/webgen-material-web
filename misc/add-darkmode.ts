import './body.css';

export function addDarkModeSupport() {
    const darkMode = matchMedia('(prefers-color-scheme: dark)');
    if (darkMode.matches) document.body.classList.add('dark');
    darkMode.addEventListener('change', e => {
        e.matches ? document.body.classList.add('dark') : document.body.classList.remove('dark');
    });
}