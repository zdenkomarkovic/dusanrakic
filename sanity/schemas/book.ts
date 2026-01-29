export default {
  name: 'book',
  title: 'Knjiga',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Naslov',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'coverImage',
      title: 'Slika korica',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Opis',
      type: 'text',
      rows: 4,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'longDescription',
      title: 'Detaljni opis',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          title: 'Slika',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternativni tekst',
              description: 'Opis slike za pristupačnost',
            },
            {
              name: 'position',
              type: 'string',
              title: 'Pozicija slike',
              options: {
                list: [
                  { title: 'Levo', value: 'left' },
                  { title: 'Centar', value: 'center' },
                  { title: 'Desno', value: 'right' },
                ],
                layout: 'radio',
              },
              initialValue: 'center',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Tekst ispod slike',
              description: 'Opcioni opis slike',
            },
          ],
        },
      ],
    },
    {
      name: 'price',
      title: 'Cena (RSD)',
      type: 'number',
      validation: (Rule: any) => Rule.required().positive(),
    },
    {
      name: 'author',
      title: 'Autor',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'pages',
      title: 'Broj strana',
      type: 'number',
    },
    {
      name: 'exercisesCount',
      title: 'Broj vežbi',
      type: 'number',
      validation: (Rule: any) => Rule.integer().positive(),
    },
    {
      name: 'ageRangeFrom',
      title: 'Uzrast od (godina)',
      type: 'number',
      validation: (Rule: any) => Rule.integer().positive().max(100),
    },
    {
      name: 'ageRangeTo',
      title: 'Uzrast do (godina)',
      type: 'number',
      validation: (Rule: any) => Rule.integer().positive().max(100).min(Rule.valueOfField('ageRangeFrom')),
    },
    {
      name: 'featured',
      title: 'Izdvojeno',
      type: 'boolean',
      description: 'Prikaži na početnoj strani',
    },
    {
      name: 'sampleFile',
      title: 'Besplatan uzorak (PDF)',
      type: 'file',
      options: {
        accept: '.pdf',
      },
    },
    {
      name: 'tableOfContents',
      title: 'Sadržaj knjige',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
};
