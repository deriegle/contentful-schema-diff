import { FieldType, IContentFieldItems, IValidation } from '../model'
import { IContentFieldAppearance, IContentFieldJSON } from './content_field'
import ContentType from './content_type'

export enum ContentRelationship {
  hasOne,
  hasMany,
}

interface IContentLink {
  id: string,
  name: string,
  contentType: ContentType,
  relationship: ContentRelationship
  validations?: IValidation[],
  localized?: boolean,
  required?: boolean,
  disabled?: boolean,
  omitted?: boolean,
  linkType?: 'Entry' | 'Asset',
  items?: IContentFieldItems,
  appearance?: IContentFieldAppearance,
}

export default class ContentLink {
  public id: string
  public name: string
  public required: boolean
  public disabled: boolean
  public localized: boolean
  public omitted: boolean
  public appearance: IContentFieldAppearance | null
  public relationship: {
    contentType: ContentType,
    type: ContentRelationship,
  }

  // tslint:disable: variable-name
  private _items: IContentFieldItems | null
  private _validations: IValidation[]
  private linkType: 'Entry' | 'Asset' | null
  // tslint:enable: variable-name

  constructor({
    id,
    name,
    contentType,
    relationship,
    required,
    omitted,
    disabled,
    localized,
    validations,
    items,
    linkType,
    appearance,
  }: IContentLink) {
    this.id = id
    this.name = name
    this.required = required || false
    this.omitted = omitted || false
    this.disabled = disabled || false
    this.localized = localized || false
    this._validations = validations || []
    this.appearance = appearance || null
    this._items = items || null
    this.linkType = linkType || 'Entry'
    this.relationship = {
      contentType,
      type: relationship,
    }
  }

  public get validations(): IValidation[] {
    if (this.isArray) { return this._validations }

    return this._validations.concat([
      {
        linkContentType: [this.relationship.contentType.id],
      },
    ])
  }

  public get type(): FieldType {
    switch (this.relationship.type) {
      case ContentRelationship.hasMany:
        return FieldType.Array
      case ContentRelationship.hasOne:
        return FieldType.Link
      default:
        return this.relationship.type as never
    }
  }

  public get items(): IContentFieldItems | null {
    if (!this.isArray) { return null }

    return Object.assign<object, IContentFieldItems>(this._items || {}, {
      linkType: this.linkType || 'Entry',
      type: FieldType.Link,
      validations: [
        {
          linkContentType: [this.relationship.contentType.id],
        },
      ],
    })
  }

  public toJSON(): IContentFieldJSON {
    return {
      id: this.id,
      disabled: this.disabled,
      localized: this.localized,
      name: this.name,
      omitted: this.omitted,
      required: this.required,
      linkType: this.isArray ? null : this.linkType,
      items: this.items,
      type: this.type,
      validations: this.validations,
    }
  }

  private get isArray(): boolean {
    return this.type === FieldType.Array
  }
}
