import { FieldType } from '../../model'
import AssetLink, { ContentRelationship } from '../asset_link'

describe('Asset Link', () => {
  it('allows the correct values and sets the right defaults', () => {
    const assetLink = new AssetLink({
      id: 'image',
      name: 'Image',
      relationship: ContentRelationship.hasMany,
    })

    expect(assetLink.id).toBe('image')
    expect(assetLink.name).toBe('Image')
    expect(assetLink.type).toBe(FieldType.Array)
    expect(assetLink.disabled).toBe(false)
    expect(assetLink.required).toBe(false)
    expect(assetLink.omitted).toBe(false)
    expect(assetLink.localized).toBe(false)
    expect(assetLink.validations.length).toBe(0)
    expect(assetLink.items).toEqual({
      linkType: 'Asset',
      type: FieldType.Link,
      validations: [],
    })
  })

  it('toJSON works with hasMany', () => {
    const assetLink = new AssetLink({
      id: 'images',
      name: 'Images',
      relationship: ContentRelationship.hasMany,
    })

    expect(assetLink.toJSON()).toEqual({
      id: assetLink.id,
      name: assetLink.name,
      type: FieldType.Array,
      omitted: false,
      required: false,
      items: {
        linkType: 'Asset',
        type: FieldType.Link,
        validations: [],
      },
      linkType: null,
      validations: [],
      disabled: false,
      localized: false,
    })
  })

  it('toJSON works with hasOne', () => {
    const assetLink = new AssetLink({
      id: 'image',
      name: 'Image',
      relationship: ContentRelationship.hasOne,
    })

    expect(assetLink.toJSON()).toEqual({
      id: assetLink.id,
      name: assetLink.name,
      type: FieldType.Link,
      linkType: 'Asset',
      omitted: false,
      required: false,
      items: null,
      validations: [],
      disabled: false,
      localized: false,
    })
  })
})
