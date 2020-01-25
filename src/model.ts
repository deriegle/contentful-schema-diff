
export interface IContentType {
  sys: {
    space: {
      sys: {
        type: 'Link',
        linkType: 'Space',
        id: string,
      },
    },
    id: string,
    type: 'ContentType',
    createdAt: string,
    updatedAt: string,
    createdBy: {
      sys: {
        type: 'Link',
        linkType: 'User',
        id: string,
      },
    },
    updatedBy: {
      sys: {
        type: 'Link',
        linkType: 'User',
        id: string,
      },
    }
    environment?: {
      sys: {
        id: string,
        type: 'Link',
        linkType: 'Environment',
      },
    },
    publishedCounter: number,
    version: number,
    publishedBy: {
      sys: {
        type: 'Link',
        linkType: 'User',
        id: string,
      },
    },
    publishedVersion: number,
    firstPublishedAt: string,
    publishedAt: string,
  },
  displayField: string,
  name: string,
  description: string,
  fields: IField[]
}

export interface IField {
  id: string,
  name: string,
  type: FieldType,
  localized: boolean,
  required: boolean,
  validations: IValidation[],
  disabled: boolean,
  omitted: boolean,
  linkType?: 'Entry' | 'Asset',
  items?: {
    type: FieldType,
    validations: IValidation[],
    linkType: 'Entry' | 'Asset',
  }
}

export interface IContentFieldItems {
  type: FieldType,
  validations?: IValidation[],
  linkType: 'Entry' | 'Asset'
}

export enum FieldType {
  Symbol = 'Symbol',
  Text = 'Text',
  Integer = 'Integer',
  Number = 'Number',
  Date = 'Date',
  Object = 'Object',
  Location = 'Location',
  Array = 'Array',
  Link = 'Link',
}

enum LinkMimetype {
  attachment,
  plaintext,
  image,
  audio,
  video,
  richtext,
  presentation,
  spreadsheet,
  pdfdocument,
  archive,
  code,
  markup,
}

export interface IValidation {
  /** Takes an array of content type ids and validates that the link points to an entry of that content type. */
  linkContentType?: string[],
  /** Takes an array of values and validates that the field value is in this array. */
  in?: any[],
  /** Takes a MIME type group name and validates that the link points to an asset of this group. */
  linkMimetypeGroup?: LinkMimetype[],
  /** Takes min and/or max parameters and validates the size of the array (number of objects in it). */
  size?: { max?: number, min?: number },
  /** Takes min and/or max parameters and validates the range of a value. */
  range?: { max?: number, min?: number },
  /** Takes a string that reflects a JS regex and flags, validates against a string.
   * See JS reference for the parameters.
   */
  regexp?: { pattern: string, flags?: string },
  /** Validates that there are no other entries that have the same field value at the time of publication. */
  unique?: true,
  /** Validates that a value falls within a certain range of dates. */
  dateRange?: { min?: string, max?: string },
  /** Validates that an image asset is of a certain image dimension. */
  assetImageDimensions?: { width: { min?: number, max?: number }, height: { min?: number, max?: number } }
  /** Validates that an asset is of a certain file size. */
  assetFileSize?: { max?: number, min?: number },

  message?: string

  /** Other validations */
  [validation: string]: any
}

export interface IEditorInterface {
  sys: {
    id: string,
    type: 'EditorInterface',
    space: {
      sys: {
        id: string,
        type: 'Link',
        linkType: 'Space',
      },
    },
    version: number,
    createdAt: string,
    createdBy: {
      sys: {
        id: string,
        type: 'Link',
        linkType: 'User',
      },
    },
    updatedAt: string,
    updatedBy: {
      sys: {
        id: string,
        type: 'Link',
        linkType: 'User',
      },
    },
    contentType: {
      sys: {
        id: string,
        type: 'Link',
        linkType: 'ContentType',
      },
    },
  },
  controls: Array<
    {
      fieldId: string,
      widgetNamespace: string,
      widgetId: string,
      settings?: {
        helpText: string,
      },
    }
  >
}

// tslint:disable: max-line-length
export enum WidgetId {
  assetLinkEditor, // Asset	Search, attach, and preview an asset.
  assetLinksEditor, // Asset (array)	Search, attach, reorder, and preview multiple assets.
  assetGalleryEditor, // Asset (array)	Search, attach, reorder, and preview multiple assets in a gallery layout
  boolean, // Boolean	Radio buttons with customizable labels.
  datePicker, // Date	Select date, time, and timezon.
  entryLinkEditor, // Entry	Search and attach another entry.
  entryLinksEditor, // Entry (array)	Search and attach multiple entries.
  entryCardEditor, // Entry	Search, attach, and preview another entry.
  entryCardsEditor, // Entry (array)	Search, attach and preview multiple entries.
  numberEditor, // Integer, Number	A simple input for numbers.
  rating, // Integer, Number	Uses stars to select a number.
  locationEditor, // Location	A map to select or find coordinates from an address.
  objectEditor, // Object	A code editor for JSON
  urlEditor, // Symbol	A text input that also shows a preview of the given URL.
  slugEditor, // Symbol	Automatically generates a slug and validates its uniqueness across entries.
  listInput, // Symbol (array)	Text input that splits values on , and stores them as an array.
  checkbox, // Symbol (array)	A group of checkboxes. One for each value from the in validation on the content type field
  tagEditor, // Symbol (array)	A text input to add a string to the list. Shows the items as tags and allows to remove them.
  multipleLine, // Text	A simple <textarea> input
  markdown, // Text	A full-fledged markdown editor
  singleLine, // Text, Symbol	A simple text input field
  dropdown, // Text, Symbol, Integer, Number	A <input type="select"> element. It uses the values from an in validation on the content type field as options.
  radio, // Text, Symbol, Integer, Number	A group of radio buttons. One for each value from the in validation on the content type field
  richTextEditor, // RichText	A default rich text editor
}
