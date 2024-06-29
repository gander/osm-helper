export const extractAndValidateId = (path: string, matcher: RegExp): number | null => {
    const match = path.match(matcher);
    if (match) {
        const id = parseInt(match[1], 10);
        return isNaN(id) ? null : id;
    }
    return null;
}
