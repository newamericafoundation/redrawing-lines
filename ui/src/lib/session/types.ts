/**
 * Defines the types of loading instances
 *
 * @enum
 */
export enum LoadingType {
    SchoolDistrict = 'school-district',
    State = 'state',
    Geography = 'geography',
    Data = 'data',
}
export type Loading = {
    id: string;
    type: LoadingType;
    message: string;
};

export type SessionState = {
    loadingInstances: Loading[];
    addLoadingInstance: (loadingInstance: Loading) => void;
    removeLoadingInstance: (id: string) => void;
    hasLoadingInstance: (text: string) => boolean;
};
