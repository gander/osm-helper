import {createApp} from 'vue';
import ChangeSet from './ChangeSet.vue';
import {extractAndValidateId} from './common';

const targetSidebarContent = document.getElementById('sidebar_content');

if (targetSidebarContent) {
    const observer = new MutationObserver((mutationList) => {
        for (const mutation of mutationList) {
            if (mutation.type === 'childList') {
                for (const node of mutation.addedNodes) {
                    if (node.nodeName === 'DIV' && node instanceof Element) {
                        initChangeset(node);
                    }
                }
            }
        }
    });

    observer.observe(targetSidebarContent, {attributes: true, childList: true, subtree: true});

    function initChangeset(node: ParentNode) {
        const changeset = extractAndValidateId(location.pathname, /^\/changeset\/(\d+)\/?$/);
        if (changeset !== null) {
            const targetElement = node.querySelector('div#sidebar_content .browse-section p.details');
            if (targetElement) {
                createApp(ChangeSet, {changeset}).mount(
                    (() => {
                        const app = document.createElement('div');
                        targetElement.insertAdjacentElement('afterend', app);
                        return app;
                    })(),
                );
                return true;
            }

        }
        return false;
    }

    initChangeset(document);
}


