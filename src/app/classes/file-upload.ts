export class FileUpload {
  key: string;
  name: string;
  url: string;
  file: File;

  constructor(file: File) {
    this.key = ''
    this.name = ''
    this.url = ''
    this.file = file;
  }
}
