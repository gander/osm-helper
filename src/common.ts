export type ExtractedId = number | null;

export const extractAndValidateId = (path: string, matcher: RegExp, matchPos: number = 1): ExtractedId => {
    const match = path.match(matcher);
    if (match) {
        const id = parseInt(match[matchPos], 10);
        return isNaN(id) ? null : id;
    }
    return null;
}

