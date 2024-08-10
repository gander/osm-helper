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
                        initNode(node);
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

    function initNode(node: ParentNode): boolean {
        const nodeId = extractAndValidateId(location.pathname, /^\/(node|way)\/(\d+)\/?$/, 2);
        if (nodeId !== null) {
            const targetElement = node.querySelector('li a[href^="/changeset/"]');
            if (targetElement) {
                let href = targetElement.getAttribute('href');

                if (href) {
                    const changeset = extractAndValidateId(href, /^\/changeset\/(\d+)\/?$/);
                    if (changeset !== null) {
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
            }
        }
        return false;
    }

    initChangeset(document);
    initNode(document);
}


