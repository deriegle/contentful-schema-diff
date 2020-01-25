import ContentField, { IContentFieldJSON } from './content_field'

interface IContentType {
  id: string
  name: string
  fields: ContentField[]
  description?: string
  displayField?: string
}

interface IContentTypeJSON {
  sys: {
    id: string
    type: 'ContentType',
  }
  displayField: string | null
  name: string
  description: string | null
  fields: IContentFieldJSON[]
}

export default class ContentType {
  public id: string
  public name: string
  public description: string | null
  public displayField: string | null
  public fields: ContentField[]

  constructor({
    id,
    fields,
    name,
    description,
    displayField,
  }: IContentType) {
    this.id = id
    this.name = name
    this.fields = fields
    this.description = description || null
    this.displayField = displayField || null
  }

  public getField(fieldId: string): ContentField | null {
    const field = this.fields.find((f) => f.id === fieldId)

    return field || null
  }

  public toJSON(): IContentTypeJSON {
    return {
      sys: {
        id: this.id,
        type: 'ContentType',
      },
      description: this.description,
      displayField: this.displayField,
      fields: this.fields.map((f) => f.toJSON()),
      name: this.name,
    }
  }
}
