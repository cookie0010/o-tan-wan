export function downLoadFile(data: Blob, fileName: string) {
	const a = document.createElement('a');
	a.href = URL.createObjectURL(data);
	a.download = fileName;
	a.click();
}
