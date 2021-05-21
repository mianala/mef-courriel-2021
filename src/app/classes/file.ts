import { gql } from 'apollo-angular';
import { Link } from './link';

export class AppFile {
  id = 0;
  name = '';
  size = 0;
  type = '';
  src = '';
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
    }
  `;

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

  iconUrl = () => {
    return `${AppFile.icon_asset_url}${this.icon()}`;
  };

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
      viewer: 'ngx-doc-viewer',
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
