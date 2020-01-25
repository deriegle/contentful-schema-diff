import { FieldType } from '../../model'
import ContentField from '../content_field'
import ContentType from '../content_type'

const contentType = new ContentType({
  id: 'hero',
  name: 'Hero',
  fields: [
    new ContentField({
      id: 'test',
      name: 'Test',
      type: FieldType.Symbol,
    }),
  ],
})

describe('Content Type', () => {
  it('allows the correct values', () => {
    expect(contentType.id).toBe('hero')
    expect(contentType.name).toBe('Hero')
    expect(contentType.description).toBeNull()
    expect(contentType.displayField).toBeNull()
    expect(contentType.fields.length).toBe(1)
  })

  it('getField works', () => {
    expect(contentType.getField('test')).toBeInstanceOf(ContentField)
    expect(contentType.getField('blah')).toBeNull()
  })

  it('toJSON returns correctly', () => {
    expect(contentType.toJSON()).toEqual({
      sys: {
        id: contentType.id,
        type: 'ContentType',
      },
      name: contentType.name,
      description: contentType.description,
      displayField: contentType.displayField,
      fields: [
        {
          id: contentType.fields[0].id,
          name: contentType.fields[0].name,
          type: contentType.fields[0].type,
          omitted: contentType.fields[0].omitted,
          required: contentType.fields[0].required,
          validations: contentType.fields[0].validations,
          disabled: contentType.fields[0].disabled,
          localized: contentType.fields[0].localized,
        },
      ],
    })
  })
})
