import { onNavigate } from '@violentmonkey/url';

export type ExtractedId = number | null;

export const extractAndValidateId = (path: string, matcher: RegExp): ExtractedId => {
    const match = path.match(matcher);
    if (match) {
        const id = parseInt(match[1], 10);
        return isNaN(id) ? null : id;
    }
    return null;
}

export const onNavigateCallback = (matcher: RegExp, callback: (id: ExtractedId) => void) => {
    const handler = () => {
        const {pathname} = new URL(window.location.href);
        const changeset = extractAndValidateId(pathname, matcher);
        if (changeset !== null) {
            callback(changeset);
        }
    };

    onNavigate(handler);
    handler();
}
