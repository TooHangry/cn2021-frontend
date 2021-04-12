export const getInitialsFromName = (name: string) => {
    return name[0] + name.substr(name.indexOf(' ') + 1, 1);
}