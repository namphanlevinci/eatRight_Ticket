// LazyLoadedScripts.js
import { useEffect } from 'react';

const LazyLoadedScripts = () => {
    useEffect(() => {
        const loadScript = (src: any) => {
            return new Promise<void>((resolve, reject) => {
                const script = document.createElement('script');
                script.src = src;
                script.onload = () => resolve();
                script.onerror = () => reject();
                document.body.appendChild(script);
            });
        };

        const loadScripts = async () => {
            try {
                await loadScript(
                    'https://html2canvas.hertzen.com/dist/html2canvas.js',
                );
                await loadScript(
                    'https://unpkg.com/fabric@5.3.0/dist/fabric.min.js',
                );
                console.log('All scripts loaded');
            } catch (error) {
                console.error('Error loading script', error);
            }
        };

        loadScripts();
    }, []);

    return null;
};

export default LazyLoadedScripts;
