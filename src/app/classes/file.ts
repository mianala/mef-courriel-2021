import { gql } from "apollo-angular"

export class AppFile {

  id = 0
  name = ''
  size = 0
  type = ''
  src = ''
  lastModified = ''

  constructor(_file: Partial<{}> = {}) {
    Object.assign(this, _file)
  }


  static core_file_fields = gql`
    fragment CoreFileFields on file{
      id
      name
      size
      type
      src
      lastModified
    }
  `

  pdf() {
    return this.type in [this.pdf_types]
  }

  image_types = ['image/jpeg', 'image/png']
  audio_types = ['audio/mpeg', 'audio/ogg']
  pdf_types = ['application/pdf']
  doc_files = ['application/pdf', '']
  static pdf = []
}