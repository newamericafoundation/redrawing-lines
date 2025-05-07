import React from 'react';
import { render } from '@testing-library/react';
import { MapProvider } from 'src/contexts/MapContexts';

console.log('test-utils loaded');

const customRender = (ui: React.ReactNode) => {
    return render(ui, {
        wrapper: ({ children }: { children: React.ReactNode }) => {
            return <MapProvider mapIds={['test']}>{children}</MapProvider>;
        },
    });
};

export * from '@testing-library/react';
export { customRender as render };
