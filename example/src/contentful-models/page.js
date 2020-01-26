import { ContentType, ContentField, FieldType, ContentLink, ContentRelationship } from 'contentful-schema-diff'

export default new ContentType({
  id: 'page',
  name: 'Page',
  description: 'Basic Page',
  displayField: 'title',
  fields: [
    new ContentField({
      id: 'title',
      name: 'Page title',
      type: FieldType.Text,
      required: true,
    }),
    new ContentField({
      id: 'description',
      name: 'Page description',
      type: FieldType.Text,
      required: true,
    }),
    new ContentLink({
      id: 'blocks',
      name: 'Components',
      relationship: ContentRelationship.hasMany,
    })
  ],
})