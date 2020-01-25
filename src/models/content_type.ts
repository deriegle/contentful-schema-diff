import ContentField from './content_field'

export default class ContentType {
  constructor(
    public id: string,
    public description: string | null,
    public displayField: string | null,
    public fields: ContentField[],
    public name: string,
  ) { }
}
