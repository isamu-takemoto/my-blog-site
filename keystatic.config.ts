import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    blog: collection({
      label: 'ブログ記事',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'タイトル' } }),
        description: fields.text({ label: '説明', multiline: true }),
        pubDate: fields.date({ label: '公開日' }),
        updatedDate: fields.date({ label: '更新日' }),
        heroImage: fields.image({
          label: 'サムネイル画像',
          directory: 'src/assets',
          publicPath: '../../assets/',
        }),
        tags: fields.array(fields.text({ label: 'タグ' }), {
          label: 'タグ',
          itemLabel: (props) => props.value,
        }),
        content: fields.mdx({ label: '本文' }),
      },
    }),
  },
});
