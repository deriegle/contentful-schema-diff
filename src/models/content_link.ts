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
  contentType?: ContentType,
  contentTypes?: ContentType[],
  relationship: ContentRelationship
  validations?: IValidation[],
  localized?: boolean,
  required?: boolean,
  disabled?: boolean,
  omitted?: boolean,
  items?: IContentFieldItems,
  appearance?: IContentFieldAppearance,
}

export default class ContentLink {
  public readonly id: string
  public readonly name: string
  public readonly required: boolean
  public readonly disabled: boolean
  public readonly localized: boolean
  public readonly omitted: boolean
  public readonly appearance: IContentFieldAppearance | null
  public readonly linkType: 'Entry' = 'Entry'
  public readonly relationship: {
    contentTypes: ContentType[] | null,
    type: ContentRelationship,
  }

  // tslint:disable: variable-name
  private _items: IContentFieldItems | null
  private _validations: IValidation[]
  // tslint:enable: variable-name

  constructor({
    id,
    name,
    contentType,
    contentTypes,
    relationship,
    required,
    omitted,
    disabled,
    localized,
    validations,
    items,
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

    const relationshipContentTypes = contentTypes || (contentType ? [contentType] : null)

    this.relationship = {
      contentTypes: relationshipContentTypes,
      type: relationship,
    }
  }

  public get validations(): IValidation[] {
    if (this.isArray || !this.relationship.contentTypes?.length) { return this._validations }

    return this._validations.concat([
      {
        linkContentType: this.relationship.contentTypes.map((ct) => ct.id),
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

    const validations = this._items?.validations || []

    if (this.relationship.contentTypes?.length) {
      validations.push({
        linkContentType: this.relationship.contentTypes.map((ct) => ct.id),
      })
    }

    return {
      linkType: this.linkType,
      type: FieldType.Link,
      validations,
    }
  }

  public get options() {
    return []
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
