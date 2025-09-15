import { Model } from 'src/types';

export const getTooltipContent = (model: Model) => {
    switch (model) {
        case Model.StatusQuo:
            return 'Current district map';
        case Model.Consolidated:
            return 'Entirely new district map optimized for greater tax-base fairness and integration';
        case Model.CountyConsolidated:
            return 'New map made by optimally merging current districts for greater tax-base fairness and integration';
        case Model.Optimized:
            return 'Map with all districts drawn along county lines';
    }
};
