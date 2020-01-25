import { FieldType } from '../../model'
import ContentLink, { ContentRelationship } from '../content_link'
import ContentType from '../content_type'

const imageTout = new ContentType({
  id: 'imageTout',
  name: 'Image Tout',
  fields: [],
})

describe('Content Link', () => {
  it('allows the correct values and sets the right defaults', () => {
    const contentLink = new ContentLink({
      id: 'test',
      name: 'Test',
      relationship: ContentRelationship.hasMany,
      contentType: imageTout,
    })

    expect(contentLink.id).toBe('test')
    expect(contentLink.name).toBe('Test')
    expect(contentLink.type).toBe(FieldType.Array)
    expect(contentLink.disabled).toBe(false)
    expect(contentLink.required).toBe(false)
    expect(contentLink.omitted).toBe(false)
    expect(contentLink.localized).toBe(false)
    expect(contentLink.validations.length).toBe(0)
    expect(contentLink.items?.linkType).toBe('Entry')
    expect(contentLink.items?.type).toBe(FieldType.Link)
    expect(contentLink.items?.validations).toContainEqual({
      linkContentType: [imageTout.id],
    })
  })

  it('toJSON works with hasMany', () => {
    const contentLink = new ContentLink({
      id: 'imageTouts',
      name: 'Image Touts',
      relationship: ContentRelationship.hasMany,
      contentType: imageTout,
    })

    expect(contentLink.toJSON()).toEqual({
      id: contentLink.id,
      name: contentLink.name,
      type: FieldType.Array,
      omitted: false,
      required: false,
      items: {
        linkType: 'Entry',
        type: FieldType.Link,
        validations: [
          {
            linkContentType: [imageTout.id],
          },
        ],
      },
      linkType: null,
      validations: [],
      disabled: false,
      localized: false,
    })
  })

  it('toJSON works with hasOne', () => {
    const contentLink = new ContentLink({
      id: 'imageTout',
      name: 'Image Tout',
      relationship: ContentRelationship.hasOne,
      contentType: imageTout,
    })

    expect(contentLink.toJSON()).toEqual({
      id: contentLink.id,
      name: contentLink.name,
      type: FieldType.Link,
      linkType: 'Entry',
      omitted: false,
      required: false,
      items: null,
      validations: [
        {
          linkContentType: [imageTout.id],
        },
      ],
      disabled: false,
      localized: false,
    })
  })
})
