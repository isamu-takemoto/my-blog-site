import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    blog: collection({
      label: 'ブログ記事',
      slugField: 'slug',
      columns: ['title', 'pubDate'],
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      schema: {
        slug: fields.text({ label: 'スラグ（URL）' }),
        title: fields.text({ label: 'タイトル' }),
        description: fields.text({ label: '説明', multiline: true }),
        pubDate: fields.date({ label: '公開日' }),
        updatedDate: fields.date({ label: '更新日', validation: { isRequired: false } }),
        tags: fields.array(fields.text({ label: 'タグ' }), {
          label: 'タグ',
          itemLabel: (props) => props.value,
        }),
        content: fields.mdx({ label: '本文' }),
      },
    }),
  },
});
