declare type Props = {
    pdfInstance: {
        url: string;
        blob: Blob;
    };
    closeModal(): void;
    show: boolean;
};
declare const PDFDownload: (props: Props) => JSX.Element;
export default PDFDownload;
