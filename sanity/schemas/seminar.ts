export default {
  name: 'seminar',
  title: 'Seminar',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Naziv seminara',
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
      name: 'description',
      title: 'Kratak opis',
      type: 'text',
      rows: 3,
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
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Tekst ispod slike',
            },
          ],
        },
      ],
    },
    {
      name: 'coverImage',
      title: 'Slika seminara',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'date',
      title: 'Datum održavanja',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'duration',
      title: 'Trajanje (npr. "2 dana", "4 sata")',
      type: 'string',
    },
    {
      name: 'location',
      title: 'Lokacija',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'price',
      title: 'Cena (RSD)',
      type: 'number',
      validation: (Rule: any) => Rule.required().positive(),
    },
    {
      name: 'maxParticipants',
      title: 'Maksimalan broj učesnika',
      type: 'number',
      validation: (Rule: any) => Rule.integer().positive(),
    },
    {
      name: 'instructor',
      title: 'Predavač',
      type: 'string',
      initialValue: 'Dušan Rakić',
    },
    {
      name: 'topics',
      title: 'Teme seminara',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Lista tema koje će biti obrađene',
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Aktivan - Prijave otvorene', value: 'active' },
          { title: 'Popunjen - Nema mesta', value: 'full' },
          { title: 'Završen', value: 'finished' },
          { title: 'Otkazan', value: 'cancelled' },
        ],
        layout: 'radio',
      },
      initialValue: 'active',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'featured',
      title: 'Izdvojeno',
      type: 'boolean',
      description: 'Prikaži na početnoj strani',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      media: 'coverImage',
      status: 'status',
    },
    prepare(selection: any) {
      const { title, date, status } = selection;
      const statusLabel = {
        active: '✅ Aktivan',
        full: '🔴 Popunjen',
        finished: '✔️ Završen',
        cancelled: '❌ Otkazan',
      }[status] || status;

      return {
        title: title,
        subtitle: `${new Date(date).toLocaleDateString('sr-RS')} - ${statusLabel}`,
        media: selection.media,
      };
    },
  },
};
