import { gql } from "apollo-angular"

export class AppFile {
  id
  name
  size
  type
  src
  lastModified
  constructor(_file: Partial<{}> = {}) {
    this.id = 0
    this.name = ''
    this.size = 0
    this.type = ''
    this.src = ''
    this.lastModified = ''

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
}