import { Model } from 'src/types';

export const getTooltipContent = (value: string) => {
    switch (value) {
        case Model.StatusQuo:
            return 'Current district map';
        case Model.Consolidated:
            return 'Entirely new district map optimized for greater tax-base fairness and integration';
        case Model.CountyConsolidated:
            return 'Map with all districts drawn along county lines';
        case Model.Optimized:
            return 'New map made by optimally merging current districts for greater tax-base fairness and integration';
        default:
            return '';
    }
};
