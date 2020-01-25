import { FieldType, IContentFieldItems, IValidation, WidgetId } from '../model'

export interface IContentFieldAppearance {
  widgetId?: WidgetId
  settings?: {
    helpText?: string,
    trueLabel?: string,
    falseLabel?: string,
  }
}

export interface IContentFieldJSON {
  id: string
  name: string
  type: string
  localized: boolean
  linkType: 'Entry' | 'Asset' | null
  required: boolean
  items: IContentFieldItems | null
  validations: IValidation[]
  disabled: boolean
  omitted: boolean
}

interface IContentField {
  id: string,
  name: string,
  type: FieldType,
  validations?: IValidation[],
  localized?: boolean,
  required?: boolean,
  disabled?: boolean,
  omitted?: boolean,
  linkType?: 'Entry' | 'Asset',
  items?: IContentFieldItems,
  appearance?: IContentFieldAppearance,
}

export default class ContentField {
  public id: string
  public name: string
  public type: FieldType
  public validations: IValidation[]
  public localized: boolean
  public required: boolean
  public disabled: boolean
  public omitted: boolean
  public linkType: 'Entry' | 'Asset' | null
  public items: IContentFieldItems | null
  public appearance: IContentFieldAppearance | null

  constructor({
    id,
    name,
    type,
    appearance,
    disabled,
    items,
    linkType,
    localized,
    omitted,
    required,
    validations,
  }: IContentField) {
    this.id = id
    this.name = name
    this.type = type
    this.validations = validations || []
    this.appearance = appearance || null
    this.items = items || null
    this.disabled = disabled || false
    this.linkType = linkType || null
    this.localized = localized || false
    this.omitted = omitted || false
    this.required = required || false
  }

  public get options() {
    return this.validations.find((v) => v.in && v.in.length > 0)?.in
  }

  public toJSON(): IContentFieldJSON {
    return {
      id: this.id,
      name: this.name,
      omitted: this.omitted,
      required: this.required,
      validations: this.validations,
      linkType: this.linkType,
      type: this.type.toString(),
      items: this.items,
      localized: this.localized,
      disabled: this.disabled,
    }
  }
}
