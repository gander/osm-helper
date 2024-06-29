import {createApp} from 'vue';
import ChangeSet from './ChangeSet.vue';

import {extractAndValidateId} from './common';

const {pathname} = new URL(window.location.href);

const changeset = extractAndValidateId(pathname, /^\/changeset\/(\d+)\/?$/);

if (changeset !== null) {
    const targetElement = document.querySelector('div#sidebar_content .browse-section p.details');
    if (targetElement) {
        createApp(ChangeSet, {changeset}).mount(
            (() => {
                const app = document.createElement('div');
                targetElement.insertAdjacentElement('afterend', app);
                return app;
            })(),
        );
    }
}



