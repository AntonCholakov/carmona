export interface JsonPatchDocumentInterface {
	data?: {
		value: any;
		path: string;
		op: string;
	}[];
}
