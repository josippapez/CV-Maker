export declare const reducers: import("redux").Reducer<import("redux").CombinedState<{
    pdfData: Partial<import("./pdfData").PDFData>;
    template: import("./template").Template;
}>, import("redux").AnyAction>;
export declare type RootState = ReturnType<typeof reducers>;
