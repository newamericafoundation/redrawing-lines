import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

vi.mock('mapbox-gl');

import MapComponent from '../ClientSide';
import mapboxglMock, { LngLatLike } from 'mapbox-gl';

vi.mock('../utils', () => ({
    addSources: vi.fn(),
    addLayers: vi.fn(),
    addHoverFunctions: vi.fn(),
    addClickFunctions: vi.fn(),
    addMouseMoveFunctions: vi.fn(),
    addControls: vi.fn(),
    addCustomControls: vi.fn(),
}));

import {
    addClickFunctions,
    addHoverFunctions,
    addLayers,
    addSources,
    addControls,
    addCustomControls,
} from '../utils';
import { render } from 'src/utils/test-utils';

describe('Map Component: ClientSide', () => {
    test('renders MapComponent', async () => {
        const div = document.createElement('div');
        div.setAttribute('data-testid', 'map-container-test');
        div.setAttribute('id', 'map-container-test');
        const props = {
            accessToken: 'fake-access-token',
            id: 'test',
            sources: [],
            layers: [],
            options: {
                container: div,
                style: 'mapbox://styles/mapbox/streets-v11',
                zoom: 1,
                center: [0, 0] as LngLatLike,
                testMode: true,
            },
        };

        render(<MapComponent {...props} />);
        const mapElement = screen.getByTestId('map-container-test');
        expect(mapElement).toBeInTheDocument();

        await waitFor(() => {
            expect(mapboxglMock.Map).toHaveBeenCalledWith(
                expect.objectContaining({
                    container: props.options.container,
                    style: 'mapbox://styles/mapbox/streets-v11',
                    center: [0, 0],
                    zoom: 1,
                    testMode: true,
                })
            );

            expect(addSources).toHaveBeenCalled();
            expect(addLayers).toHaveBeenCalled();
            expect(addHoverFunctions).toHaveBeenCalled();
            expect(addClickFunctions).toHaveBeenCalled();
            expect(addControls).toHaveBeenCalled();
            expect(addCustomControls).toHaveBeenCalled();
        });
    });
});
