import { PayloadAction } from '@reduxjs/toolkit';
export declare enum TemplateName {
    CVTemplate1 = "CVTemplate1",
    CVTemplate2 = "CVTemplate2"
}
export interface Template {
    templateName: TemplateName;
}
export declare const template: import("@reduxjs/toolkit").Slice<Template, {
    setTemplate: (state: import("immer/dist/internal").WritableDraft<Template>, action: PayloadAction<TemplateName>) => void;
}, "template">;
export declare const setTemplate: import("@reduxjs/toolkit").ActionCreatorWithPayload<TemplateName, string>;
declare const _default: import("redux").Reducer<Template, import("redux").AnyAction>;
export default _default;
