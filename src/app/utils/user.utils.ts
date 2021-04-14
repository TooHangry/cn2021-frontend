export const getInitialsFromName = (name: string) => {
    return name[0].toUpperCase() + name.substr(name.indexOf(' ') + 1, 1).toUpperCase();
}