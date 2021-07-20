import { gql } from 'apollo-angular';
import { environment } from 'src/environments/environment';
import { Link } from './link';

export class AppFile {
  id = 0;
  name = '';
  size = 0;
  type = '';
  attachment = true; // just an attachment? if not then we are able to add signature to this file

  // use src for files not stored in other server or as URL
  src = '';

  destination = '';
  filename = '';
  lastModified = '';

  constructor(_file: Partial<{}> = {}) {
    Object.assign(this, _file);
  }

  static core_file_fields = gql`
    fragment CoreFileFields on file {
      id
      name
      size
      type
      src
      lastModified
      destination
      filename
    }
  `;

  url() {
    if (!this.destination) return `${environment.file_server}/${this.filename}`;
    const path = this.destination.replace('uploads/', '');
    return `${environment.file_server}/${path}/${this.filename}`;
  }

  viewer = () => {
    return this.fileType()?.viewer;
  };

  icon = () => {
    return this.fileType()?.icon;
  };

  fileType() {
    return (
      AppFile.file_types.find((t) => {
        const type = new RegExp(t.short, 'i');
        const icon = this.type.match(type);
        return icon ? icon : this.name.match(type);
      }) || null
    );
  }

  static responseToFile(file: any) {
    const appFile = new AppFile(file);
    appFile.name = file.originalname;
    appFile.type = file.mimetype;
    return appFile;
  }

  iconUrl = () => {
    return `${AppFile.icon_asset_url}${this.icon()}`;
  };

  remove() {}

  static pdf = [];
  static icon_asset_url = Link.FILE_ICON_ASSETS_URL;
  static file_types = [
    { short: 'avi', alt: 'avi file', icon: 'avi.svg', viewer: 'video' },
    {
      short: 'doc',
      alt: 'doc file',
      icon: 'doc.svg',
      viewer: 'ngx-doc-viewer',
    },
    { short: 'jpg', alt: 'jpg file', icon: 'jpg.svg', viewer: 'image' },
    { short: 'jpeg', alt: 'jpeg file', icon: 'jpg.svg', viewer: 'image' },
    { short: 'mp4', alt: 'mp4 file', icon: 'mp4.svg', viewer: 'video' },
    { short: 'mpeg', alt: 'mpeg file', icon: 'mp4.svg', viewer: 'video' },
    {
      short: 'pdf',
      alt: 'pdf file',
      icon: 'pdf.svg',
      viewer: 'pdf',
    },
    { short: 'png', alt: 'png file', icon: 'png.svg', viewer: 'image' },
    {
      short: 'ppt',
      alt: 'ppt file',
      icon: 'ppt.svg',
      viewer: 'ngx-doc-viewer',
    },
    {
      short: 'xls',
      alt: 'xls file',
      icon: 'xls.svg',
      viewer: 'ngx-doc-viewer',
    },
    { short: 'mp3', alt: 'mp3 file', icon: 'mp3.svg', viewer: 'audio' },
  ];
}
