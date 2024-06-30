import {createApp} from 'vue';
import ChangeSet from './ChangeSet.vue';
import {onNavigateCallback} from './common';


onNavigateCallback(/^\/changeset\/(\d+)\/?$/, (changeset) => {
    if (changeset !== null) {
        setTimeout(() => {
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
        }, 500);
    }
});




