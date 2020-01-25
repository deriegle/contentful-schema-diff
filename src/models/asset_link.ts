import { FieldType, IContentFieldItems, IValidation } from '../model'
import { IContentFieldAppearance, IContentFieldJSON } from './content_field'

export enum ContentRelationship {
  hasOne,
  hasMany,
}

interface IAssetLink {
  id: string,
  name: string,
  relationship: ContentRelationship
  validations?: IValidation[],
  localized?: boolean,
  required?: boolean,
  disabled?: boolean,
  omitted?: boolean,
  appearance?: IContentFieldAppearance,
}

export default class AssetLink {
  public readonly id: string
  public readonly name: string
  public readonly required: boolean
  public readonly disabled: boolean
  public readonly localized: boolean
  public readonly omitted: boolean
  public readonly appearance: IContentFieldAppearance | null
  public readonly linkType: 'Asset' = 'Asset'
  public readonly relationship: ContentRelationship
  public readonly validations: IValidation[]

  constructor({
    id,
    name,
    relationship,
    required,
    omitted,
    disabled,
    localized,
    validations,
    appearance,
  }: IAssetLink) {
    this.id = id
    this.name = name
    this.required = required || false
    this.omitted = omitted || false
    this.disabled = disabled || false
    this.localized = localized || false
    this.validations = validations || []
    this.appearance = appearance || null
    this.relationship = relationship
  }

  public get type(): FieldType {
    switch (this.relationship) {
      case ContentRelationship.hasMany:
        return FieldType.Array
      case ContentRelationship.hasOne:
        return FieldType.Link
      default:
        return this.relationship as never
    }
  }

  public get items(): IContentFieldItems | null {
    if (!this.isArray) { return null }

    return {
      linkType: this.linkType,
      type: FieldType.Link,
      validations: [],
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
