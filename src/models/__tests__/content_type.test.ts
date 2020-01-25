import { FieldType } from '../../model'
import ContentField from '../content_field'
import ContentLink, { ContentRelationship } from '../content_link'
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

const imageTout = new ContentType({
  id: 'imageTout',
  name: 'Image Tout',
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

  it('allows ContentLink and ContentField fields', () => {
    const subject = new ContentType({
      id: 'imageToutSection',
      name: 'Image Tout Section',
      fields: [
        new ContentField({
          id: 'headline',
          name: 'Headline Text',
          type: FieldType.Symbol,
          required: true,
        }),
        new ContentLink({
          id: 'imageTouts',
          name: 'Image Touts',
          contentType: imageTout,
          relationship: ContentRelationship.hasMany,
        }),
      ],
    })

    expect(subject.fields.length).toBe(2)
    expect(subject.getField('headline')).toBeInstanceOf(ContentField)
    expect(subject.getField('imageTouts')).toBeInstanceOf(ContentLink)
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
          items: contentType.fields[0].items,
          linkType: contentType.fields[0].linkType,
          validations: contentType.fields[0].validations,
          disabled: contentType.fields[0].disabled,
          localized: contentType.fields[0].localized,
        },
      ],
    })
  })
})
