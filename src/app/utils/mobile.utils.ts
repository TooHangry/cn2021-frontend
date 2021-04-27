export const showMainMenuMobile = () => {
    const content = document.getElementById('main-content') as HTMLDivElement;
    const clickAway = document.getElementById('click-away') as HTMLDivElement;

    content.style.transform = 'translateX(75%)'
    clickAway.style.transform = 'translateX(0)';
}

export const showMainContentMobile = () => {
    const content = document.getElementById('main-content') as HTMLDivElement;
    const clickAway = document.getElementById('click-away') as HTMLDivElement;

    content.style.transform = 'translateX(0)';
    clickAway.style.transform = 'translateX(125%)'
}


