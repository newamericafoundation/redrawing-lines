declare module 'mapbox-gl-compare' {
    import { Map } from 'mapbox-gl';

    interface CompareOptions {
        mousemove?: boolean;
        orientation?: 'vertical' | 'horizontal';
    }

    interface CompareEvent {
        currentPosition: number;
    }

    export default class Compare {
        constructor(
            beforeMap: Map,
            afterMap: Map,
            container?: HTMLElement,
            options?: CompareOptions
        );

        currentPosition: number;

        setSlider(x: number): void;

        on(event: 'slideend', callback: (e: CompareEvent) => void): void;

        remove(): void;
    }
}
