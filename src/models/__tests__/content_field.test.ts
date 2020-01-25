import { FieldType } from '../../model'
import ContentField from '../content_field'

describe('Content Type', () => {
  it('allows the correct values and sets the right defaults', () => {
    const contentField = new ContentField({
      id: 'test',
      name: 'Test',
      type: FieldType.Symbol,
    })

    expect(contentField.id).toBe('test')
    expect(contentField.name).toBe('Test')
    expect(contentField.type).toBe(FieldType.Symbol)
    expect(contentField.disabled).toBe(false)
    expect(contentField.required).toBe(false)
    expect(contentField.omitted).toBe(false)
    expect(contentField.localized).toBe(false)
    expect(contentField.validations.length).toBe(0)
    expect(contentField.items).toBeNull()
  })

  it('has the correct options', () => {
    const contentField = new ContentField({
      id: 'backgroundColor',
      name: 'Background Color',
      type: FieldType.Symbol,
      validations: [
        {
          in: [
            'White',
            'Off-White',
            'Orange',
          ],
        },
      ],
    })

    expect(contentField.options).toEqual([
      'White',
      'Off-White',
      'Orange',
    ])
  })
})
