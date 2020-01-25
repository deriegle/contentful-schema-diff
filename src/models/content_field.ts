import { FieldType, IContentFieldItems, IValidation, WidgetId } from '../model'

interface IContentFieldAppearance {
  widgetId?: WidgetId
  settings?: {
    helpText?: string,
    trueLabel?: string,
    falseLabel?: string,
  }
}

export default class ContentField {
  constructor(
    public id: string,
    public name: string,
    public type: FieldType,
    public validations?: IValidation[],
    public localized?: boolean,
    public required?: boolean,
    public disabled?: boolean,
    public omitted?: boolean,
    public linkType?: 'Entry' | 'Asset',
    public items?: IContentFieldItems,
    public appearance?: IContentFieldAppearance,
  ) { }
}
